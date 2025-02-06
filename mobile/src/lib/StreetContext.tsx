import dayjs from "dayjs"
import { createContext, useContext, useState, ReactNode } from "react"

import { api } from "./axios"

interface Street {
  id: number
  code: string
  title: string
  weekday: number
  isActive: boolean
  departamentId: number
}

interface StreetContextType {
  streets: Street[]
  getStreetsByEnvironment: (id: string) => Promise<void>
  loading: boolean
}

const StreetContext = createContext<StreetContextType | undefined>(undefined)

export const StreetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true)
  const [streets, setStreets] = useState<Street[]>([])

  async function getStreetsByEnvironment(id: string) {
    try {
      const response = await api.get<Street[]>(`/departaments/${id}/streets`)
      const updatedStreets = response.data.map((street) => {
        const isActive = street.weekday === dayjs().day()

        return {
          ...street,
          isActive,
        }
      })

      setStreets(updatedStreets)
    } catch (error) {
      console.error("Erro ao buscar ruas", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StreetContext.Provider
      value={{ streets, loading, getStreetsByEnvironment }}
    >
      {children}
    </StreetContext.Provider>
  )
}

export const useStreet = () => {
  const context = useContext(StreetContext)
  if (context === undefined) {
    throw new Error("useStreet must be used within a StreetProvider")
  }
  return context
}
