import cn from 'classnames';
import { useState } from 'react';
import RadioButton from '../RadioButton/RadioButton';
import s from './RadioButton.module.scss';

type Props = {
  buttonArray: [
    {
      value: string;
      label: string;
    }
  ];
  name: string;
  type: 'narrow' | 'medium' | 'wide';
  clickHandler: (value: boolean) => void;
};

const RadioButtonGroup: React.FC<Props> = ({ buttonArray, name, type = 'wide', clickHandler }: Props) => {
  const [currentValue, setCurrentValue] = useState('');
  const changeHandler = (event) => {
    clickHandler(event.target.value);
    setCurrentValue(event.target.value);
  };

  return (
    <>
      {buttonArray.map((button) => (
        <RadioButton
          key={button.value}
          value={button.value}
          currentValue={currentValue}
          name={name}
          type={type}
          label={button.label}
          changeHandler={changeHandler}
        />
      ))}
    </>
  );
};

export default RadioButtonGroup;
