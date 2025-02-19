import { StyleSheet, Image, Platform, View, Text, ScrollView, TouchableOpacity} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { useEffect, useState } from 'react';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartActions';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import { useLocalSearchParams } from 'expo-router';
import HeaderBack from '@/components/HeaderBack';
import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Exercise, Exercises } from '@/store/exercisesSlice';
import { defineID } from '@/components/MainPartExercises';
import { addTrain, Train } from '@/store/trainsSlice';

SplashScreen.preventAutoHideAsync();

export default function CreateTrain() {


    const router = useRouter();

    const AppTheme = useAppTheme()

    const exercises = useAppSelector((state) => state.exercises)
    const [sortedArr, setSortedArr] = useState<Exercises>(exercises)

    useEffect(() => {
      setSortedArr(exercises)
    }, [exercises])

    const dispatch = useAppDispatch()


    const trains = useAppSelector((state) => state.trains)
    const readyMadeTrains = useAppSelector((state) => state.readyMadeTrains)

    const [trainExercises, setTrainExercises] = useState<number[]>([])

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
        setTrainExercises([])
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

  // function handlePopup() {
  //   setTrainExercises([])
  //   router.push("/(tabs)/TrainsPage")
  // }

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
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;
  
      //console.error(Math.abs(translationX), Math.abs(translationY))

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/TrainsPage');
        }
      }
    }; //<Text style={{color: "#fff", fontSize: windowAverage * 10}}>Bench-press calculator</Text>

  return (
    <>
    <HeaderBack bgColor='#1D2025' textColor='#fff' iconColor='#808487' routerPath="(tabs)/TrainsPage">
      Choose exercises
    </HeaderBack>
    <View style={[styles.container, {backgroundColor: "#070707"}]}>
      <View style={styles.wrapper}> 
        {sortedArr.map((item: Exercise, index: number) => (
          <View key={item.ID} onTouchEnd={() => handleCheckbox(item.ID)}>
            <View style={[styles.item, {backgroundColor: trainExercises.indexOf(item.ID) >= 0 ? "#16A34A" : "#1D2025", paddingVertical: windowAverage * 12, justifyContent: "center"}]}>
              <Text style={[styles.text, {color: "#fff", paddingHorizontal: windowAverage * 6}]}>
                {item.ExerciseName}
              </Text>
            </View>        
          </View>
        ))}
      </View>
      {trainExercises.length > 0 &&
        <TouchableOpacity onPress={createTrain}>
        <View style={{backgroundColor: "#16A34A", paddingVertical: windowAverage * 8, paddingHorizontal: windowAverage * 26, alignItems: "center", justifyContent: "center", borderRadius: windowAverage * 6, position: "absolute", top: windowAverage * 190, alignSelf: "center"}}>
          <Text style={{color: "#fff", fontSize: windowAverage * 9}}>
            Create train
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
    paddingTop: windowAverage * 5,
    paddingBottom: windowAverage * 35,
  },
  wrapper: {
    flexDirection: "row",
    gap: windowAverage * 4,
    justifyContent: "flex-start",
    flexWrap: "wrap",
    paddingLeft: windowAverage * 4  
  },
  item: {
    width: (windowWidth / 2 - windowAverage * 6.3),
    borderRadius: windowAverage * 5,  
    flexShrink: 0,
    gap: windowAverage * 4
  },
  text: {
    fontSize: windowAverage * 8,
  },
  image: {
    borderTopLeftRadius: windowAverage * 5,
    borderTopRightRadius: windowAverage * 5,
    width: (windowWidth / 2 - windowAverage * 6.3),
    height: windowAverage * 70,
    top: 0
  },
});