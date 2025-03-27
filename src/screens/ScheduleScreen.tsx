import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../assets/icons/BackIcon';
import { MainNaivgatorType } from '../MainNavigator';
import scheduleData from '../staticData/Schedule';
import Colors from '../constants/Colors'; // Add this import
import utils from '../utils/utils';
import { fonts } from '../constants/fonts';

const ScheduleScreen = () => {
  const scheduleDates = Object.keys(scheduleData);
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNaivgatorType>>();

  const [index, setIndex] = useState(0); // State to track the selected tab
  const scrollViewRef = useRef<ScrollView>(null); // Ref for the ScrollView
  const screenWidth = Dimensions.get('window').width; // Get screen width

  const navigateToPrevious = () => navigation.goBack();

  const handleTabPress = (tabIndex: number) => {
    setIndex(tabIndex);
    scrollViewRef.current?.scrollTo({
      x: tabIndex * screenWidth,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#1E1E1E'}}>
      {/* Header */}
      <Pressable onPress={navigateToPrevious} style={styles.header}>
        <BackIcon size={30} color={'#FFFFFF'} />
        <Text style={[styles.title, {marginLeft: 20, fontFamily: fonts.SGRegular}]}>
          {'Schedule'}
        </Text>
      </Pressable>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {scheduleDates.map((date, tabIndex) => {
          const isSelected = index === tabIndex;
          return (
            <TouchableOpacity
              key={date}
              style={[
                styles.tab,
                {borderBottomColor: isSelected ? '#FF00FF' : '#1E1E1E'},
              ]}
              onPress={() => handleTabPress(tabIndex)}>
              <Text
                style={[
                  styles.tabText,
                  {color: isSelected ? Colors.white : Colors.lightGray, fontFamily: fonts.SGRegular},
                ]}>
                {date}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tab Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {scheduleDates.map((date, tabIndex) => (
          <View key={date} style={{width: screenWidth}}>
            <FlatList
              data={scheduleData[date]}
              keyExtractor={(item, idx) => idx.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => utils.openLocationInMap(item.locations[0])}
                  style={[styles.scheduleItem]}>
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: utils.getLocationBackgroundColor(
                          item.locations[0],
                        ),
                      },
                    ]}
                  />
                  <View style={styles.textContainer}>
                    <Text style={[styles.title, {fontFamily: fonts.SGRegular}]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.details, {fontFamily: fonts.SGRegular}]}>
                      {item.time} | {item.locations.join(', ')}
                    </Text>
                  </View>
                </Pressable>
              )}
              contentContainerStyle={{paddingVertical: 10}}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.darkBackground, // Updated
  },
  header: {
    padding: 20,
    backgroundColor: Colors.darkGray, // Updated
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray, // Updated
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2.5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white, // Updated
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    marginHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.darkGray, // Updated
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.magenta, // Updated
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white, // Updated
  },
  details: {
    fontSize: 14,
    color: Colors.lightGray, // Updated
  },
});

export default ScheduleScreen;
