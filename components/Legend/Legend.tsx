import cn from 'classnames';
import { useState } from 'react';
import s from './Legend.module.scss';

type Props = {
  partnerColor: string;
  motherColor: string;
  vacationColor: string;
};

const Legend = ({ partnerColor, motherColor, vacationColor }: Props) => {
  return (
    <div className={s.legend}>
      <div className={s.legendItem}>
        <div className={s.legendItemColor} style={{ backgroundColor: motherColor }} />
        <div className={s.legendItemColor} style={{ backgroundColor: partnerColor }} />
        <div className={s.legendItemText}>Orlov</div>
      </div>
      <div className={s.legendItem}>
        <div className={s.legendItemColor} style={{ backgroundColor: vacationColor }} />
        <div className={s.legendItemText}>Ferie</div>
      </div>
    </div>
  );
};

export default Legend;
