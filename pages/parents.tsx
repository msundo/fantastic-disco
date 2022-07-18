import type { NextPage } from 'next';
import cn from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useAppState } from '../context/state';

const Parents: NextPage = () => {
  const { date, updateDate, nameOfMother, updateNameOfMother } = useAppState();

  return (
    <div>
      <Head>
        <title>Forældre</title>
      </Head>

      <main>
        <h1 className='text-5xl mb-8'>Forældre</h1>
        <h2>state date: {date}</h2>
        <h2>state name: {nameOfMother}</h2>
        <br />
        <input aria-label='date' placeholder='Date' type='date' className='mt-4' onChange={(event) => updateDate(event.target.value)} />
        <br />
        <input aria-label='name of mother' placeholder='Name of mother' type='text' className='mt-4' onChange={(event) => updateNameOfMother(event.target.value)} />
      </main>

      <footer></footer>
    </div>
  );
};

export default Parents;
