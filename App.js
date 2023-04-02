import React, { useState, useEffect } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

const key = '@MyApp:key';
const key2 = '@MyApp:key2';

const App = () => {

  SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [storedValues, setStoredValue] = useState('');
  const [storeValue, setStoreValue] = useState('');
  const [bmi, setBmi] = useState('');

  useEffect(() => {
    const onLoad = async () => {
      try {
        const storedValue = await AsyncStorage.getItem(key);
          setStoredValue(storedValue);
        const storedText = await AsyncStorage.getItem(key2);
        setText2(storedText);
        
      } catch (error) {
        Alert.alert('Error', 'There was an error while loading the data');
      }
    };
    
    onLoad();
    
  }, []);

  

  const onCalculate = async () => {
   setStoredValue(bmi);
   onSave();
  };
  
  
  
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(key, bmi);
      await AsyncStorage.setItem(key2, text2);
      //Alert.alert('Saved', 'Successfully saved on device');
    } catch (error) {
      Alert.alert('Error', 'There was an error while saving the data');
    }
    setBmi((text /(text2 * text2)*703).toFixed(1));
  };

  const onChange = (text) => {
    setText(text);
    setBmi((text /(text2 * text2)*703).toFixed(1));
  };
  const onChange2 = (text2) => {
    setText2(text2);
    setBmi((text /(text2 * text2)*703).toFixed(1));
  };

  return (
    
    
    <View style={styles.container}>
      <View>
        <Text style={styles.titles}>BMI Calulator</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={text}
          placeholder="Weight in Pounds"
        />
        <TextInput
          style={styles.input2}
          onChangeText={onChange2}
          value={text2}
          placeholder= "Height in Inches"
        />
        <Pressable onPress={onCalculate} style={styles.button}>
          <Text  style={styles.buttonText} >Compute BMI</Text>
        </Pressable>
        
        <Text style={styles.result}>Body Mass Index is {storedValues} </Text>

        <Text style={styles.assessingTextTitle}>Assessing Your BMI </Text>
        <Text style={styles.assessingText}>Underweight: less than 18.5 </Text>
        <Text style={styles.assessingText}>Healthy: 18.5 to 24.9 </Text>
        <Text style={styles.assessingText}>Overweight: 25.0 to 29.9</Text>
        <Text style={styles.assessingText}>Obese: 30.0 or higher </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titles: {
    backgroundColor: '#f4511e',
    width: 400,
    height: 100,
    //padding: 10,
    paddingTop: 35,
    paddingBottom: 30,
    textAlign: 'center',
    //borderRadius: 5,
    color: 'white',
    //marginTop:50,
    marginBottom: 50,
    fontSize: 28,
    fontWeight: 'bold'
  },
  result: {
    //backgroundColor: '#bdc3c7',
    //width: 300,
    //height: 80,
    marginTop:20,
    padding: 10,
    //borderRadius: 5,
    color: 'black',
    marginBottom: 50,
    fontSize: 28
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 350,
    height: 40,
    padding: 5,
    fontSize: 24,
  },
  input2: {
    marginTop:15,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 350,
    height: 40,
    padding: 5,
    fontSize: 24,
  },
  button: {
    backgroundColor: '#34495e',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    width: 350,
    fontSize: 24,
  },
  buttonText: {
   color:'white',
   textAlign: 'center',
   fontSize: 24
    
  },
  assessingTextTitle: {
    fontSize: 20
  },
  assessingText: {
    marginLeft: 15,
    fontSize: 20,
  },
});

export default App;