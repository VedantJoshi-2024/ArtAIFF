import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapAnnotationIcon from '../assets/icons/MapAnnotationIcon';
import { MainNaivgatorType } from '../MainNavigator';
import { RouteName } from '../routes/RouteName';

interface ShowItem {
  title: string;
  time: string;
  duration: string;
  location: string;
}

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNaivgatorType>>();
  const routeParams =
    useRoute<RouteProp<MainNaivgatorType, RouteName.HomeScreen>>()?.params;

  const [ongoingShows, setOngoingShows] = useState<ShowItem[]>([
    {
      title: 'The 400 Blows',
      time: '2:00 PM',
      duration: '65m',
      location: 'AB-10 103',
    },
    {
      title: 'Priscilla',
      time: '2:00 PM',
      duration: '65m',
      location: 'AB-10 103',
    },
    {title: 'Patthh', time: '2:00 PM', duration: '65m', location: 'AB-10 103'},
    {
      title: 'Jules and Jim',
      time: '2:00 PM',
      duration: '65m',
      location: 'AB-10 103',
    },
  ]);

  const [comingNextShows, setComingNextShows] = useState<ShowItem[]>([
    {
      title: 'Sample Film A',
      time: '4:00 PM',
      duration: '60m',
      location: 'New PC (Panchangana)',
    },
    {
      title: 'Sample Film B',
      time: '5:00 PM',
      duration: '90m',
      location: 'Jibaben Patel (Kanisa) Memorial Auditorium',
    },
  ]);

  const [index, setIndex] = useState(0);

  const renderTabBar = ({tabIndex, onPress}: any) => {
    const tabs = [
      {key: 'ongoing', title: 'ONGOING'},
      {key: 'comingNext', title: 'COMING NEXT'},
    ];

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: '#acacac',
          paddingVertical: 10,
        }}>
        {tabs.map((tab: any, i: number) => (
          <TouchableOpacity key={tab.key} onPress={onPress}>
            <Text
              style={{
                fontSize: 16,
              }}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderScene = ({route}: any) => {
    return (
      <FlatList
        data={route.key === 'ongoing' ? ongoingShows : comingNextShows}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{paddingTop: 10}}
        renderItem={({item, index}: {item: ShowItem; index: number}) => (
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: '#aaaffc4f',
            }}
            key={index}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginLeft: 0}}>{item.location}</Text>
              <Text style={{marginLeft: 10}}>{item.time}</Text>
              <Text style={{marginLeft: 10}}>{item.duration}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const [routes] = useState([
    {key: 'ongoing', title: 'ONGOING'},
    {key: 'comingNext', title: 'COMING NEXT'},
  ]);

  const navigateToSchedule = () =>
    navigation.navigate(RouteName.ScheduleScreen);
  const navigateToFAQ = () => navigation.navigate(RouteName.FAQScreen);

  const openLocationInMap = async (location: string) => {
    let url = '';
    switch (location) {
      case 'AB-10 103':
        url = 'https://maps.app.goo.gl/EfxoDFUmec6DQtUv8';
        break;
      case 'New PC (Panchangana)':
        url = 'https://maps.app.goo.gl/ckQYFVyX3xEDoRar9';
        break;
      case 'Jibaben Patel (Kanisa) Memorial Auditorium':
        url = 'https://maps.app.goo.gl/Vk814x1sJygqDsEw7';
        break;
    }
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log('Cannot open URL');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fafafa', padding: 30}}>
        <View style={{padding: 20, width: '100%'}}>
          <Text style={{fontSize: 44, color: '#000000', fontWeight: 'bold'}}>
            {routeParams?.name}
          </Text>
          <Text style={{fontSize: 16, color: '#0c0c0c'}}>
            {'Welcome to Art@IITGN Film Festival'}
          </Text>

          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20}}>
            {'Quick links:'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Pressable
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#aaaffc',
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={navigateToSchedule}>
              <Text style={{color: '#6528FF', fontWeight: 600}}>
                {'Check schedule'}
              </Text>
            </Pressable>
            <Pressable
              style={{
                borderRadius: 10,
                padding: 15,
                backgroundColor: '#aaaffc',
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={navigateToFAQ}>
              <Text style={{color: '#6528FF', fontWeight: 600}}>{'FAQs'}</Text>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 24,
            justifyContent: 'space-between',
            width: '100%',
            borderBottomWidth: 1,
          }}>
          {routes.map((route_r, route_i) => {
            const isSelected = index === route_i;
            return (
              <TouchableOpacity
                key={route_r.key}
                style={{
                  padding: 10,
                  borderBottomWidth: 2.5,
                  borderBottomColor: isSelected ? '#6528FF' : '#fafafa',
                }}
                onPress={() => setIndex(route_i)}>
                <Text
                  style={{
                    color: '#323222',
                  }}>
                  {route_r.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{marginTop: 8}}>
          {renderScene({route: routes[index]})}
        </View>

        <View
          style={{
            padding: 10,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20}}>
            {'Locations:'}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => openLocationInMap('AB-10 103')}>
              <MapAnnotationIcon />
              <Text
                style={{
                  color: '#1F299B',
                  textDecorationLine: 'underline',
                  marginLeft: 10,
                }}>
                AB-10 103
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => openLocationInMap('New PC (Panchangana)')}>
              <MapAnnotationIcon />
              <Text
                style={{
                  color: '#1F299B',
                  textDecorationLine: 'underline',
                  marginLeft: 10,
                }}>
                New PC (Panchangana)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() =>
                openLocationInMap('Jibaben Patel (Kanisa) Memorial Auditorium')
              }>
              <MapAnnotationIcon />
              <Text
                style={{
                  color: '#1F299B',
                  textDecorationLine: 'underline',
                  marginLeft: 10,
                }}>
                Jibaben Patel (Kanisa) Memorial Auditorium
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
