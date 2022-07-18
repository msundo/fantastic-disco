import cn from 'classnames';
import Link from 'next/link';
import s from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={cn(s.Footer, 'pt-10 pb-10 md:pt-12 md:pb-12 width-full')}>
      <div className={cn(s.Footer_container, 'flex flex-col md:flex-row items-center justify-between mx-auto')}>
        <a className={cn(s.Footer_link, '')} href='#' target='_blank' rel='noreferrer'>
          Cookies på ATP
        </a>

        <a className={cn(s.Footer_link, '')} href='https://www.borger.dk/familie-og-boern/barsel-oversigt' rel='noreferrer'>
          Læs mere om barselsreglerne
        </a>

        <a className={cn(s.Footer_link, '')} href='#' target='_blank' rel='noreferrer'>
          Behandling af personoplysninger
        </a>

        <a className={cn(s.Footer_link, '')} href='#' target='_blank' rel='noreferrer'>
          Tilgængelighed
        </a>

        <a className={cn(s.Footer_link, '')} href='https://www.borger.dk/familie-og-boern/Barsel-oversigt/Barsel-kontakt' target='_blank' rel='noreferrer'>
          Kontakt
        </a>
      </div>
    </div>
  );
};

export default Footer;
