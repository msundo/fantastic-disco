import { useEffect, useState } from 'react';
import { useAppState } from '../context/state';

type calculatedLeaveType = {
  mother: {
    totalDays: number;
    individualDays: number;
    sharedDays: number;
  };
  partner: {
    totalDays: number;
    individualDays: number;
    sharedDays: number;
  };
};

const useCalculateLeave = () => {
  const { leave, tasks } = useAppState();

  const [calculatedLeave, setCalculatedLeave] = useState<calculatedLeaveType>();

  const calculateLeave = () => {
    const motherLeave = tasks.filter((task) => task.project === 'mother');
    const partnerLeave = tasks.filter((task) => task.project === 'partner');

    const motherLeaveDaysTotal = motherLeave.reduce((acc, task) => acc + task.motherIndividualDays + task.sharedDays, 0);
    const partnerLeaveDaysTotal = partnerLeave.reduce((acc, task) => acc + task.partnerIndividualDays + task.sharedDays, 0);

    return {
      mother: {
        totalDays: motherLeaveDaysTotal,
        individualDays: motherLeave.reduce((acc, task) => acc + task.motherIndividualDays, 0),
        sharedDays: motherLeave.reduce((acc, task) => acc + task.sharedDays, 0),
      },
      partner: {
        totalDays: partnerLeaveDaysTotal,
        individualDays: partnerLeave.reduce((acc, task) => acc + task.partnerIndividualDays, 0),
        sharedDays: partnerLeave.reduce((acc, task) => acc + task.sharedDays, 0),
      },
    };
  };

  useEffect(() => {
    setCalculatedLeave(calculateLeave());
  }, [tasks]);

  return { calculatedLeave };
};

export { useCalculateLeave };
