import React, { useState } from 'react';
import axios, {isCancel, AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';

const username = "Alex";

export default function RideScreen(){
  const[ride, setRide] = useState('');
  const[rideList,setRideList] = useState([]);
  const[idCounter, setIdCounter] = useState(1);

  const addList = () =>{
    if(ride.trim() !== ''){
      const newRide = {id: idCounter, value: ride};
      setRideList(prevList => [...prevList, newRide]);
      setRide('');
      setIdCounter(prevCounter => prevCounter + 1);
    }
    else{
      alert("Please enter ride details");
    }
  };

  const endRide = (rideId) => {
    // Filter out the ride that matches the rideKey
    setRideList(prevList => prevList.filter(item => item.id !== rideId)); // sets the RideList to be the list of items without the key we clicked
  };

  return(
  <View>
      {/* Text Input to allow user to type in their ride */}
      <TextInput
        style={styles.textInput}
        placeholder="Enter your ride details..."
        placeholderTextColor= "#6b7280"
        value={ride}
        onChangeText={setRide}  // Update the ride state as user types
      />

      {/* post ride button */}
      <TouchableOpacity
        style={styles.postRide}
        onPress={addList}
      >
        <Text style={styles.postRideText}>Post Ride</Text>
      </TouchableOpacity>
      
      {/* Flat List to display rides */}
      <FlatList
      /*data and renderItem are parameters of FlatList*/
      data={rideList}
      renderItem={({item}) => (
        <View style={styles.rideItem}>
          <Text style={styles.rideText} >{`${username}'s Ride 🚗: ${item.value}`}</Text>
          <View style={styles.rideButton}>
            <TouchableOpacity 
              style={styles.endRideButton}
              onPress={() => endRide(item.id)}
            >
              <Text style={styles.endRideText}>Close Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      )} // end renderItem
      keyExtractor={item => item.id.toString()}
      />
  </View>
  );
} // end RideScreen

const styles = StyleSheet.create({

  textInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    width: '50%',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    fontSize: 16,
  },

  postRide:{
    backgroundColor: "black",
    borderColor: "black",
    fontWeight: "bold",
    width: '40%',
    borderRadius: 20,
    paddingVertical: 20,
    borderWidth: 5,
    marginBottom: 10,
    marginRight: 10, // Adjusted right margin here
    marginLeft: 10,
    marginTop: 10,
    alignItems: 'center', // Align in the middle of the vertical axis
    alignSelf: "center",

  },
  postRideText:{
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  rideButton: {
    width: '30%',
    alignSelf: "flex-end",
    borderRadius: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'red',
    marginBottom: 10,
    marginRight: 10, // Adjusted right margin here
    flexDirection: 'row', // Button and text will be on the same line
    alignItems: 'center', // Align in the middle of the vertical axis

  },

  rideItem: {
    flexDirection: 'row', // Align text and button horizontally
    alignItems: 'center',
    marginBottom: 10,
  },

  rideText: {
    flex: 1, // Take up remaining space for the text
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },

  endRideButton: {
    width: '30%',
    width: '100%',
    justifyContent: "center",
    paddingVertical: 10, // need both
    paddingHorizontal: 10,
  },
  endRideText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});