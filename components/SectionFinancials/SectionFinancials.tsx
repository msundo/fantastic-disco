import cn from 'classnames';
import SectionTextItem from '../SectionTextItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import css from './SectionFinancials.module.scss';
import { useAppState } from '../../context/state';
import { useCalculateLeave } from '../../helpers/calculateLeave';
import { getWeeksAndDays } from '../../helpers/formatters';

const SectionFinancials: React.FC<Props> = ({ }) => {
  const { nameOfMother, nameOfPartner, motherWeeksWithFullPay, partnerWeeksWithFullPay } = useAppState();

  const { calculatedLeave } = useCalculateLeave();

  const motherDaysWithFullPay = motherWeeksWithFullPay * 5;
  const partnerDaysWithFullPay = partnerWeeksWithFullPay * 5;

  const motherDaysWithoutFullPay = calculatedLeave?.mother?.totalDays - motherDaysWithFullPay;
  const partnerDaysWithoutFullPay = calculatedLeave?.partner?.totalDays - partnerDaysWithFullPay;

  return (
    <>
      <div className='flex-1 flex-col'>
        <div className={cn(s.EditPageSections_sectionItem, 'flex flex-col md:flex-row')}>
          <div className={cn(s.EditPageSections_column, 'mb-10')}>
            <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
            <SectionTextItem title={`${getWeeksAndDays(motherDaysWithFullPay)} med betalt orlov`} bodyText='barsel med fuld løn' />
            <SectionTextItem title={`${getWeeksAndDays(motherDaysWithoutFullPay)} med barselsdagpenge`} bodyText='barsel med dagpenge' />
          </div>
          <div className={cn(s.EditPageSections_column, 'mb-10')}>
            <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
            <SectionTextItem title={`${getWeeksAndDays(partnerDaysWithFullPay)} med betalt orlov`} bodyText='barsel med fuld løn' />
            <SectionTextItem title={`${getWeeksAndDays(partnerDaysWithoutFullPay)} med barselsdagpenge`} bodyText='barsel med dagpenge' />
          </div>
        </div>

        <div>
          <a
            href='https://www.borger.dk/familie-og-boern/barsel-oversigt/barsel-loenmodtagere/barsel-loenmodtagere-ny-orlovsmodel'
            className={cn(css.SectionFinancials_iconText)}
            target='_blank'
            rel='noopener noreferrer'
          >
            Se hvor meget I kan få i barselsdagpenge på www.borger.dk/barsel-loenmodtager.
          </a>
        </div>
      </div>
    </>
  );
};

export default SectionFinancials;
