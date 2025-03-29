import { Feather } from '@expo/vector-icons';
import { Modal, Text, View, TouchableOpacity } from 'react-native';

interface ExitModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExitModal({ visible, onCancel, onConfirm }: ExitModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/30">
        <View className="bg-white border border-shapes-gray_400 p-6 rounded-lg max-w-[85%] w-full items-center">
          <Text className="font-archivo_700 text-xl text-heading">
            Deseja sair ?
          </Text>
          <View className="flex-row space-x-4 mt-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onConfirm}
              className="bg-red-500 p-4 rounded-lg flex-1 items-center justify-center flex-row space-x-2"
            >
              <Feather name="log-out" color="#fff" size={18} />
              <Text className="text-white font-archivo_600 text-base">Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              className="bg-shapes-purple_500 p-4 rounded-lg flex-1 items-center justify-center flex-row space-x-2"
            >
              <Feather name="minimize-2" color="#fff" size={18} />
              <Text className='text-white font-archivo_600 text-base"'>
                Não
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
