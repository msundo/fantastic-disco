import type { NextPage } from 'next';
import { useAppState } from '../context/state';
import { Gantt, Task, ViewMode } from '../gantt/dist';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { createTimelineForMother, createTimelineForPartner, createTimelineForSharedAmount, getStartEndDateForProject } from '../helpers/helpers';
import { useBreakpoint } from '../helpers/Breakpoint';
import EditPageSections from '../components/EditPageSections';
import Legend from '../components/Legend';
import DatePickerPopup from '../components/DatePickerPopup';
import SectionLeavePeriodsPrint from '../components/SectionLeavePeriodsPrint';
import SectionPrintHeader from '../components/SectionPrintHeader';
import GapInTimelineAlert from '../components/GapInTimelineAlert';

const Timeline: NextPage = () => {
  const {
    nameOfMother,
    nameOfPartner,
    tasks,
    setTasks,
    dateOfBirth,
    setActiveTask,
    setDatePickerPopupVisible,
    createDatesToExclude,
    excludeDatesInterval,
    activeTask,
    distribution,
    leave,
    setLeave,
    setDatePickerPopupPerson,
    updateLeaveOnEditTask,
    checkForGapsBetweenTasks,
    gapInTimeline,
  } = useAppState();

  const { deviceWidth, breakpoints } = useBreakpoint();

  // Gantt Timeline width calculation
  const ganttColumnWidthRef = useRef(90);
  useEffect(() => {
    if (deviceWidth >= breakpoints['xl']) ganttColumnWidthRef.current = 90;
    else {
      ganttColumnWidthRef.current = Math.floor((window.innerWidth - 40) / 13);
    }
  }, [breakpoints, deviceWidth]);

  // Check for gaps in timeline
  useEffect(() => {
    checkForGapsBetweenTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (activeTask) {
      updateLeaveOnEditTask(activeTask);
      createDatesToExclude(activeTask);
    }
  }, [activeTask]);

  const handleEditTask = (task: Task) => {
    setActiveTask(task);
    setDatePickerPopupVisible(true);
    setDatePickerPopupPerson(task.project);
    // createDatesToExclude(task);
  };

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  useEffect(() => {
    let tasks: Task[] = [];
    if (distribution === 'mother') {
      tasks = createTimelineForMother(moment(dateOfBirth), handleEditTask) as Task[];
    } else if (distribution === 'partner') {
      tasks = createTimelineForPartner(moment(dateOfBirth), handleEditTask) as Task[];
    } else if (distribution === 'equal') {
      tasks = createTimelineForSharedAmount(moment(dateOfBirth), handleEditTask) as Task[];
    } else {
      tasks = createTimelineForSharedAmount(moment(dateOfBirth), handleEditTask) as Task[];
    }
    setTasks(tasks);
  }, [dateOfBirth, setTasks]);

  const handleTaskChange = (task: Task) => {
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(newTasks);
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);

  return (
    <>
      {/* Only visible during a print */}
      <SectionPrintHeader />
      <SectionLeavePeriodsPrint />

      {/* TODO: Enable for names left of timeline? */}
      {/* <div className='flex'>
        <div className='flex flex-col' style={{ justifyContent: 'space-evenly', marginBottom: '7rem', marginRight: '20px' }}>
          <p className='center' style={{ fontSize: '2rem', fontWeight: 700 }}>
            {nameOfMother}
          </p>
          <p className='center' style={{ fontSize: '2rem', fontWeight: 700 }}>
            {nameOfPartner}
          </p>
        </div> */}

      <Gantt
        onDateChange={handleTaskChange}
        fontFamily={'Inter'}
        tasks={tasks}
        columnWidth={ganttColumnWidthRef.current}
        listCellWidth={''}
        viewMode={ViewMode.Month}
        locale='dan'
      />
      {/* </div> */}

      {/*  TODO: move colors to state - we need them in the datepicker as well */}
      <Legend partnerColor={'#2171B5'} motherColor={'#084081'} vacationColor={'#AE017E'}></Legend>
      {gapInTimeline && <GapInTimelineAlert />}
      <DatePickerPopup />
      <EditPageSections />
    </>
  );
};

export default Timeline;
