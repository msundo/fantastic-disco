import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import s from './DatePickerPopup.module.scss';
import Button from '../Button';
import Notification from '../Notification';
// import OutsideClickWrapper from '../OutsideClickWrapper';

import { useAppState } from '../../context/state';
import { Task } from '../../gantt/dist';

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import da from 'date-fns/locale/da';
import intlFormat from 'date-fns/intlFormat';
import TextInput from '../TextInput';

registerLocale('da', da);

import { createTaskForPartner, createTaskForMother, createVacationForPartner, createVacationForMother } from '../../helpers/helpers';
import getDay from 'date-fns/getDay';
import { addBusinessDays, addWeeks, closestTo, differenceInBusinessDays, subBusinessDays } from 'date-fns';
import { Project } from '../../gantt/dist/components/task-item/project/project';

const dateFormat = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};
const dateLocale = {
  locale: 'da',
};

const DatePickerPopup: React.FC = () => {
  const {
    nameOfMother,
    nameOfPartner,
    tasks,
    setTasks,
    dateOfBirth,
    setActiveTask,
    activeTask,
    datePickerPopupVisible,
    setDatePickerPopupVisible,
    datePickerPopupPerson,
    excludeDatesInterval,
    createDatesToExclude,
    currentTaskBusinessDays,
    setCurrentTaskBusinessDays,
    leave,
    localLeave,
    setLeave,
    setDatePickerPopupPerson,
    findNextAvailableTask,
    updateLeaveOnEditTask,
    resetLocalLeave,
    checkForGapsBetweenTasks,
    startAddVacation,
    setStartAddVacation,
    updateLocalVacation,
    resetLocalVacation,
    localVacation,
  } = useAppState();

  // TODO: When editing a task, we need to take the existing leave on the task into account when reducing remaining leave.

  const [notificationIsVisible, setNotificationIsVisible] = useState(false);
  const [includeIntervals, setIncludeIntervals] = useState<{ start: Date; end: Date }[] | null>(null);
  const [notificationType, setNotificationType] = useState('edit');

  const [dateRange, setDateRange] = useState([]);
  const [startDate, endDate] = dateRange;

  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const updateCurrentTaskBusinessDays = (task: Task) => {
    const numberOfBusinessDays = differenceInBusinessDays(task.end, task.start);
    setCurrentTaskBusinessDays(numberOfBusinessDays + 1);
  };

  useEffect(() => {
    if (activeTask) {
      setDateRange([activeTask.start, activeTask.end]);
      createDatesToExclude(activeTask);
      updateCurrentTaskBusinessDays(activeTask);
      updateLeaveOnEditTask(activeTask);
      if(activeTask.periodeType === 'VacationMother' || activeTask.periodeType === 'VacationPartner') {
        updateLocalVacation(activeTask);
      }
    } else {
      resetLocalLeave();
      resetLocalVacation();
      setDateRange([null, null]);
    };
  }, [activeTask]);

  useEffect(() => {
    console.log("STATE UPDATE: ", leave);
  }, [leave, setLeave]);

  const handleEditTask = (task: Task) => {
    setActiveTask(task);
    setDatePickerPopupVisible(true);
    setDatePickerPopupPerson(task.project);
    if(task.periodeType === 'Vacation') {
      setStartAddVacation(true);
    }
  };

  const changeDateIntervals = (dateRange) => {
    if (dateRange[1] !== null) {
      setIncludeIntervals(null);
      return;
    }
    let maxDate;
    const nextTask = findNextAvailableTask(dateRange[0], datePickerPopupPerson);
    if(startAddVacation) {
      const potentialMaxDate = addWeeks(dateOfBirth, 48);
      if(nextTask) {
        const datesArray = [subBusinessDays(nextTask.start, 1), potentialMaxDate];
        maxDate = closestTo(dateRange[0], datesArray);
      } else {
        maxDate = potentialMaxDate;
      }
    } else {
      const potentialMaxDate = addBusinessDays(dateRange[0], leave.remaining[datePickerPopupPerson] + leave.remaining.shared + localLeave[datePickerPopupPerson] + localLeave.shared);
      if(nextTask) {
        const datesArray = [subBusinessDays(nextTask.start, 1), potentialMaxDate];
        maxDate = closestTo(dateRange[0], datesArray);
      } else {
        maxDate = potentialMaxDate;
      }
    }
    //* Calculate available leave based on remaining leave in state

    const datesToInclude: { start: Date; end: Date }[] | undefined = [];
    datesToInclude.push({ start: dateRange[0], end: maxDate });
    setIncludeIntervals(datesToInclude);
  };

  const savePeriod = () => {
    setNotificationType('edit');
    setDatePickerPopupVisible(false);
    setNotificationIsVisible(true);
  };

  /**
   *
   * Apply the selected dates and update active task or create new task
   * Update remaining leave in state
   *
   */
  const applyDates = () => {
    const calculateBusinessDays = differenceInBusinessDays(endDate, startDate) + 1;
    if(startAddVacation) {
      if(activeTask) {
        const taskId = activeTask?.id;
        const activeTaskIndex = tasks.findIndex((t) => t.id === taskId);
        let newTasks = [...tasks];
        newTasks[activeTaskIndex] = {
          ...newTasks[activeTaskIndex],
          start: startDate,
          end: endDate,
        };
        setTasks(newTasks);
      } else {
        if(datePickerPopupPerson === 'mother') {
          const task = createVacationForMother(
            startDate,
            endDate,
            0,
            0,
            0,
            nameOfMother,
            false,
            handleEditTask
          );
          const newTasks = [...tasks, task];
          setTasks(newTasks);
        } else if(datePickerPopupPerson === 'partner') {
          const task = createVacationForPartner(
            startDate,
            endDate,
            0,
            0,
            0,
            nameOfPartner,
            false,
            handleEditTask
          );
          const newTasks = [...tasks, task];
          setTasks(newTasks);
        }
    }
      setActiveTask(null);
      setDateRange([]); //TODO: dateRange could be set to start after current endDate?
      setNotificationType(activeTask ? 'success' : 'addLeaveSuccess'); // if adding new leave, set to addLeaveSuccess
      setStartAddVacation(false);
      return;
    }

    const remainingIndividualDays = activeTask ? leave.remaining[datePickerPopupPerson] + localLeave[datePickerPopupPerson] : leave.remaining[datePickerPopupPerson];
    const remainingSharedDays = activeTask ? leave.remaining.shared + localLeave.shared : leave.remaining.shared;

    let individualDaysReducer = remainingIndividualDays;
    let sharedDaysReducer = remainingSharedDays;
    let individualDaysToUse = 0;
    let sharedDaysToUse = 0;
    for (let i = 0; i < calculateBusinessDays; i++) {
      if (individualDaysReducer > 0) {
        individualDaysReducer--;
        individualDaysToUse++;
      } else if (individualDaysReducer === 0 && sharedDaysReducer > 0) {
        sharedDaysReducer--;
        sharedDaysToUse++;
      }
    }
    const taskShouldSplit = individualDaysToUse > 0 && sharedDaysToUse > 0;

    // Update the remaining leave in state
    const newLeave = {
      ...leave,
      remaining: {
        ...leave.remaining,
        [datePickerPopupPerson]: individualDaysReducer,
        shared: sharedDaysReducer,
      },
    };
    setLeave(newLeave);

    // TODO: pass person
    // TODO: if updating a task uses from individual + shared days, we need to split it
    if (activeTask) {
      const taskId = activeTask?.id;
      const activeTaskIndex = tasks.findIndex((t) => t.id === taskId);
      if(taskShouldSplit) {
        tasks.splice(activeTaskIndex, 1);
        let addLeavePeriod = [];
        if (datePickerPopupPerson === 'mother') {
          if (individualDaysToUse > 0) {
            // if task uses both individual + shared days, endDate for individualDays should be startDate + individualDaysToUse
            addLeavePeriod.push(
              createTaskForMother(
                startDate,
                taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse) : endDate,
                individualDaysToUse,
                0,
                0,
                nameOfMother,
                'Leave',
                false,
                handleEditTask
              )
            );
          }
          if (sharedDaysToUse > 0) {
            // if task uses both individual + shared days, startDate for sharedDays should be startDate + individualDaysToUse + 1
            addLeavePeriod.push(
              createTaskForMother(
                taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse + 1) : startDate,
                endDate,
                0,
                0,
                sharedDaysToUse,
                nameOfMother,
                'Leave',
                false,
                handleEditTask
              )
            );
          }
        } else {
          if (individualDaysToUse > 0) {
            addLeavePeriod.push(
              createTaskForPartner(
                startDate,
                taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse) : endDate,
                0,
                individualDaysToUse,
                0,
                nameOfPartner,
                'Leave',
                handleEditTask
              )
            );
          }
          if (sharedDaysToUse > 0) {
            addLeavePeriod.push(
              createTaskForPartner(
                taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse + 1) : startDate,
                endDate,
                0,
                0,
                sharedDaysToUse,
                nameOfPartner,
                'Leave',
                handleEditTask
              )
            );
          }
        }
        const newTasks = [...tasks, ...addLeavePeriod];
        setTasks(newTasks);
      } else {
        const sharedDays = activeTask.sharedDays > 0 ? activeTask.sharedDays = calculateBusinessDays : 0;
        const motherIndividualDays = activeTask.motherIndividualDays > 0 ? activeTask.motherIndividualDays = calculateBusinessDays : 0;
        const partnerIndividualDays = activeTask.partnerIndividualDays > 0 ? activeTask.partnerIndividualDays = calculateBusinessDays : 0;
        let newTasks = [...tasks];
        newTasks[activeTaskIndex] = {
          ...newTasks[activeTaskIndex],
          start: startDate,
          end: endDate,
          sharedDays: sharedDays,
          motherIndividualDays: motherIndividualDays,
          partnerIndividualDays: partnerIndividualDays,
        };
        setTasks(newTasks);
      }
    } else {
      let addLeavePeriod = [];
      if (datePickerPopupPerson === 'mother') {
        if (individualDaysToUse > 0) {
          // if task uses both individual + shared days, endDate for individualDays should be startDate + individualDaysToUse
          addLeavePeriod.push(
            createTaskForMother(
              startDate,
              taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse) : endDate,
              individualDaysToUse,
              0,
              0,
              nameOfMother,
              'Leave',
              false,
              handleEditTask
            )
          );
        }
        if (sharedDaysToUse > 0) {
          // if task uses both individual + shared days, startDate for sharedDays should be startDate + individualDaysToUse + 1
          addLeavePeriod.push(
            createTaskForMother(
              taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse + 1) : startDate,
              endDate,
              0,
              0,
              sharedDaysToUse,
              nameOfMother,
              'Leave',
              false,
              handleEditTask
            )
          );
        }
      } else {
        if (individualDaysToUse > 0) {
          addLeavePeriod.push(
            createTaskForPartner(
              startDate,
              taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse) : endDate,
              0,
              individualDaysToUse,
              0,
              nameOfPartner,
              'Leave',
              handleEditTask
            )
          );
        }
        if (sharedDaysToUse > 0) {
          addLeavePeriod.push(
            createTaskForPartner(
              taskShouldSplit ? addBusinessDays(startDate, individualDaysToUse + 1) : startDate,
              endDate,
              0,
              0,
              sharedDaysToUse,
              nameOfPartner,
              'Leave',
              handleEditTask
            )
          );
        }
      }

      const newTasks = [...tasks, ...addLeavePeriod];
      setTasks(newTasks);
    }
    setActiveTask(null);
    setDateRange([]); //TODO: dateRange could be set to start after current endDate?
    setNotificationType(activeTask ? 'success' : 'addLeaveSuccess'); // if adding new leave, set to addLeaveSuccess
  };

  /**
   *
   * Remove leave (task)
   *
   */
  const updateRemainingLeaveOnRemove = (task: Task) => {
    const newLeave = {
      ...leave,
      remaining: {
        mother: leave.remaining.mother + task.motherIndividualDays,
        partner: leave.remaining.partner + task.partnerIndividualDays,
        shared: leave.remaining.shared + task.sharedDays,
      },
    };
    setLeave(newLeave);
  };

  const removeLeave = () => {
    setNotificationType('delete');
    setDatePickerPopupVisible(false);
    setNotificationIsVisible(true);
  };

  const confirmRemoveLeave = () => {
    const person = activeTask?.project;
    const taskId = activeTask?.id;
    const filteredTasks = tasks.filter((task) => {
      return task.id !== taskId;
      task.type;
    });
    updateRemainingLeaveOnRemove(activeTask);
    setTasks(filteredTasks);
    setActiveTask(null);
    setDatePickerPopupVisible(false);
    setNotificationIsVisible(false);
    setStartAddVacation(false);
  };

  const closePopup = () => {
    setActiveTask(null);
    setDateRange([]);
    setDatePickerPopupVisible(false);
    if(activeTask) {
      const newLeave = {
        ...leave,
        remaining: {
          shared: leave.remaining.shared - activeTask.sharedDays,
          mother: leave.remaining.mother - activeTask.motherIndividualDays,
          partner: leave.remaining.partner - activeTask.partnerIndividualDays,
        },
      };
      setLeave(newLeave);
    }
    if(startAddVacation) {
      setStartAddVacation(false);
    }
  };

  const rejectChanges = () => {
    setDatePickerPopupVisible(true);
    setNotificationIsVisible(false);
  };

  return (
    <>
      <div className={classnames(s.DatePickerPopup, datePickerPopupVisible ? '' : 'hidden', 'fixed top-0 left-0 right-0 bottom-0 z-50 w-[100vw] h-[100vh]')}>
        <div className={classnames('w-full h-full bg-[#0B2432] bg-opacity-25 flex justify-center')}>
          <div className={classnames(s.DatePickerPopup_container, 'bg-[#F4F4F4] relative flex flex-col justify-center items-center mt-auto mb-auto')}>
            <h2 className={classnames(s.DatePickerPopup_container_title, 'text-4xl text-center')}>Tilpas orlovsperiode</h2>

            <div className={'flex justify-center mb-12'}>
              <TextInput
                value={
                  startDate
                    ? `${intlFormat(startDate, dateFormat, dateLocale)} - ${endDate ? intlFormat(endDate, dateFormat, dateLocale) : ''}`
                    : 'Vælg start og slut dato'
                }
                label={''}
                changeHandler={() => {}}
              />
            </div>

            <div id='react-datepicker-wrapper'>
              <div id='react-datepicker'>
                <DatePicker
                  inline
                  className='border-2 border-solid rounded border-opacity-100 border-border-grey focus-visible:border-border-green outline-border-green p-4 text-xl'
                  locale='da'
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  shouldCloseOnSelect={false}
                  selected={startDate}
                  formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 1)}
                  onChange={(dateRange) => {
                    setDateRange(dateRange);
                    changeDateIntervals(dateRange);
                  }}
                  filterDate={isWeekday}
                  popperPlacement='bottom'
                  minDate={dateOfBirth}
                  includeDateIntervals={includeIntervals ? includeIntervals : undefined}
                  excludeDateIntervals={excludeDatesInterval}
                  // maxDate={addDays(new Date(), 110)}
                  maxDate={addWeeks(dateOfBirth, 48)}
                  monthsShown={2}
                  placeholderText='Vælg start og slut dato'
                />
              </div>

              <div className={classnames(s.DatePickerPopup_container_buttons, 'w-full mt-6')}>
                <Button type={'primary'} text={'Gem'} clickHandler={savePeriod} classNames={'mt-2'} />

                <button className={classnames(s.DatePickerPopup_container_iconText)} onClick={() => removeLeave()}>
                  Slet orlovsperiode
                </button>
              </div>
            </div>

            <div className={classnames(s.DatePickerPopup_container_close, 'absolute flex justify-center items-center cursor-pointer')} onClick={closePopup}>
              <Image src='/svgs/close.svg' alt='close' width={14} height={14} />
            </div>
          </div>
        </div>
      </div>

      {notificationIsVisible && (
        // <OutsideClickWrapper onClickOutside={setNotificationIsVisible}>
        <Notification
          type={notificationType}
          acceptHandler={notificationType === 'edit' ? applyDates : confirmRemoveLeave}
          rejectHandler={rejectChanges}
          closeHandler={() => setNotificationIsVisible(false)}
        />
        // </OutsideClickWrapper>
      )}
    </>
  );
};

export default DatePickerPopup;
