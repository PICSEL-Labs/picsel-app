import { useState } from 'react';

export const useTermsAgreement = (initialLength: number = 5) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(initialLength).fill(false),
  );

  const isRequiredAllChecked = checkedStates.slice(0, 4).every(Boolean);

  const allChecked = checkedStates.every(Boolean);

  const toggleAll = () => {
    const newState = !allChecked;
    setCheckedStates(new Array(5).fill(newState));
  };

  const toggleItem = (index: number) => {
    const newStates = [...checkedStates];
    newStates[index] = !newStates[index];
    setCheckedStates(newStates);
  };

  return {
    checkedStates,
    setCheckedStates,
    toggleItem,
    toggleAll,
    allChecked,
    isRequiredAllChecked,
  };
};
