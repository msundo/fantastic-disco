import cn from 'classnames';
import s from './Button.module.scss';
import Image from 'next/image';

type Props = {
  text?: string;
  type: 'primary' | 'secondary' | 'icon' | 'tertiary' | 'delete';
  disabled?: boolean;
  clickHandler?: () => void;
  classNames?: string;
};

const extraClasses: Map<string, string> = new Map([
  ['primary', 'bg-primary text-white'],
  ['secondary', 'bg-secondary text-white'],
  ['icon', 'bg-icon text-white'],
  ['tertiary', 'bg-tertiary text-grey-font no-underline'],
  ['delete', ''],
]);

const Button = ({ text, type, classNames = '', disabled = false, clickHandler }: Props) => {
  return (
    <button
      className={cn(classNames, s.Button, extraClasses.get(type), 'cursor-pointer rounded flex justify-center items-center relative')}
      disabled={disabled}
      onClick={clickHandler}
    >
      {text ? text : <Image src='/svgs/arrow.svg' alt='icon' width={30} height={22} />}
    </button>
  );
};

export default Button;
