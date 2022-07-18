import classnames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import s from './Popup.module.scss';
import Button from '../Button';
import { useAppState } from '../../context/state';
import texts from '../../data/texts';

const Popup: React.FC = () => {
  const state = useAppState();
  // const { title, message, acceptButtonText, rejectButtonText, onAccept, onReject, step } = state.popupContext;
  const { onAccept, onReject, step } = state.popupContext;
  const popupTexts = texts[step]?.popup;

  const isVisible = state.popupVisibility;

  const closePopup = () => {
    state.updatePopupVisibility(false);
  };

  return (
    <div className={classnames(s.Popup, isVisible ? '' : 'hidden', 'fixed top-0 left-0 right-0 bottom-0 z-50 w-[100vw] h-[100vh]')}>
      <div className={classnames('w-full h-full bg-[#0B2432] bg-opacity-75 flex justify-center items-center')}>
        <div className={classnames(s.Popup_container, 'bg-[#F8F9FA] relative')}>
          <h2 className={classnames(s.Popup_container_title, 'text-4xl text-center')}>{popupTexts?.title}</h2>
          <p className={classnames(s.Popup_container_text, 'text-4xl text-center')}>{popupTexts?.message}</p>
          <div className={classnames(s.Popup_container_buttons, 'flex items-center justify-center')}>
            <Link href={'/'}>
              <a onClick={() => state.updatePopupVisibility(false)}>
                <Button type={'tertiary'} text={popupTexts?.rejectButtonText}></Button>
              </a>
            </Link>

            <a href={popupTexts?.link} target='_blank' rel='noopener noreferrer'>
              <Button type={'primary'} text={popupTexts?.acceptButtonText}></Button>
            </a>
          </div>
          <div className={classnames(s.Popup_container_close, 'absolute flex justify-center items-center cursor-pointer')} onClick={closePopup}>
            <Image src='/svgs/close.svg' alt='close' width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
