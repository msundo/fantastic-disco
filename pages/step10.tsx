import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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
        <title>Færdiggør barselsplanen</title>
      </Head>
      <Heading headingSmall={`Jeres barselsplan`} headingLarge='Færdiggør barselsplan' />
      <div className={classNames('flex flex-col lg:flex-row justify-center mb-20 text-xl text-center max-w-4xl lg:max-w-[1200px]')}>
        <div className='flex flex-col items-center flex-1 mb-10 mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/intro4.svg' alt='Et enkelt udgangspunkt' width='140px' height='140px' />
          </div>
          <h2 className='text-2xl font-bold mb-5'>1. Et enkelt udgangspunkt</h2>
          <p>
            For at hjælpe jer i gang med at planlægge jeres orlov hjælper dette værktøj med at skabe et simpelt udgangspunkt.
            </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10 mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/tutorial2.svg' alt='Sådan redigerer du i planen' width='140px' height='140px' />
          </div>
          <h2 className='text-2xl font-bold mb-5'>2. Sådan redigerer I i planen</h2>
          <p>
            I kan redigere eller slette de enkelte perioder ved at klikke direkte i perioden eller længere nede på siden.
            Fordi I har fået tildelt alt jeres orlov, skal I først slette/redigere orlovsperioden før I kan tilpasse den.
          </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10 mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/tutorial3.svg' alt='Tilføj evt. ferie' width='140px' height='140px' />
          </div>
          <h2 className='text-2xl font-bold mb-5'>3. Tilføj evt. ferie</h2>
          <p>
            I kan tilføje ferieperioder i ferieoverblikket. Hvis I ønsker, at tilføje ferie i en planlagt orlovsperiode skal orlovsperioden først slettes eller forkortes, så der bliver plads til den ønskede ferieperiode.
          </p>
        </div>
        <div className='flex flex-col items-center flex-1 mb-10 mx-6'>
          <div className='mb-8'>
            <Image src='/svgs/tutorial4.svg' alt='Gem eller print planen' width='140px' height='140px' />
          </div>
          <h2 className='text-2xl font-bold mb-5'>4. Gem eller print planen</h2>
          <p>
            Når planen er klar, kan I gemme eller printe planen, så den kan bruges som udgangspunkt for en dialog med jeres arbejdsgivere.
            Barselsplanen giver jer et overblik over orloven, de vigtige datoer I skal huske og handlingerne ifm. jeres barselsplanlægning.
          </p>
        </div>
      </div>
      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/timeline'}>
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
