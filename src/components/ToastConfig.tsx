import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ToastConfig } from 'react-native-toast-message';

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#333',
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
  },
  toastText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '400',
  },
});

const toastConfig: ToastConfig = {
  error: (props) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{props.text1}</Text>
    </View>
  ),
  success: (props) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{props.text1}</Text>
    </View>
  ),
};

export default toastConfig;
