import {
  addBusinessDays,
  areIntervalsOverlapping,
  differenceInBusinessDays,
  differenceInCalendarDays,
  getOverlappingDaysInIntervals,
  isAfter,
  isBefore,
  isSameDay,
  subBusinessDays,
} from 'date-fns';
import { createContext, useContext, ReactNode, useState } from 'react';
import { Task } from '../gantt/dist';

type PopupContext = {
  step: any;
  onAccept: () => void;
  onReject: () => void;
};

type GapType = {
  start: Date;
  end: Date;
  project: 'mother' | 'partner';
};

type ValidationType = {
  numberOfParents: number;
  livingTogether: boolean;
  motherOccupationalStatus: string;
  partnerOccupationalStatus: string;
  motherWeeksWithFullPay: number;
  partnerWeeksWithFullPay: number;
  distribution: 'mother' | 'partner' | 'equal' | '';
};
type LeaveType = {
  max: {
    mother: number;
    partner: number;
    shared: number;
  };
  remaining: {
    mother: number;
    partner: number;
    shared: number;
  };
  used: {
    mother: number;
    partner: number;
  };
};
type LocalLeaveType = {
  mother: number;
  partner: number;
  shared: number;
};

type appContextType = {
  dateOfBirth: Date | null;
  setDateOfBirth: (date: any) => void;
  nameOfMother: string;
  nameOfPartner: string;
  setNameOfMother: (value: string) => void;
  setNameOfPartner: (value: string) => void;
  motherOccupationalStatus: string;
  partnerOccupationalStatus: string;
  setMotherOccupationalStatus: (value: string) => void;
  setPartnerOccupationalStatus: (value: string) => void;
  motherWeeksWithFullPay: number;
  partnerWeeksWithFullPay: number;
  setMotherWeeksWithFullPay: (value: number) => void;
  setPartnerWeeksWithFullPay: (value: number) => void;
  distribution: string;
  setDistribution: (value: string) => void;
  popupContext: PopupContext;
  updatePopupContext: (popup: PopupContext) => void;
  popupVisibility: boolean;
  updatePopupVisibility: (visibility: boolean) => void;
  validation: ValidationType;
  leave: LeaveType;
  setLeave: (value: LeaveType) => void;
  localLeave: LocalLeaveType;
  setLocalLeave: (value: LocalLeaveType) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  //TODO:
  activeTask: Task | null;
  setActiveTask: (task: Task | null) => void;
  datePickerPopupVisible: boolean;
  setDatePickerPopupVisible: (visibility: boolean) => void;
  excludeDatesInterval: { start: Date; end: Date }[] | undefined;
  setExcludeDatesInterval: (dates: Date[]) => void;
  createDatesToExclude: (task: Task) => void;
  excludeAllTasksAvailableForSelected: (type: string) => void;
  datePickerPopupPerson: 'mother' | 'partner';
  setDatePickerPopupPerson: (person: string) => void;
  currentTaskBusinessDays: number;
  setCurrentTaskBusinessDays: (value: number) => void;
  updateLeaveOnEditTask: (task: Task) => void;
  resetLocalLeave: () => void;
  checkForGapsBetweenTasks: (tasks: Task[]) => void;
  gapInTimeline: boolean;
  setGapInTimeline: (value: boolean) => void;
};

const appContextDefaultValues: appContextType = {
  dateOfBirth: null,
  setDateOfBirth: (date: any) => {},
  nameOfMother: 'Mother',
  nameOfPartner: 'Partner',
  setNameOfMother: (name: string) => {},
  setNameOfPartner: (name: string) => {},
  motherOccupationalStatus: '',
  partnerOccupationalStatus: '',
  setMotherOccupationalStatus: (value: string) => {},
  setPartnerOccupationalStatus: (value: string) => {},
  motherWeeksWithFullPay: 0,
  partnerWeeksWithFullPay: 0,
  setMotherWeeksWithFullPay: (value: number) => {},
  setPartnerWeeksWithFullPay: (value: number) => {},
  popupContext: {
    step: '',
    onAccept: () => {},
    onReject: () => {},
  },
  updatePopupContext: (popup: PopupContext) => {},
  popupVisibility: false,
  updatePopupVisibility: (visibility: boolean) => {},
  distribution: '',
  setDistribution: (value: string) => {},

  //* schema for validation, used for each step
  validation: {
    numberOfParents: 2,
    livingTogether: true,
    motherOccupationalStatus: 'lønmodtager',
    partnerOccupationalStatus: 'lønmodtager',
    motherWeeksWithFullPay: 0,
    partnerWeeksWithFullPay: 0,
    distribution: '',
  },
  leave: {
    max: {
      mother: 55,
      partner: 55,
      shared: 130,
    },
    remaining: {
      mother: 0,
      partner: 0,
      shared: 0,
    },
    used: {
      mother: 0,
      partner: 0,
    },
  },
  localLeave: {
    mother: 0,
    partner: 0,
    shared: 0,
  },
  setLocalLeave: (value: LocalLeaveType) => {},
  setLeave: (value: LeaveType) => {},
  tasks: [], //* tasks for gantt
  setTasks: (tasks: Task[]) => {},
  activeTask: null,
  setActiveTask: (task: Task) => {},
  datePickerPopupVisible: false,
  setDatePickerPopupVisible: (visibility: boolean) => {},
  excludeDatesInterval: undefined,
  setExcludeDatesInterval: (dates: Date[]) => {},
  createDatesToExclude: (task: Task) => {},
  excludeAllTasksAvailableForSelected: (type: string) => {},
  datePickerPopupPerson: 'mother',
  currentTaskBusinessDays: 0,
  setCurrentTaskBusinessDays: (value: number) => {},
  updateLeaveOnEditTask: (task: Task) => {},
  resetLocalLeave: () => {},
  checkForGapsBetweenTasks: (tasks: Task[]) => {},
  gapInTimeline: false,
  setGapInTimeline: (value: boolean) => {},
};
const AppContext = createContext<appContextType>(appContextDefaultValues);

export function useAppState() {
  return useContext(AppContext);
}

type Props = {
  children: ReactNode;
};

export function AppStateProvider({ children }: Props) {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(2022, 7, 2));
  const [nameOfMother, setNameOfMother] = useState<string>('Mother');
  const [nameOfPartner, setNameOfPartner] = useState<string>('Partner');
  const [motherOccupationalStatus, setMotherOccupationalStatus] = useState<string>('');
  const [partnerOccupationalStatus, setPartnerOccupationalStatus] = useState<string>('');
  const [distribution, setDistribution] = useState<string>('');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [datePickerPopupVisible, setDatePickerPopupVisible] = useState<boolean>(false);
  const [excludeDatesInterval, setExcludeDatesInterval] = useState<{ start: Date; end: Date }[] | undefined>(undefined);
  const [datePickerPopupPerson, setDatePickerPopupPerson] = useState<string>('mother');
  const [currentTaskBusinessDays, setCurrentTaskBusinessDays] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([
    {
      onEdit: () => {},
      taskTitle: 'test',
      taskDescription: 'description',
      periodeType: 'PregnancyLeave',
      start: new Date(2022, 1, 1),
      end: new Date(2022, 7, 3),
      name: nameOfMother,
      id: 'mother',
      progress: 100,
      type: 'project',
      hideChildren: false,
      rowIndex: 0,
      motherIndividualDays: 0,
      partnerIndividualDays: 0,
      sharedDays: 0,
    },
  ]);
  const [motherWeeksWithFullPay, setMotherWeeksWithFullPay] = useState<number>(0);
  const [partnerWeeksWithFullPay, setPartnerWeeksWithFullPay] = useState<number>(0);

  const [validation, setValidation] = useState<ValidationType>(appContextDefaultValues.validation);
  const [leave, setLeave] = useState<LeaveType>(appContextDefaultValues.leave);
  const [localLeave, setLocalLeave] = useState<LocalLeaveType>(appContextDefaultValues.localLeave);
  const [popupContext, setPopupContext] = useState<PopupContext>({
    step: '',
    onAccept: () => {},
    onReject: () => {},
  });
  const [popupVisibility, setPopupVisibility] = useState<boolean>(false);
  const [gapInTimeline, setGapInTimeline] = useState<boolean>(false);

  const updatePopupContext = (popupContext: PopupContext) => {
    setPopupContext(popupContext);
  };
  const updatePopupVisibility = (visibility: boolean) => {
    setPopupVisibility(visibility);
  };
  //TODO: add maximum number of days to allow from overall
  const createDatesToExclude = (task: Task) => {
    const datesToExclude: { start: Date; end: Date }[] | undefined = [];
    tasks.map((elem) => {
      if (elem.project === task.project) {
        if (elem.start.getTime() === task.start.getTime() && elem.end.getTime() === task.end.getTime()) return;
        datesToExclude.push({ start: elem.start, end: elem.end });
      }
    });
    setExcludeDatesInterval(datesToExclude);
  };
  const excludeAllTasksAvailableForSelected = (type: string) => {
    const datesToExclude: { start: Date; end: Date }[] | undefined = [];
    tasks.map((elem) => {
      if (elem.project === type) {
        datesToExclude.push({ start: elem.start, end: elem.end });
      }
    });
    setExcludeDatesInterval(datesToExclude);
  };
  const resetLocalLeave = () => {
    setLocalLeave({ mother: 0, partner: 0, shared: 0 });
  };
  const updateLeaveOnEditTask = (task: Task) => {
    resetLocalLeave();
    const newLocalLeave = {
      shared: task.sharedDays,
      mother: task.motherIndividualDays,
      partner: task.partnerIndividualDays,
    };
    setLocalLeave(newLocalLeave);
  };
  const findNextAvailableTask = (date, projectType) => {
    const relatedTasks: Task[] = [];
    tasks.map((elem) => {
      if (elem.project === projectType) {
        if (isBefore(date, elem.start)) {
          relatedTasks.push(elem);
        }
      }
    });
    const sortedTasks = relatedTasks.sort((a, b) => a.start.getTime() - b.start.getTime());
    return sortedTasks[0];
  };
  const checkForGapsBetweenTasks = (tasks: Task[]) => {
    let thereIsAGap: boolean = false;
    let gaps: GapType[] = [];
    let previousTask: Task | null = null;
    const motherTasks = tasks.filter((elem) => elem.project === 'mother');
    const sortedMotherTasks = motherTasks.sort((a, b) => a.start.getTime() - b.start.getTime());
    const partnerTasks = tasks.filter((elem) => elem.project === 'partner');
    const sortedPartnerTasks = partnerTasks.sort((a, b) => a.start.getTime() - b.start.getTime());

    let tasksAfterLastMotherTask: Task[] = []; //check if there are tasks after the last mother task
    let tasksAfterLastPartnerTask: Task[] = []; //check if there are tasks after the last partner task
    let tasksThatOverlapLastMotherTask: boolean = false; //check if there are tasks that overlap the last mother task
    let tasksThatOverlapLastPartnerTask: boolean = false; //check if there are tasks that overlap the last partner task
    let tasksBeforeFirstMotherTask: Task[] = []; //check if there are tasks before the first mother task
    let tasksBeforeFirstPartnerTask: Task[] = []; //check if there are tasks before the first partner task
    let tasksThatOverlapFirstMotherTask: boolean = false; //check if there are tasks that overlap the first mother task
    let tasksThatOverlapFirstPartnerTask: boolean = false; //check if there are tasks that overlap the first partner task

    //checking if there are tasks which overlap the last partner task
    partnerTasks.map((elem) => {
      const areOverlapping = areIntervalsOverlapping(
        { start: elem.start, end: elem.end },
        { start: sortedMotherTasks[sortedMotherTasks.length - 1].start, end: sortedMotherTasks[sortedMotherTasks.length - 1].end }
      );
      if (areOverlapping && isAfter(elem.end, sortedMotherTasks[sortedMotherTasks.length - 1].end)) {
        tasksThatOverlapLastMotherTask = true;
      }
    });
    //checking if there are tasks which overlap the last mother task
    motherTasks.map((elem) => {
      const areOverlapping = areIntervalsOverlapping(
        { start: elem.start, end: elem.end },
        { start: sortedPartnerTasks[sortedPartnerTasks.length - 1].start, end: sortedPartnerTasks[sortedPartnerTasks.length - 1].end }
      );
      if (areOverlapping && isAfter(elem.end, sortedPartnerTasks[sortedPartnerTasks.length - 1].end)) {
        tasksThatOverlapLastPartnerTask = true;
      }
    });
    //checking if there are tasks which overlap the first partner task
    partnerTasks.map((elem) => {
      const areOverlapping = areIntervalsOverlapping(
        { start: elem.start, end: elem.end },
        { start: sortedMotherTasks[0].start, end: sortedMotherTasks[0].end }
      );
      if (areOverlapping && isBefore(elem.start, sortedMotherTasks[0].start)) {
        tasksThatOverlapFirstMotherTask = true;
      }
    });

    //checking if there are tasks which overlap the first mother task
    motherTasks.map((elem) => {
      const areOverlapping = areIntervalsOverlapping(
        { start: elem.start, end: elem.end },
        { start: sortedPartnerTasks[0].start, end: sortedPartnerTasks[0].end }
      );
      if (areOverlapping && isBefore(elem.start, sortedPartnerTasks[0].start)) {
        tasksThatOverlapFirstPartnerTask = true;
      }
    });

    if (!tasksThatOverlapFirstMotherTask) {
      partnerTasks.map((elem) => {
        if (isBefore(elem.end, sortedMotherTasks[0].start)) {
          if (elem.periodeType === 'Leave') {
            tasksBeforeFirstMotherTask.push(elem);
          }
        }
      });
    }

    if (!tasksThatOverlapFirstPartnerTask) {
      motherTasks.map((elem) => {
        if (isBefore(elem.end, sortedPartnerTasks[0].start)) {
          if (elem.periodeType === 'Leave') {
            tasksBeforeFirstPartnerTask.push(elem);
          }
        }
      });
    }

    if (!tasksThatOverlapLastMotherTask) {
      // Checking if there are tasks after the last mother task
      partnerTasks.map((elem) => {
        if (isAfter(elem.start, sortedMotherTasks[sortedMotherTasks.length - 1].end)) {
          if (elem.periodeType === 'Leave') {
            tasksAfterLastMotherTask.push(elem);
          }
        }
      });
    }

    if (!tasksThatOverlapLastPartnerTask) {
      motherTasks.map((elem) => {
        if (isAfter(elem.start, sortedPartnerTasks[sortedPartnerTasks.length - 1].end)) {
          if (elem.periodeType === 'Leave') {
            tasksAfterLastPartnerTask.push(elem);
          }
        }
      });
    }

    if (
      tasksAfterLastMotherTask.length > 0 ||
      tasksAfterLastPartnerTask.length > 0 ||
      tasksBeforeFirstMotherTask.length > 0 ||
      tasksBeforeFirstPartnerTask.length > 0
    ) {
      // setGapInTimeline(true);
      thereIsAGap = true;
    }
    for (let task of tasks) {
      if (previousTask) {
        if (previousTask.project === task.project && previousTask.type === 'task' && task.type === 'task') {
          if (differenceInBusinessDays(task.start, previousTask.end) > 1 && isBefore(previousTask.end, task.start)) {
            gaps.push({
              start: previousTask.end,
              end: task.start,
              project: task.project,
            });
          }
        }
      }
      previousTask = task;
    }

    if (gaps.length > 0) {
      const mothersGaps = gaps.filter((elem) => elem.project === 'mother');
      const partnersGaps = gaps.filter((elem) => elem.project === 'partner');
      mothersGaps.map((gap) => {
        const numberOfDaysInGap = differenceInCalendarDays(gap.end, gap.start);
        let numberOfDaysThatOverlap = 0;
        partnerTasks.map((task) => {
          const numberOfDays = getOverlappingDaysInIntervals({ start: gap.start, end: gap.end }, { start: task.start, end: addBusinessDays(task.end, 1) });
          if (numberOfDays > 0) {
            numberOfDaysThatOverlap += numberOfDays;
          }
        });
        if (numberOfDaysInGap > numberOfDaysThatOverlap) {
          // setGapInTimeline(true);
          thereIsAGap = true;
        }
      });
      partnersGaps.map((gap) => {
        const numberOfDaysInGap = differenceInCalendarDays(gap.end, gap.start);
        let numberOfDaysThatOverlap = 0;
        motherTasks.map((task) => {
          const numberOfDays = getOverlappingDaysInIntervals({ start: gap.start, end: gap.end }, { start: task.start, end: addBusinessDays(task.end, 1) });
          if (numberOfDays > 0) {
            numberOfDaysThatOverlap += numberOfDays;
          }
        });
        if (numberOfDaysInGap > numberOfDaysThatOverlap) {
          // setGapInTimeline(true);
          thereIsAGap = true;
        }
      });
    }
    setGapInTimeline(thereIsAGap);
  };

  const value = {
    dateOfBirth,
    setDateOfBirth,
    nameOfMother,
    nameOfPartner,
    setNameOfMother,
    setNameOfPartner,
    motherOccupationalStatus,
    partnerOccupationalStatus,
    setMotherOccupationalStatus,
    setPartnerOccupationalStatus,
    motherWeeksWithFullPay,
    partnerWeeksWithFullPay,
    setMotherWeeksWithFullPay,
    setPartnerWeeksWithFullPay,
    distribution,
    setDistribution,
    popupContext,
    updatePopupContext,
    popupVisibility,
    updatePopupVisibility,
    validation,
    tasks,
    setTasks,
    activeTask,
    setActiveTask,
    datePickerPopupVisible,
    setDatePickerPopupVisible,
    excludeDatesInterval,
    setExcludeDatesInterval,
    createDatesToExclude,
    excludeAllTasksAvailableForSelected,
    datePickerPopupPerson,
    setDatePickerPopupPerson,
    leave,
    localLeave,
    setLocalLeave,
    setLeave,
    currentTaskBusinessDays,
    setCurrentTaskBusinessDays,
    findNextAvailableTask,
    updateLeaveOnEditTask,
    resetLocalLeave,
    checkForGapsBetweenTasks,
    gapInTimeline,
    setGapInTimeline,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
