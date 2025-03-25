import React from 'react';
import {View, Text, ScrollView} from 'react-native';

const FAQScreen = () => {
  const faqItems = [
    {
      question: 'What is the Art@IITGN Film Festival?',
      answer:
        'The Art@IITGN Film Festival is an event celebrating film and art, featuring screenings, discussions, and workshops.',
    },
    {
      question: 'How do I purchase tickets?',
      answer:
        'Tickets can be purchased online through our website or at the venue on the day of the event.',
    },
    {
      question: 'What are the festival dates?',
      answer: 'The festival will take place from March 29th to March 31st.',
    },
    {
      question: 'Where is the festival located?',
      answer:
        'The festival is held at IIT Gandhinagar, with screenings and events at various locations on campus.',
    },
    {
      question: 'Can I attend if I am not a student?',
      answer:
        'Yes, the festival is open to the public. Everyone is welcome to attend.',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#000', padding: 20}}>
      <Text style={{fontSize: 24, color: '#fff'}}>FAQs</Text>
      <ScrollView>
        {faqItems.map((item, index) => (
          <View key={index} style={{marginBottom: 20}}>
            <Text style={{fontSize: 16, color: '#ccc', fontWeight: 'bold'}}>
              {item.question}
            </Text>
            <Text style={{fontSize: 14, color: '#ccc'}}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FAQScreen;
