import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';
import s from './FormLabel.module.scss';

type Props = {
  labelText: string;
  tooltipTitle?: string;
  tooltipText?: string;
};

const FormLabel: React.FC<Props> = ({ labelText, tooltipTitle, tooltipText }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  return (
    <div className={cn(s.FormLabel, 'flex justify-between items-center w-full')}>
      <p className={cn(s.FormLabel_element)}>{labelText}</p>
      {tooltipText || tooltipTitle ? (
        <div className={cn(s.FormLabel_tooltip, 'sm:relative')}>
          <span
            className={cn(s.FormLabel_tooltip_icon, 'flex justify-center items-center cursor-pointer')}
            onClick={() => setIsTooltipVisible(!isTooltipVisible)}
          >
            ?
          </span>
          {isTooltipVisible && (
            <div className={cn(s.FormLabel_tooltip_content, isTooltipVisible ? '' : 'hidden', 'fixed md:absolute rounded flex flex-col flex-1 cursor-auto')}>
              {tooltipTitle && <h3 className={cn(s.FormLabel_tooltip_content_title)}>{tooltipTitle}</h3>}
              {tooltipText}
              <span className={cn(s.FormLabel_tooltip_content_close, 'absolute cursor-pointer')} onClick={() => setIsTooltipVisible(!isTooltipVisible)}>
                <Image src={'/svgs/close.svg'} alt={'close icon'} layout={'fill'}></Image>
              </span>
              <span className={cn(s.FormLabel_tooltip_content_icon, 'absolute')}>
                <Image src={'/svgs/rectangle.svg'} alt={'icon'} layout={'fill'}></Image>
              </span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FormLabel;
