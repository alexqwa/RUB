import dayjs from "dayjs"
import { router } from "expo-router"
import { Alert } from "react-native"
import { createContext, useContext, useState, ReactNode } from "react"

import { api } from "./axios"

interface License {
  id: number
  key: string
  createdAt: string
  expiresAt: string
  valid?: boolean
}

interface LicenseContextType {
  licenses: License[]
  verifyLicense: (licenseKey: string) => Promise<void>
  deleteLicense: (id: number) => void
}

const LicenseContext = createContext<LicenseContextType | undefined>(undefined)

export const LicenseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [licenses, setLicenses] = useState<License[]>([])

  async function verifyLicense(licenseKey: string) {
    try {
      const response = await api.post<License>("/verify-license", {
        key: licenseKey,
      })

      if (response.data.valid) {
        // Verifica se já existe uma licença válida
        const existingLicense = licenses.find(
          (license) => license.key === licenseKey
        )

        if (!existingLicense) {
          // Atualiza o estado de licenses apenas se não houver uma licença existente
          const newLicense: License = {
            id: response.data.id,
            key: licenseKey,
            createdAt: dayjs(response.data.createdAt).toISOString(), // Converte para ISO
            expiresAt: dayjs(response.data.expiresAt).toISOString(), // Converte para ISO
          }

          setLicenses((prevLicenses) => [...prevLicenses, newLicense])
        }

        router.replace("/(tabs)")
      } else {
        Alert.alert("Erro!", "Licença inválida ou expirada.", [
          {
            text: "OK",
            style: "cancel",
          },
        ])
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Erro!", "Erro ao verificar a licença.", [
        {
          text: "OK",
          style: "cancel",
        },
      ])
    }
  }

  async function deleteLicense(id: number) {
    setLicenses((prevLicenses) =>
      prevLicenses.filter((license) => license.id !== id)
    )
    router.replace("/license")
  }

  return (
    <LicenseContext.Provider value={{ licenses, verifyLicense, deleteLicense }}>
      {children}
    </LicenseContext.Provider>
  )
}

export const useLicense = () => {
  const context = useContext(LicenseContext)
  if (context === undefined) {
    throw new Error("useLicense must be used within a LicenseProvider")
  }
  return context
}
