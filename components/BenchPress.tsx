import { StyleSheet, Image, Platform, View, Text, ScrollView, SafeAreaView, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { windowAverage, windowHeight, windowWidth } from '@/constants/dimensions';
import { useState } from 'react';

import SettingsSVG from '@/assets/images/header/SettingsSVG';
import { Picker } from '@react-native-picker/picker';
import { useAppTheme } from './ThemeAppProvider';


interface BenchPressProps {
  bgColor: string,
  textColor: string,
}

export default function BenchPress({bgColor, textColor}: BenchPressProps) {

  const [weight, setWeight] = useState<string>("")
  const [repeats, setRepeats] = useState<string>("")

  function calculateEpley(): number { // (W * r) / 30 + M
    const result = (Number(weight) * Number(repeats)) / 30 + Number(weight)
    return (Math.round(result * 10)) / 10
  }

  function calculateBrzycki(): number { // W * (36 / (37 - r))
    const result = Number(weight) * (36 / (37 - Number(repeats)))
    return (Math.round(result * 10)) / 10
  }

  function calculateLander(): number { // (100 * W) / (101.3 - 2.67123 * r)
    const result = (100 * Number(weight) / (101.3 - 2.67123 * Number(repeats)))
    return (Math.round(result * 10)) / 10
  }

  function calculateLombardi(): number { // W * r ** 0.1 
    const result = Number(weight) *  Number(repeats) ** 0.10
    return (Math.round(result * 10)) / 10
  }

  function calculateMayhew(): number { // 100 ⋅ w / (52,2 + 41,9 ⋅ exp(− 0,055 ⋅ r))
    const result = 100 * Number(weight) / (52.2 + 41.9 * Math.exp(-0.055 * Number(repeats)))
    return (Math.round(result * 10)) / 10
  }

  function calculateOConner(): number { // W * (1 + 0.025 * r)
    const result = Number(weight) * (1 + 0.025 * Number(repeats))
    return (Math.round(result * 10)) / 10
  }

  function calculateWathen(): number { // 100 * w / (48,8 + 53,8 ⋅ exp(− 0,075 ⋅ r))
    const result = 100 * Number(weight) / (48.8 + 53.8 * Math.exp(-0.075 * Number(repeats)))
    return (Math.round(result * 10)) / 10
  }

  function calculateMaximum(): number {
    const epley = calculateEpley()
    const brzycki = calculateBrzycki()
    const lander = calculateLander()
    const lombardi = calculateLombardi()
    const mayhew = calculateMayhew()
    const oconner = calculateOConner()
    const wathen = calculateWathen()
    const result = (epley + brzycki + lander + lombardi + mayhew + oconner + wathen) / 7

    return (Math.round(result * 10)) / 10
  }

  function inputOnChange(text: string) {
    if (!isNaN(Number(text))) {
      setWeight(text)
    }   
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]} >
      <View style={{gap: windowAverage * 4, flexDirection: "row", alignItems: "center"}}>
        <Text style={[styles.text, {color: textColor}]}>
          Barbell's weight:
        </Text>
        <TextInput style={[styles.input, {backgroundColor: "#fff", color: "#000"}]} value={weight} onChangeText={inputOnChange} cursorColor={bgColor}/>
        <Text style={[styles.text, {color: textColor}]}>
          kg
        </Text>   
      </View>
      <View style={{gap: windowAverage * 4, flexDirection: "row", alignItems: "center"}}>
        <Text style={[styles.text, {color: textColor}]}>
          Number of repetitions:
        </Text>
        <View style={styles.select__container}>
          <Picker
            selectedValue={repeats}
            style={[styles.select, {color: "#000", backgroundColor: "#fff"}]}
            onValueChange={(itemValue) => setRepeats(itemValue)}>
            <Picker.Item label="2" value="2" style={styles.select__item}/>
            <Picker.Item label="3" value="3" style={styles.select__item}/>
            <Picker.Item label="4" value="4" style={styles.select__item}/>
            <Picker.Item label="5" value="5" style={styles.select__item}/>
            <Picker.Item label="6" value="6" style={styles.select__item}/>
            <Picker.Item label="7" value="7" style={styles.select__item}/>
            <Picker.Item label="8" value="8" style={styles.select__item}/>
            <Picker.Item label="9" value="9" style={styles.select__item}/>
            <Picker.Item label="10" value="10" style={styles.select__item}/>
            <Picker.Item label="11" value="11" style={styles.select__item}/>
            <Picker.Item label="12" value="12" style={styles.select__item}/>
            <Picker.Item label="13" value="13" style={styles.select__item}/>
            <Picker.Item label="14" value="14" style={styles.select__item}/>
            <Picker.Item label="15" value="15" style={styles.select__item}/>
            <Picker.Item label="16" value="16" style={styles.select__item}/>
            <Picker.Item label="17" value="17" style={styles.select__item}/>
            <Picker.Item label="18" value="18" style={styles.select__item}/>
            <Picker.Item label="19" value="19" style={styles.select__item}/>
            <Picker.Item label="20" value="20" style={styles.select__item}/>
          </Picker>
        </View>       
      </View>

      <View style={{backgroundColor: textColor, height: 1, width: windowAverage * 142}}></View>  

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{gap: windowAverage * 3}}>
          <Text style={[styles.text, {color: textColor}]}>
            Epley's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            Brzycki's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            Lander's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            Lombardi's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            Mayhew's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            O'Conner's formula
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            Wathen's formula
          </Text>
        </View>
        <View style={{gap: windowAverage * 3, paddingRight: windowAverage * 12}}>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateEpley()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateBrzycki()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateLander()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateLombardi()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateMayhew()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateOConner()}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {calculateWathen()}
          </Text>
        </View>
      </View>

      <View style={{backgroundColor: textColor, height: 1, width: windowAverage * 142}}></View>

      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{gap: windowAverage * 3}}>
          <Text style={{fontSize: 16, color: textColor}}>
            Maximum in bench-press:
          </Text>
        </View>
        <View style={{gap: windowAverage * 3, paddingRight: windowAverage * 12}}>
          <Text style={{fontSize: 16, color: textColor}}>
            {calculateMaximum()}
          </Text>
        </View>
      </View>

      <View style={{backgroundColor: textColor, height: 1, width: windowAverage * 142}}></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowAverage * 150,
    gap: windowAverage * 4,
    paddingHorizontal: windowAverage * 4,
    paddingVertical: windowAverage * 6,
    borderRadius: windowAverage * 4,
    borderTopWidth: windowAverage * 2,
    borderBottomWidth: windowAverage * 2
  },
  text: {
    fontSize: windowAverage * 7
  },
  input: {
    height: windowAverage * 13,
    width: windowAverage * 40,  
    borderRadius: windowAverage * 4,
    paddingLeft: windowAverage * 5,
    paddingTop: windowAverage,
    paddingBottom: windowAverage,
  },
  select__container: {
    overflow: "hidden",    
    width: windowAverage * 40,  
    borderRadius: windowAverage * 4,   
    height: windowAverage * 14,
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    width: windowAverage * 50,  
    paddingLeft: windowAverage * 5,
    fontSize: windowAverage * 6  
  },
  select__item: {
    fontSize: windowAverage * 7,
  },
});
