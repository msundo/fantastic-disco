import cn from 'classnames';
import SectionTextItem from '../SectionTextItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import { useAppState } from '../../context/state';
import { getWeeksAndDays } from '../../helpers/formatters';

type Props = {};

const SectionRemainingLeavePrint: React.FC<Props> = ({}) => {
  const { nameOfMother, nameOfPartner, leave, tasks } = useAppState();

  const motherLeaveArray = tasks.filter((task) => task.project === 'mother' && task.periodeType !== 'PregnancyLeave');
  const partnerLeaveArray = tasks.filter((task) => task.project === 'partner' && task.periodeType !== 'PaternityLeave');

  const motherSharedLeaveTotal = motherLeaveArray.reduce((acc, curr) => acc + curr.sharedDays, 0);
  const partnerSharedLeaveTotal = partnerLeaveArray.reduce((acc, curr) => acc + curr.sharedDays, 0);

  // 65 days each
  const motherSharedRemaining = 65 - motherSharedLeaveTotal;
  const partnerSharedRemaining = 65 - partnerSharedLeaveTotal;

  return (
    <>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
        <SectionTextItem title={getWeeksAndDays(motherSharedRemaining)} bodyText='som kan overdrages ' />
        <SectionTextItem title={getWeeksAndDays(leave.remaining.mother)} bodyText='som ikke kan overdrages' />
      </div>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
        <SectionTextItem title={getWeeksAndDays(partnerSharedRemaining)} bodyText='som kan overdrages ' />
        <SectionTextItem title={getWeeksAndDays(leave.remaining.partner)} bodyText='som ikke kan overdrages' />
      </div>
    </>
  );
};

export default SectionRemainingLeavePrint;
