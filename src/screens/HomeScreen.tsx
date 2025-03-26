import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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

  const renderScene = ({route}: any) => {
    return (
      <FlatList
        data={route.key === 'ongoing' ? ongoingShows : comingNextShows}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{paddingTop: 10}}
        renderItem={({item, index}: {item: ShowItem; index: number}) => (
          <Pressable
            onPress={() => openLocationInMap(item.location)}
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: '#ffffffaf',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={index}>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{marginLeft: 0}}>{item.time}</Text>
                <Text style={{marginLeft: 10}}>{item.duration}</Text>
              </View>
            </View>
            <View style={{marginRight: 10, alignItems: 'flex-end'}}>
              <MapAnnotationIcon pColor={'#5B26FA'} sColor={'#5B26FA'} />
              <Text style={{marginLeft: 10}}>{item.location}</Text>
            </View>
          </Pressable>
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{routeParams?.name}</Text>
            <Text style={styles.subtitle}>
              {'Welcome to Art@IITGN Film Festival'}
            </Text>

            <Text style={styles.quickLinksTitle}>{'Quick links:'}</Text>
            <View style={styles.quickLinksContainer}>
              <Pressable
                style={styles.quickLinkButton}
                onPress={navigateToSchedule}>
                <Text style={styles.quickLinkText}>{'Check schedule'}</Text>
              </Pressable>
              <Pressable style={styles.quickLinkButton} onPress={navigateToFAQ}>
                <Text style={styles.quickLinkText}>{'FAQs'}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.tabContainer}>
            {routes.map((route_r, route_i) => {
              const isSelected = index === route_i;
              return (
                <TouchableOpacity
                  key={route_r.key}
                  style={[
                    styles.tabButton,
                    isSelected && styles.selectedTabButton,
                  ]}
                  onPress={() => setIndex(route_i)}>
                  <Text style={styles.tabText}>{route_r.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.sceneContainer}>
            {renderScene({ route: routes[index] })}
          </View>

          <View style={styles.locationsContainer}>
            <Text style={styles.locationsTitle}>{'Locations:'}</Text>
            <View style={styles.locationList}>
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => openLocationInMap('AB-10 103')}>
                <MapAnnotationIcon />
                <Text style={styles.locationText}>AB-10 103</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => openLocationInMap('New PC (Panchangana)')}>
                <MapAnnotationIcon />
                <Text style={styles.locationText}>New PC (Panchangana)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() =>
                  openLocationInMap(
                    'Jibaben Patel (Kanisa) Memorial Auditorium'
                  )
                }>
                <MapAnnotationIcon />
                <Text style={styles.locationText}>
                  Jibaben Patel (Kanisa) Memorial Auditorium
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  innerContainer: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    padding: 30,
  },
  header: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 44,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#B3B3B3', // Light gray text
  },
  quickLinksTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF', // White text
    marginTop: 20,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  quickLinkButton: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#1F1F1F', // Darker button background
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinkText: {
    color: '#BB86FC', // Accent color
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Darker border
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: '#121212', // Match background
  },
  selectedTabButton: {
    borderBottomColor: '#BB86FC', // Accent color for selected tab
  },
  tabText: {
    color: '#FFFFFF', // White text
  },
  sceneContainer: {
    marginTop: 8,
  },
  locationsContainer: {
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  locationsTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFFFFF', // White text
    marginTop: 20,
  },
  locationList: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: '#BB86FC', // Accent color
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
