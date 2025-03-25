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
      if (name && contact) {
        setName(name);
        setContact(contact);
        return true;
      }
      setName('');
      setContact('');
      return false;
    } catch (e) {
      console.log(e);
      setName('');
      setContact('');
      return false;
    }
  };

  React.useEffect(() => {
    setTimeout(async () => {
      if (await isUserDetailsAvailable()) {
        navigation.replace(RouteName.HomeScreen, {name, contact});
      } else {
        navigation.replace(RouteName.UserDetailsScreen);
      }
    }, 500);
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