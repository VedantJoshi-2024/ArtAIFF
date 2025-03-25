import React from 'react';
import { View } from 'react-native';
import SplashIcon from '../assets/icons/SplashIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteName } from '../routes/RouteName';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(RouteName.UserDetailsScreen);
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