import classnames from 'classnames';
import Header from '../Header';
import Footer from '../Footer';
import Popup from '../Popup';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col h-[100%]'>
      <Header />
      <main className={classnames('flex flex-col justify-center items-center pt-16 pl-4 pr-4 pb-16')}>
        {children}
        <Popup></Popup>
      </main>
      <Footer />

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
    </div>
  );
};

export default Layout;
