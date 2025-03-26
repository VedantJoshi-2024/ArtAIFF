import React from 'react';
import { View } from 'react-native';
import SplashIcon from '../assets/icons/SplashIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteName } from '../routes/RouteName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [name, setName] = React.useState<string>('');
  const [contact, setContact] = React.useState<string>('');

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
        setName(name);
        setContact(contact);
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#afbfa1',
      }}>
        <SplashIcon w={450} h={353} />
    </View>
  );
}

export default SplashScreen