import cn from 'classnames';
import e from '../EditPageSections/EditPageSections.module.scss';
import s from './SectionImportantInformation.module.scss';
import { useAppState } from '../../context/state';
import { useState } from 'react';
import { addBusinessDays } from 'date-fns';
import intlFormat from 'date-fns/intlFormat';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

type SectionItemProps = {
  title: string;
  count: number;
  bodyText: string;
  squareColor: string;
};

type Props = {
  title: string;
  count: number;
  bodyText: string;
};

const dateFormat = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const dateLocale = {
  locale: 'da',
};

const SectionItem: React.FC<SectionItemProps> = ({ title, count, bodyText, squareColor }) => {
  return (
    /* MIS: Will maybe be used in the future */
    /*<div className={cn(s.SectionImportantInformation_container, 'flex flex-row')}>
            <div className={cn(s.SectionImportantInformation_image)}>
                <div className={cn(s.SectionImportantInformation_square, '')} style={{ borderColor: squareColor, color: squareColor }}>
                    <div className={cn(s.SectionImportantInformation_number)}>
                        <span style={{ color: 'black'}}>
                            {count}
                        </span>
                    </div>
                </div>
            </div>*/
    <div className={cn(s.SectionImportantInformation, '')}>
      <div className={cn(s.SectionImportantInformation_heading, '')}>{title}</div>
      <div className={cn(s.SectionImportantInformation_bodyText, '')}>{bodyText}</div>
    </div>
  );
};

const SectionImportantInformation: React.FC = () => {
  const { nameOfMother, nameOfPartner, tasks, motherWeeksWithFullPay, partnerWeeksWithFullPay, dateOfBirth } = useAppState();

  let motherDaysWithFullPay = motherWeeksWithFullPay * 5;
  const motherLeave = tasks.filter((task) => task.project === 'mother');
  const motherLeaveSorted = motherLeave.sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  let motherDateFullPayEnds = null;
  motherLeaveSorted.forEach((leave) => {
    const duration = leave.motherIndividualDays > 0 ? leave.motherIndividualDays : leave.sharedDays;
    if (!motherDateFullPayEnds) {
      if (duration < motherDaysWithFullPay) motherDaysWithFullPay -= duration;
      else {
        motherDateFullPayEnds = addBusinessDays(leave.start, motherDaysWithFullPay);
        return;
      }
    }
  });

  let partnerDaysWithFullPay = partnerWeeksWithFullPay * 5;
  const partnerLeave = tasks.filter((task) => task.project === 'partner');
  const partnerLeaveSorted = partnerLeave.sort(function (a, b) {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });
  let partnerDateFullPayEnds = null;
  partnerLeaveSorted.forEach((leave) => {
    const duration = leave.partnerIndividualDays > 0 ? leave.partnerIndividualDays : leave.sharedDays;
    if (!partnerDateFullPayEnds) {
      if (duration < partnerDaysWithFullPay) partnerDaysWithFullPay -= duration;
      else {
        partnerDateFullPayEnds = addBusinessDays(leave.start, partnerDaysWithFullPay);
        console.log('partnerDateFullPayEnds', partnerDateFullPayEnds);
        return;
      }
    }
  });

  // const paternityLeave = tasks.find((task) => task.periodeType === 'PaternityLeave');
  // const partnerLeaveUnsorted = tasks.filter((task) => task.project === 'partner' && task.periodeType === 'Leave');
  // const partnerLeave = partnerLeaveUnsorted.sort(function (a, b) {
  //   return new Date(a.start).getTime() - new Date(b.start).getTime();
  // });

  const motherTimeline = [
    {
      title: 'Fortæl om graviditeten',
      count: 1,
      bodyText:
        'Du skal senest 3 måneder før din termin give din arbejdsgiver besked om din graviditet. Du skal samtidig fortælle din arbejdsgiver, om du vil holde de 4 ugers orlov før fødslen.',
    },
    {
      title: 'Fortæl om din barselsplan',
      count: 2,
      bodyText:
        'Du skal senest 6 uger efter fødslen fortælle din arbejdsgiver om, hvornår du vil genoptage arbejdet, og hvordan du holder din orlov fra start til slut inkl. overdraget orlov fra barnets anden forælder.',
    },
    {
      title: `Lønstop - ${intlFormat(motherDateFullPayEnds, dateFormat, dateLocale)}`,
      count: 3,
      bodyText: 'Ud fra dine indtastede oplysninger stopper din løn her.',
    },
    {
      title: 'Søg barselsdagpenge',
      count: 4,
      bodyText: 'Du skal senest søge om barselsdagpenge 8 uger efter fødslen, eller senest 8 uger efter din løn er stoppet, hvis du får løn.',
    },
  ];

  const fatherTimeline = [
    {
      title: 'Fortæl om graviditeten',
      count: 1,
      bodyText:
        'Senest 3 mdr. før din termin skal du give din arbejdsgiver besked om forventet fødselstidspunkt, og om du vil bruge din ret til fravær før fødslen (graviditetsorloven).',
    },
    {
      title: 'Registrer fader-/medmoderskab',
      count: 2,
      bodyText:
        'Registrer dig som forælder til barnet hurtigst muligt, hvis I ikke er gift. Du kan først overdrage/modtage orlov, når du er registreret som forælder til barnet. Du kan registrere dig som forælder til barnet på www.borger.dk/familie-og-boern ved at udfylde en ’Omsorgs- og ansvarserklæring’. I kan udfylde erklæringen både før og efter fødslen.',
    },
    {
      title: 'Fortæl om din barselsplan',
      count: 3,
      bodyText:
        'Du skal senest 6 uger efter fødslen fortælle din arbejdsgiver om, hvornår du vil genoptage arbejdet, og hvordan du holder din orlov fra start til slut inkl. overdraget orlov fra barnets anden forælder.',
    },
    {
      title: `Lønstop - ${intlFormat(partnerDateFullPayEnds, dateFormat, dateLocale)}`,
      count: 4,
      bodyText: 'Ud fra dine indtastede oplysninger stopper din løn her. ',
    },
    {
      title: 'Søg barselsdagpenge',
      count: 5,
      bodyText: 'Du skal senest søge om barselsdagpenge 8 uger efter fødslen, eller senest 8 uger efter din løn er stoppet, hvis du får løn.',
    },
  ];

  return (
    <>
      <div className={cn(e.EditPageSections_column, 'mb-10')}>
        <div className={cn(e.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>

        {motherTimeline.map((item, index) => {
          return <SectionItem key={index + item.count} squareColor='#084081' title={item.title} count={item.count} bodyText={item.bodyText} />;
        })}
      </div>

      <div className={cn(e.EditPageSections_column, 'mb-10')}>
        <div className={cn(e.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>

        {fatherTimeline.map((item, index) => {
          return <SectionItem key={index + item.count} squareColor='#2171B5' title={item.title} count={item.count} bodyText={item.bodyText} />;
        })}
      </div>
    </>
  );
};

export default SectionImportantInformation;
