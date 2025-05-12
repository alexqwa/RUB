import { useCallback, useState } from 'react';

const data = [
  { id: 0, name: 'Bipar todos os produtos', selected: false },
  { id: 1, name: 'Deixar poucos produtos', selected: false },
  { id: 2, name: 'Bipar de forma automática', selected: false },
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

  return { manipulations, toggleManipulation };
}
