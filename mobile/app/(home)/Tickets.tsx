import React from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useDepartament } from '@/src/context/DepartamentContext';

import { Header } from '@/src/components/ui/Header';
import { Warning } from '@/src/components/ui/Warning';
import { Departament } from '@/src/components/ui/Departament';
import { EnvironmentsDate } from '@/src/components/ui/EnvironmentsDate';

export default function Tickets() {
  const { departaments, loading } = useDepartament();

  return (
    <View className="items-center bg-shapes-gray_200 flex-1">
      <Header title="Auditoria de Etiquetas" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[85%] pt-10"
      >
        <EnvironmentsDate />
        {loading ? (
          <View className="py-10 items-center space-y-2">
            <ActivityIndicator size="small" color="#32264D" />
            <Text className="font-archivo_700 text-base text-heading">
              Carregando informações!
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={departaments}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <Departament
                  title={item.title}
                  isActive={item.isActive}
                  onPress={() =>
                    router.push({
                      pathname: '/tags/[id]',
                      params: { id: item.id, title: item.title },
                    })
                  }
                />
              )}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
            <Warning />
          </>
        )}
      </ScrollView>
    </View>
  );
}
