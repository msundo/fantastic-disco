import Header from '../Header';
import classnames from 'classnames';
import s from './Layout.module.scss';
import Button from '../Button';
import Link from 'next/link';
import Image from 'next/image';
import Popup from '../Popup';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className={classnames('flex flex-col justify-center items-center pt-16 pl-4 pr-4')}>
        {children}
        <Popup></Popup>
      </main>

      {/* 
      //! TODO: activate siteimprove script by uncommenting the following code block 
      */}
      {/* <script
        type='text/javascript'
        dangerouslySetInnerHTML={{
          __html: `
<!--//--><![CDATA[//><!--
(function() {
var sz = document.createElement('script'); sz.type = 'text/javascript'; sz.async = true;
sz.src = '//dk1.siteimprove.com/js/siteanalyze_667535.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sz, s);
})();
//--><!]]>`,
        }}
      ></script> */}
    </>
  );
};

export default Layout;
