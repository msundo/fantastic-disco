export const getWeeksAndDays = (days: number) => {
  let daysReducer = days;
  let weeksTotal = 0;
  if (days < 1) return '0 uger';
  for (let i = 0; i < days; i++) {
    if (days >= 5) {
      weeksTotal++;
      daysReducer -= 5;
    }

    if (daysReducer < 5) {
      const weeksString = weeksTotal > 1 ? ' uger' : ' uge';
      const daysString = daysReducer > 1 ? ' hverdage' : ' hverdag';
      return `${weeksTotal > 0 && daysReducer > 0 ? weeksTotal + weeksString + ', ' : weeksTotal > 0 && daysReducer <= 0 ? weeksTotal + weeksString : ''}${
        daysReducer > 0 ? daysReducer + daysString : ''
      }`;
    }
  }

  // return {
  //   weeks: Math.floor(days / 7),
  //   days: days,
  // };
};
