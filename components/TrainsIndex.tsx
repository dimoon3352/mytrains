import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, BackHandler } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeTrainDate, changeTrainExercise, delTrain, delTrainExercise, Train } from '@/store/trainsSlice';
import { defineExerciseTitle } from './MainPartTrains';

import TrashSVG from '@/assets/images/common/TrashSVG';
import AddSVG from '@/assets/images/common/AddSVG';


interface TrainsIndexProps {
  bgColor: string;
  textColor: string;
  input: string;
  checkModal: string;
  AppTheme: any;
  ID: string | string[]
}

export default function TrainsIndex({ bgColor, textColor, input, checkModal, AppTheme, ID }: TrainsIndexProps) {

  const router = useRouter()
  const dispatch = useAppDispatch()

  const trains = useAppSelector(state => state.trains)
  const exercises = useAppSelector(state => state.exercises)

  const [isDeletePopupActive, setIsDeletePopupActive] = useState<boolean>(false)
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false)
  const [popupExerciseID, setPopupExerciseID] = useState<number>(0)

  function getTrainByID(pid: number): Train | undefined {
    if (trains.length === 1) {
      return trains[0]
    }
    if (trains.length === 2) {
      if (Number(trains[0].ID) === pid) {
        return trains[0]
      } else {
        return trains[1]
      }
    }

    let left = 0;
    let right = trains.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (Number(trains[mid].ID) === pid) {
        return trains[mid]
      }
      if (Number(trains[mid].ID) < pid) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return undefined;
  }

  function getTrainDate(pid: number) {
    if (trains.length === 1) {
      return trains[0].Date
    }
    if (trains.length === 2) {
      if (Number(trains[0].ID) === pid) {
        return trains[0].Date
      } else {
        return trains[1].Date
      }
    }

    let left = 0;
    let right = trains.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (Number(trains[mid].ID) === pid) {
        return trains[mid].Date;
      }
      if (Number(trains[mid].ID) < pid) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return "undefined";
  }

  const trainArr = getTrainByID(Number(ID))
  const TrainDate = getTrainDate(Number(ID))

  const [value, setValue] = useState<{ [key: number]: string[]; } | null>(typeof trainArr !== "undefined" ? trainArr.Exercises : null)
  const [date, setDate] = useState<string>(TrainDate)

  function onDateChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const newDate = event.nativeEvent.text
    setDate(newDate)
    
    dispatch(changeTrainDate({date: newDate, trainId: Number(ID)}))
  }

  function onChange(event: NativeSyntheticEvent<TextInputChangeEventData>, id: string) {

    const textArr: string[] = event.nativeEvent.text.split(' ')
    let updatedValue = { ...value }

    if (updatedValue[Number(id)]) {
      updatedValue[Number(id)] = textArr;
    }
    
    setValue(updatedValue)
    
    dispatch(changeTrainExercise({trainId: Number(ID), id: Number(id), value: textArr}))
  }

  function handlePopup(ID: number) {
    setIsPopupActive(true)
    setPopupExerciseID(ID)
  }

  function handleDeletePopup() {
    setIsDeletePopupActive(true)
  }

  function handleAddExercise() {
    const path = `(addExercise)/AddExercise?id=${ID}&arr=${trainArr}` as RelativePathString;
    router.push(path)
  }

  useEffect(() => {
    const backAction = () => {
      if (isDeletePopupActive) {
        // Если попап активен, изменяем его состояние
        setIsDeletePopupActive(false);
        return true; // Возвращаем true, чтобы предотвратить переход назад
      } 
      if (isPopupActive) {
        setIsPopupActive(false)
        return true
      }
      return false; // Возвращаем false, чтобы продолжить действия по умолчанию
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Убираем слушатель при размонтировании компонента
    return () => backHandler.remove();
  }, [isDeletePopupActive, isPopupActive]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={{width: windowWidth, paddingVertical: windowAverage * 7, paddingHorizontal: windowAverage * 5, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: windowAverage * 4}}>
        <TextInput value={date} cursorColor="#008ef4" style={{backgroundColor: input, color: textColor, width: windowAverage * 164, height: windowAverage * 26, fontSize: windowAverage * 13, fontFamily: "YS-text", borderRadius: windowAverage * 5, paddingLeft: windowAverage * 5}} onChange={onDateChange}/>
        <TouchableOpacity onPress={handleDeletePopup}>
          <TrashSVG color='#6F6F6F' size={windowAverage * 20}/>
        </TouchableOpacity>
      </View>
      <View style={{width: windowWidth}}>
        {typeof trainArr !== "undefined" && Object.entries<string[]>(trainArr.Exercises).map((item, index) => (
          <View key={index} style={{flexDirection: "row", alignItems: "center", borderTopColor: input, borderTopWidth: 1, paddingVertical: windowAverage * 6, gap: windowAverage * 7, paddingLeft: windowAverage * 4}}>
            <TouchableOpacity onPress={() => handlePopup(Number(item[0]))}>
              <TrashSVG color='#6F6F6F' size={windowAverage * 12}/>
            </TouchableOpacity>
            <View style={{justifyContent: "flex-start", alignItems: "flex-start", width: "37%"}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {defineExerciseTitle(Number(item[0]), exercises)}:
              </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap", overflow: "hidden"}}>                 
              <TextInput value={value !== null && typeof value[Number(item[0])] !== "undefined" ? value[Number(item[0])].join(' ') : ' '} cursorColor="#008ef4" style={{backgroundColor: input, color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text", width: "68%", paddingLeft: windowAverage * 5, borderRadius: windowAverage * 5, height: windowAverage * 21}} onChange={(e) => onChange(e, item[0])}/>                
            </View>
          </View>
        ))}
        <TouchableOpacity activeOpacity={0.5} onPress={handleAddExercise}>
          <View style={{flexDirection: "row", alignItems: "center", borderTopColor: input, borderTopWidth: 1, paddingVertical: windowAverage * 6, gap: windowAverage * 7, paddingLeft: windowAverage * 4}}>
            <AddSVG color='#6F6F6F' size={windowAverage * 12}/>
            <View style={{justifyContent: "flex-start", alignItems: "flex-start"}}>
              <Text style={{color: "#818181", fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
              {AppTheme?.language === "rus" ? "Добавить упражнение" : AppTheme?.language === "eng" ? "Add new exercise" : "Übung hinzufügen"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Popup bgColor={bgColor} textColor={textColor} isPopupActive={isPopupActive} setIsPopupActive={setIsPopupActive} exerciseID={popupExerciseID} AppTheme={AppTheme} ID={Number(ID)}/>
      <DelTrainPopup checkModal={checkModal} textColor={textColor} isPopupActive={isDeletePopupActive} setIsPopupActive={setIsDeletePopupActive} AppTheme={AppTheme} ID={Number(ID)}/>
    </View>
  );
}


interface PopupProps {
  bgColor: string,
  AppTheme: any,
  textColor: string,
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  ID: number,
  exerciseID: number
}

const Popup = ({ bgColor, textColor, isPopupActive, setIsPopupActive, exerciseID, AppTheme, ID }: PopupProps) => {

  const dispatch = useAppDispatch()

  function trashOnClick(id: number) {
    dispatch(delTrainExercise({id, trainId: Number(ID)}))
    setIsPopupActive(false)
  }

  return (
    <>
    {isPopupActive &&
      <View style={styles.PopupContainer} onTouchEnd={() => setIsPopupActive(false)}>
        <View style={[styles.PopupWrapper, {backgroundColor: bgColor}]} onTouchEnd={e => e.stopPropagation()}>
          <Text style={{color: textColor, fontSize: windowAverage * 10, fontFamily: "YS-text"}}>
            {AppTheme?.language === "rus" ? "Удалить упражнение" : AppTheme?.language === "eng" ? "Delete exercise" : "Übung löschen"}?
          </Text>
          <View style={{flexDirection: "row", gap: windowAverage * 5}}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => trashOnClick(exerciseID)}>
              <View style={[styles.PopupButton, {backgroundColor: "#C74141"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                 {AppTheme?.language === "rus" ? "Удалить" : AppTheme?.language === "eng" ? "Delete" : "Löschen"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPopupActive(false)}>
              <View style={[styles.PopupButton, {backgroundColor: "#16a34a"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                 {AppTheme?.language === "rus" ? "Отмена" : AppTheme?.language === "eng" ? "Cancel" : "Stornieren"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
    </>
  )
}


interface DelTrainPopupProps {
  textColor: string,
  checkModal: string;
  AppTheme: any;
  isPopupActive: boolean;
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
  ID: number;
}

const DelTrainPopup = ({ textColor, isPopupActive, checkModal, setIsPopupActive, AppTheme, ID }: DelTrainPopupProps) => {

  const dispatch = useAppDispatch()

  const router = useRouter()

  function handleTrainDelete() {
    router.push('/(tabs)/TrainsPage');
    
    dispatch(delTrain(ID))
  }

  return (
    <>
    {isPopupActive &&
      <View style={styles.PopupContainer} onTouchEnd={() => setIsPopupActive(false)}>
        <View style={[styles.PopupWrapper, {backgroundColor: checkModal}]} onTouchEnd={e => e.stopPropagation()}>
          <Text style={{color: textColor, fontSize: windowAverage * 10, fontFamily: "YS-text"}}>
            {AppTheme?.language === "rus" ? "Удалить тренировку" : AppTheme?.language === "eng" ? "Delete train" : "Zug löschen"}?
          </Text>
          <View style={{flexDirection: "row", gap: windowAverage * 5}}>
            <TouchableOpacity activeOpacity={0.7} onPress={handleTrainDelete}>
              <View style={[styles.PopupButton, {backgroundColor: "#C74141"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                  {AppTheme?.language === "rus" ? "Удалить" : AppTheme?.language === "eng" ? "Delete" : "Löschen"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsPopupActive(false)}>
              <View style={[styles.PopupButton, {backgroundColor: "#16a34a"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                 {AppTheme?.language === "rus" ? "Отмена" : AppTheme?.language === "eng" ? "Cancel" : "Stornieren"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    minHeight: (windowHeight - windowAverage * 32),
    flexDirection: "column"
  },
  text: {
    fontSize: windowAverage * 14,
    fontFamily: "YS-text"
  },
  PopupContainer: {
    justifyContent: "center", 
    alignItems: "center", 
    position: "absolute", 
    height: windowHeight, 
    width: windowWidth, 
    zIndex: 1
  },
  PopupWrapper: {
    justifyContent: "space-evenly", 
    alignItems: "center", 
    flexDirection: "column", 
    width: windowWidth / 100 * 90,
    paddingVertical: windowAverage * 15,
    borderRadius: windowAverage * 20,
    marginBottom: windowAverage * 120,
    gap: windowAverage * 10
  },
  PopupButton: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth / 100 * 36,
    paddingVertical: windowAverage * 5,
    borderRadius: windowAverage * 4
  },
});