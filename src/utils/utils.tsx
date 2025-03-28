import { Linking } from 'react-native';
import Colors from '../constants/Colors';

const getLocationBackgroundColor = (location: string) => {
  switch (location) {
    case 'AB-10 103':
      return Colors.purple; // Updated
    case 'New PC (Panchangana)':
      return Colors.neonGreen; // Updated
    case 'Jibaben Patel (Kanisa) Memorial Auditorium':
      return Colors.pink; // Updated
    default:
      return Colors.white; // Updated
  }
};

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

export default {
  getLocationBackgroundColor,
  openLocationInMap,
  // Add other utility functions here as needed
};
