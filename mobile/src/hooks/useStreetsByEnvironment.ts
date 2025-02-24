import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { api } from '../lib/axios';

interface Street {
  id: number;
  code: string;
  title: string;
  weekday: number;
  isActive: boolean;
}

export function useStreetsByEnvironment(id: string) {
  const [streets, setStreets] = useState<Street[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getStreetsByEnvironment() {
      try {
        const response = await api.get<Street[]>(`/departaments/${id}/streets`);
        const updatedStreets = response.data.map((street) => {
          const isActive = street.weekday === dayjs().day();

          return {
            ...street,
            isActive,
          };
        });

        setStreets(updatedStreets);
      } catch (error) {
        console.error('Erro ao buscar ruas', error);
      } finally {
        setLoading(false);
      }
    }

    getStreetsByEnvironment();
  }, [id]);

  return { streets, loading };
}
