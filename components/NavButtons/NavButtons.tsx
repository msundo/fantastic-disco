import cn from 'classnames';
import s from './NavButtons.module.scss';
import Button from '../Button';
import Link from 'next/link';

type Props = {
  textNext?: string;
  textPrev?: string;
  prevLink?: string;
  nextLink: string;
};

const extraClasses: Map<string, string> = new Map([
  ['primary', 'bg-primary'],
  ['secondary', 'bg-secondary'],
  ['icon', 'bg-icon'],
]);

const NavButtons = ({ textNext, textPrev, nextLink, prevLink }: Props) => {
  return (
    <div className={cn('mb-10 flex', s.NavButtons)}>
      {prevLink ? (
        <Link href={prevLink} passHref>
          <a href={prevLink}>
            <Button type='icon' text={textPrev} />
          </a>
        </Link>
      ) : (
        <Button type='icon' text={textPrev} />
      )}
      <Link href={nextLink} passHref>
        <a href={nextLink}>
          <Button type='primary' text={textNext} />
        </a>
      </Link>
    </div>
  );
};

export default NavButtons;
