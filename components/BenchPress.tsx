import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { windowAverage } from '@/constants/Dimensions';


interface BenchPressProps {
  AppTheme: any,
  bgColor: string,
  textColor: string,
  bgInput: string
}

export default function BenchPress({ AppTheme, bgColor, textColor, bgInput }: BenchPressProps) {

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
    } else if (text.includes(",") && text.trim().length > 1) {
      const newText = text.replace(/,/g, '.');
      setWeight(newText)
    } else if (text === ".") {
      const newText = "";
      setWeight(newText)
    }
  }

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]} >
      <View style={{gap: windowAverage * 4, flexDirection: "row", alignItems: "center"}}>
        <Text style={[styles.text, {color: textColor}]}>
          {AppTheme?.language === "rus" ? "Вес штанги" : AppTheme?.language === "eng" ? "Barbell's weight" : "Gewicht der Langhantel"}:
        </Text>
        <TextInput style={[styles.input, {backgroundColor: bgInput, color: textColor}]} value={weight} onChangeText={inputOnChange} cursorColor={textColor}/>
        <Text style={[styles.text, {color: textColor}]}>
          {AppTheme?.language === "rus" ? "кг" : AppTheme?.language === "eng" ? "kg" : "kg"}
        </Text>   
      </View>
      <View style={{gap: windowAverage * 4, flexDirection: "row", alignItems: "center"}}>
        <Text style={[styles.text, {color: textColor}]}>
          {AppTheme?.language === "rus" ? "Количество повторений" : AppTheme?.language === "eng" ? "Number of repetitions" : "Anzahl der wiederholungen"}:
        </Text>
        <View style={styles.select__container}>
          <Picker
            selectedValue={repeats}
            style={[styles.select, {color: textColor, backgroundColor: bgInput}]}
            onValueChange={(itemValue) => setRepeats(itemValue)} dropdownIconColor={textColor}>
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
            {AppTheme?.language === "rus" ? "Формула Эпли" : AppTheme?.language === "eng" ? "Epley's formula" : "Epleys formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула Бржицки" : AppTheme?.language === "eng" ? "Brzycki's formula" : "Brzyckis formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула Лэндера" : AppTheme?.language === "eng" ? "Lander's formula" : "Landers formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула Ломбарди" : AppTheme?.language === "eng" ? "Lombardi's formula" : "Lombardis formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула Мэйхью" : AppTheme?.language === "eng" ? "Mayhew's formula" : "Mayhews formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула О'Коннор" : AppTheme?.language === "eng" ? "O'Conner's formula" : "O'Conners formel"}
          </Text>
          <Text style={[styles.text, {color: textColor}]}>
            {AppTheme?.language === "rus" ? "Формула Ватана" : AppTheme?.language === "eng" ? "Wathen's formula" : "Wathens formel"}
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
          <Text style={{fontSize: 16, color: textColor, fontFamily: "YS-text"}}>
            {AppTheme?.language === "rus" ? "Максимум в жиме лёжа" : AppTheme?.language === "eng" ? "Maximum in bench-press" : "Maximum beim Bankdrücken"}:
          </Text>
        </View>
        <View style={{gap: windowAverage * 3, paddingRight: windowAverage * 12}}>
          <Text style={{fontSize: 16, color: textColor, fontFamily: "YS-text"}}>
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
    fontSize: windowAverage * 7,
    fontFamily: "YS-text"
  },
  input: {
    height: windowAverage * 13,
    width: windowAverage * 40,  
    borderRadius: windowAverage * 4,
    paddingLeft: windowAverage * 3,
    paddingTop: windowAverage,
    paddingBottom: windowAverage,
  },
  select__container: {
    overflow: "hidden",    
    width: windowAverage * 40,  
    borderRadius: windowAverage * 4,   
    height: windowAverage * 14,
    paddingLeft: windowAverage * 3,
    justifyContent: "center",
    alignItems: "center",
  },
  select: {
    width: windowAverage * 50,  
    fontSize: windowAverage * 6,
    paddingLeft: windowAverage * 3
  },
  select__item: {
    fontSize: windowAverage * 7,
    paddingLeft: windowAverage * 3
  },
});
