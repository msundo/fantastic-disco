import cn from 'classnames';
import s from './Notification.module.scss';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  type: 'success' | 'addLeaveSuccess' | 'delete' | 'edit';
  classNames?: string;
  acceptHandler?: () => void;
  rejectHandler?: () => void;
  closeHandler?: () => void;
};

//! TODO: click outside of the notification to close it

const Notification = ({ type, classNames = '', acceptHandler, rejectHandler, closeHandler }: Props) => {
  let typeClass;
  let title;
  let bodyText;
  let iconPath;

  if (type === 'success') {
    typeClass = s.Notification_success;
    iconPath = '/svgs/check-one.svg';
    title = 'Rettelser er gennemført!';
    bodyText =
      'Dine rettelser er succesfuldt gennemført. Du skal være opmærksom på, at rettelserne kan have påvirket jeres start- og slutdato for jeres orlovsperioder samt jeres resterende orlov.';
  } else if (type === 'addLeaveSuccess') {
    typeClass = s.Notification_success;
    iconPath = '/svgs/check-one.svg';
    title = 'Periode er tilføjet!';
    bodyText =
      'Din periode er succesfuldt gennemført og indsat i tidslinjen. Vær opmærksom på at denne tilføjelse kan have påvirket din start og slutdato for en orlovsperiode.';
  } else if (type === 'delete') {
    typeClass = s.Notification_delete;
    iconPath = '/svgs/question-circle.svg';
    title = 'Er du sikker på, du vil slette perioden?';
    bodyText =
      'Vær opmærksom på at slettes denne periode vil der være en periode hvor ingen orlov er planlagt. Den slettede orov kan benyttes indenfor barnets første leve år.';
  } else {
    typeClass = s.Notification_edit;
    iconPath = '/svgs/alert-triangle.svg';
    title = 'Er du sikker på, du vil gennemføre rettelser?';
    bodyText =
      'Vær opmærksom på at rettelserne du er igang med at foretage kan påvirke din start og slutdato for din orlovsperiode samt jeres resterende orlov.';
  }

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={cn(s.Notification, classNames, isVisible ? '' : 'hidden', 'fixed top-0 left-0 right-0 bottom-0 z-50 w-[100vw] h-[100vh]')}>
      <div onClick={() => console.log('click')} className={cn('w-full h-full bg-[#0B2432] bg-opacity-25 flex justify-center items-center')}>
        <div className={cn(s.Notification_container, typeClass, 'bg-[#F8F9FA] relative flex')}>
          <div className={cn(s.Notification_icon, 'w-[8rem] mr-8 mt-2')}>
            <Image src={iconPath} width={32} height={32} alt='Ikon' />
          </div>
          <div className={cn('flex flex-col justify-center')}>
            <h2 className={cn(s.Notification_title, '')}>{title}</h2>
            <p className={cn(s.Notification_body, '')}>{bodyText}</p>
            {(type === 'delete' || type === 'edit') && (
              <div className={cn(s.Notification_buttons, 'flex justify-end')}>
                <button className={cn(s.Notification_button, s.Notification_button_reject, '')} onClick={rejectHandler}>
                  Nej, annuller
                </button>
                <button className={cn(s.Notification_button, s.Notification_button_accept, '')} onClick={acceptHandler}>
                  Ja, fortsæt
                </button>
              </div>
            )}
          </div>
          <div className={cn(s.Notification_close, 'absolute flex justify-center items-center cursor-pointer')} onClick={closeHandler}>
            <Image src='/svgs/close.svg' alt='close' width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
