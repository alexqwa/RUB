import { useRef } from 'react';
import { TextInput } from 'react-native';

export function useFocusNextInput() {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const addInputRef = (ref: TextInput | null) => {
    if (ref && !inputRefs.current.includes(ref)) {
      inputRefs.current.push(ref);
    }
  };

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return { addInputRef, focusNextInput };
}
