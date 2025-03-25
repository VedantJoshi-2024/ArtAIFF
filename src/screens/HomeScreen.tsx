import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {Linking} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { MainNaivgatorType } from '../MainNavigator';
import { RouteName } from '../routes/RouteName';

interface ShowItem {
  title: string;
  time: string;
  duration: string;
  location: string;
}

const HomeScreen = () => {
  const navigation = useNavigation();
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
          backgroundColor: '#000',
          paddingVertical: 10,
        }}>
        {tabs.map((tab: any, i: number) => (
          <TouchableOpacity key={tab.key} onPress={() => onPress(i)}>
            <Text
              style={{
                color: tabIndex === i ? '#6528FF' : '#ccc',
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
    if (route.key === 'ongoing') {
      return (
        <FlatList
          data={ongoingShows}
          renderItem={({item}) => (
            <View style={{padding: 10, backgroundColor: '#333'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text>
                {item.location} | {item.time} | {item.duration}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    } else if (route.key === 'comingNext') {
      return (
        <FlatList
          data={comingNextShows}
          renderItem={({item}) => (
            <View style={{padding: 10, backgroundColor: '#333'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text>
                {item.location} | {item.time} | {item.duration}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      );
    }
  };

  const [routes] = useState([
    {key: 'ongoing', title: 'ONGOING'},
    {key: 'comingNext', title: 'COMING NEXT'},
  ]);

  const navigationState = {index, routes};

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
      <View style={{flex: 1, backgroundColor: '#fafafa', padding: 10}}>
        <View style={{padding: 20}}>
          <Text style={{fontSize: 24, color: '#000000', fontWeight: 'bold'}}>
            {routeParams?.name}
          </Text>
          <Text style={{fontSize: 16, color: '#ccc'}}>
            Welcome to Art@IITGN Film Festival
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Button
              title="SCHEDULE"
              onPress={() => navigation.navigate('Schedule' as never)}
            />
            <Button
              title="FAQ"
              onPress={() => navigation.navigate('FAQ' as never)}
            />
          </View>
        </View>

        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
        />

        <View style={{padding: 10}}>
          <Text style={{fontSize: 16, color: '#ccc', fontWeight: 'bold'}}>
            Locations
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}>
            <TouchableOpacity onPress={() => openLocationInMap('AB-10 103')}>
              <Text style={{color: '#fff'}}>AB-10 103</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openLocationInMap('New PC (Panchangana)')}>
              <Text style={{color: '#fff'}}>New PC (Panchangana)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                openLocationInMap('Jibaben Patel (Kanisa) Memorial Auditorium')
              }>
              <Text style={{color: '#fff'}}>
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
