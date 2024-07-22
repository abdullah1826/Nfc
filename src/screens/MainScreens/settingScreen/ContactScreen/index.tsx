import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert ,Linking} from 'react-native';

import * as EmailValidator from 'email-validator'; // You may need to install this library

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleContact = () => {
    // Validate form fields
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!EmailValidator.validate(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Send email
    const emailContent = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Example: Using Linking to open email client
    const emailUrl = `mailto:info@avicennaenterprise.com?subject=Contact%20Form&body=${emailContent}`;
    Linking.openURL(emailUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <Button title="Contact" onPress={handleContact} />
    </View>
  );



  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default ContactUsScreen;
