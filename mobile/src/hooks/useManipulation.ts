import { useCallback, useState, useMemo } from 'react';

const data = [
  { id: 0, name: 'Bipar todos os produtos', selected: false },
  { id: 1, name: 'Bipar de forma automática', selected: false },
  { id: 2, name: 'Deixar poucos produtos', selected: false },
];

const Manipulations = data.map((manipulation) => ({
  ...manipulation,
  selected: false,
}));

export function useManipulation() {
  const [manipulations, setManipulations] = useState(Manipulations);

  const toggleManipulation = useCallback((id: number) => {
    setManipulations((prevManipulations) => {
      return prevManipulations.map((manipulation) => {
        if (manipulation.id === id) {
          return {
            ...manipulation,
            selected: !manipulation.selected,
          };
        }
        return manipulation;
      });
    });
  }, []);

  const toggleFirstManipulation = useCallback(() => {
    console.log('Primeiro ativo');
    toggleManipulation(0);
  }, [toggleManipulation]);

  const toggleSecondManipulation = useCallback(() => {
    console.log('Segundo ativo');
    toggleManipulation(1);
  }, [toggleManipulation]);

  const toggleThirdManipulation = useCallback(() => {
    console.log('Terceiro ativo');
    toggleManipulation(2);
  }, [toggleManipulation]);

  const toggleFunctions = useMemo(() => {
    const funcs: { [key: number]: () => void } = {};
    for (const manipulation of manipulations) {
      if (manipulation.id === 0) {
        funcs[0] = toggleFirstManipulation;
      } else if (manipulation.id === 1) {
        funcs[1] = toggleSecondManipulation;
      } else if (manipulation.id === 2) {
        funcs[2] = toggleThirdManipulation;
      } else {
        funcs[manipulation.id] = () => toggleManipulation(manipulation.id);
      }
    }
    return funcs;
  }, [
    manipulations,
    toggleManipulation,
    toggleFirstManipulation,
    toggleSecondManipulation,
    toggleThirdManipulation,
  ]);

  return { manipulations, toggleFunctions };
}
