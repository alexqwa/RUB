import clsx from 'clsx';
import { Feather } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import { AnimatePresence, MotiView } from 'moti';
import { View, Text, TouchableOpacity } from 'react-native';

const options: string[] = [
  'Bipar todos os produtos',
  'Deixar faltando poucos produtos',
  'Bipar de forma automática',
];

export function AnimatedDropdown() {
  const headerRef = useRef<View>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  function toggleDropdown() {
    setOpen((prev) => !prev);
  }

  function onSelect(option: string) {
    setSelected(option);
    setOpen(false);
  }

  return (
    <View className="w-full relative">
      <TouchableOpacity
        ref={headerRef}
        activeOpacity={0.7}
        onPress={toggleDropdown}
        className={clsx(
          'bg-white flex-row items-center justify-between rounded-lg px-4 h-13 border border-shapes-gray_400',
          {
            ['rounded-b-none']: open,
          }
        )}
      >
        <Text className="text-heading font-archivo_600 text-base">
          {selected ?? 'Selecione uma opção'}
        </Text>
        <AnimatePresence>
          {open ? (
            <MotiView
              from={{ rotate: '0deg' }}
              animate={{ rotate: '180deg' }}
              transition={{ type: 'timing', duration: 200 }}
            >
              <Feather name="chevron-down" size={18} color="#32264d" />
            </MotiView>
          ) : (
            <MotiView
              from={{ rotate: '180deg' }}
              animate={{ rotate: '0deg' }}
              transition={{ type: 'timing', duration: 200 }}
            >
              <Feather name="chevron-down" size={18} color="#32264d" />
            </MotiView>
          )}
        </AnimatePresence>
      </TouchableOpacity>

      <AnimatePresence>
        {open && (
          <MotiView
            from={{ height: 0 }}
            animate={{ height: options.length * 42 }}
            exit={{ height: 0 }}
            transition={{
              type: 'timing',
              duration: 200,
            }}
            className="absolute top-full left-0 -mt-[1px] bg-white w-full rounded-b-lg z-10 border border-shapes-gray_400 overflow-hidden px-4 py-2 space-y-2 divide-y-[1px] divide-shapes-gray_400"
          >
            {options.map((option: string) => (
              <TouchableOpacity
                key={option}
                onPress={() => onSelect(option)}
                className="pt-2"
                activeOpacity={0.8}
              >
                <Text className="text-sm font-poppins_400 text-subtitle">
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
}
