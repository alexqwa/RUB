import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Finished from '@/src/assets/finished.svg';

interface SuccessfullModalProps extends TouchableOpacityProps {
  visible: boolean;
  onCancel: () => void;
}

export function SuccessfulModal({ visible, onCancel }: SuccessfullModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="flex-1 items-center justify-center bg-black/30">
        <View className="divide-y-[1px] max-w-[85%] w-full divide-[#E6E6F0]">
          <View className="bg-white rounded-t-lg p-6 items-center justify-center space-y-2">
            <Finished />
            <Text className="font-archivo_700 text-heading text-2xl text-center">
              Compra realizada{'\n'}com sucesso!
            </Text>
          </View>
          <View className="bg-white p-6 rounded-b-lg">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              className="bg-shapes-purple_500 p-4 rounded-lg items-center justify-center"
            >
              <Text className="font-archivo_600 text-white text-base">
                Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
