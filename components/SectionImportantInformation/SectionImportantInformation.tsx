import cn from 'classnames';
import e from '../EditPageSections/EditPageSections.module.scss';
import s from './SectionImportantInformation.module.scss';
import { useAppState } from '../../context/state';
import { useState } from 'react';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

type SectionItemProps = {
    title: string
    count: number
    bodyText: string
    squareColor: string
};

type Props = {
    title: string
    count: number
    bodyText: string
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

    const { nameOfMother, nameOfPartner } = useAppState();

    const [motherTimeline, setMotherTimeline] = useState<Props[]>([
        { title: 'Fortæl om graviditeten', count: 1, bodyText: 'Du skal senest 3 måneder før din termin give din arbejdsgiver besked om din graviditet. Du skal samtidig fortælle din arbejdsgiver, om du vil holde de 4 ugers orlov før fødslen.' },
        { title: 'Fortæl om din barselsplan', count: 2, bodyText: 'Du skal senest 6 uger efter fødslen fortælle din arbejdsgiver om, hvornår du vil genoptage arbejdet, og hvordan du holder din orlov fra start til slut inkl. overdraget orlov fra barnets anden forælder.' },
        { title: 'Lønstop – 24. Januar 2023', count: 3, bodyText: 'Ud fra dine indtastede oplysninger stopper din løn her.' },
        { title: 'Søg barselsdagpenge', count: 4, bodyText: 'Du skal senest søge om barselsdagpenge 8 uger efter fødslen, eller senest 8 uger efter din løn er stoppet, hvis du får løn.' },
    ])

    const [fatherTimeline, setFatherTimeline] = useState<Props[]>([
        { title: 'Fortæl om graviditeten', count: 1, bodyText: 'Senest 3 mdr. før din termin skal du give din arbejdsgiver besked om forventet fødselstidspunkt, og om du vil bruge din ret til fravær før fødslen (graviditetsorloven).' },
        { title: 'Registrer fader-/medmoderskab', count: 2, bodyText: 'Registrer dig som forælder til barnet hurtigst muligt, hvis I ikke er gift. Du kan først overdrage/modtage orlov, når du er registreret som forælder til barnet. Du kan registrere dig som forælder til barnet på www.borger.dk/familie-og-boern ved at udfylde en ’Omsorgs- og ansvarserklæring’. I kan udfylde erklæringen både før og efter fødslen.' },
        { title: 'Fortæl om din barselsplan', count: 3, bodyText: 'Du skal senest 6 uger efter fødslen fortælle din arbejdsgiver om, hvornår du vil genoptage arbejdet, og hvordan du holder din orlov fra start til slut inkl. overdraget orlov fra barnets anden forælder.' },
        { title: 'Lønstop – 10. Januar 2023', count: 4, bodyText: 'Ud fra dine indtastede oplysninger stopper din løn her. ' },
        { title: 'Søg barselsdagpenge', count: 5, bodyText: 'Du skal senest søge om barselsdagpenge 8 uger efter fødslen, eller senest 8 uger efter din løn er stoppet, hvis du får løn.' },
    ])

    return (
        <>
            <div className={cn(e.EditPageSections_column, 'mb-10')}>
                <div className={cn(e.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>

                {motherTimeline.map((item, index) => {

                    return <SectionItem
                        key={index + item.count}
                        squareColor='#084081'
                        title={item.title}
                        count={item.count}
                        bodyText={item.bodyText}
                    />
                })}

            </div>

            <div className={cn(e.EditPageSections_column, 'mb-10')}>
                <div className={cn(e.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>

                {fatherTimeline.map((item, index) => {

                    return <SectionItem
                        key={index + item.count}
                        squareColor='#2171B5'
                        title={item.title}
                        count={item.count}
                        bodyText={item.bodyText}
                    />
                })}

            </div>

        </>
    );
};

export default SectionImportantInformation;