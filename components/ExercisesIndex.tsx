import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, BackHandler, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { changeExerciseTitle, changeImage, delExercise, Exercise } from '@/store/exercisesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import TrashSVG from '@/assets/images/common/TrashSVG';


interface ExercisesIndexProps {
  bgColor: string;
  textColor: string;
  input: string;
  checkModal: string;
  AppTheme: any;
  ID: string | string[]
}

export default function ExercisesIndex({ bgColor, textColor, input, checkModal, AppTheme, ID }: ExercisesIndexProps) {

  const dispatch = useAppDispatch()

  const trains = useAppSelector(state => state.trains)
  const exercises = useAppSelector(state => state.exercises)

  const [isPopupActive, setIsPopupActive] = useState<boolean>(false)
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    (async () => {
      if (status === null) {
        requestPermission();
      }
    })();
  }, [status]);

  const pickImage = async (ID: number) => {
    // Запрашиваем разрешение на доступ к галерее
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Разрешение необходимо',
        'Для выбора изображения из галереи необходимо предоставить разрешение.',
        [{ text: 'OK' }]
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(changeImage({ID: ID, ImagePath: result.assets[0].uri}))
    }
  };

  function getExerciseByID(pid: number): Exercise | undefined {
    if (exercises.length === 1) {
      return exercises[0]
    }
    if (trains.length === 2) {
      if (Number(trains[0].ID) === pid) {
        return exercises[0]
      } else {
        return exercises[1]
      }
    }

    let left = 0;
    let right = exercises.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (Number(exercises[mid].ID) === pid) {
        return exercises[mid]
      }
      if (Number(exercises[mid].ID) < pid) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return undefined;
  }

  function getExerciseTitle(pid: number): string {
    if (exercises.length === 1) {
      return exercises[0].ExerciseName
    }
    if (exercises.length === 2) {
      if (Number(exercises[0].ID) === pid) {
        return exercises[0].ExerciseName
      } else {
        return exercises[1].ExerciseName
      }
    }

    let left = 0;
    let right = exercises.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (Number(exercises[mid].ID) === pid) {
        return exercises[mid].ExerciseName;
      }
      if (Number(exercises[mid].ID) < pid) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return "undefined";
  }

  function defineTrainsArr(ID: number): number {
    let result: number = 0
    for (let i = 0; i < trains.length; i++) {
      for (let j in trains[i].Exercises) {
        if (Number(j) === ID) {
          result++
        }
      }   
    }
    return result
  }

  const exerciseArr = getExerciseByID(Number(ID))
  const title = getExerciseTitle(Number(ID))
  const trainsQuantity = defineTrainsArr(Number(ID))

  const [exerciseTitle, setExerciseTitle] = useState<string>(title)

  function onTitleChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const newTitle = event.nativeEvent.text
    setExerciseTitle(newTitle)
    
    dispatch(changeExerciseTitle({ID: Number(ID), ExerciseName: newTitle}))
  }

  function handlePopup() {
    setIsPopupActive(true)
  }

  useEffect(() => {
    const backAction = () => {
      if (isPopupActive) {
        // Если попап активен, изменяем его состояние
        setIsPopupActive(false);
        return true; // Возвращаем true, чтобы предотвратить переход назад
      } 
      return false; // Возвращаем false, чтобы продолжить действия по умолчанию
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // Убираем слушатель при размонтировании компонента
    return () => backHandler.remove();
  }, [isPopupActive]);

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={{width: windowWidth, flexDirection: "row", paddingVertical: windowAverage * 7, paddingHorizontal: windowAverage * 2}}>
        <View style={{width: windowWidth / 2, justifyContent: "center", alignItems: "center"}} onTouchEnd={() => pickImage(Number(ID))}>
          {exerciseArr && exerciseArr?.ImagePath.trim().length > 0 ? <Image source={{ uri: exerciseArr?.ImagePath}} style={{width: windowWidth / 100 * 47, height: windowWidth / 100 * 47, borderRadius: windowAverage * 3}}/> : 
          <View style={{width: windowWidth / 100 * 47, height: windowWidth / 100 * 47, borderRadius: windowAverage * 3, backgroundColor: input, justifyContent: "center", alignItems: "center", boxShadow: "2px 2px 2px 0px rgba(34, 60, 80, 0.2)"}}>
            <Text style={{fontSize: windowAverage * 12, fontFamily: "YS-text", color: textColor}}>
              {AppTheme?.language === "rus" ? "Добавить" : AppTheme?.language === "eng" ? "Click here" : "Hinzufügen"}
            </Text>
          </View>}
        </View>
        <View style={{width: windowWidth / 100 * 49, alignItems: "center", justifyContent: "flex-start", gap: windowHeight / 100 * 2}}>
          <TextInput value={exerciseTitle} cursorColor="#008ef4" style={{backgroundColor: input, color: textColor, top: windowAverage * 4, width: windowWidth / 100 * 46, fontSize: windowAverage * 9, fontFamily: "YS-text", borderRadius: windowAverage * 5, paddingLeft: windowAverage * 5, boxShadow: "2px 2px 3px 0px rgba(34, 60, 80, 0.2)"}} onChange={onTitleChange}/>
          <View style={{width: windowWidth / 100 * 46, backgroundColor: input, paddingVertical: windowAverage * 4, borderRadius: windowAverage * 5, justifyContent: "center", alignItems: "center", boxShadow: "2px 2px 2px 0px rgba(34, 60, 80, 0.2)"}}>
            <Text style={{fontSize: windowAverage * 9, fontFamily: "YS-text", color: textColor}}>
              {AppTheme?.language === "rus" ? "Тренировки" : AppTheme?.language === "eng" ? "Quantity of trains" : "Anzahl der Züge"}:
            </Text>
            <Text style={{fontSize: windowAverage * 9, fontFamily: "YS-text", color: "#16A34A"}}>
              {trainsQuantity}
            </Text>
          </View>
          <TouchableOpacity style={{alignSelf: "flex-end", paddingRight: windowAverage * 10}} onPress={handlePopup}>
            <TrashSVG color='#6F6F6F' size={windowAverage * 20}/>
          </TouchableOpacity>
        </View>
      </View> 

      <View style={{borderTopColor: input, borderTopWidth: 1, paddingVertical: windowAverage * 6}}></View>
      
      <Popup bgColor={checkModal} textColor={textColor} isPopupActive={isPopupActive} setIsPopupActive={setIsPopupActive} AppTheme={AppTheme} ID={Number(ID)}/>
    </View>
  );
}


interface PopupProps {
  bgColor: string,
  AppTheme: any,
  textColor: string,
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  ID: number
}

const Popup = ({ bgColor, textColor, isPopupActive, setIsPopupActive, AppTheme, ID }: PopupProps) => {

  const dispatch = useAppDispatch()

  const router = useRouter()

  function trashOnClick(ID: number) {
    setIsPopupActive(false)
    router.push('/(tabs)/ExercisesPage');
    dispatch(delExercise(ID))
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
            <TouchableOpacity activeOpacity={0.7} onPress={() => trashOnClick(ID)}>
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