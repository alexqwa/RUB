import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity, ScrollView } from 'react-native';

import { Header } from '@/src/components/ui/Header';
import { PriceCard } from '@/src/components/ui/PriceCard';
import clsx from 'clsx';

const subscriptionPlans = [
  {
    title: 'Licença Mensal',
    price: '12,49',
    timestamp: '/mês',
    features: [
      'Suporte 24/7',
      'Remover anúncios',
      'Corredores sempre no verde',
      'Chat exclusivo para membros',
      'Todo os setores na palma da mão',
    ],
  },
  {
    title: 'Licença Trimestral',
    price: '32,99',
    timestamp: '/3 meses',
    features: [
      'Suporte 24/7',
      'Remover anúncios',
      'Corredores sempre no verde',
      'Chat exclusivo para membros',
      'Todo os setores na palma da mão',
    ],
  },
  {
    title: 'Licença Anual',
    price: '129,99',
    timestamp: '/anual',
    features: [
      'Suporte 24/7',
      'Remover anúncios',
      'Corredores sempre no verde',
      'Chat exclusivo para membros',
      'Todo os setores na palma da mão',
    ],
  },
];

export default function Pricing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function nextPlan() {
    if (currentIndex < subscriptionPlans.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevPlan() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <View className="bg-shapes-gray_200 flex-1 items-center">
      <Header title="Assinaturas" back />
      <ScrollView className="max-w-[85%] w-full flex-1">
        <PriceCard
          title={subscriptionPlans[currentIndex].title}
          price={subscriptionPlans[currentIndex].price}
          timestamp={subscriptionPlans[currentIndex].timestamp}
          features={subscriptionPlans[currentIndex].features}
        />
        <View
          className={clsx(
            'flex-row items-center justify-between relative mt-10',
            {
              ['justify-center h-10']: currentIndex === 0 || currentIndex > 1,
            }
          )}
        >
          <TouchableOpacity
            onPress={prevPlan}
            className={clsx('w-10 h-10 items-start justify-center', {
              ['absolute left-0']: currentIndex > 1,
              ['hidden']: currentIndex === 0,
            })}
          >
            <Feather name="arrow-left" size={24} color="#8257E5" />
          </TouchableOpacity>
          <View className="flex-row space-x-2">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <View
                  key={index}
                  className={clsx('w-2 h-2 rounded-full bg-shapes-gray_500', {
                    ['bg-shapes-purple_800']: currentIndex === index,
                  })}
                />
              ))}
          </View>
          <TouchableOpacity
            onPress={nextPlan}
            className={clsx('w-10 h-10 items-end justify-center', {
              ['absolute right-0']: currentIndex === 0,
              ['hidden']: currentIndex > 1,
            })}
          >
            <Feather name="arrow-right" size={24} color="#8257E5" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
