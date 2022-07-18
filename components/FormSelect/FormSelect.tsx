import cn from 'classnames';
import s from './FormSelect.module.scss';

type Option = {
  value: string;
  text: string;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
};

type Props = {
  value: string;
  name: string;
  options: Option[];
  changeHandler: (value: string) => void;
};

const FormSelect: React.FC<Props> = ({ value, name, options, changeHandler }) => {
  return (
    <div className={cn(s.FormSelect)}>
      <select
        className={cn(
          s.FormSelect_element,
          'border-2 border-solid rounded border-opacity-100 border-border-grey focus-visible:border-border-green outline-border-green'
        )}
        name={name}
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      >
        {options.map((option, index) => (
          <option value={option.value} disabled={option.disabled} hidden={option.hidden} key={index}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
