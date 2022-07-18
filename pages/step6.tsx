import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import Heading from '../components/Heading';
import FormSelect from '../components/FormSelect';
import FormLabel from '../components/FormLabel';

/*
  Partner occupational status
*/

const Step6: NextPage = () => {
  const { partnerOccupationalStatus, setPartnerOccupationalStatus, nameOfPartner } = useAppState();
  const state = useAppState();
  const router = useRouter();
  let popup = {
    step: partnerOccupationalStatus,
    onAccept: () => {},
    onReject: () => {},
  };

  const loadPopup = () => {
    state.updatePopupContext(popup);
  };
  useEffect(() => {
    loadPopup();
  }, []);
  const showPopup = () => {
    state.updatePopupVisibility(true);
  };
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  // check partnerOccupationalStatus on load
  useEffect(() => {
    setIsDirty(partnerOccupationalStatus !== '');
    setIsValid(partnerOccupationalStatus === 'employed');
  }, [partnerOccupationalStatus]);

  const changeHandler = (value) => {
    setIsDirty(true);
    setPartnerOccupationalStatus(value);

    popup.step = value;
    state.updatePopupContext(popup);

    if (value === 'employed') {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const options = [
    {
      value: '',
      text: 'Vælg',
      disabled: true,
      selected: true,
      hidden: true,
    },
    {
      value: 'employed',
      text: 'Lønmodtager',
      disabled: false,
      selected: false,
    },
    {
      value: 'selfEmployed',
      text: 'Selvstændig',
      disabled: false,
      selected: false,
    },
    {
      value: 'student',
      text: 'Studerende',
      disabled: false,
      selected: false,
    },
    {
      value: 'unemployed',
      text: 'Ledig',
      disabled: false,
      selected: false,
    },
    {
      value: 'other',
      text: 'Andet',
      disabled: false,
      selected: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Vælg beskæftigelse</title>
      </Head>
      <Heading headingSmall={nameOfPartner} headingLarge='Vælg beskæftigelse/situation' />

      <div className='mb-20 flex flex-col justify-center items-center'>
        <FormLabel
          labelText={'Beskæftigelse/situation'}
          tooltipTitle='Hvad betyder det?'
          tooltipText='Vælg den beskæftigelse/situation der er relevant. Situationen er afgørende for, hvordan I kan fordele orloven. I kan ikke benytte barselsplanlæggeren, hvis I vælger selvstændig, studerende, ledig eller andet. Læs mere om barselsplanlægning for selvstændige, studerende, ledige og andet på www.borger.dk/barsel.'
        />
        <FormSelect changeHandler={changeHandler} value={partnerOccupationalStatus} options={options} name={'occupationalStatus'} />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/step7'}>
            <a>
              <Button type={'primary'} text={'Næste'} disabled={!isDirty}></Button>
            </a>
          </Link>
        ) : (
          <Button type={'primary'} text={'Næste'} clickHandler={showPopup} disabled={!isDirty}></Button>
        )}
      </div>
    </>
  );
};

export default Step6;
