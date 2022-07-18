import cn from 'classnames';
import { useState } from 'react';
import s from './RadioButton.module.scss';

type Props = {
  value: string;
  currentValue: string;
  label: string;
  name: string;
  type: 'narrow' | 'medium' | 'wide';
  changeHandler: (event) => void;
};

const extraClasses: Map<string, string> = new Map([
  ['narrow', 'w-[22rem]'],
  ['medium', 'w-[36rem]'],
  ['wide', 'w-[47rem]'],
]);

const RadioButton = ({ value, currentValue, name, label, type, changeHandler }: Props) => {
  return (
    <label
      className={cn(
        s.RadioButton,
        currentValue === value ? s.RadioButtonChecked : '',
        extraClasses.get(type),
        'flex justify-center items-center cursor-pointer border-2 border-solid rounded border-opacity-100 border-border-grey'
      )}
    >
      <input className={'hidden'} type='radio' checked={currentValue === value} onChange={(event) => changeHandler(event)} name={name} value={value} />
      {label}
    </label>
  );
};

export default RadioButton;
