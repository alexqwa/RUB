import { router } from "expo-router"
import { Alert } from "react-native"
import { createContext, useContext, useState, ReactNode } from "react"
import { api } from "./axios"

interface License {
  id: number
  key: string
  createdAt: Date
  expiresAt: Date
  valid?: boolean
}

interface LicenseContextType {
  licenses: License[]
  verifyLicense: (licenseKey: string) => Promise<void>
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
        // Atualiza o estado de licenses
        const newLicense: License = {
          id: response.data.id,
          key: licenseKey,
          createdAt: new Date(response.data.createdAt),
          expiresAt: new Date(response.data.expiresAt),
        }
        setLicenses((prevLicenses) => [...prevLicenses, newLicense])

        router.replace("/(tabs)")
      } else {
        Alert.alert("Erro!", "Licença inválida ou expirada.", [
          {
            text: "OK",
            onPress: () => console.log("OK pressionado!"),
            style: "cancel",
          },
        ])
      }
    } catch (error) {
      console.error(error)
      Alert.alert("Erro!", "Erro ao verificar a licença.", [
        {
          text: "OK",
          onPress: () => console.log("OK pressionado!"),
          style: "cancel",
        },
      ])
    }
  }

  return (
    <LicenseContext.Provider value={{ licenses, verifyLicense }}>
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
