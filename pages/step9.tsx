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
import FormLabel from '../components/FormLabel';

/*
  Number Of Parents
*/

const Step9: NextPage = () => {
  const state = useAppState();
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleSetDistribution = (value) => {
    state.setDistribution(value);
    setIsDirty(true);
    setIsValid(true);
  };

  const buttonArray = [
    {
      value: 'equal',
      label: 'Orloven skal fordeles lige',
    },
    {
      value: 'mother',
      label: `Mest muligt orlov til ${state.nameOfMother}`,
    },
    {
      value: 'partner',
      label: `Mest muligt orlov til ${state.nameOfPartner}`,
    },
  ];
  return (
    <>
      <Head>
        <title>Fordeling af barsel</title>
      </Head>
      <Heading headingSmall={'Fordeling af orlov'} headingLarge={`Vælg et udgangspunkt for fordelingen af orloven`} />
      <div className='text-center text-[18px] mt-[-3rem] mb-12'>
        <p>
          I kan justere fordelingen senere i barselsplanlæggeren.
        </p>
      </div>

      <div className='mb-20 flex flex-col'>
        <FormLabel
          labelText={'Fordeling'}
          tooltipTitle='Hvad betyder det?'
          tooltipText='I skal vælge et udgangspunkt. I kan justere fordelingen senere i barselsplanlæggeren.'
        />
        <RadioButtonGroup clickHandler={handleSetDistribution} buttonArray={buttonArray} name={'test'} type={'medium'} />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>

        <Link href={'/step10'}>
          <a>
            <Button type={'primary'} text={'Næste'} disabled={!isDirty}></Button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Step9;
