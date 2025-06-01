import { useCallback, useState, useMemo } from 'react';

const data = [
  { id: 0, name: 'Deixar abaixo de 1%', selected: false },
  { id: 1, name: 'Bipar todos os produtos', selected: false },
  { id: 2, name: 'Bipar aleatóriamente', selected: false },
];

interface CustomActionsType {
  [key: number]: () => void;
}

export function useManipulation(customActions: CustomActionsType) {
  const [manipulations, setManipulations] = useState(data);

  const toggleManipulation = useCallback((id: number) => {
    setManipulations((prevManipulations) =>
      prevManipulations.map((manipulation) =>
        manipulation.id === id
          ? { ...manipulation, selected: true }
          : manipulation
      )
    );
  }, []);

  const toggleFunctions = useMemo(() => {
    return manipulations.reduce((acc, manipulation) => {
      acc[manipulation.id] = () => toggleManipulation(manipulation.id);
      return acc;
    }, {} as Record<number, () => void>);
  }, [manipulations, toggleManipulation]);

  const actionFunctions = useMemo(() => {
    return manipulations.reduce((acc, manipulation) => {
      acc[manipulation.id] =
        customActions && customActions[manipulation.id]
          ? customActions[manipulation.id]
          : () => {};
      return acc;
    }, {} as Record<number, () => void>);
  }, [manipulations, customActions]);

  return { manipulations, toggleFunctions, actionFunctions };
}
