import cn from 'classnames';
import { useAppState } from '../../context/state';
import EditItem from '../EditItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import { format } from 'date-fns';
import css from '../SectionImportantInformation/SectionImportantInformation.module.scss';
import da from 'date-fns/locale/da';
import intlFormat from 'date-fns/intlFormat';
import Image from 'next/image';
import { Task } from '../../gantt/dist';
import { useEffect, useState } from 'react';
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

type SectionAdviseProps = {
  text: string
};

const SectionAdvise: React.FC<SectionAdviseProps> = ({ text }) => {

  return (
    <div className='flex ml-4'>
      <div className={cn(css.SectionImportantInformation_circle)} />
      <div className={cn(css.SectionImportantInformation_title, '')}>{text}</div>
    </div>
  );
};

const SectionLeavePeriods: React.FC<Props> = ({ }) => {
  const { nameOfMother, nameOfPartner, tasks, setDatePickerPopupVisible, setActiveTask, setDatePickerPopupPerson, leave, excludeAllTasksAvailableForSelected } = useAppState();

  const pregnancyLeave = tasks.find((task) => task.periodeType === 'PregnancyLeave');
  const maternityLeave = tasks.find((task) => task.periodeType === 'MaternityLeave');
  const motherLeaveUnsorted = tasks.filter((task) => task.project === 'mother' && task.periodeType === 'Leave');
  const motherLeave = motherLeaveUnsorted.sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  const paternityLeave = tasks.find((task) => task.periodeType === 'PaternityLeave');
  const partnerLeaveUnsorted = tasks.filter((task) => task.project === 'partner' && task.periodeType === 'Leave');
  const partnerLeave = partnerLeaveUnsorted.sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  const addLeaveForMother = () => {
    excludeAllTasksAvailableForSelected('mother');
    setDatePickerPopupVisible(true);
    setDatePickerPopupPerson('mother');
  };
  const addLeaveForPartner = () => {
    excludeAllTasksAvailableForSelected('partner');
    setDatePickerPopupVisible(true);
    setDatePickerPopupPerson('partner');
  };

  const handleEditTask = (task: Task) => {
    setActiveTask(task);
    setDatePickerPopupVisible(true);
    setDatePickerPopupPerson(task.project);
  };

  const [motherCanAddLeave, setMotherCanAddLeave] = useState<boolean | null>(null);
  const [partnerCanAddLeave, setPartnerCanAddLeave] = useState<boolean | null>(null);

  useEffect(() => {
    setMotherCanAddLeave(leave.remaining.mother > 0 || leave.remaining.shared > 0);
    setPartnerCanAddLeave(leave.remaining.partner > 0 || leave.remaining.shared > 0);
  }, [leave]);

  return (
    <>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>

        <div className={cn(s.EditPageSections_screen, 'w-[90%] mb-12')}>
          <p className='text-[1.4rem]'>
            Som mor, der er lønmodtager, kan du søge om:
          </p>
          <SectionAdvise text='4 ugers orlov med barselsdagpenge inden fødslen.' />
          <SectionAdvise text='2 ugers orlov lige efter fødslen.' />
          <SectionAdvise text='8 ugers orlov ved fødslen. Når de 2 ugers orlov slutter, fortsætter du over på de 8 ugers orlov. Orloven skal afholdes inden for de første 10 uger efter barnets fødsel. Du har mulighed for at forlænge orloven, hvis du genoptager arbejdet delvist efter aftale med din arbejdsgiver.' />
          <SectionAdvise text='9 ugers orlov. De 9 ugers orlov kan ikke overdrages til den anden forælder. Orloven skal holdes inden 1 år efter barnets fødsel, medmindre du pga. særlige forhold er forhindret i at holde orloven.' />
          <SectionAdvise text='5 ugers orlov. De 5 ugers orlov skal afholdes inden 1 år efter barnets fødsel. Du har dog mulighed for at forlænge eller udskyde ugerne frem til barnet fylder 9 år, hvis du opfylder betingelserne.' />
          <br />
          <p className='text-[1.4rem]'>
            Læs mere om barselsreglerne på www.borger.dk/barsel.
          </p>
        </div>

        {pregnancyLeave && (
          <EditItem
            title={pregnancyLeave.taskTitle}
            bodyText={pregnancyLeave.taskDescription}
            dates={`${intlFormat(pregnancyLeave.start, dateFormat, dateLocale)} til ${intlFormat(pregnancyLeave.end, dateFormat, dateLocale)}`}
            editType='disabled'
            editText='Ikke muligt at rediger'
          />
        )}
        {maternityLeave && (
          <EditItem
            title={maternityLeave.taskTitle}
            bodyText={maternityLeave.taskDescription}
            dates={`${intlFormat(maternityLeave.start, dateFormat, dateLocale)} til ${intlFormat(maternityLeave.end, dateFormat, dateLocale)}`}
            editType='disabled'
            editText='Ikke muligt at rediger'
          />
        )}

        {motherLeave &&
          motherLeave.map((leave, index) => {
            return (
              <EditItem
                key={index}
                title={leave.taskTitle}
                bodyText={leave.taskDescription}
                dates={`${intlFormat(leave.start, dateFormat, dateLocale)} til ${intlFormat(leave.end, dateFormat, dateLocale)}`}
                editType='edit'
                editText='Rediger'
                editHandler={() => handleEditTask(leave)}
              />
            );
          })}
        <button className={s.InlineButton} disabled={!motherCanAddLeave} onClick={addLeaveForMother}>
          <Image src='/svgs/circle-plus.svg' alt='Tilføj orlovsperiode' width={22} height={22} />
          <span className={s.InlineButton_text}>Tilføj orlovsperiode</span>
        </button>
      </div>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>

        <div className={cn(s.EditPageSections_screen, 'w-[90%] mb-12')}>
          <p className='text-[1.4rem]'>
            Som far/medmor, der er lønmodtager, kan du søge om:
          </p>
          <SectionAdvise text='2 ugers orlov ved fødslen, som du skal holde inden for de første 10 uger efter fødslen.' />
          <SectionAdvise text='9 ugers orlov. De 9 ugers orlov kan ikke overdrages til den anden forælder. Orloven skal holdes inden 1 år efter barnets fødsel, medmindre forælderen pga. særlige forhold er forhindret i at holde orloven.' />
          <SectionAdvise text=' 13 ugers orlov. De 13 ugers orlov skal afholdes inden 1 år efter barnets fødsel. Du har dog mulighed for at forlænge eller udskyde ugerne frem til barnet fylder 9 år, hvis du opfylder betingelserne.' />
          <br />
          <p className='text-[1.4rem]'>
            Læs mere om barselsreglerne på www.borger.dk/barsel.
          </p>
        </div>

        {paternityLeave && (
          <EditItem
            title={paternityLeave.taskTitle}
            bodyText={paternityLeave.taskDescription}
            dates={`${intlFormat(paternityLeave.start, dateFormat, dateLocale)} til ${intlFormat(paternityLeave.end, dateFormat, dateLocale)}`}
            editType='edit'
            editText='Rediger'
            editHandler={() => handleEditTask(paternityLeave)}
          />
        )}
        {partnerLeave &&
          partnerLeave.map((leave, index) => {
            return (
              <EditItem
                key={index}
                title={leave.taskTitle}
                bodyText={leave.taskDescription}
                dates={`${intlFormat(leave.start, dateFormat, dateLocale)} til ${intlFormat(leave.end, dateFormat, dateLocale)}`}
                editType='edit'
                editText='Rediger'
                editHandler={() => handleEditTask(leave)}
              />
            );
          })}
        <button className={s.InlineButton} disabled={!partnerCanAddLeave} onClick={addLeaveForPartner}>
          <Image src='/svgs/circle-plus.svg' alt='Tilføj orlovsperiode' width={22} height={22} />
          <span className={s.InlineButton_text}>Tilføj orlovsperiode</span>
        </button>
      </div>
    </>
  );
};

export default SectionLeavePeriods;
