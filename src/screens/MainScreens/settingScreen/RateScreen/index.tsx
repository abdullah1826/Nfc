import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView } from 'react-native';

const RatingScreen = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const handleRatingChange = (value) => {
    // Ensure rating is between 1 and 5
    if (value >= 1 && value <= 5) {
      setRating(value);
    }
  };

  const handleSubmitRating = () => {
    // Logic to submit rating and description to backend or store locally
    console.log(`Rating: ${rating}, Description: ${description}`);
    // Reset rating and description after submission
    setRating(0);
    setDescription('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Rate This App</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Button
            key={index}
            title={`${index}`}
            onPress={() => handleRatingChange(index)}
            color={index <= rating ? '#FFD700' : '#A9A9A9'}
          />
        ))}
      </View>

      {/* Description Input */}
      <TextInput
        style={styles.descriptionInput}
        placeholder="Write a description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      {/* Submit Button */}
      <Button title="Submit Rating" onPress={handleSubmitRating} disabled={rating === 0} />
    </SafeAreaView>
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  descriptionInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
});

export default RatingScreen;
