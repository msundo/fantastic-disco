import cn from 'classnames';
import s from './SectionPrintHeader.module.scss';

const SectionPrintHeader: React.FC = () => {
  return (
    <nav className={cn(s.SectionPrintHeader, 'h-[16rem] md:h-[8rem] pl-8 md:pl-20 mt-20')}>
      <div>
        <a className={cn(s.SectionPrintHeader_elementTitle, 'flex items-center justify-center relative mb-4')}>Planlægning af orlov</a>
        <a className={cn(s.SectionPrintHeader_element, 'flex items-center justify-center relative')}>Sådan ser jeres barselsplan ud</a>
      </div>
    </nav>
  );
};

export default SectionPrintHeader;