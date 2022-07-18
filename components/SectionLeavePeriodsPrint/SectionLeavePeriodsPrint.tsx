import cn from 'classnames';
import SectionTextItem from '../SectionTextItem';
import s from '../EditPageSections/EditPageSections.module.scss';
import e from './SectionLeavePeriodsPrint.module.scss';
import { useAppState } from '../../context/state';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

type Props = {};

const SectionLeavePeriodsPrint: React.FC<Props> = ({ }) => {

  const { nameOfMother, nameOfPartner } = useAppState();

  return (
    <>
      <div className={cn(e.SectionLeavePeriodsPrint, '')}>

        <p className={cn(e.SectionLeavePeriodsPrint_container, '')}>Jeres orlovsperioder</p>
        
        <div className='flex flex-row'>
          <div className={cn(s.EditPageSections_column, 'mb-10')}>
            <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
            <SectionTextItem reversed={true} title='1. august 2022 til 28. febuar 2023' bodyText='Start og slutdato' />
          </div>
          <div className={cn(s.EditPageSections_column, 'mb-10')}>
            <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
            <SectionTextItem reversed={true} title='1. september 2022 til 14. september 2022' bodyText='Start og slutdato' />
            <SectionTextItem reversed={true} title='15. febuar 2023 til 30. juli 2023' bodyText='Start og slutdato' />
          </div>
        </div>

      </div>
    </>
  );
};

export default SectionLeavePeriodsPrint;
