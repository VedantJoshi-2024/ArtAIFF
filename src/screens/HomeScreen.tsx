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
import SplashIcon from '../assets/icons/SplashIcon';
import Colors from '../constants/Colors';
import scheduleData, { ScheduleItem } from '../staticData/Schedule';
import moment from 'moment';
import utils from '../utils/utils';
import { fonts } from '../constants/fonts';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNaivgatorType>>();
  const routeParams =
    useRoute<RouteProp<MainNaivgatorType, RouteName.HomeScreen>>()?.params;

  const [index, setIndex] = useState(0);
  const dateToday = moment(new Date()).format('DD MMM');

  const allEvents = scheduleData;
  const onGoingEvents = allEvents[dateToday];
  const upcomingEvents = Object.keys(allEvents)
    .filter(date => date !== dateToday)
    .reduce((acc, date) => {
      acc[date] = allEvents[date];
      return acc;
    }, {} as Record<string, ScheduleItem[]>);

  const switchTab = () => {
    setIndex(index === 0 ? 1 : 0);
  };

  const renderScene = ({route}: any) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        onScrollBeginDrag={switchTab}
        contentContainerStyle={{width: '100%'}}>
        <FlatList
          data={
            route.key === 'ongoing'
              ? onGoingEvents
              : Object.values(upcomingEvents).flat()
          }
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={{paddingTop: 10}}
          renderItem={({item, index}: {item: ScheduleItem; index: number}) => {
            let duration = '';
            const startTime = moment(item.time?.split(' - ')[0], 'hh:mm');
            let endTime = moment(item.time?.split(' - ')[1], 'hh:mm');

            // Adjust for cases where end time is earlier than start time
            if (endTime.isBefore(startTime)) {
              endTime.add(12, 'hours');
            }

            const durationMinutes = endTime.diff(startTime, 'minutes');
            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;

            duration =
              (hours > 0 ? `${hours}h ` : '') +
              (minutes > 0 ? `${minutes}m` : '').trim();
            return (
              <Pressable
                onPress={() => utils.openLocationInMap(item.locations[0])}
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: Colors.lightWhite,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                key={index}>
                <View style={{width: '90%'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{marginLeft: 0}}>
                      {startTime.format('HH:MM')}
                    </Text>
                    <Text style={{marginLeft: 10}}>{duration}</Text>
                  </View>
                  <Text>{item.locations}</Text>
                </View>
                <View style={{marginRight: 10, alignItems: 'flex-end'}}>
                  <MapAnnotationIcon
                    pColor={utils.getLocationBackgroundColor(item.locations[0])}
                    sColor={utils.getLocationBackgroundColor(item.locations[0])}
                  />
                  {/* <Text style={{marginLeft: 10}}>{item.locations[0]}</Text> */}
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <Text style={[styles.quickLinkText, {textAlign: 'center'}]}>
              {`No ${
                route.key === 'ongoing' ? 'on going' : 'furthur'
              } events are there!`}
            </Text>
          )}
        />
      </ScrollView>
    );
  };

  const [routes] = useState([
    {key: 'ongoing', title: 'ONGOING'},
    {key: 'comingNext', title: 'COMING NEXT'},
  ]);

  const navigateToSchedule = () =>
    navigation.navigate(RouteName.ScheduleScreen);
  const navigateToFAQ = () => navigation.navigate(RouteName.FAQScreen);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <View
            style={{
              borderRadius: 105,
              height: 105,
              width: 105,
              backgroundColor: Colors.neonGreen,
            }}
          />
          <View style={{position: 'absolute', top: 30, left: 22}}>
            <SplashIcon w={180} h={143} />
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>{routeParams?.name}</Text>
            <Text style={styles.subtitle}>
              {'Welcome to Art@IITGN Film Festival'}
            </Text>

            <View style={styles.quickLinksContainer}>
              <Pressable
                style={styles.quickLinkButton}
                onPress={navigateToSchedule}>
                <Text style={styles.quickLinkText}>{'SCHEDULE'}</Text>
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
            {renderScene({route: routes[index]})}
          </View>

          <View style={styles.locationsContainer}>
            <Text style={styles.locationsTitle}>{'Locations:'}</Text>
            <View style={styles.locationList}>
              <TouchableOpacity
                style={[
                  styles.locationItem,
                  {
                    backgroundColor:
                      utils.getLocationBackgroundColor('AB-10 103'),
                  },
                ]}
                onPress={() => utils.openLocationInMap('AB-10 103')}>
                <Text style={styles.locationText}>AB-10 103</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.locationItem,
                  {
                    backgroundColor: utils.getLocationBackgroundColor(
                      'New PC (Panchangana)',
                    ),
                  },
                ]}
                onPress={() => utils.openLocationInMap('New PC (Panchangana)')}>
                <Text style={styles.locationText}>New PC (Panchangana)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.locationItem,
                  {
                    backgroundColor: utils.getLocationBackgroundColor(
                      'Jibaben Patel (Kanisa) Memorial Auditorium',
                    ),
                  },
                ]}
                onPress={() =>
                  utils.openLocationInMap(
                    'Jibaben Patel (Kanisa) Memorial Auditorium',
                  )
                }>
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
    backgroundColor: Colors.darkBackground, // Updated
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.darkBackground, // Updated
    padding: 30,
  },
  header: {
    // padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 44,
    color: Colors.white, // Updated
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.lightGray, // Updated
  },
  quickLinksTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.white, // Updated
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
    backgroundColor: Colors.purple, // Updated
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinkText: {
    color: Colors.white, // Updated
    fontWeight: '600',
    fontSize: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.scheduleItemBackground, // Updated
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2.5,
    borderBottomColor: Colors.tabHighlightColor, // Updated
  },
  selectedTabButton: {
    borderBottomColor: Colors.purple, // Updated
  },
  tabText: {
    color: Colors.white, // Updated
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
    color: Colors.white, // Updated
    marginTop: 20,
  },
  locationList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '30%',
  },
  locationText: {
    color: Colors.white, // Updated
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: fonts.BGCMedium,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default HomeScreen;
