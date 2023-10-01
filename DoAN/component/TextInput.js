import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={'white'}
        underlineColor="transparent"
        mode="outlined"
        {...props}
        outlineColor="#3E427B" // Màu border khi input được focus
        outlineWidth={2}    // Độ rộng của border khi input được focus


      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
  },
  description: {
    fontSize: 13,
    color: 'black',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color:'black',
    paddingTop: 8,
  },
})