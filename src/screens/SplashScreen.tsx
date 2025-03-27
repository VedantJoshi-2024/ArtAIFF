import React from 'react';
import { View, Text } from 'react-native';
import SplashIcon from '../assets/icons/SplashIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteName } from '../routes/RouteName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import { fonts } from '../constants/fonts';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const isUserDetailsAvailable = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const contact = await AsyncStorage.getItem('contact');
      if (name && contact && name.length > 0 && contact.length > 0) {
        return { name, contact };
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  React.useEffect(() => {
    (async () => {
      const userDetails = await isUserDetailsAvailable();
      if (userDetails) {
        const { name, contact } = userDetails;
        setTimeout(() => {
          navigation.replace(RouteName.HomeScreen, { name, contact });
        }, 500);
      } else {
        setTimeout(() => {
          navigation.replace(RouteName.UserDetailsScreen);
        }, 500);
      }
    })();
  }, []);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.purple,
      }}>
      <View
        style={{
          borderRadius: 260,
          height: 260,
          width: 260,
          backgroundColor: Colors.neonGreen,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SplashIcon w={268} h={210} />
      </View>
      <Text
        style={{
          fontFamily: fonts.SGRegular,
          fontSize: 40,
          color: Colors.neonGreen,
          width: '100%',
          textAlign: 'center',
          marginTop: 20,
          lineHeight: 45,
          fontWeight: '700',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}>
        {'ART@IITGN\nFilm\x20Festival\n2025'}
      </Text>
    </View>
  );
}

export default SplashScreen