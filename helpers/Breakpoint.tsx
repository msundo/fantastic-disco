import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 480,
  md: 768,
  lg: 976,
  xl: 1200,
};

const getDeviceSize = (width: number) => {
  if (width < breakpoints['sm']) return 'sm';
  else if (width < breakpoints['md']) return 'md';
  else if (width < breakpoints['lg']) return 'lg';
  else return 'xl';
};

const useBreakpoint = () => {
  let windowWidth = 400;
  if (typeof window !== 'undefined') {
    windowWidth = window.innerWidth;
  }
  const [currentBreakpoint, setCurrentBreakpoint] = useState<null | number | string>(null);
  const [deviceWidth, setDeviceWidth] = useState<number>(windowWidth);

  useEffect(() => {
    const calcInnerWidth = () => {
      const width = window.innerWidth;
      setCurrentBreakpoint(getDeviceSize(width));
      setDeviceWidth(width);
    };

    calcInnerWidth();

    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return { currentBreakpoint, deviceWidth, breakpoints };
};

export { useBreakpoint };
