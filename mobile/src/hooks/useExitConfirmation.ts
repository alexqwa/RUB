import React from 'react';
import { useState } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export function useExitConfirmation() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleExit = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        setModalVisible(true);
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => subscription.remove();
    }, [])
  );

  return {
    modalVisible,
    handleExit,
    handleCancel,
  };
}
