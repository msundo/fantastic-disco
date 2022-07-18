import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import Heading from '../components/Heading';
import FormSelect from '../components/FormSelect';
import FormLabel from '../components/FormLabel';

/*
  Mothers weeks with full pay
*/

const Step7: NextPage = () => {
  const { motherBusinessDaysWithFullPay, setMotherBusinessDaysWithFullPay, setConvertedMotherBusinessDaysWithFullPay, nameOfMother } = useAppState();
  const router = useRouter();

  // min/max values for motherBusinessDaysWithFullPay
  const min = 0;
  const max = 48;

  const changeHandler = (value: string) => {
    // return number closest to min/max if value is outside of range
    const validatedValue = Math.max(min, Math.min(max, Number(value)));
    const convertToBusinessDays = validatedValue * 5;
    setMotherBusinessDaysWithFullPay(validatedValue);
    setConvertedMotherBusinessDaysWithFullPay(convertToBusinessDays);
  };

  return (
    <>
      <Head>
        <title>Løn under barsel</title>
      </Head>
      <Heading headingSmall={'Løn under barsel'} headingLarge={`Hvor mange ugers orlov med løn har ${nameOfMother} efter fødslen?`} />

      <div className='mb-20 flex flex-col'>
        <FormLabel
          labelText={'Indtast antal uger'}
          tooltipTitle='Hvad indebærer det?'
          tooltipText='Om I får løn under orloven, har betydning for jeres økonomi, og hvornår I skal søge om barselsdagpenge. Hvis I ikke ved, om I får løn under orloven, kan I undersøge dette med jeres fagforeninger eller arbejdsgivere.'
        />
        <input
          className='text-2xl border-2 border-solid rounded border-opacity-100 border-border-grey focus-visible:border-border-green outline-border-green p-4 w-[36rem]'
          type='number'
          min='0'
          max='48'
          value={motherBusinessDaysWithFullPay}
          onChange={(e) => changeHandler(e.target.value)}
        />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>

        <Link href={'/step8'}>
          <a>
            <Button type={'primary'} text={'Næste'}></Button>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Step7;
