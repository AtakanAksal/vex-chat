/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useDataChannels } from './connectionsRest';

export function useDebounce(value: string, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const useKeyboardStatus = () => {
  const [keyboardStatus, setKeyboardStatus] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardStatus;
};

// export const useIsConvoStart = (user: any, userID: number) => {
//   const [isConvoStart, setIsConvoStart] = useState<boolean | undefined>(
//     undefined,
//   );
//   const { data } = useDataChannels(user.token);

//   // const { data, isLoading, isError } = useDataChannels(user.token);
//   const conversations = useDataChannels(user.token);

//   useEffect(() => {
//     if (data && conversations.data) {
//       setIsConvoStart(true);
//     }
//     console.log(userID);

//     return () => {
//       console.log('cleanUp-useIsConvoStart');
//     };
//   }, [data, conversations.data]);

//   return isConvoStart;
//   // if (!(isLoading || isError)) {

//   //   return true;
//   // }
//   // return false;
// };
