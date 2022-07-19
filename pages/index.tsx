import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import Heading from '../components/Heading';

const Home: NextPage = () => {
  const [isValid, setIsValid] = useState(true);
  const state = useAppState();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Barselsplanlægger</title>
      </Head>
      <div className='mt-16'>
        <Heading headingLarge='Kom godt i gang' />
      </div>

      <div className={classNames('flex flex-col lg:flex-row justify-center mb-20 text-[1.6rem] text-center max-w-4xl lg:max-w-[1200px]')}>
        <div className='flex flex-col items-center flex-1 mb-10  mx-6'>
          {/* <div className='w-[140px] h-[140px]'> */}
          <div className='mb-8'>
            <Image src='/svgs/intro1.svg' alt='Kun for lønmodtagere der bor sammen' width='140px' height='140px' />
          </div>
          {/* </div> */}
          <h2 className='text-[1.8rem] font-bold mb-5'>1. Kun for lønmodtagere der bor sammen</h2>
          <p>
            Barselsplanlæggeren kan benyttes af forældre, der bor sammen på fødselstidspunktet, og som er lønmodtagere.
            <br />
            <br />
            <a href='#'>Se om I kan bruge værktøjet</a>
          </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10  mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/intro2.svg' alt='Find jeres kontrakt frem' width='140px' height='140px' />
          </div>
          <h2 className='text-[1.8rem] font-bold mb-5'>2. Find jeres kontrakt frem</h2>
          <p>
            I kan udfylde informationer om jeres lønforhold, fx om I får løn under orloven fra jeres arbejdsgivere. Har I spørgsmål til jeres overenskomst eller
            ansættelsesforhold, skal I kontakte jeres fagforeninger eller arbejdsgivere.
          </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10  mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/intro3.svg' alt='Det tager typisk 5-15 minutter' width='140px' height='140px' />
          </div>
          <h2 className='text-[1.8rem] font-bold mb-5'>3. Det tager typisk 5-15 minutter</h2>
          <p>
            Det tager 5-15 minutter at lave en barselsplan afhængigt af, hvor meget den skal tilpasses. I skal først igennem 9 enkle spørgsmål, inden I kan
            tilpasse jeres plan.
          </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10  mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/intro4.svg' alt='Udgangspunktet for jeres endelige barselsplan' width='140px' height='140px' />
          </div>
          <h2 className='text-[1.8rem] font-bold mb-5'>4. En vejledende barselsplan</h2>
          <p>
            Planen er vejledende ud fra jeres indtastede oplysninger. Oplysningerne bliver hverken gemt af eller sendt til Udbetaling Danmark. I kan med fordel
            printe eller gemme planen til jer selv, så I kan vise den til jeres arbejdsgivere.
          </p>
        </div>
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a href='https://www.borger.dk/familie-og-boern/barsel-oversigt' title='borger.dk - Barsel og orlov'>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/step1'}>
            <a>
              <Button type={'primary'} text={'Næste'}></Button>
            </a>
          </Link>
        ) : (
          <Button type={'primary'} text={'Næste'}></Button>
        )}
      </div>
    </>
  );
};

export default Home;
