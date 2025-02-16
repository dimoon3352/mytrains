import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { windowAverage, windowWidth } from '@/constants/dimensions';
import { setExercises } from '@/store/exercisesSlice';

import BenchPressSVG from '@/assets/images/actions/BenchPressSVG';
import PullUpSVG from '@/assets/images/actions/PullUpSVG';
import PushUpSVG from '@/assets/images/actions/PushUpSVG';
import SquatSVG from '@/assets/images/actions/SquatSVG';
import SortSVG from '@/assets/images/common/SortSVG';
import AddSVG from '@/assets/images/common/AddSVG';
import SearchSVG from '@/assets/images/common/SearchSVG';
import { TextInput } from 'react-native';

import type { Trains } from '@/store/trainsSlice';
import type { Exercises } from '@/store/exercisesSlice';


export function defineExerciseTitle(trainExerciseID: number, exercisesArray: Exercises): string {
  for (let i = 0; i < exercisesArray.length; i++) {
    if (trainExerciseID === exercisesArray[i].ID) {
      return exercisesArray[i].ExerciseName
    }
  }
  return "?"
}

interface MainPartCalculatorsProps {
  bgColor: string,
  textColor: string,
  bgItemColor: string,
  headerColor: string,
}

export default function MainPartTrains({bgColor, textColor, bgItemColor, headerColor}: MainPartCalculatorsProps) {

  const [isPopupActive, setIsPopupActive] = useState(false)
  const [isWorkoutPopupActive, setIsWorkoutPopupActive] = useState(false)

  const dispatch = useAppDispatch()

  const trains = useAppSelector((state) => state.trains)
  const exercises = useAppSelector((state) => state.exercises)

  const [sortedArr, setSortedArr] = useState(trains)

  // useEffect(() => {
  //     let trainsJSON = localStorage.getItem("trains")
  //     if (trainsJSON !== null) {
  //       const parsed: Trains = JSON.parse(trainsJSON)
  //       dispatch(setTrains(parsed))
  //     }
  //   }, [dispatch])

  useEffect(() => {
    setSortedArr(trains)
  }, [trains])

  function onSort(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "date") {
      const arr = [...trains].sort((a, b) => a.ID - b.ID)
      setSortedArr(arr)
    }

    if (event.target.value === "invert") {
      const arr = [...trains].sort((a, b) => b.ID - a.ID);
      console.log(arr)
      setSortedArr(arr)
    }
  }

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const filteredArr = [...trains].filter(item =>
      item.Date.toLowerCase().includes(event.target.value.toLowerCase()))
    setSortedArr(filteredArr)
  }

  function handlePopup() {
    setIsPopupActive(isPopupActive => !isPopupActive)
  }

  function handleWorkoutPopup() {
    setIsWorkoutPopupActive(isWorkoutPopupActive => !isWorkoutPopupActive)
  }

  //========

  return (
    <>
    <View style={[styles.header, {backgroundColor: headerColor}]}>
      <View style={[styles.searchContainer, {backgroundColor: "#303134"}]}>
        <SearchSVG size="18px" color='#838383'/>
        <TextInput placeholder="Enter the date of the train" placeholderTextColor="#838383" cursorColor="#008ef4" style={[styles.search, {backgroundColor: "#303134", color: textColor}]}/>
      </View> 
      <TouchableOpacity>
        <View style={[styles.icon, {backgroundColor: "#303134"}]}>
          <SortSVG size='18px' color={textColor}/>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[styles.icon, {backgroundColor: "#303134", width: windowAverage * 26}]}>
          <AddSVG size='22px' color={textColor}/>
        </View>  
      </TouchableOpacity>
    </View>
    
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.wrapper}> 
      {sortedArr.map((item: any, index: any) => (
        <Link key={item.ID} href="/(calculators)/BenchPressPage">        
          <View style={[styles.item, {backgroundColor: bgItemColor}]}>
            <Text style={[styles.text, {color: textColor}]}>
              {item.ExerciseName}
            </Text>
          </View>         
        </Link>
      ))}
      </View>   
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
    justifyContent: "center",
  },
  item: {
    width: (windowWidth - windowAverage * 12),
    paddingTop: windowAverage * 12,
    paddingBottom: windowAverage * 12,
    borderRadius: windowAverage * 5,
    justifyContent: "center",  
    paddingHorizontal: windowAverage * 6,
    flexShrink: 0
  },
  text: {
    fontSize: windowAverage * 9
  },
  header: {
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    alignItems: "center", 
    height: windowAverage * 32,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4
  },
  icon: {
    height: windowAverage *21, 
    width: windowAverage * 21, 
    borderRadius: windowAverage * 7, 
    alignItems: "center", 
    justifyContent: "center"
  },
  searchContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: windowWidth / 100 * 65, 
    height: windowAverage * 21,
    borderRadius: windowAverage * 7,
    paddingLeft: windowAverage * 5,
  },
  search: { 
    width: windowWidth / 100 * 54, 
    height: windowAverage * 21,
    borderRadius: windowAverage * 7,
    paddingLeft: windowAverage * 5
  }
});

