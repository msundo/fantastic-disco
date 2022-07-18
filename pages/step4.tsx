import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../components/Button';
import { useAppState } from '../context/state';
import Heading from '../components/Heading';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import da from 'date-fns/locale/da';
registerLocale('da', da);

// import 'react-datepicker/dist/react-datepicker.css';

/*
  Expected date of birth
*/

const Step4: NextPage = () => {
  const { dateOfBirth, setDateOfBirth } = useAppState();
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (dateOfBirth) {
      setIsValid(true);
      setIsDirty(true);
    }
  }, [dateOfBirth]);

  const onChange = (date: string | Date | null) => {
    if (date) {
      setIsValid(true);
      setIsDirty(true);
      setDateOfBirth(date);
    } else {
      setIsValid(false);
      setIsDirty(false);
    }
  };

  return (
    <>
      <Head>
        <title>Barnets fødselsdato</title>
      </Head>
      <Heading
        headingSmall='Barnets fødselsdato'
        headingLarge='Indtast barnets fødselsdato'
        tooltipTitle='Er jeres barn ikke født endnu?'
        tooltipText='Er barnet ikke født endnu, skal I indtaste den forventede terminsdato. I skal dog være opmærksomme på, at hvis fødselsdatoen afviger fra terminsdatoen, skal I lave en ny plan. I skal være opmærksomme på, at I ikke kan benytte barselsplanlæggeren, hvis barnet bliver født før den 2. august 2022, da der gælder andre barselsregler.'
      />
      <div className='text-center text-[18px] mt-[-3rem] mb-12'>
        <p>
          Er barnet født før 2.august 2022 gælder en anden lovgivning.
          <br />
          <a href='https://barselsdagpenge.dk/barselsberegner' target={'_blank'} rel='noreferrer'>
            Brug i stedet dette værktøj.
          </a>
        </p>
      </div>
      {/* <div id='react-datepicker-wrapper'> */}
      <div className='mb-20 flex justify-center items-center' id='react-datepicker'>
        <DatePicker
          className='border-2 border-solid rounded border-opacity-100 border-border-grey focus-visible:border-border-green outline-border-green p-4 text-xl'
          locale='da'
          startDate={null}
          shouldCloseOnSelect={true}
          selected={dateOfBirth}
          onChange={(date) => onChange(date)}
          popperPlacement='bottom'
          // minDate={new Date()}
          minDate={new Date('2022/08/02')}
          // maxDate={addDays(new Date(), 110)}
          placeholderText='Vælg fødselsdato'
        />
      </div>
      {/* </div> */}

      <div className={classNames('flex justify-center items-center')}>
        <a onClick={() => router.back()}>
          <Button type={'icon'}></Button>
        </a>

        {isValid ? (
          <Link href={'/step5'}>
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

export default Step4;
