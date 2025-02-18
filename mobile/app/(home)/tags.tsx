import React from 'react';
import { router } from 'expo-router';
import { View, FlatList, ScrollView, ActivityIndicator } from 'react-native';

import { weekday, date_month } from '@/src/lib/dayjs';
import { useDepartament } from '@/src/context/DepartamentContext';

import { Header } from '@/src/components/ui/Header';
import { Warning } from '@/src/components/ui/Warning';
import { Departament } from '@/src/components/ui/Departament';
import { EnvironmentsDate } from '@/src/components/EnvironmentsDate';

export default function Tags() {
  const { departaments, loading } = useDepartament();

  return (
    <View className="items-center bg-shapes-background flex-1">
      <Header title="Auditoria de Etiquetas" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full max-w-[90%] pt-10"
      >
        <EnvironmentsDate date={date_month} weekday={weekday} />
        {loading ? (
          <ActivityIndicator size="small" color="#32264D" />
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
