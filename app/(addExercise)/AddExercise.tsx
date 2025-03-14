import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter, SplashScreen, useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { defineID } from '@/components/MainPartExercises';
import { addTrain, addTrainExercise } from '@/store/trainsSlice';
import { defineExerciseTitle } from '@/components/MainPartTrains';
import { delReadyMadeTrain } from '@/store/readyMadeTrainsSlice';
import { Colors } from '@/constants/Colors';

import type { Exercise, Exercises } from '@/store/exercisesSlice';
import type { Train } from '@/store/trainsSlice'

import HeaderBack from '@/components/HeaderBack';
import AddSVG from '@/assets/images/common/AddSVG';


SplashScreen.preventAutoHideAsync();

export default function AddExercise() {

    const router = useRouter();
    const { id } = useLocalSearchParams()

    const AppTheme = useAppTheme()
    const { light, dark } = Colors

    const dispatch = useAppDispatch()

    const exercises = useAppSelector((state) => state.exercises)
    const trains = useAppSelector((state) => state.trains)

    const [sortedArr, setSortedArr] = useState<Exercises>(exercises)
    const [trainExercises, setTrainExercises] = useState<number[]>([])
    const [isPopupActive, setIsPopupActive] = useState<boolean>(false)

    useEffect(() => {
      setSortedArr(exercises)
    }, [exercises])

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

    function getAddedExercises(pid: number): string[] {
      const Train = getTrainByID(pid)

      const TrainExercises = Train?.Exercises
      if (TrainExercises) {
        return Object.keys(TrainExercises)
      }
      return []
    }

    function changeSortedArr() {
      const addedExercises = getAddedExercises(Number(id))
      let copy = Object.assign(exercises)
      for (let i=0; i < exercises.length; i++) {
        console.log(i)
      }
   
    }

    // const arr = changeSortedArr()
    // setSortedArr(arr)

    function addExercise(): void {
      if (trainExercises.length > 0 && typeof id !== "undefined") {
        setIsPopupActive(false)
  
        
        for (let i = 0; i < trainExercises.length; i++) {
          dispatch(addTrainExercise({
            trainId: Number(id),
            id: trainExercises[i]
          }))
        }
      
        setTrainExercises([])
        router.back()
      }  
    } 

    function handleCheckbox(id: number): void {
      if (trainExercises.indexOf(id) >= 0) {
        const newArr = trainExercises.filter(item => item !== id)
        setTrainExercises(newArr)
      }

      if (trainExercises.indexOf(id) < 0) {
        setTrainExercises([...trainExercises, id]) 
      }
    }

  // function readyMadeTrainOnClick(item: Train) {
    

  //   const date = new Date()

  //   const day = String(date.getDate()).padStart(2, '0'); 
  //   const month = String(date.getMonth() + 1).padStart(2, '0'); 
  //   const year = date.getFullYear();

  //   const formattedDate = `${day}.${month}.${year}`;

  //   let Exercises: {[key: number]: string[]} = {}
  //   for (const i of Object.keys(item.Exercises)) {
  //     Exercises[Number(i)] = []
  //   }

  //   dispatch(addTrain({
  //     ID: defineID(trains),
  //     Date: formattedDate,
  //     Exercises         
  //   }))

  //   router.push("/(tabs)/TrainsPage")
  // }

    function onPress() {
      setIsPopupActive(isPopupActive => !isPopupActive)
    }

  return (
    <>  
    <HeaderBack bgColor={AppTheme?.theme === "light" ? light.itemBackground : dark.itemBackground} textColor={AppTheme?.theme === "light" ? light.text : dark.text} iconColor={AppTheme?.theme === "light" ? light.navIcon : dark.navIcon} routerPath="(tabs)/TrainsPage">
      Choose exercises
    </HeaderBack>
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
        <TouchableOpacity onPress={addExercise}>
        <View style={{backgroundColor: "#16A34A", paddingVertical: windowAverage * 8, paddingHorizontal: windowAverage * 26, alignItems: "center", justifyContent: "center", borderRadius: windowAverage * 6, position: "absolute", bottom: windowAverage * 38, alignSelf: "center"}}>
          <Text style={{color: "#fff", fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
      }
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingTop: windowAverage * 3,
    paddingBottom: windowAverage * 35,
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
});