import type { NextPage } from 'next'
import { useEffect } from 'react'
import Button from '../components/Button'
import FormLabel from '../components/FormLabel'
import RadioButton from '../components/RadioButton'
import { useAppState } from '../context/state'

const Test: NextPage = () => {

  const popup = {
    title: 'Are you sure test?',
    message: 'You are about to leave this page. test',
    acceptButtonText: 'Accept',
    rejectButtonText: 'Reject',
    onAccept: () => {},
    onReject: () => {}
  }
  const state = useAppState();
  const loadPopup = () => {
    state.updatePopupContext(popup);
  }
  useEffect(() => {
    loadPopup(); 
  }, []);
  const showPopup = () => {
    state.updatePopupVisibility(true);
  }
  return (
    <div>
      <div className='mb-10 flex'>
        <Button type='icon'></Button>
        <Button text='asdasd' type='primary'></Button>
      </div>
      <div className='mb-10'>
        <RadioButton value={'test1'} name={'test'} type={'wide'} placeholder={'test 1'} />
        <RadioButton value={'test2'} name={'test'} type={'wide'} placeholder={'test 2'} />
        <RadioButton value={'test3'} name={'test'} type={'wide'} placeholder={'test 3'} />
        <RadioButton value={'test4'} name={'test'} type={'wide'} placeholder={'test 4'} />
      </div>
      <div className='mb-10 flex max-w-md'>
        <FormLabel labelText={'Fordelingstyper'} tooltipTitle={'Hvad er fordelingstyper?'} tooltipText={'Det dækker over hvordan jeres udgangspunkt for planlægning er. Fordelingstypen kan ændres og justeres senere i planlægningen.'}/>
      </div>
      <Button type={'primary'} text={'click me'} clickHandler={showPopup}></Button>
    </div>
  )
}

export default Test
