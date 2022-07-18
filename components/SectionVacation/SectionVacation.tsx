import cn from 'classnames';
import s from '../EditPageSections/EditPageSections.module.scss';
import { useAppState } from '../../context/state';
import { useState } from 'react';
import EditItem from '../EditItem/EditItem';
import e from './SectionVacation.module.scss';
import Image from 'next/image';
import { intlFormat } from 'date-fns';

// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';

type Props = {};

const dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const dateLocale = {
    locale: 'da',
};

type Vacation = {
    title: string
    bodyText: string
    start: Date
    end: Date
}

type SectionAdviseProps = {
    title: string
}

/*const SectionAdvise: React.FC<SectionAdviseProps> = ({ title }) => {

    return (
        <div className='flex flex-row'>
            <div className={'ml-6 mr-40 mb-2'}>
                <div className={cn(e.SectionVacation_pointer)}>
                    <div className={cn(e.SectionVacation_circle)} />
                    <div className={cn(e.SectionVacation_title, '')}>{title}</div>
                </div>
            </div>
        </div>
    );
};*/

const SectionVacation: React.FC = () => {

    const { nameOfMother, nameOfPartner, setDatePickerPopupVisible, setDatePickerPopupPerson } = useAppState();

    const addVacationForMother = () => {
        setDatePickerPopupVisible(true);
        setDatePickerPopupPerson(nameOfMother);
    };
    const addVacationForPartner = () => {
        setDatePickerPopupVisible(true);
        setDatePickerPopupPerson(nameOfPartner);
    };

    const [motherVacation, setMotherVacation] = useState<Vacation[]>([
        { title: 'Ferie', bodyText: 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk', start: new Date(), end: new Date() },
        { title: 'Ferie', bodyText: 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk', start: new Date(), end: new Date() }
    ])

    const [partnerVacation, setPartnerVacation] = useState<Vacation[]>([
        { title: 'Ferie', bodyText: 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk', start: new Date(), end: new Date() },
        { title: 'Ferie', bodyText: 'Disse uger er øremærket, og betyder at de ikke kan anvendes af anden partner. Læs mere på borger.dk', start: new Date(), end: new Date() }
    ])

    return (
        <>
            <div className={cn(s.EditPageSections_column, 'mb-10')}>

                <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfMother}</div>
                {motherVacation &&
                    motherVacation.map((vacation, index) => {
                        return (
                            <EditItem
                                key={index}
                                title={vacation.title}
                                dates={`${intlFormat(vacation.start, dateFormat, dateLocale)} til ${intlFormat(vacation.end, dateFormat, dateLocale)}`}
                                bodyText={vacation.bodyText}
                                editType='edit'
                                editText='Rediger'
                                editHandler={() => { }}
                            />
                        );
                    })
                }

                <div className={s.InlineButton} onClick={addVacationForMother}>
                    <Image src='/svgs/circle-plus.svg' alt='Tilføj ferieperiode' width={22} height={22} />
                    <span className={s.InlineButton_text}>Tilføj ferieperiode</span>
                </div>

            </div>
            <div className={cn(s.EditPageSections_column, 'mb-10')}>

                <div className={cn(s.EditPageSections_columnHeading, 'mb-8')}>{nameOfPartner}</div>
                {partnerVacation &&
                    partnerVacation.map((vacation, index) => {
                        return (
                            <EditItem
                                key={index}
                                title={vacation.title}
                                dates={`${intlFormat(vacation.start, dateFormat, dateLocale)} til ${intlFormat(vacation.end, dateFormat, dateLocale)}`}
                                bodyText={vacation.bodyText}
                                editType='edit'
                                editText='Rediger'
                                editHandler={() => { }}
                            />
                        );
                    })
                }

                <div className={s.InlineButton} onClick={addVacationForPartner}>
                    <Image src='/svgs/circle-plus.svg' alt='Tilføj ferieperiode' width={22} height={22} />
                    <span className={s.InlineButton_text}>Tilføj ferieperiode</span>
                </div>

            </div>


        </>
    );
};

export default SectionVacation;

