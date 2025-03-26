import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DownWardIcon from '../assets/icons/DownWardIcon';

const FAQComponent = ({ item }: { item: { question: string; answer: string } }) => {
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Pressable onPress={toggleExpand} style={styles.faqItem}>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{item.question}</Text>
        <View style={{ transform: [{ rotate: expanded ? '180deg' : '0deg' }] }}>
          <DownWardIcon color={'#FFFFFF'} w={20} h={20} />
        </View>
      </View>
      {expanded && <Text style={styles.answer}>{item.answer}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  faqItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#333333', // Dark gray background
    borderRadius: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    width: '90%',
  },
  answer: {
    fontSize: 14,
    color: '#B3B3B3', // Light gray text
    marginTop: 10,
    lineHeight: 20,
  },
});

export default FAQComponent;
