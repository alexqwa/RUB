import { useLocalSearchParams } from 'expo-router';
import { useSharedValue } from 'react-native-reanimated';
import { View, Text, FlatList, ViewToken } from 'react-native';

import { Header } from '@/src/components/Header';
import { Checkbox } from '@/src/components/Checkbox';
import { StreetItem } from '@/src/components/StreetItem';
import { useManipulation } from '@/src/hooks/useManipulation';
import { useProductsByStreet } from '@/src/hooks/useProductsByStreet';

const data = [
  { id: 0, title: '38149: BISC RECH GULOSOS BAUDDUCO 140G', stock: 1433 },
  { id: 1, title: '49237: SUCO DE LARANJA INTEGRAL 1L TANG', stock: 3789 },
  { id: 2, title: '87420: ARROZ TIPO 1 COCINERO 5KG', stock: 4912 },
  { id: 3, title: '13598: FEIJAO PRETO GRANO BOM 1KG', stock: 1057 },
  { id: 4, title: '56984: COCA COLA PET 2L', stock: 2999 },
  { id: 5, title: '27634: SABAO EM PO OMO 2KG', stock: 456 },
  { id: 6, title: '91375: LEITE CONDENSADO MOÇA TP 395G', stock: 2278 },
  { id: 7, title: '48712: CAFÉ TORRADO PEABIRU 500G', stock: 3687 },
  { id: 8, title: '82469: MACARRÃO ESPAGUETE DECECCO 500G', stock: 2521 },
  { id: 9, title: '15724: DETERGENTE LÍQUIDO YPÊ 500ML', stock: 4370 },
  { id: 10, title: '63985: ÁGUA MINERAL SANTA CRUZ 1,5L', stock: 994 },
  { id: 11, title: '30852: AMAC FACILIT 500ML', stock: 4803 },
  { id: 12, title: '74239: ÓLEO DE SOJA LIZA 900ML', stock: 3567 },
  { id: 13, title: '41837: REFRIGERANTE GUARANÁ ANTARTICA 2L', stock: 2156 },
  { id: 14, title: '96412: LEITE UHT ITALAC INTEGRAL 1L', stock: 1689 },
  { id: 15, title: '83579: BISCOITO MAISENA MARILAN 400G', stock: 4112 },
  { id: 16, title: '20146: MIOJO GALINHA PINTADINHA 85G', stock: 574 },
  { id: 17, title: '69825: CREME DENTAL COLGATE TOTAL 90G', stock: 1307 },
  { id: 18, title: '38947: ENERGÉTICO RED BULL 250ML', stock: 3673 },
  { id: 19, title: '42753: ACHOCOLATADO NESTLÉ NESCAL 400G', stock: 2869 },
  { id: 20, title: '57013: CERVEJA BRAHMA LATA 350ML', stock: 3545 },
  { id: 21, title: '63428: GEL FIXADOR MONANGE 150G', stock: 1938 },
  { id: 22, title: '72194: DESINFETANTE PINE O CLEEN 500ML', stock: 2947 },
  { id: 23, title: '48269: SUCO DE UVA INTEGRAL 1L DEL VALLE', stock: 4870 },
  { id: 24, title: '19834: BOLACHA RECHEADA NESTLÉ 130G', stock: 743 },
  { id: 25, title: '35480: MELHEM DENTAL ORAL B 75ML', stock: 3283 },
  { id: 26, title: '60537: REPELENTE OFF AEROSOL 150ML', stock: 1225 },
  { id: 27, title: '79231: PROTETOR NATURAL 250ML', stock: 410 },
  { id: 28, title: '83156: QUEIJO MUÇARELA POLENGHI 500G', stock: 3936 },
  { id: 29, title: '26098: KETCHUP HEINZ TOMATE 397G', stock: 2850 },
  { id: 30, title: '47916: CHOCOLATE AO LEITE GAROTO 90G', stock: 1976 },
  { id: 31, title: '16837: MANTEIGA AVIAOZINHO 200G', stock: 2018 },
  { id: 32, title: '39041: ACHOCOLATADO SUCRILHOS 300G', stock: 4187 },
  { id: 33, title: '58402: SABONETE GLICERINA DOVE 90G', stock: 957 },
  { id: 34, title: '67398: PANETTONE BAUDUCCO 400G', stock: 455 },
  { id: 35, title: '95430: CAFÉ SOLÚVEL 3 CORAÇÕES 50G', stock: 3466 },
  { id: 36, title: '20387: LEITE EM PÓ NINHO FORTIFICADO 400G', stock: 3320 },
  { id: 37, title: '74612: BARRA DE CEREAL NESTLÉ 20G', stock: 1704 },
  { id: 38, title: '39984: GELATINA DR OETKER 20G', stock: 3151 },
  { id: 39, title: '65831: REFRIGERANTE PEPSI PET 2L', stock: 4342 },
  { id: 40, title: '78254: LEITE ZERO LACTOSE ITALAC 1L', stock: 1735 },
  { id: 41, title: '19027: MACARRÃO PARAFUSO RENATA 500G', stock: 371 },
  { id: 42, title: '52489: MOLHO DE TOMATE POMAROLA 340G', stock: 2619 },
  { id: 43, title: '30175: LATA ATUM RALADO COQUEIRO 170G', stock: 903 },
  { id: 44, title: '86742: SUCO TANG ABACAXI 25G', stock: 561 },
  { id: 45, title: '47803: CREME DE LEITE NESTLÉ TP 200G', stock: 4788 },
  { id: 46, title: '63529: GUARANA VITAMINADO 350ML', stock: 2359 },
  { id: 47, title: '78510: LEITE FERMENTADO ITAMBÉ 170G', stock: 2409 },
  { id: 48, title: '41267: CERVEJA SKOL LONG NECK 355ML', stock: 4894 },
  { id: 49, title: '35628: BOMBOM GAROTO AO LEITE 125G', stock: 1013 },
];

export default function PresenceRoute() {
  const { title, type, id } = useLocalSearchParams();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { manipulations, toggleFunctions } = useManipulation();
  const { products, loading } = useProductsByStreet(id.toString());

  return (
    <View className="flex-1 items-center bg-shapes-gray_200">
      <Header title={type.toString()} subtitle={title.toString()} back={true} />
      <View className="flex-1 w-full max-w-[85%] mt-14">
        <Text className="text-heading font-archivo_700 text-2xl mb-4">
          Formas de manipulação
        </Text>

        <View className="gap-3">
          {manipulations.map((manipulation) => {
            return (
              <View>
                <Checkbox
                  key={manipulation.id}
                  label={manipulation.name}
                  checked={manipulation.selected}
                  onPress={() => {
                    toggleFunctions[manipulation.id]();
                  }}
                />
              </View>
            );
          })}
        </View>

        <View className="flex-1 mt-6">
          <Text className="text-heading text-lg font-archivo_700 mb-4">
            Lista de produtos ({products.length}):
          </Text>
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.code)}
            contentContainerStyle={{ paddingBottom: 40 }}
            onViewableItemsChanged={({ viewableItems: viewItems }) => {
              viewableItems.value = viewItems;
            }}
            renderItem={({ item }) => (
              <StreetItem
                item={item}
                code={item.code}
                title={item.title}
                stock={item.stock}
                viewableItems={viewableItems}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
