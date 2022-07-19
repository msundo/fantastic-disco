import cn from 'classnames';
import s from '../EditPageSections/EditPageSections.module.scss';
import { useAppState } from '../../context/state';
import EditItem from '../EditItem/EditItem';
import e from './SectionVacation.module.scss';
import Image from 'next/image';
import { intlFormat } from 'date-fns';
import { Task } from '../../gantt/dist';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

type Props = {};

const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const dateLocale = {
    locale: 'da',
};

type Vacation = {
    title: string
    bodyText: string
    start: Date
    end: Date
}

type SectionAdviseProps = {
    title: string
}

const SectionVacation: React.FC = () => {

    const { nameOfMother, nameOfPartner, tasks, setDatePickerPopupVisible, setDatePickerPopupPerson, excludeAllTasksAvailableForSelected, setActiveTask, setStartAddVacation } = useAppState();

    const addVacationForMother = () => {
        excludeAllTasksAvailableForSelected('mother');
        setStartAddVacation(true);
        setDatePickerPopupVisible(true);
        setDatePickerPopupPerson('mother');
    };
    const addVacationForPartner = () => {
        excludeAllTasksAvailableForSelected('partner');
        setStartAddVacation(true);
        setDatePickerPopupVisible(true);
        setDatePickerPopupPerson('partner');
    };

    const handleEditTask = (task: Task) => {
        setActiveTask(task);
        setStartAddVacation(true);
        setDatePickerPopupVisible(true);
        setDatePickerPopupPerson(task.project);
      };

    return (
        <>
            <div className={cn(s.EditPageSections_column, 'mb-10')}>

                <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
                {tasks &&
                    tasks.map((task, index) => {
                        if(task.periodeType ==='Vacation' && task.project === 'mother') {
                            return (
                                <EditItem
                                    key={index}
                                    title={task.taskTitle}
                                    dates={`${intlFormat(task.start, dateFormat, dateLocale)} til ${intlFormat(task.end, dateFormat, dateLocale)}`}
                                    bodyText={task.taskDescription}
                                    editType='edit'
                                    editText='Rediger'
                                    editHandler={() => handleEditTask(task)}
                                />
                            );
                        }

                    })
                }

                <div className={s.InlineButton} onClick={addVacationForMother}>
                    <Image src='/svgs/circle-plus.svg' alt='Tilføj ferieperiode' width={22} height={22} />
                    <span className={s.InlineButton_text}>Tilføj ferieperiode</span>
                </div>

            </div>
            <div className={cn(s.EditPageSections_column, 'mb-10')}>

                <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
                {tasks &&
                    tasks.map((task, index) => {
                        if(task.periodeType ==='Vacation' && task.project === 'partner') {
                            return (
                                <EditItem
                                    key={index}
                                    title={task.taskTitle}
                                    dates={`${intlFormat(task.start, dateFormat, dateLocale)} til ${intlFormat(task.end, dateFormat, dateLocale)}`}
                                    bodyText={task.taskDescription}
                                    editType='edit'
                                    editText='Rediger'
                                    editHandler={() => handleEditTask(task)}
                                />
                            );
                        }

                    })
                }

                <div className={s.InlineButton} onClick={addVacationForPartner}>
                    <Image src='/svgs/circle-plus.svg' alt='Tilføj ferieperiode' width={22} height={22} />
                    <span className={s.InlineButton_text}>Tilføj ferieperiode</span>
                </div>

            </div>


        </>
    );
};

export default SectionVacation;

