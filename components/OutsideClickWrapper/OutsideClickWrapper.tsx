import React, { useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
  onClickOutside: (isVisible: boolean) => void;
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
// const useOutsideAlerter = (ref, onClickOutside) => {
//   useEffect(() => {
//     /**
//      * Alert if clicked on outside of element
//      */
//     const handleClickOutside = (event: { target: any }) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         alert('You clicked outside of me!');
//         onClickOutside;
//       }
//     };
//     // Bind the event listener
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       // Unbind the event listener on clean up
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [ref]);
// };

const OutsideClickWrapper = ({ children, onClickOutside }: Props) => {
  const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, onClickOutside);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: { target: any }) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        console.log('You clicked outside of me!');
        onClickOutside(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, wrapperRef]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickWrapper;
