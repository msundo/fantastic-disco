import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import s from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <nav className={cn(s.Header, 'h-[6rem] md:h-[8rem] pl-8 md:pl-20')}>
      <Link href={'/'}>
        <a className={cn(s.Header_element, 'flex items-center justify-center relative')}>Barselsplanlægger</a>
      </Link>
    </nav>
  );
};

export default Header;
