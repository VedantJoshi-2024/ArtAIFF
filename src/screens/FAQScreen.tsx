import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import FAQComponent from '../components/FAQComponent';
import faqItems from '../staticData/FAQs';
import BackIcon from '../assets/icons/BackIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainNaivgatorType } from '../MainNavigator';

const FAQScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainNaivgatorType>>();
  const navigateToPrevious = () => navigation.goBack();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable onPress={navigateToPrevious} style={styles.header}>
        <BackIcon size={30} color={'#FFFFFF'} />
        <Text style={[styles.title, {marginLeft: 20}]}>{'FAQs'}</Text>
      </Pressable>

      <Text style={[styles.subtitle, {paddingHorizontal: 20}]}>
        {'Art@IITGN Film Festival – Frequently Asked Questions (FAQs)'}
      </Text>

      {/* FAQ List */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {faqItems.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            {category.faqs.map((faq, faqIndex) => (
              <FAQComponent key={faqIndex} item={faq} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background
  },
  header: {
    padding: 20,
    backgroundColor: '#333333', // Dark gray background
    borderBottomWidth: 1,
    borderBottomColor: '#444444', // Slightly lighter gray for separation
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B3B3B3', // Light gray text
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
});

export default FAQScreen;
