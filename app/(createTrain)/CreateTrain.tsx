import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { useRouter, SplashScreen } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { defineID } from '@/components/MainPartExercises';
import { addTrain } from '@/store/trainsSlice';
import { defineExerciseTitle } from '@/components/MainPartTrains';
import { delReadyMadeTrain, setReadyMadeTrains } from '@/store/readyMadeTrainsSlice';
import { Colors } from '@/constants/Colors';

import type { Exercise, Exercises } from '@/store/exercisesSlice';
import type { Train } from '@/store/trainsSlice'

import HeaderBack from '@/components/HeaderBack';
import AddSVG from '@/assets/images/common/AddSVG';


SplashScreen.preventAutoHideAsync();

export default function CreateTrain() {

    const router = useRouter();

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const dispatch = useAppDispatch()

    const exercises = useAppSelector((state) => state.exercises)
    const trains = useAppSelector((state) => state.trains)

    const [sortedArr, setSortedArr] = useState<Exercises>(exercises)
    const [trainExercises, setTrainExercises] = useState<number[]>([])
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false)
    const [isConfirmPopupActive, setIsConfirmPopupActive] = useState<boolean>(false)
    const [mockup, setMockup] = useState<Train>(trains[0])
    const [isGestureEnabled, setIsGestureEnabled] = useState(true);

    useEffect(() => {
      setSortedArr(exercises)
    }, [exercises])

    function getExercisesObject() {
      let Exercises: {[key: number]: string[]} = {}
      
      for (let i = 0; i < trainExercises.length; i++) {
        Exercises[trainExercises[i]] = []
      }

      return Exercises
    }

    function createTrain() {
      if (trainExercises.length > 0) {

        const date = new Date()

        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        const Exercises = getExercisesObject()

        setTrainExercises([])

        dispatch(addTrain({
          ID: defineID(trains),
          Date: formattedDate,
          Exercises         
        }))
        router.push("/(tabs)/TrainsPage")
      }  
    } 

    function handleCheckbox(id: number) {
      if (trainExercises.indexOf(id) >= 0) {
        const newArr = trainExercises.filter(item => item !== id)
        setTrainExercises(newArr)
      }

      if (trainExercises.indexOf(id) < 0) {
        setTrainExercises([...trainExercises, id]) 
      }
    }

    function onPress() {
      setIsPopupActive(isPopupActive => !isPopupActive)
    }

    useEffect(() => {
      const backAction = () => {
        if (isPopupActive) {
          setIsConfirmPopupActive(false)
          setIsPopupActive(false);
          setIsGestureEnabled(true)
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
    <>  
    <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/TrainsPage">
      {AppTheme?.language === "rus" ? "Выберите упражнения" : AppTheme?.language === "eng" ? "Choose exercises" : "Übungen auswählen"}
    </HeaderBack>
    <GestureHandlerRootView> 
      <View> 
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <View style={{backgroundColor: AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground, paddingVertical: windowAverage * 6, marginTop: windowAverage * 3, flexDirection: "row", alignItems: "center", gap: windowAverage * 4}}>
            <Text style={{color: AppTheme?.theme === "light" ? light.text : dark.text, paddingLeft: windowAverage * 6, fontFamily: "YS-text"}}>
              {AppTheme?.language === "rus" ? "Добавить из заготовок" : AppTheme?.language === "eng" ? "Add from mockups" : "Aus modells hinzufügen"}
            </Text>
            <View style={{backgroundColor: "#16A34A", padding: windowAverage * 1, borderRadius: windowAverage * 2}}>
              <AddSVG color="#fff" size={windowAverage * 9}/>
            </View>
          </View>
        </TouchableOpacity>
        <View style={[styles.container, {backgroundColor: AppTheme?.theme === "light" ? light.background : dark.background}]}>
          <ScrollView>
            <View style={styles.wrapper}> 
              {sortedArr.map((item: Exercise, index: number) => (
                <View key={item.ID} onTouchEnd={() => handleCheckbox(item.ID)}>
                  <View style={[styles.item, {backgroundColor: trainExercises.indexOf(item.ID) >= 0 ? "#16A34A" : AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground, paddingVertical: windowAverage * 12, justifyContent: "center"}]}>
                    <Text style={{color: trainExercises.indexOf(item.ID) >= 0 ? "#fff" : AppTheme?.theme === "light" ? light.text : dark.text, paddingHorizontal: windowAverage * 6, fontSize: windowAverage * 8, fontFamily: "YS-text"}}>
                      {item.ExerciseName}
                    </Text>
                  </View>        
                </View>
              ))}
            </View>
          </ScrollView>  
          {trainExercises.length > 0 &&
            <TouchableOpacity onPress={createTrain}>
            <View style={{backgroundColor: "#16A34A", paddingVertical: windowAverage * 8, paddingHorizontal: windowAverage * 26, alignItems: "center", justifyContent: "center", borderRadius: windowAverage * 6, position: "absolute", bottom: windowAverage * 38, alignSelf: "center"}}>
              <Text style={{color: "#fff", fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                Create train
              </Text>
            </View>
          </TouchableOpacity>
          }
        </View>
        <Popup isGestureEnabled={isGestureEnabled} setIsGestureEnabled={setIsGestureEnabled }isPopupActive={isPopupActive} setIsPopupActive={setIsPopupActive} setIsConfirmPopupActive={setIsConfirmPopupActive} setIsMockup={setMockup}/>
        <ConfirmPopup isPopupActive={isConfirmPopupActive} setIsPopupActive={setIsConfirmPopupActive} item={mockup}/>
      </View>
    </GestureHandlerRootView>
    </>
  );
}


interface SortPopupProps {
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  setIsConfirmPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  setIsMockup: React.Dispatch<React.SetStateAction<Train>>,
  isGestureEnabled: boolean,
  setIsGestureEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup = ({ isGestureEnabled, setIsGestureEnabled, isPopupActive, setIsPopupActive, setIsConfirmPopupActive, setIsMockup }: SortPopupProps) => {

  const dispatch = useAppDispatch()

  const exercises = useAppSelector((state) => state.exercises)
  const mockups = useAppSelector((state) => state.readyMadeTrains)

  const AppTheme = useAppTheme()
  const { light, dark } = Colors

  useEffect(() => {
    const getAsync = async () => {
      try {
        const stored = await AsyncStorage.getItem("mockups");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch(setReadyMadeTrains(parsed))
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAsync()
  }, [dispatch])

  const translateY = useSharedValue<number>(windowHeight); // Изначальное положение
  const isDismissing = useSharedValue<boolean>(false);

  useEffect(() => {
    if (isPopupActive) {
      translateY.value = withTiming(0, { 
        duration: 500, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), 
      }); 
      isDismissing.value = false; 
    } else {
      translateY.value = withTiming(windowHeight, { // Скрываем компонент
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  }, [isPopupActive]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      isDismissing.value = false; // Сбрасываем флаг, если начинаем новый жест
    },
    onActive: (event) => {
      if (isGestureEnabled && event.translationY > -261) { // Проверяем, активны ли жесты
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      if (translateY.value > windowHeight / 100 * 20) { 
        isDismissing.value = true;
        translateY.value = withTiming(windowHeight, { duration: 300 }, () => {
          runOnJS(setIsPopupActive)(false);  // Убираем компонент после анимации
        });
      } else if (translateY.value < -(windowHeight / 100 * 16)) {
        runOnJS(setIsGestureEnabled)(false)
        translateY.value = withTiming(-264, { duration: 200 });
      } else {
        translateY.value = withTiming(0, { duration: 200 }); // Возвращаем на место
        runOnJS(setIsGestureEnabled)(true)
      }
    },
    onCancel: () => {
      translateY.value = withTiming(0, { duration: 200 });
      runOnJS(setIsGestureEnabled)(true)
    },
    onFail: () => {
      translateY.value = withTiming(0, { duration: 200 });
      runOnJS(setIsGestureEnabled)(true)
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: isDismissing.value
        ? withTiming(0, { duration: 300 })
        : 1, // Анимация прозрачности при удалении
    };
  });

  function onPress() {
    setIsPopupActive(false)
    setIsGestureEnabled(true)
  }

  function handleConfirmPopup(item: Train) {
    setIsConfirmPopupActive(true)
    setIsMockup(item)
  }

  return (
     <PanGestureHandler onGestureEvent={(gestureHandler)} enabled={isGestureEnabled} >
      <Animated.View style={[styles.SortPopupContainer, animatedStyle, {top: -windowAverage}]}>
        <View style={[styles.SortPopupWrapper, {gap: windowAverage * 5, backgroundColor: AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground}]}>
          <View style={{backgroundColor: "#2a2d32", width: windowAverage * 18, height: windowAverage * 2, alignSelf: "center", marginRight: windowAverage * 10, borderRadius: windowAverage * 4}}></View>
          <View style={{paddingLeft: windowAverage * 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: windowWidth - windowAverage * 10}}>
            <Text style={{color: AppTheme?.theme === "light" ? light.text : dark.text, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
             {AppTheme?.language === "rus" ? "Выберите заготовку" : AppTheme?.language === "eng" ? "Choose the mockup" : "Wählen Sie das modell"}
            </Text>
            <TouchableOpacity onPress={onPress}>
              <View style={{transform: "rotate(45deg)"}}>
                <AddSVG color='#fff' size={windowAverage * 17}/>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView style={{height: windowHeight}}> 
            <View style={[styles.wrapperSquares]}>
              {mockups && mockups.length > 0 && mockups.map((item: any, index: any) => (
                <TouchableOpacity key={index} activeOpacity={0.85} onPress={() => handleConfirmPopup(item)}>     
                  <View style={[styles.itemSquares, {backgroundColor: AppTheme?.theme === "light" ? light.bgMockup : dark.bgMockup}]}>
                    <View style={{width: "90%", alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
                      <Text style={{color: AppTheme?.theme === "light" ? light.text : dark.text, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                        {item.Date}
                      </Text>
                    </View>
                    <View style={{gap: windowAverage * 4}}>
                      {item.Exercises && Object.entries<string[]>(item.Exercises).length > 0 && Object.entries<string[]>(item.Exercises).map((item, index) => (
                        <View key={index} style={{flexDirection: "row", borderTopColor: "#303134", borderTopWidth: 1, paddingTop: windowAverage * 4}}>
                          <View style={{width: "100%", justifyContent: "flex-start", alignItems: "flex-start"}}>
                            <Text style={{color: AppTheme?.theme === "light" ? light.text : dark.text, fontSize: windowAverage * 6, fontFamily: "YS-text"}}>
                              {defineExerciseTitle(Number(item[0]), exercises)}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>         
                </TouchableOpacity> 
              ))}
            </View>
          </ScrollView>
        </View>
      </Animated.View>
   </PanGestureHandler>
  );
}


interface ConfirmPopupProps {
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  item: Train
}

const ConfirmPopup = ({ isPopupActive, setIsPopupActive, item }: ConfirmPopupProps) => {

  const dispatch = useAppDispatch()

  const router = useRouter()

  const trains = useAppSelector(state => state.trains)

  const AppTheme = useAppTheme()
  const { light, dark } = Colors

  function addMockupTrain(item: Train) {
    setIsPopupActive(false)

    const date = new Date()

    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    let Exercises: {[key: number]: string[]} = {}
    for (const i of Object.keys(item.Exercises)) {
      Exercises[Number(i)] = []
    }

    dispatch(addTrain({
      ID: defineID(trains),
      Date: formattedDate,
      Exercises         
    }))
    router.push("/(tabs)/TrainsPage")
  }

  function onDelete(ID: number) {
    dispatch(delReadyMadeTrain(ID))
    setIsPopupActive(false)
  }

  return (
    <>
    {isPopupActive &&
      <View style={styles.PopupContainer} onTouchEnd={() => setIsPopupActive(false)}>
        <View style={[styles.PopupWrapper, {backgroundColor: AppTheme?.theme === "light" ? light.checkModal : dark.checkModal}]} onTouchEnd={e => e.stopPropagation()}>
          <Text style={{color: AppTheme?.theme === "light" ? light.text : dark.text, fontSize: windowAverage * 10, fontFamily: "YS-text"}}>
            {AppTheme?.language === "rus" ? "Выберите действие" : AppTheme?.language === "eng" ? "Choose your action" : "Aktion auswählen"}
          </Text>
          <View style={{flexDirection: "row", gap: windowAverage * 5}}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => addMockupTrain(item)}>
              <View style={[styles.PopupButton, {backgroundColor: "#16a34a"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                 {AppTheme?.language === "rus" ? "Добавить" : AppTheme?.language === "eng" ? "Add train" : "Zug hinzufügen"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} onPress={() => onDelete(item.ID)}>
              <View style={[styles.PopupButton, {backgroundColor: "#C74141"}]}>
                <Text style={{color: "#fff", fontFamily: "YS-text"}}>
                  {AppTheme?.language === "rus" ? "Удалить" : AppTheme?.language === "eng" ? "Delete" : "Löschen"}
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
    paddingTop: windowAverage * 3,
    paddingBottom: windowAverage * 35,
    minHeight: windowHeight
  },
  wrapper: {
    flexDirection: "row",
    gap: windowAverage * 4,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingLeft: windowAverage * 4,  
    paddingBottom: windowAverage * 20
  },
  item: {
    width: (windowWidth / 2 - windowAverage * 6.3),
    borderRadius: windowAverage * 5,  
    flexShrink: 0,
    gap: windowAverage * 4
  },
  itemSquares: {
    width: (windowWidth / 2 - windowAverage * 6),
    height: "100%",
    padding: windowAverage * 6,
    borderRadius: windowAverage * 5,
    gap: windowAverage * 6,
    justifyContent: "flex-start", 
    flexShrink: 0,
    boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"
  },
  SortPopupContainer: {
    justifyContent: "flex-end", 
    alignItems: "center", 
    position: "absolute",
    height: windowHeight,
    zIndex: 1
  },
  SortPopupWrapper: {
    justifyContent: "flex-start", 
    alignItems: "flex-start",
    paddingTop: windowAverage * 8,
    top: windowHeight / 100 * 45,
    paddingBottom: windowAverage * 10,
    flexDirection: "column", 
    width: windowWidth
  },
  SortPopupChoose: {
    width: windowAverage * 10, 
    height: windowAverage * 10, 
    borderRadius: windowAverage * 5, 
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wrapperSquares: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: windowAverage * 4,
    justifyContent: "center",
    alignItems: "stretch",
    width: windowWidth,
    paddingBottom: windowHeight / 100 * 18
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