import cn from 'classnames';
import s from './EditPageSections.module.scss';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import SectionLeavePeriods from '../SectionLeavePeriods';
import { useAppState } from '../../context/state';
import SectionFinancials from '../SectionFinancials';
import SectionTransfer from '../SectionTransfer';
import SectionLeaveOfAbsence from '../SectionLeaveOfAbsence';
import SectionVacation from '../SectionVacation';
import { getWeeksAndDays } from '../../helpers/formatters';
import SectionImportantInformation from '../SectionImportantInformation';
import SectionRemainingLeavePrint from '../SectionRemainingLeavePrint';

type Props = {};

const EditPageSections: React.FC<Props> = ({}) => {
  const { nameOfMother, nameOfPartner, leave } = useAppState();

  return (
    <div className={cn(s.EditPageSections)}>
      <div className={cn(s.EditPageSections_section, s.remaining_leave, 'remaining-leave')}>
        <div className={cn(s.EditPageSections_heading, s.EditPageSections_heading_noArrow)}>Resterende Orlov</div>

        <div className={cn('flex flex-col justify-between md:flex-row md:items-end mt-6 md:mt-10')}>
          <div className={'md:w-[32%] flex flex-col mb-8 md:mb-0'}>
            <div className='text-[2rem] text-secondary font-bold mb-6 text-left'>{nameOfMother}</div>
            <div className='bg-grey text-2xl flex flex-col justify-center items-center w-full pt-10 pb-10'>
              <div className={cn('mb-2 text-[1.8rem]', leave.remaining.mother > 0 ? 'text-[#2D2E28] font-bold' : 'text-[#747474]')}>
                {getWeeksAndDays(leave.remaining.mother)}
              </div>
              <div className={cn('text-[1.4rem] text-[#747474]')}>som ikke kan overdrages</div>
            </div>
          </div>
          <div className={'md:w-[32%] flex flex-col mb-8 md:mb-0'}>
            <div className='text-[2rem] text-secondary font-bold mb-6 text-left'>Orlov der kan benyttes af jer begge</div>
            <div className='bg-grey text-2xl flex flex-col justify-center items-center w-full pt-10 pb-10'>
              <div className={cn('mb-2 text-[1.8rem]', leave.remaining.shared > 0 ? 'text-[#2D2E28] font-bold' : 'text-[#747474]')}>
                {getWeeksAndDays(leave.remaining.shared)}
              </div>
              <div className={cn('text-[1.4rem] text-[#747474]')}>som kan overdrages</div>
            </div>
          </div>
          <div className={'md:w-[32%] flex flex-col'}>
            <div className='text-[2rem] text-secondary font-bold mb-6 text-left'>{nameOfPartner}</div>
            <div className='bg-grey text-2xl flex flex-col justify-center items-center w-full pt-10 pb-10'>
              <div className={cn('mb-2 text-[1.8rem]', leave.remaining.partner > 0 ? 'text-[#2D2E28] font-bold' : 'text-[#747474]')}>
                {getWeeksAndDays(leave.remaining.partner)}
              </div>
              <div className={cn('text-[1.4rem] text-[#747474]')}>som ikke kan overdrages</div>
            </div>
          </div>
        </div>

        <div className='md:w-[59%] mt-14'>
          <p className='mb-6 text-[1.5rem] leading-8 text-secondary'>
            Være opmærksom på, at I hver især har mulighed for at søge om 24 ugers orlov med barselsdagpenge efter barnets fødsel. I særlige situationer kan I
            søge om ekstra uger.
          </p>
          <p className='mb-6 text-[1.5rem] leading-8 text-secondary'>
            I har ikke mulighed for at planlægge orloven efter barnets første år i barselsplanlæggeren, men hvis du pga. særlige forhold er forhindret i at
            holde 9 ugers orlov som lønmodtager, har du mulighed for at planlægge ugerne ud over barnets første leveår. Herudover kan I have ret til at udskyde
            op til 5 ugers orlov.
          </p>
          <p className='mb-6 text-[1.5rem] leading-8 text-secondary'>
            Læs meget mere om, hvad I har ret til, hvilke betingelser I skal opfylde, og hvilke frister I skal overholde på www.borger.dk/barsel.
          </p>
        </div>
      </div>

      <div>
        <div className={cn(s.EditPageSections_section_order)}>
          <Accordion className={cn(s.EditPageSections_accordionContainer)} allowMultipleExpanded allowZeroExpanded preExpanded={['leave-periods']}>
            <AccordionItem uuid={'leave-periods'} className={cn(s.EditPageSections_section, s.leave_periods, 'leave-periods')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>
                  <span className={cn(s.EditPageSections_screen)}>Orlovsperioder</span>
                  <span className={cn(s.EditPageSections_print)}>Detaljeret overblik over perioder med orlov</span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className={cn(s.EditPageSections_screen, 'text-[1.5rem] max-w-[768px] leading-8 text-secondary')}>
                  I har ikke mulighed for at vælge en lørdag eller søndag som start- eller slutdato i barselsplanlæggeren, da den ikke tager højde for weekend-
                  og turnusarbejde.
                </p>
                <p className={cn(s.EditPageSections_print, 'text-[1.5rem] max-w-[768px] leading-8 text-secondary')}>
                  Være opmærksom på, at I hver især har mulighed for at søge om 24 ugers orlov med barselsdagpenge efter barnets fødsel. I særlige situationer
                  kan I søge om ekstra uger. I har ikke mulighed for at planlægge orloven efter barnets første år i barselsplanlæggeren, men hvis du pga.
                  særlige forhold er forhindret i at holde 9 ugers orlov som lønmodtager, har du mulighed for at planlægge ugerne ud over barnets første leveår.
                  Herudover kan I have ret til at udskyde op til 5 ugers orlov. Læs meget mere om, hvad I har ret til, hvilke betingelser I skal opfylde, og
                  hvilke frister I skal overholde på www.borger.dk/barsel.
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionLeavePeriods />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.leave_transfer, 'leave-transfer')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Overdragelse</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <div className='md:w-[59%] mt-8'>
                  <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I skal være opmærksomme på, at I hver især har mulighed for at søge om 24 ugers orlov med
                    barselsdagpenge efter barnets fødsel. Når I har planlagt jeres orlov, skal I efterfølgende sikre jer at
                    overdrage og modtage det rette antal uger. Orloven skal være overdraget til den forælder, der
                    ønsker at holde den, og forælderen skal opfylde betingelserne for at kunne holde orloven. I kan
                    overdrage orloven i ‘Min Barsel’ på{' '}
                    <a
                      href='https://www.borger.dk/'
                      title='Selvbetjening på borger.dk'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      www.borger.dk
                    </a>
                  </p>

                  <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I skal være opmærksomme på, at I skal overdrage orloven, inden den kan afholdes. Hvis I ikke er
                    gift, skal far eller medmor hurtigst muligt efter fødslen registrere sig som forælder til barnet ved at
                    udfylde en ‘Omsorgs- og ansvarserklæring’ på{' '}
                    <a
                      href='https://www.borger.dk/familie-og-boern'
                      title='Selvbetjening på borger.dk'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      www.borger.dk/familie-og-boern
                    </a>
                  </p>

                  <p className='text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I kan læse mere om de nærmere betingelser for at overdrage og afholde orlov på{' '}
                    <a
                      href='https://www.borger.dk/familie-og-boern/barsel-oversigt'
                      title='Selvbetjening på borger.dk'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      www.borger.dk/barsel
                    </a>
                  </p>
                </div>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionTransfer />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.vacation, 'vacation')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Ferie</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Ønsker I at planlægge ferie i en periode, hvor der er planlagt orlov, skal I redigere orlovsperioden og herefter tilføje ferieperioden. Det er
                  muligt at tilføje en eller flere ferieperioder.
                </p>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Har I spørgsmål til jeres optjente ferie, skal I kontakte jeres arbejdsgivere. Husk også at Udbetaling Danmark skal have besked om jeres ferie
                  under jeres orlov. Skal I holde mere end 5 ugers ferie i træk, skal I være opmærksomme på, at I skal søge om barselsdagpenge igen, hvis I
                  ønsker at fortsætte orloven efter ferien.
                </p>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  I kan læse mere om ferie og barsel på{' '}
                  <a href='https://www.borger.dk/familie-og-boern/barsel-oversigt' title='Selvbetjening på borger.dk' target='_blank' rel='noopener noreferrer'>
                    www.borger.dk/barsel
                  </a>
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionVacation />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.financials, 'financials')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Økonomi</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Her er et overblik over jeres orlov efter fødslen, hvor I kan se, hvilke uger I får løn, og hvilke uger I får barselsdagpenge, ud fra jeres
                  indtastede oplysninger.
                </p>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Har I spørgsmål til, hvor meget orlov I kan holde med løn, skal I kontakte jeres fagforening eller arbejdsgivere.
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionFinancials />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.leave_total, 'leave-total')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Orlov i alt</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Her er et overblik over alt jeres orlov. Mors orlov er inklusiv graviditetsorloven, dvs. orloven før fødslen.
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionLeaveOfAbsence />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.leave_transfer, 'leave-transfer')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Overdragelse</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <div className='md:w-[59%] mt-8'>
                  <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I skal være opmærksomme på, at I hver især har mulighed for at søge om 24 ugers orlov med barselsdagpenge efter barnets fødsel. Når I har
                    planlagt jeres orlov, skal I efterfølgende sikre jer at overdrage og modtage det rette antal uger. Orloven skal være overdraget til den
                    forælder, der ønsker at holde den, og forælderen skal opfylde betingelserne for at kunne holde orloven. I kan overdrage orloven i ‘Min
                    Barsel’ på{' '}
                    <a href='https://www.borger.dk/' title='Selvbetjening på borger.dk' target='_blank' rel='noopener noreferrer'>
                      www.borger.dk
                    </a>
                  </p>

                  <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I skal være opmærksomme på, at I skal overdrage orloven, inden den kan afholdes. Hvis I ikke er gift, skal far eller medmor hurtigst muligt
                    efter fødslen registrere sig som forælder til barnet ved at udfylde en ‘Omsorgs- og ansvarserklæring’ på{' '}
                    <a href='https://www.borger.dk/familie-og-boern' title='Selvbetjening på borger.dk' target='_blank' rel='noopener noreferrer'>
                      www.borger.dk/familie-og-boern
                    </a>
                  </p>

                  <p className='text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                    I kan læse mere om de nærmere betingelser for at overdrage og afholde orlov på{' '}
                    <a
                      href='https://www.borger.dk/familie-og-boern/barsel-oversigt'
                      title='Selvbetjening på borger.dk'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      www.borger.dk/barsel
                    </a>
                  </p>
                </div>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionTransfer />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.important_info, 'important-info')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Vigtigt at huske</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Du skal være opmærksom på, at der er forskellige frister, du skal overholde, og hvis du ikke overholder fristerne, kan det påvirke dine
                  barselsdagpenge.
                  <br />
                  <br />
                  Du kan læse mere om fristerne på{' '}
                  <a href='https://www.borger.dk/familie-og-boern/barsel-oversigt' title='Selvbetjening på borger.dk' target='_blank' rel='noopener noreferrer'>
                    www.borger.dk/barsel
                  </a>
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionImportantInformation />
                </div>
              </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem className={cn(s.EditPageSections_section, s.remaining_leave_print, 'remaining-leave-print')}>
              <AccordionItemHeading>
                <AccordionItemButton className={cn(s.EditPageSections_heading, '')}>Resterende orlov</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={cn(s.EditPageSections_panel, s.EditPageSections_panelAvoidBreak, '')}>
                <p className='mb-6 text-[1.5rem] text-secondary leading-8 max-w-[768px]'>
                  Her er et overblik over den orlov I ikke har planlagt.
                </p>
                <div className={cn(s.EditPageSections_sectionItem, 'flex justify-between mt-6 md:mt-20')}>
                  <SectionRemainingLeavePrint />
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default EditPageSections;
