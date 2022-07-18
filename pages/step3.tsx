import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import Heading from '../components/Heading';
import TextInput from '../components/TextInput';

/*
  Names
*/

const Step3: NextPage = () => {
  const { nameOfMother, setNameOfMother, nameOfPartner, setNameOfPartner } = useAppState();
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (nameOfMother !== '' && nameOfPartner !== '') {
      setIsValid(true);
      setIsDirty(true);
    }
  }, [nameOfMother, nameOfPartner]);

  return (
    <>
      <Head>
        <title>Angiv jeres navne</title>
      </Head>
      <Heading
        headingSmall='Relation til barnet'
        headingLarge='Angiv jeres navne'
        tooltipTitle='Hvorfor skal vi skrive vores navne?'
        tooltipText='Jeres navne bliver ikke gemt, men benyttes alene til at vise jer i planen, hvilke perioder I kan holde.'
      />

      <div className='mb-20 flex justify-center items-center flex-wrap'>
        <TextInput label='Indtast mors navn' ariaLabel="Mors navn" value={nameOfMother} changeHandler={setNameOfMother} />
        <TextInput label='Indtast far/medmors navn' ariaLabel="far/medmors navn" value={nameOfPartner} changeHandler={setNameOfPartner} />
      </div>

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>
        {isValid ? (
          <Link href={'/step4'}>
            <a>
              <Button type={'primary'} text={'Næste'} disabled={!isDirty}></Button>
            </a>
          </Link>
        ) : (
          <Button type={'primary'} text={'Næste'} disabled={!isDirty}></Button>
        )}
      </div>
    </>
  );
};

export default Step3;
