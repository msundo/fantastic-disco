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
  Number Of Parents
*/

const Step1: NextPage = () => {
  const state = useAppState();
  const router = useRouter();
  const popup = {
    step: 'step1',
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
    setIsValid(value == state.validation.numberOfParents);
  };

  const buttonArray = [
    {
      value: '1',
      label: '1',
    },
    {
      value: '2',
      label: '2',
    },
  ];
  return (
    <>
      <Head>
        <title>Relation til barnet</title>
      </Head>
      <Heading
        headingSmall='Relation til barnet'
        headingLarge='Vælg antal forældre'
        tooltipTitle='Hvad betyder det?'
        tooltipText='I skal vælge, om I er to forældre til barnet, eller om du er ene forælder til barnet, dvs. der er ikke en anden forælder til barnet.'
      />

      <div className='mb-20'>
        <RadioButtonGroup clickHandler={validateStep} buttonArray={buttonArray} name={'test'} type={'narrow'} />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/step2'}>
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

export default Step1;
