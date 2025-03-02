import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UseLicenseKeyType {
  licenseKey: string;
  isChecked: boolean;
  handleCheckboxChange: (newValue: boolean) => Promise<void>;
  handleLicenseKeyChange: (text: string) => Promise<void>;
}

export function useLicenseKey(): UseLicenseKeyType {
  const [licenseKey, setLicenseKey] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    async function loadLicenseKey() {
      try {
        const storedLicenseKey = await AsyncStorage.getItem('licenseKey');
        if (storedLicenseKey) {
          setLicenseKey(storedLicenseKey);
          setIsChecked(true);
        }
      } catch (error) {
        console.error('Error loading license key:', error);
      }
    }

    loadLicenseKey();
  }, []);

  async function handleCheckboxChange(newValue: boolean) {
    setIsChecked(newValue);
    if (newValue) {
      try {
        await AsyncStorage.setItem('licenseKey', licenseKey);
      } catch (error) {
        console.error('Error saving license key:', error);
      }
    } else {
      await AsyncStorage.removeItem('licenseKey');
    }
  }

  async function handleLicenseKeyChange(text: string) {
    setLicenseKey(text);
    if (isChecked) {
      try {
        await AsyncStorage.setItem('licenseKey', text);
      } catch (error) {
        console.error('Error saving license key:', error);
      }
    }
  }

  return {
    licenseKey,
    isChecked,
    handleCheckboxChange,
    handleLicenseKeyChange,
  };
}
