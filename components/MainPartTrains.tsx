import { StyleSheet, View, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, NativeScrollEvent, BackHandler } from 'react-native';
import { Link, router } from 'expo-router';
import { useState, useEffect, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { windowAverage, windowHeight, windowWidth } from '@/constants/Dimensions';


import SortSVG from '@/assets/images/common/SortSVG';
import AddSVG from '@/assets/images/common/AddSVG';
import SearchSVG from '@/assets/images/common/SearchSVG';
import Squares2x2SVG from '@/assets/images/common/Squares2x2SVG';

import type { Trains } from '@/store/trainsSlice';
import type { Exercises } from '@/store/exercisesSlice';
import Animated, { Easing, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';


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
  isSortPopupActive: boolean,
  setIsSortPopupActive: React.Dispatch<React.SetStateAction<boolean>>
  scrollY: number
}

export default function MainPartTrains({bgColor, textColor, bgItemColor, headerColor, isSortPopupActive, setIsSortPopupActive, scrollY}: MainPartCalculatorsProps) {

  const [sortType, setSortType] = useState<"date" | "date_invert">("date")
  const [isSquaresSelected, setIsSquaresSelected] = useState<boolean>(false)


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

  useEffect(() => {
    function onSort(): void {
      if (sortType === "date") {
        const arr = [...trains].sort((a, b) => a.ID - b.ID)
        setSortedArr(arr)
      }

      if (sortType === "date_invert") {
        const arr = [...trains].sort((a, b) => a.ID - b.ID)
        setSortedArr(arr.reverse())
      }
    }

    onSort()
  }, [sortType])

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

  function onSearch(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const filteredArr = [...trains].filter(item =>
      item.Date.toLowerCase().includes(event.nativeEvent.text.toLowerCase()))
    setSortedArr(filteredArr)
  }

  function handleSortPopup() {
    setIsSortPopupActive(isSortPopupActive => !isSortPopupActive)
  }

  // function handleWorkoutPopup() {
  //   setIsWorkoutPopupActive(isWorkoutPopupActive => !isWorkoutPopupActive)
  // }

  function handleSquaresSelected() {
    setIsSquaresSelected(isSquaresSelected => !isSquaresSelected)
  }

  useEffect(() => {
    const backAction = () => {
      if (isSortPopupActive) {
        // Если попап активен, изменяем его состояние
        setIsSortPopupActive(false);
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
  }, [isSortPopupActive]);

  //========

  

  return (
    <>
    <View style={[styles.header, {backgroundColor: headerColor}]}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: windowAverage * 5, paddingLeft: windowAverage * 8}}>
        <View style={[styles.searchContainer, {backgroundColor: "#303134"}]}>
          <SearchSVG size="18px" color='#838383'/>
          <TextInput placeholder="Enter the training date" placeholderTextColor="#838383" cursorColor="#008ef4" style={[styles.search, {backgroundColor: "#303134", color: textColor}]} onChange={(e) => onSearch(e)}/>
        </View> 
        <TouchableOpacity onPress={handleSortPopup}>
          <View style={[styles.icon, {backgroundColor: "#303134"}]}>
            <SortSVG size='18px' color={textColor}/>
          </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSquaresSelected}>
          <View style={[styles.icon, {backgroundColor: isSquaresSelected ? "#16A34A" : "#303134"}]}>
            <Squares2x2SVG size='24px' color={textColor}/>
          </View> 
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row", gap: windowAverage * 5, paddingLeft: windowAverage * 8}}>
        <TouchableOpacity onPress={() => router.push("/(createTrain)/CreateTrain")}>
          <View style={[styles.icon, {backgroundColor: "#303134", width: "auto", paddingHorizontal: windowAverage * 5, flexDirection: "row", gap: windowAverage * 3}]}>
            <AddSVG size='22px' color={textColor}/>
            <Text style={{color: "#fff", borderLeftColor: "#838383", borderLeftWidth: 1, paddingLeft: windowAverage * 6}}>
              Create new train
            </Text>
          </View>   
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.icon, {backgroundColor: "#303134", width: "auto", paddingHorizontal: windowAverage * 5, flexDirection: "row", gap: windowAverage * 3}]}>
            <AddSVG size='22px' color={textColor}/>
            <Text style={{color: "#fff", borderLeftColor: "#838383", borderLeftWidth: 1, paddingLeft: windowAverage * 6}}>
              Add mockup
            </Text>
          </View> 
        </TouchableOpacity>
      </View>
    </View>
    
    <View style={[styles.container, {backgroundColor: bgColor}]}>   
      <View style={isSquaresSelected ? styles.wrapperSquares : styles.wrapper}> 
      {sortedArr.map((item: any, index: any) => (
        <Link key={item.ID} href={`/(trains)/${item.ID}:`}>       
          <View style={[isSquaresSelected ? styles.itemSquares : styles.item, {backgroundColor: bgItemColor}]}>
            <View style={{width: "90%", alignSelf: "center", justifyContent: "center", alignItems: "center"}}>
              <Text style={[styles.text, {color: textColor}]}>
                {item.Date}
              </Text>
            </View>
            <View style={{gap: windowAverage * 4}}>
              {Object.entries<string[]>(item.Exercises).map((item, index) => (
                <View key={index} style={{flexDirection: "row", borderTopColor: "#303134", borderTopWidth: 1, paddingTop: windowAverage * 4}}>
                  <View style={{width: "50%", justifyContent: "flex-start", alignItems: "flex-start"}}>
                    <Text style={{color: textColor, fontSize: isSquaresSelected ? windowAverage * 6 : windowAverage * 8}}>
                      {defineExerciseTitle(Number(item[0]), exercises)}:
                    </Text>
                  </View>
                  <View style={{flexDirection: "row", width: "50%", justifyContent: "center", alignItems: "center", gap: windowAverage * 3, flexWrap: "wrap", overflow: "hidden"}}>
                    {item[1].map((item, index) => (        
                      <Text key={index} style={{color: textColor, fontSize: isSquaresSelected ? windowAverage * 6 : windowAverage * 8, alignSelf: "center"}}>
                        {item}
                      </Text>                 
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>         
        </Link>
      ))}
      </View>     
    
      <DraggableSort isPopupActive={isSortPopupActive} setIsPopupActive={setIsSortPopupActive} sortType={sortType} setSortType={setSortType} scrollY={scrollY}/>
    </View> 
    </>
  );
}


interface SortPopupProps {
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  sortType: "date" | "date_invert",
  setSortType: React.Dispatch<React.SetStateAction<"date" | "date_invert">>
  scrollY: number
}

const DraggableSort = ({ isPopupActive, setIsPopupActive, sortType, setSortType, scrollY }: SortPopupProps) => {
  const translateY = useSharedValue(0); // Изначальное положение
  const isDismissing = useSharedValue(false);
  

  useEffect(() => {
    if (isPopupActive) {
      translateY.value = withTiming(0, { 
        duration: 500, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), 
      }); 
      isDismissing.value = false; 
    } else {
      console.log("hide")
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
      if (event.translationY > 0) { // Проверяем, что перетаскивание идет вниз
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      if (translateY.value > windowAverage * 36) { 
        isDismissing.value = true;
        translateY.value = withTiming(windowHeight, { duration: 300 }, () => {
          runOnJS(setIsPopupActive)(false);  // Убираем компонент после анимации
        });
      } else {
        translateY.value = withTiming(0, { duration: 200 });  // Возвращаем на место
      }
    },
    onCancel: () => {
        translateY.value = withTiming(0, { duration: 200 });
    },
    onFail: () => {
        translateY.value = withTiming(0, { duration: 200 });
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

  function setDateType() {
    setSortType("date")
    setIsPopupActive(false)
  }

  function setDateInvertType() {
    setSortType("date_invert")
    setIsPopupActive(false)
  }

  return (
    <PanGestureHandler onGestureEvent={(gestureHandler)} enabled={isPopupActive}>
      <Animated.View style={[styles.SortPopupContainer, animatedStyle, {display: isPopupActive ? "flex" : "none", top: (-windowAverage * 82 + scrollY)}]}>
        <View style={styles.SortPopupWrapper}>
          <View style={{backgroundColor: "#2a2d32", width: windowAverage * 18, height: windowAverage * 2, alignSelf: "center", marginRight: windowAverage * 10, borderRadius: windowAverage * 4, marginBottom: windowAverage * 3}}></View>
          <Text style={{color: "#fff", fontSize: windowAverage * 12}}>
            Choose the sort
          </Text>
          <View style={{backgroundColor: "#2a2d32", borderRadius: windowAverage * 4, width: (windowWidth - windowAverage * 20), marginTop: windowAverage * 7}}>
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setDateType}>
              <View style={[styles.SortPopupChoose, sortType === "date" ? {backgroundColor: "#16A34A", borderColor: "#16A34A"} : {backgroundColor: "#233f4e", borderColor: "#374a5b"}]}>
                {sortType === "date" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: "#fff", fontSize: windowAverage * 7}}>
                Sort by creation date
              </Text>
            </View>

            <View style={{backgroundColor: "#44474c", height: 1, width: (windowWidth - windowAverage * 26), alignSelf: "flex-end"}}></View>
  
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setDateInvertType}>
              <View style={[styles.SortPopupChoose, sortType === "date_invert" ? {backgroundColor: "#16A34A", borderColor: "#374a5b"} : {backgroundColor: "#233f4e", borderColor: "#374a5b"}]}>
                {sortType === "date_invert" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: "#fff", fontSize: windowAverage * 7}}>
                Sort by creation date invert
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}


const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    minHeight: (windowHeight - windowAverage * 86),
    paddingTop: windowAverage * 5,
    paddingBottom: windowAverage * 35,
  },
  wrapper: {
    flexDirection: "column",
    gap: windowAverage * 4,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  wrapperSquares: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: windowAverage * 4,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingLeft: windowAverage * 4
  },
  item: {
    width: (windowWidth - windowAverage * 12),
    padding: windowAverage * 6,
    borderRadius: windowAverage * 5,
    gap: windowAverage * 6,
    justifyContent: "flex-start", 
    flexShrink: 0
  },
  itemSquares: {
    width: (windowWidth / 2 - windowAverage * 6),
    padding: windowAverage * 6,
    borderRadius: windowAverage * 5,
    gap: windowAverage * 6,
    justifyContent: "flex-start", 
    flexShrink: 0,
    height: "100%",
  },
  text: {
    fontSize: windowAverage * 9
  },
  header: {
    flexDirection: "column", 
    justifyContent: "space-evenly", 
    alignItems: "flex-start", 
    height: windowAverage * 58,
    borderBottomLeftRadius: windowAverage * 4,
    borderBottomRightRadius: windowAverage * 4,
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
      paddingBottom: windowAverage * 16,
      paddingLeft: windowAverage * 10, 
      flexDirection: "column", 
      backgroundColor: "#1D2025", 
      width: windowWidth,
      borderTopLeftRadius: windowAverage * 20,
      borderTopRightRadius: windowAverage * 20
    },
    SortPopupChoose: {
      width: windowAverage * 10, 
      height: windowAverage * 10, 
      borderRadius: windowAverage * 5, 
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center"
    }
});

