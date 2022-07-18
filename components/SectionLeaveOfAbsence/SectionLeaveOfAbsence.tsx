import cn from 'classnames';
import SectionTextItem from '../SectionTextItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import { useCalculateLeave } from '../../helpers/calculateLeave';
import { useAppState } from '../../context/state';
import { getWeeksAndDays } from '../../helpers/formatters';


type Props = {};

const SectionLeaveOfAbsence: React.FC<Props> = ({}) => {
  const { nameOfMother, nameOfPartner } = useAppState();
  const { calculatedLeave } = useCalculateLeave();

  const motherDaysTotal = calculatedLeave?.mother?.totalDays ? calculatedLeave?.mother?.totalDays + 20 : 0; // +20 days is for the preganancyLeave
  const partnerDaysTotal = calculatedLeave?.partner?.totalDays ? calculatedLeave?.partner?.totalDays : 0;
  return (
    <>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
        <SectionTextItem title={getWeeksAndDays(motherDaysTotal)} bodyText='samlet orlov' />
      </div>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
        <SectionTextItem title={getWeeksAndDays(partnerDaysTotal)} bodyText='samlet orlov' />
      </div>
    </>
  );
};

export default SectionLeaveOfAbsence;
