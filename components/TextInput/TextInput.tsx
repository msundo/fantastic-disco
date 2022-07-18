import cn from 'classnames';
import FormLabel from '../FormLabel';
import s from './TextInput.module.scss';

type Props = {
  label: string;
  ariaLabel: string;
  value: string;
  tooltipText?: string;
  tooltipTitle?: string;
  changeHandler: (value: string) => void;
  classNames?: string;
};

const TextInput: React.FC<Props> = ({ label, ariaLabel, value, changeHandler, tooltipText, tooltipTitle, classNames }: Props) => {
  return (
    <div className={'flex flex-col mr-4 ml-4 mb-8'}>
      {/* <label className={cn(s.TextInput_label)}>{label}</label> */}
      <FormLabel labelText={label} tooltipText={tooltipText} tooltipTitle={tooltipTitle} />

      <input
        className={cn(
          s.TextInput,
          'border-2 border-solid rounded border-opacity-100 border-border-grey focus-visible:border-border-green outline-border-green',
          classNames
        )}
        type='text'
        aria-label={ariaLabel}
        onChange={(event) => changeHandler(event.target.value)}
        value={value}
      />
    </div>
  );
};

export default TextInput;
