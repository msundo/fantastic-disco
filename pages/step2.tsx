import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import RadioButtonGroup from '../components/RadioButtonGroup';
import Heading from '../components/Heading';

/*
  Living together
*/

const Step2: NextPage = () => {
  const state = useAppState();
  const router = useRouter();
  const popup = {
    step: 'step2',
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

  const validateStep = (value) => {
    setIsDirty(true);

    setIsValid(value == state.validation.livingTogether.toString());
  };

  const buttonArray = [
    {
      value: 'true',
      label: 'Ja',
    },
    {
      value: 'false',
      label: 'Nej',
    },
  ];
  return (
    <>
      <Head>
        <title>Relation mellem forældre</title>
      </Head>
      <Heading
        headingSmall='Relation mellem forældre'
        headingLarge='Bor I sammen?'
        tooltipTitle='Hvad betyder det?'
        tooltipText='I skal vælge, om I boede sammen ved fødslen. Det skal I gøre, fordi det er afgørende for, hvor mange orlovsuger I har ret til.'
      />

      <div className='mb-20'>
        <RadioButtonGroup clickHandler={validateStep} buttonArray={buttonArray} name={'test'} type={'narrow'} />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/step3'}>
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

export default Step2;
