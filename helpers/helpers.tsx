import { Task } from '../gantt/dist';
import { addBusinessDays, subBusinessDays } from 'date-fns';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useAppState } from '../context/state';

// export function handleEditTask(task: Task) {
//   const { nameOfMother, nameOfPartner, tasks, setTasks, dateOfBirth } = useAppState();
//   setActiveTask(task);
//   console.log(task);
// }

export function createVacationForMother (
  startDate: Date,
  endDate: Date,
  motherIndividualDays: number,
  partnerIndividualDays: number,
  sharedDays: number,
  mothersName: string,
  isFirstTask: boolean = false,
  handleEditTask: (task: Task) => void
) {
  const title = 'Ferie';
  const description = 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk';
  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskDescription: description,
    taskTitle: title,
    periodeType: 'Vacation',
    start: startDate,
    end: endDate,
    name: uuidv4(),
    id: uuidv4(),
    progress: 100,
    type: 'task',
    project: 'mother',
    extendedTask: true,
    isDisabled: false,
    rowIndex: 0,
    isFirstTask: isFirstTask,
    styles: { progressColor: '#AE017E', progressSelectedColor: '#052951' },
    motherIndividualDays: motherIndividualDays,
    partnerIndividualDays: partnerIndividualDays,
    sharedDays: sharedDays,
  };
}

export function createVacationForPartner (
  startDate: Date,
  endDate: Date,
  motherIndividualDays: number,
  partnerIndividualDays: number,
  sharedDays: number,
  mothersName: string,
  isFirstTask: boolean = false,
  handleEditTask: (task: Task) => void
) {
  const title = 'Ferie';
  const description = 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk';
  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskDescription: description,
    taskTitle: title,
    periodeType: 'Vacation',
    start: startDate,
    end: endDate,
    name: uuidv4(),
    id: uuidv4(),
    progress: 100,
    type: 'task',
    project: 'partner',
    extendedTask: true,
    isDisabled: false,
    rowIndex: 0,
    isFirstTask: isFirstTask,
    styles: { progressColor: '#AE017E', progressSelectedColor: '#052951' },
    motherIndividualDays: motherIndividualDays,
    partnerIndividualDays: partnerIndividualDays,
    sharedDays: sharedDays,
  };
}

export function createTaskForMother(
  startDate: Date,
  endDate: Date,
  motherIndividualDays: number,
  partnerIndividualDays: number,
  sharedDays: number,
  mothersName: string,
  periodeType: string,
  isFirstTask: boolean = false,
  handleEditTask: (task: Task) => void
) {
  let title;
  let description;
  if (isFirstTask) {
    title = 'Graviditetsorlov - orlov der ikke kan overdrages';
    description = 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk';
  } else if (sharedDays > 0 && (motherIndividualDays === 0 || partnerIndividualDays === 0)) {
    title = 'Orlov der kan overdrages';
    description =
      'Disse uger kan overdrages hvilket betyder at de kan anvendes af anden partner. Ønsker du at ændre længden af denne periode, skal du klikke på ‘rediger’ og vælge den start og slutdato du ønsker.';
  } else if ((motherIndividualDays >= 0 || partnerIndividualDays >= 0) && sharedDays === 0) {
    title = 'Orlov der ikke kan overdrages';
    description = 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk';
  }
  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskDescription: description,
    taskTitle: title,
    periodeType: periodeType,
    start: startDate,
    end: endDate,
    name: uuidv4(),
    id: uuidv4(),
    progress: 100,
    type: 'task',
    project: 'mother',
    extendedTask: true,
    isDisabled: false,
    rowIndex: 0,
    isFirstTask: isFirstTask,
    styles: { progressColor: '#084081', progressSelectedColor: '#052951' },
    motherIndividualDays: motherIndividualDays,
    partnerIndividualDays: partnerIndividualDays,
    sharedDays: sharedDays,
  };
}
export function createTaskForPartner(
  startDate: Date,
  endDate: Date,
  motherIndividualDays: number,
  partnerIndividualDays: number,
  sharedDays: number,
  partnersName: string,
  periodeType: string,
  handleEditTask: (task: Task) => void
) {
  let title;
  let description;

  if (sharedDays > 0 && (motherIndividualDays === 0 || partnerIndividualDays === 0)) {
    title = 'Orlov der kan overdrages';
    description =
      'Disse uger kan overdrages hvilket betyder at de kan anvendes af anden partner. Ønsker du at ændre længden af denne periode, skal du klikke på ‘rediger’ og vælge den start og slutdato du ønsker.';
  } else if ((motherIndividualDays >= 0 || partnerIndividualDays >= 0) && sharedDays === 0) {
    title = 'Orlov der ikke kan overdrages';
    description = 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk';
  }

  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskTitle: title,
    taskDescription: description,
    periodeType: periodeType,
    start: startDate,
    end: endDate,
    name: uuidv4(),
    id: uuidv4(),
    progress: 100,
    type: 'task',
    project: 'partner',
    extendedTask: true,
    isDisabled: false,
    rowIndex: 1,
    styles: { progressColor: '#2171B5', progressSelectedColor: '#052951' },
    motherIndividualDays: motherIndividualDays,
    partnerIndividualDays: partnerIndividualDays,
    sharedDays: sharedDays,
  };
}
export function createProjectForMother(startDate: Date, endDate: Date, periodeType: string, mothersName: string, handleEditTask: (task: Task) => void) {
  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskDescription: 'Task 1',
    taskTitle: 'Task 1',
    periodeType: periodeType,
    start: startDate,
    end: endDate,
    name: mothersName,
    id: 'mother',
    progress: 100,
    type: 'project',
    hideChildren: false,
    rowIndex: 0,
    isDisabled: true,
  };
}
export function createProjectForPartner(startDate: Date, endDate: Date, periodeType: string, partnersName: string, handleEditTask: (task: Task) => void) {
  return {
    onEdit: (task: Task) => handleEditTask(task),
    taskDescription: 'Task 1',
    taskTitle: 'Task 1',
    periodeType: periodeType,
    start: startDate,
    end: endDate,
    name: partnersName,
    id: 'partner',
    progress: 100,
    type: 'project',
    hideChildren: false,
    rowIndex: 1,
    isDisabled: true,
  };
}
// export function addYearsToDate(date: moment.Moment, year: number) {
//   return moment(date).add(year, 'years');
// }
// export function addWeeksToDate(date: moment.Moment, weeks: number) {
//   return moment(date).add(weeks, 'weeks');
// }
// export function addMonthsToDate(date: moment.Moment, months: number) {
//   return moment(date).add(months, 'months');
// }
// export function subWeeksFromDate(date: moment.Moment, weeks: number) {
//   return moment(date).subtract(weeks, 'weeks');
// }
export function addToDate(date: moment.Moment, days: number, weeks: number, months: number, years: number) {
  return moment(date).add(days, 'days').add(weeks, 'weeks').add(months, 'months').add(years, 'years');
}
export function subFromDate(date: moment.Moment, days: number, weeks: number, months: number, years: number) {
  return moment(date).subtract(days, 'days').subtract(weeks, 'weeks').subtract(months, 'months').subtract(years, 'years');
}

export function createTimelineForSharedAmount(birthDay: moment.Moment, handleEditTask: (task: Task) => void) {
  let tasks = [];
  const startDate = subFromDate(birthDay, 0, 4, 0, 0);
  const endDate = addToDate(startDate, 0, 0, 0, 1);
  const parsedStartDate = startDate.toDate();
  const parsedEndDate = endDate.subtract(1, 'weeks').toDate();
  const parsedInitDate = birthDay.toDate();
  const partner = createProjectForPartner(parsedStartDate, parsedEndDate, 'Other', 'partner', handleEditTask);
  const mother = createProjectForMother(parsedStartDate, parsedEndDate, 'Other', 'mother', handleEditTask);
  let lastMotherDate = new Date();
  let lastPartnerDate = new Date();
  const firstTaskMother = createTaskForMother(
    subBusinessDays(birthDay.toDate(), 19), //birthday - 20 working days
    new Date(birthDay.toDate()), // birthDay
    0, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'PregnancyLeave',
    true,
    handleEditTask
  );
  lastMotherDate = new Date(birthDay.toDate());
  const secondTaskMother = createTaskForMother(
    addBusinessDays(birthDay.toDate(), 1), // birthDay + 1 working day
    addBusinessDays(lastMotherDate, 10), // birthDay + 10 working days
    10, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'MaternityLeave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 10);
  const thirdTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 40),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    40, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 40);
  const fourthTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 45),
    45, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 45);
  const fifthTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 25),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    25, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 25);
  const subForPartner = subBusinessDays(lastMotherDate, 9);
  const firstTaskPartner = createTaskForPartner(
    addBusinessDays(birthDay.toDate(), 1),
    addBusinessDays(birthDay.toDate(), 10),
    0, // motherIndividualDays
    10, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'PaternityLeave',
    handleEditTask
  );
  const secondTaskPartner = createTaskForPartner(
    subForPartner,
    addBusinessDays(subForPartner, 44),
    0, // motherIndividualDays
    45, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  lastPartnerDate = addBusinessDays(subForPartner, 44);
  const thirdTaskPartner = createTaskForPartner(
    addBusinessDays(lastPartnerDate, 1),
    addBusinessDays(lastPartnerDate, 65),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    65, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  tasks.push(
    partner,
    mother,
    firstTaskMother,
    secondTaskMother,
    thirdTaskMother,
    fourthTaskMother,
    fifthTaskMother,
    firstTaskPartner,
    secondTaskPartner,
    thirdTaskPartner
  );
  return tasks;
}
export function createTimelineForMother(birthDay: moment.Moment, handleEditTask: (task: Task) => void) {
  let tasks = [];
  const startDate = subFromDate(birthDay, 0, 4, 0, 0);
  const endDate = addToDate(startDate, 0, 0, 0, 1);
  const parsedStartDate = startDate.toDate();
  const parsedEndDate = endDate.subtract(1, 'weeks').toDate();
  const parsedInitDate = birthDay.toDate();
  const partner = createProjectForPartner(parsedStartDate, parsedEndDate, 'Other', 'partner', handleEditTask);
  const mother = createProjectForMother(parsedStartDate, parsedEndDate, 'Other', 'mother', handleEditTask);
  let lastMotherDate = new Date();
  const firstTaskMother = createTaskForMother(
    subBusinessDays(birthDay.toDate(), 19), //birthday - 20 working days
    new Date(birthDay.toDate()), // birthDay
    0, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'PregnancyLeave',
    true,
    handleEditTask
  );
  lastMotherDate = new Date(birthDay.toDate());

  const secondTaskMother = createTaskForMother(
    addBusinessDays(birthDay.toDate(), 1), // birthDay + 1 working day
    addBusinessDays(lastMotherDate, 10), // birthDay + 10 working days
    10, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'MaternityLeave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 10);
  const thirdTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 40),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    40, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 40);
  const fourthTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 45),
    45, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 45);
  const fifthTaskMother = createTaskForMother(
    addBusinessDays(lastMotherDate, 1),
    addBusinessDays(lastMotherDate, 90),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    90, // sharedDays
    'mother',
    'Leave',
    false,
    handleEditTask
  );
  lastMotherDate = addBusinessDays(lastMotherDate, 90);
  const startingParnerDate = subBusinessDays(lastMotherDate, 9);
  const firstTaskPartner = createTaskForPartner(
    addBusinessDays(birthDay.toDate(), 1),
    addBusinessDays(birthDay.toDate(), 10),
    0, // motherIndividualDays
    10, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'PaternityLeave',
    handleEditTask
  );
  const secondTaskPartner = createTaskForPartner(
    startingParnerDate,
    addBusinessDays(startingParnerDate, 44),
    0, // motherIndividualDays
    45, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  tasks.push(partner, mother, firstTaskMother, secondTaskMother, thirdTaskMother, fourthTaskMother, fifthTaskMother, firstTaskPartner, secondTaskPartner);
  return tasks;
}
export function createTimelineForPartner(birthDay: moment.Moment, handleEditTask: (task: Task) => void) {
  let tasks = [];
  const startDate = subFromDate(birthDay, 0, 4, 0, 0);
  const endDate = addToDate(startDate, 0, 0, 0, 1);
  const parsedStartDate = startDate.toDate();
  const parsedEndDate = endDate.subtract(1, 'weeks').toDate();
  const parsedInitDate = birthDay.toDate();
  const partner = createProjectForPartner(parsedStartDate, parsedEndDate, 'Other', 'partner', handleEditTask);
  const mother = createProjectForMother(parsedStartDate, parsedEndDate, 'Other', 'mother', handleEditTask);
  let lastMotherDate = new Date();
  let lastPartnerDate = new Date(birthDay.toDate());
  const firstTaskPartner = createTaskForPartner(
    addBusinessDays(birthDay.toDate(), 1),
    addBusinessDays(lastPartnerDate, 10),
    0, // motherIndividualDays
    10, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'PaternityLeave',
    handleEditTask
  );
  lastPartnerDate = addBusinessDays(lastPartnerDate, 10);
  const secondTaskPartner = createTaskForPartner(
    addBusinessDays(lastPartnerDate, 1),
    addBusinessDays(lastPartnerDate, 40),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    40, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  lastPartnerDate = addBusinessDays(lastPartnerDate, 40);
  const thirdTaskPartner = createTaskForPartner(
    addBusinessDays(lastPartnerDate, 1),
    addBusinessDays(lastPartnerDate, 45),
    0, // motherIndividualDays
    45, // partnerIndividualDays
    0, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  lastPartnerDate = addBusinessDays(lastPartnerDate, 45);
  const fourthTaskPartner = createTaskForPartner(
    addBusinessDays(lastPartnerDate, 1),
    addBusinessDays(lastPartnerDate, 90),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    90, // sharedDays
    'partner',
    'Leave',
    handleEditTask
  );
  lastPartnerDate = addBusinessDays(lastPartnerDate, 90);
  const startingMotherDate = subBusinessDays(lastPartnerDate, 9);
  const firstTaskMother = createTaskForMother(
    subBusinessDays(birthDay.toDate(), 19),
    new Date(birthDay.toDate()),
    0, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'PregnancyLeave',
    true,
    handleEditTask
  );
  lastMotherDate = new Date(birthDay.toDate());
  const secondTaskMother = createTaskForMother(
    addBusinessDays(birthDay.toDate(), 1),
    addBusinessDays(lastMotherDate, 10),
    10, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'MaternityLeave',
    false,
    handleEditTask
  );
  const thirdTaskMother = createTaskForMother(
    startingMotherDate,
    addBusinessDays(startingMotherDate, 44),
    45, // motherIndividualDays
    0, // partnerIndividualDays
    0, // sharedDays
    'mother',
    'MaternityLeave',
    false,
    handleEditTask
  );

  tasks.push(partner, mother, firstTaskMother, secondTaskMother, thirdTaskMother, firstTaskPartner, secondTaskPartner, thirdTaskPartner, fourthTaskPartner);
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter((t) => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
