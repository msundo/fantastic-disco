import cn from 'classnames';
import s from './EditItem.module.scss';

type Props = {
  title?: string;
  dates?: string;
  bodyText?: string;
  editType: 'disabled' | 'distribution' | 'edit';
  editText?: string;
  editHandler?: () => void;
};

const EditItem: React.FC<Props> = ({ title, dates, bodyText, editHandler, editType, editText }) => {
  return (
    <div className={cn(s.EditItem, '')}>
      <div className={cn(s.EditItem_heading, '')}>{title}</div>
      <div className={cn(s.EditItem_dates, '')}>{dates}</div>
      <div className={cn(s.EditItem_bodyText, '')}>{bodyText}</div>
      <div
        className={cn(s.EditItem_edit, editType === 'distribution' && s.EditItem_distribution, editType === 'disabled' && s.EditItem_editDisabled, '')}
        onClick={editHandler}
      >
        <div>
          {editText}
        </div>
      </div>
    </div>
  );
};

export default EditItem;
