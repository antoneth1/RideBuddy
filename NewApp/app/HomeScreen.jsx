import React, { useState } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RideScreen from './RideScreen';
//export const userName = username;

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

// Define HomeScreen
export default function HomeScreen({navigation}) {

  const[email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const backendURL = 'http://10.138.3.223:8000/register/'
  // const backendURL = 'https://5335-108-16-89-229.ngrok-free.app/register/'
  //const backendNoReg = 'http://10.138.3.223:8000'
   const backendNoReg = 'https://5335-108-16-89-229.ngrok-free.app'
  //const backendURL = 'http://127.0.0.1:8000/register'
  //const backendNoReg = 'http://127.0.0.1:8000'

  // handles login
  const handleLogin = async (username, password) => {
      try {
        const response = await axios.post(`${backendNoReg}/api/token/`, {
        username,
        password,
      });
    
        const { access, refresh } = response.data;
    
        // Store tokens
        await AsyncStorage.setItem('accessToken', access); // Use EncryptedStorage for sensitive data
        await AsyncStorage.setItem('refreshToken', refresh);
    
        // Navigate to a new screen or update state
        console.log("Login successful!");
        navigation.navigate("RideScreen");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }; // end handleLogin

  return(
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in to RideSafe</Text>
      </View>

      {/* Username Box */}
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
          style={styles.inputControl}
            placeholder='User1234'
            placeholderTextColor= "#6b7280"
            value={username}
            onChangeText={username => setUsername(username)}
          />
        </View>

        {/* Email Box */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
          style={styles.inputControl}
            placeholder='doej@villanova.edu'
            placeholderTextColor= "#6b7280"
            value={email}
            onChangeText={email => setEmail(email)}  
          />
        </View>
      </View>
        
        {/* Password Box */}
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
          style={styles.inputControl}
            placeholder='*******'
            placeholderTextColor= "#6b7280"
            value={password}
            onChangeText={password => setPassword(password)}  
          />
        </View>
      </View>

      {/* Sign In Button */}
      <View style={styles.btn}>
      <Button
        title="Sign In"
        color="#FFFFFF"
        accessibilityLabel="Learn more about this purple button"
        onPress={() => 
        {
          handleLogin(username,password);
        }
        } // closes onPress
      />

      </View>

      <Text></Text>

      {/* Create Account Button */}
      <View style={styles.btn}>
      <Button
        title="Create Account"
        color="#FFFFFF"

        onPress={() => {
          console.log("Button pressed");
          axios({
            method: 'post',
            url: backendURL,
            data: {
              email: email,
              password: password,
              username: username,
            }
          })
          .then(response => {
            console.log('Account created successfully:', response.data);
          })
          .catch(error => {
            console.error('Error creating account:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'There was an issue creating your account.');
          });
        }
      } // closes onPress

      />
      </View>
    </View>
  ); // end return
}

const styles = StyleSheet.create({

  tinyLogo: {
    width: 50,
    height: 50,
  },

  container: {
    flex: 1,
    padding: 24,
    flex: 1,
  },
  
  header:{
    marginVertical: 60,
  },

  title:{
    fontSize: 27,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center"
  },

  // form
  form: {
    paddingHorizontal: 24,
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
  },
  
  // input
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl:{
    height: 50,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222"
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#000000",
  },
});