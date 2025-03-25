import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { MainNaivgatorType } from '../MainNavigator';
import { RouteName } from '../routes/RouteName';

const UserDetailsScreen = () => {
  const containsSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
  const containsDigits = /\d/;

  const navigation =
    useNavigation<NativeStackNavigationProp<MainNaivgatorType>>();

  const [name, setName] = React.useState<string>('');
  const [contact, setContact] = React.useState<string>('');

  const [nameError, setNameError] = React.useState<string>();
  const [contactError, setContactError] = React.useState<string>();

  const [isInValidName, setIsInValidName] = React.useState<boolean>(false);
  const [isInValidContact, setIsInValidContact] =
    React.useState<boolean>(false);

  const onPressSubmit = () => {
    if (
      name.replace(/\s/g, '').length === 0 ||
      contact.replace(/\s/g, '').length === 0
    ) {
      validateName(name);
      validateContact(contact);
    } else if (!isInValidContact && !isInValidName) {
      navigation.navigate(RouteName.HomeScreen, {props: {name, contact}});
    } else {
      Alert.alert(
        'Invalid Input',
        'Please enter valid name and contact number.',
      );
    }
  };

  const validateName = (name: string) => {
    if (name.replace(/\s/g, '').length === 0) {
      return {
        isInValid: true,
        message: 'Required',
      };
    } else if (
      containsSpecialCharacters.test(name) ||
      containsDigits.test(name)
    ) {
      return {
        isInValid: true,
        message: 'Your name must contain only letters',
      };
    } else if (name.length <= 4 || name.length > 250) {
      return {
        isInValid: true,
        message: 'Please enter a valid name',
      };
    } else {
      return {
        isInValid: false,
        message: '',
      };
    }
  };

  const validateContact = (contact: string) => {
    if (contact.replace(/\s/g, '').length === 0) {
      return {
        isInValid: true,
        message: 'Required',
      };
    } else if (!containsDigits.test(contact)) {
      return {
        isInValid: true,
        message: 'Your contact number must contain only digits',
      };
    } else if (contact.length != 10) {
      return {
        isInValid: true,
        message: 'Your contact number must be 10 digits',
      };
    } else {
      return {
        isInValid: false,
        message: '',
      };
    }
  };

  const onChangeName = (name: string) => {
    const validation = validateName(name);
    setIsInValidName(validation.isInValid);
    setNameError(validation.message);
    setName(name);
  };

  const onChangeContact = (contact: string) => {
    const validation = validateContact(contact);
    setIsInValidContact(validation.isInValid);
    setContactError(validation.message);
    setContact(contact);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      behavior={'padding'}>
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            paddingHorizontal: 34,
          }}>
          <Text
            style={{fontSize: 32, marginBottom: 40, textAlign: 'center'}}
            numberOfLines={2}>
            {'Welcome to ART@IITGN \nFilm Festival'}
          </Text>
          <View
            style={{
              backgroundColor: '#afbfa1',
              width: '100%',
              borderRadius: 10,
              padding: 40,
            }}>
            <Text style={{fontSize: 24, marginBottom: 20}}>
              {'Enter your name:'}
              <Text style={{color: '#ff0a0a'}}>{'\x20*'}</Text>
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: nameError ? 5 : 20,
              }}
              value={name}
              onChangeText={onChangeName}
            />
            {nameError ? (
              <Text style={{color: '#ff0a0a', marginBottom: 15}}>
                {nameError}
              </Text>
            ) : null}
            <Text style={{fontSize: 24, marginBottom: 20}}>
              {'Enter your contact information:'}
              <Text style={{color: '#ff0a0a'}}>{'\x20*'}</Text>
            </Text>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: contactError ? 5 : 20,
              }}
              value={contact}
              onChangeText={onChangeContact}
            />
            {contactError ? (
              <Text style={{color: '#ff0a0a', marginBottom: 15}}>
                {contactError}
              </Text>
            ) : null}
          </View>
          <Pressable
            onPress={onPressSubmit}
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: '#1F299B',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
              {'Submit'}
            </Text>
          </Pressable>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default UserDetailsScreen;
