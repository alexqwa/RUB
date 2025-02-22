import { Alert } from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../lib/axios';
import { today } from '../lib/dayjs';

interface Weekday {
  id: number;
  day: number;
  departamentId: number;
}

interface Departament {
  id: number;
  title: string;
  isActive: boolean;
  weekdays: Weekday[];
}

interface DepartamentContextType {
  departaments: Departament[];
  loading: boolean;
}

const DepartamentContext = createContext<DepartamentContextType | undefined>(
  undefined
);

export const DepartamentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [departaments, setDepartaments] = useState<Departament[]>([]);

  useEffect(() => {
    async function fetchDepartaments() {
      try {
        const response = await api.get<Departament[]>('/departaments');
        const updatedDepartaments = response.data.map((departament) => {
          const isActive = departament.weekdays.some(
            (weekday) => weekday.day === today // Certifique-se de que 'today' está definido
          );

          return {
            ...departament,
            isActive,
          };
        });

        setDepartaments(updatedDepartaments);
      } catch (error) {
        Alert.alert('Erro!', 'Erro ao buscar departamentos.', [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Buscar novamente',
            onPress: () => fetchDepartaments(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchDepartaments();
  }, []);

  return (
    <DepartamentContext.Provider value={{ departaments, loading }}>
      {children}
    </DepartamentContext.Provider>
  );
};

export const useDepartament = () => {
  const context = useContext(DepartamentContext);
  if (context === undefined) {
    throw new Error('useDepartament must be used within a DepartamentProvider');
  }
  return context;
};
