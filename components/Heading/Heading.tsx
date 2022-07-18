import s from './Heading.module.scss';
import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  headingSmall?: string;
  headingLarge?: string;
  tooltipText?: string;
  tooltipTitle?: string;
};

const Heading: React.FC<Props> = ({ headingSmall, headingLarge, tooltipText, tooltipTitle }: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      setIsTooltipVisible(!isTooltipVisible)
    }
  };

  return (
    <div className={cn(s.Heading, 'heading mb-20')}>
      {headingSmall && <h1 className={cn(s.Heading_small, 'text-lg mb-4')}>{headingSmall}</h1>}
      {headingLarge && (
        <div className={cn(s.Heading, 'flex justify-between items-center w-full')}>
          <h2 className={cn(s.Heading_mobile, 'heading')}>{headingLarge}</h2>
          {tooltipText || tooltipTitle ? (
            <div className={cn(s.Heading_tooltip, 'sm:relative')}>
              <span
                tabIndex={1}
                onKeyPress={handleKeypress}
                className={cn(s.Heading_tooltip_icon, 'flex justify-center items-center cursor-pointer ml-10')}
                onClick={() => setIsTooltipVisible(!isTooltipVisible)}
              >
                ?
              </span>
              {isTooltipVisible && (
                <div
                  className={cn(
                    s.Heading_tooltip_content,
                    isTooltipVisible ? '' : 'hidden',
                    'fixed md:absolute rounded flex flex-col flex-1 cursor-auto text-left text-xs font-normal'
                  )}
                >
                  {tooltipTitle && <h3 className={cn(s.Heading_tooltip_content_title)}>{tooltipTitle}</h3>}
                  {tooltipText}
                  <span className={cn(s.Heading_tooltip_content_close, 'absolute cursor-pointer')} onClick={() => setIsTooltipVisible(!isTooltipVisible)}>
                    <Image src={'/svgs/close.svg'} alt={'close icon'} layout={'fill'}></Image>
                  </span>
                  <span className={cn(s.Heading_tooltip_content_icon, 'absolute')}>
                    <Image src={'/svgs/rectangle.svg'} alt={'icon'} layout={'fill'}></Image>
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Heading;
