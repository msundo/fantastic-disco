import cn from 'classnames';
import SectionTextItem from '../SectionTextItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import { useAppState } from '../../context/state';
import { getWeeksAndDays } from '../../helpers/formatters';

type Props = {};

const SectionTransfer: React.FC<Props> = ({}) => {
  const { nameOfMother, nameOfPartner, leave, tasks } = useAppState();

  const motherLeaveArray = tasks.filter((task) => task.project === 'mother' && task.periodeType !== 'PregnancyLeave');
  const partnerLeaveArray = tasks.filter((task) => task.project === 'partner' && task.periodeType !== 'PaternityLeave');

  const motherSharedLeaveTotal = motherLeaveArray.reduce((acc, curr) => acc + curr.sharedDays, 0);
  const partnerSharedLeaveTotal = partnerLeaveArray.reduce((acc, curr) => acc + curr.sharedDays, 0);

  // console.log('motherSharedLeaveTotal', motherSharedLeaveTotal);
  // console.log('partnerSharedLeaveTotal', partnerSharedLeaveTotal);
  let motherTransfer = 0,
    partnerTransfer = 0,
    motherReceive = 0,
    partnerReceive = 0;

  //TODO: verify max days for shared + how task.periodeType plays into it.
  // max shared = 130 days (65 days each)
  if (leave.remaining.shared < 65) {
    if (motherSharedLeaveTotal > 65) {
      motherTransfer = 0;
      motherReceive = motherSharedLeaveTotal - 65;
      partnerTransfer = motherSharedLeaveTotal - 65;
    }
    if (partnerSharedLeaveTotal > 65) {
      partnerTransfer = 0;
      partnerReceive = partnerSharedLeaveTotal - 65;
      motherTransfer = partnerSharedLeaveTotal - 65;
    }
  }

  return (
    <>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>

        <SectionTextItem title={getWeeksAndDays(motherReceive)} bodyText='Skal modtage' />
        <SectionTextItem title={getWeeksAndDays(motherTransfer)} bodyText='Skal overdrage til partner' />
      </div>
      <div className={cn(s.EditPageSections_column, 'mb-10')}>
        <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
        <SectionTextItem title={getWeeksAndDays(partnerReceive)} bodyText='Skal modtage' />
        <SectionTextItem title={getWeeksAndDays(partnerTransfer)} bodyText='Skal overdrage til partner' />
      </div>
    </>
  );
};

export default SectionTransfer;
