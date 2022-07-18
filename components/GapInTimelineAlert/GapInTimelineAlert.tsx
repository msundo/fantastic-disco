import cn from 'classnames';
import { useAppState } from '../../context/state';
import s from './GapInTimelineAlert.module.scss';

const GapInTimelineAlert: React.FC = () => {
  //TODO: map over gaps array and render a list of gaps with dates
  const { nameOfMother, nameOfPartner } = useAppState();
  return (
    <div className={cn(s.GapInTimelineAlert)}>
      <div className={cn(s.GapInTimelineAlert_item)}>
        <div className='p-[1.6rem]'>
          <h4 className=' font-semibold'>Advarsel</h4>
          <div>
            Du skal være opmærksom på, at der er et hul i planen hvor hverken {nameOfMother} eller {nameOfPartner} holder orlov.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapInTimelineAlert;
