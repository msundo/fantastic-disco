import cn from 'classnames';
import s from './SectionTextItem.module.scss';

type Props = {
  title: string | undefined;
  bodyText?: string;
  center?: boolean;
  deactivated?: boolean;
  reversed?: boolean
};

const SectionTextItem: React.FC<Props> = ({ title, bodyText, center = false, deactivated = false, reversed = false }) => {
  return (
    <div className={cn(s.SectionTextItem, center ? 'justify-center items-center' : '')}>
      {!reversed ? (
        <>
          <div className={cn(s.SectionTextItem_heading, deactivated ? s.SectionTextItem_textColor : '')}>{title}</div>
          <div className={cn(s.SectionTextItem_bodyText, deactivated ? s.SectionTextItem_textColor : '')}>{bodyText}</div>
        </>
      ) : (
        <>
          <div className={cn(s.SectionTextItem_bodyText, deactivated ? s.SectionTextItem_textColor : '')}>{bodyText}</div>
          <div className={cn(s.SectionTextItem_heading, deactivated ? s.SectionTextItem_textColor : '')}>{title}</div>
        </>
      )}

    </div>
  );
};

export default SectionTextItem;
