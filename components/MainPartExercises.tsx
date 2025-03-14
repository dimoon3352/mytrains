import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import Animated, { Easing, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { windowAverage, windowWidth, windowHeight } from '@/constants/Dimensions';
import { addExercise, setExercises } from '@/store/exercisesSlice';

import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import type { Exercise, Exercises } from '@/store/exercisesSlice';
import type { Trains } from '@/store/trainsSlice';

import SortSVG from '@/assets/images/common/SortSVG';
import AddSVG from '@/assets/images/common/AddSVG';
import SearchSVG from '@/assets/images/common/SearchSVG';
import { BackHandler } from 'react-native';
import { useAppTheme } from './ThemeAppProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function defineID(arr: Exercises | Trains): number {
  if (arr.length === 0) {
    return 0
  }  
  return arr[arr.length-1].ID + 1
}

interface MainPartCalculatorsProps {
  bgColor: string,
  textColor: string,
  bgItemColor: string,
  controlsBackground: string,
  checkModal: string,
  sortSigns: string,
  scrollY: number,
  isSortPopupActive: boolean,
  setIsSortPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function MainPartExercises({bgColor, textColor, bgItemColor, controlsBackground, checkModal, sortSigns, scrollY, isSortPopupActive, setIsSortPopupActive, ...props}: MainPartCalculatorsProps) {

  const dispatch = useAppDispatch()

  const exercises = useAppSelector((state) => state.exercises)

  useEffect(() => {
    const getAsync = async () => {
      try {
        const stored = await AsyncStorage.getItem("exercises");
        if (stored) {
          const parsed = JSON.parse(stored);
          dispatch(setExercises(parsed))
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAsync()
  }, [dispatch])
  
  const [sortType, setSortType] = useState<string>("date")
  const [sortedArr, setSortedArr] = useState<Exercises>(exercises)
  
  useEffect(() => {
    setSortedArr(exercises)
  }, [exercises])

  useEffect(() => {
    function onSort(): void {
      if (sortType === "date") {
        const arr = [...exercises].sort((a, b) => a.ID - b.ID)
        setSortedArr(arr)
      }

      if (sortType === "date_invert") {
        const arr = [...exercises].sort((a, b) => a.ID - b.ID)
        setSortedArr(arr.reverse())
      }
  
      if (sortType === "name") {
        const arr = [...exercises].sort((a, b) => {
          return a.ExerciseName.localeCompare(b.ExerciseName)       
      });
        setSortedArr(arr)
      }

      if (sortType === "name_invert") {
        const arr = [...exercises].sort((a, b) => {
          return a.ExerciseName.localeCompare(b.ExerciseName)      
      });
        setSortedArr(arr.reverse())
      }
    }

    onSort()
  }, [sortType])

  function onSearch(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    const filteredArr = [...exercises].filter(item =>
      item.ExerciseName.toLowerCase().includes(event.nativeEvent.text.toLowerCase()))
    setSortedArr(filteredArr)
  }

  function handlePopup() {
    if (!isSortPopupActive) {
      props.setIsPopupActive((isPopupActive) => !isPopupActive)
    } else {
      setIsSortPopupActive(false)
    }
  }

  useEffect(() => {
      const backAction = () => {
        if (isSortPopupActive) {
          // Если попап активен, изменяем его состояние
          setIsSortPopupActive(false);
          return true; // Возвращаем true, чтобы предотвратить переход назад
        }
        if (props.isPopupActive) {
          props.setIsPopupActive(false)
        }
        return false; // Возвращаем false, чтобы продолжить действия по умолчанию
      };
  
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  
      // Убираем слушатель при размонтировании компонента
      return () => backHandler.remove();
    }, [isSortPopupActive, props.isPopupActive]);

  return (
    <>
    <Popup bgColor={checkModal} bgItemColor={bgItemColor} textColor={textColor} isPopupActive={props.isPopupActive} setIsPopupActive={props.setIsPopupActive} setSortType={setSortType}/>

    <View style={[styles.header, {backgroundColor: bgItemColor}]}>
      <View style={[styles.searchContainer, {backgroundColor: controlsBackground}]}>
        <SearchSVG size="18px" color='#838383'/>
        <TextInput placeholder="Enter the exercise's name" placeholderTextColor="#838383" cursorColor="#008ef4" style={[styles.search, {backgroundColor: controlsBackground, color: textColor, fontFamily: "YS-text"}]} onChange={(e) => onSearch(e)}/>
      </View> 
      <TouchableOpacity onPress={() => setIsSortPopupActive(isSortPopupActive => !isSortPopupActive)}>
        <View style={[styles.icon, {backgroundColor: controlsBackground}]}>     
          <SortSVG size='18px' color={textColor}/>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePopup}>
        <View style={[styles.icon, {backgroundColor: controlsBackground, width: windowAverage * 26}]}>
          <AddSVG size='22px' color={textColor}/>
        </View>  
      </TouchableOpacity>
    </View>
    
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.wrapper}> 
      {sortedArr.map((item: Exercise, index: number) => (
        <Link key={item.ID} href={`/(exercises)/${item.ID}:`}>
          <View 
            key={item.ID} 
            style={[styles.item, {backgroundColor: bgItemColor}, item.ImagePath.trim().length > 0 ? 
              {paddingBottom: windowAverage * 6, justifyContent: "flex-start"} : {paddingVertical: windowAverage * 12, justifyContent: "center"}]} 
          >
            {item.ImagePath.trim().length > 0 && <Image source={{ uri: item.ImagePath}} style={styles.image} />}
            <Text style={[styles.text, {color: textColor, paddingHorizontal: windowAverage * 6}]}>
              {item.ExerciseName}
            </Text>
          </View>        
        </Link>
      ))}
      </View>

      <DraggableSort sortSigns={sortSigns} bgColor={bgItemColor} bgItemColor={controlsBackground} textColor={textColor} isPopupActive={isSortPopupActive} setIsPopupActive={setIsSortPopupActive} sortType={sortType} setSortType={setSortType} scrollY={scrollY}/>
    </View>
    </>
  );
}


interface PopupProps {
  bgColor: string,
  bgItemColor: string,
  textColor: string,
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>,
  setSortType: React.Dispatch<React.SetStateAction<string>>
}

const Popup = ({ bgColor, bgItemColor, textColor, isPopupActive, setIsPopupActive, setSortType }: PopupProps) => {

  const dispatch = useAppDispatch()

  const exercises = useAppSelector((state) => state.exercises)

  const [text, setText] = useState<string>("")

  function createExercise() {
    if (text.trim() !== "" && text.trim().length <= 20) {
      
      const date = new Date()

      const day = String(date.getDate()).padStart(2, '0'); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const year = date.getFullYear();

      const formattedDate = `${day}.${month}.${year}`;

      dispatch(addExercise({
        ID: defineID(exercises),
        ExerciseName: text,
        AdditionDate: formattedDate,
        ImagePath: ""
      }))

      setSortType("date")
      setText("")
      setIsPopupActive(false)
    }  
  }

  function onChange(event: NativeSyntheticEvent<TextInputChangeEventData>) {
    if (text.trim().length <= 20) {
      setText(event.nativeEvent.text)
    } else {
      setText(text.slice(0, 20))
    }
  }

  return (
    <>
    {isPopupActive &&
    <View style={styles.PopupContainer} onTouchEnd={() => setIsPopupActive(false)}>
      <View style={[styles.PopupWrapper, {backgroundColor: bgColor}]} onTouchEnd={e => e.stopPropagation()}>
        <Text style={{color: textColor, fontSize: windowAverage * 9}}>
          Enter an exercise name
        </Text>
        <TextInput value={text} onChange={(e) => onChange(e)} style={[styles.PopupInput, {backgroundColor: "#fff"}]} placeholder='barbell 100kg'/>
        <TouchableOpacity>
          <View style={[styles.PopupButton, {backgroundColor: "#16a34a"}]} onTouchEnd={createExercise}>
            <Text style={{color: "#fff"}}>Add new exercise</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    }
    </>
  )
}


interface SortPopupProps extends PopupProps {
  bgColor: string;
  sortType: string;
  sortSigns: string,
  scrollY: number;
}

const DraggableSort = ({ bgColor, bgItemColor, sortSigns, textColor, isPopupActive, setIsPopupActive, sortType, setSortType, scrollY }: SortPopupProps) => {
  const translateY = useSharedValue(windowHeight); // Изначальное положение
  const isDismissing = useSharedValue(false);

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
      if (event.translationY > 0) { // Проверяем, что перетаскивание идет вниз
        translateY.value = event.translationY;
      }
    },
    onEnd: () => {
      if (translateY.value > windowAverage * 42) { 
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

  function setNameType() {
    setSortType("name")
    setIsPopupActive(false)
  }

  function setNameInvertType() {
    setSortType("name_invert")
    setIsPopupActive(false)
  }

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} enabled={isPopupActive}>
      <Animated.View style={[styles.SortPopupContainer, animatedStyle, {top: (-windowAverage * 57 + scrollY)}]}>
        <View style={[styles.SortPopupWrapper, {backgroundColor: bgColor}]}>
          <View style={{backgroundColor: "#2a2d32", width: windowAverage * 18, height: windowAverage * 2, alignSelf: "center", marginRight: windowAverage * 10, borderRadius: windowAverage * 4, marginBottom: windowAverage * 3}}></View>
          <Text style={{color: textColor, fontSize: windowAverage * 12}}>
            Choose the sort
          </Text>
          <View style={{backgroundColor: bgItemColor, borderRadius: windowAverage * 4, width: (windowWidth - windowAverage * 20), marginTop: windowAverage * 7}}>
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setDateType}>
              <View style={[styles.SortPopupChoose, sortType === "date" ? {backgroundColor: "#16A34A", borderColor: "#16A34A"} : {backgroundColor: sortSigns, borderColor: sortSigns}]}>
                {sortType === "date" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: textColor, fontSize: windowAverage * 7}}>
                Sort by creation date
              </Text>
            </View>

            <View style={{backgroundColor: "#44474c", height: 1, width: (windowWidth - windowAverage * 26), alignSelf: "flex-end"}}></View>
  
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setDateInvertType}>
              <View style={[styles.SortPopupChoose, sortType === "date_invert" ? {backgroundColor: "#16A34A", borderColor: "#16A34A"} : {backgroundColor: sortSigns, borderColor: sortSigns}]}>
                {sortType === "date_invert" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: textColor, fontSize: windowAverage * 7}}>
                Sort by creation date invert
              </Text>
            </View>
  
            <View style={{backgroundColor: "#44474c", height: 1, width: (windowWidth - windowAverage * 26), alignSelf: "flex-end"}}></View>
  
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setNameType}>
              <View style={[styles.SortPopupChoose, sortType === "name" ? {backgroundColor: "#16A34A", borderColor: "#16A34A"} : {backgroundColor: sortSigns, borderColor: sortSigns}]}>
                {sortType === "name" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: textColor, fontSize: windowAverage * 7}}>
                Sort by exercise's name
              </Text>
            </View>

            <View style={{backgroundColor: "#44474c", height: 1, width: (windowWidth - windowAverage * 26), alignSelf: "flex-end"}}></View>
  
            <View style={{paddingHorizontal: windowAverage * 6, paddingVertical: windowAverage * 6, flexDirection: "row", alignItems: "center", gap: windowAverage * 6}} onTouchEnd={setNameInvertType}>
              <View style={[styles.SortPopupChoose, sortType === "name_invert" ? {backgroundColor: "#16A34A", borderColor: "#16A34A"} : {backgroundColor: sortSigns, borderColor: sortSigns}]}>
                {sortType === "name_invert" && <View style={{width: windowAverage * 5, height: windowAverage * 5, borderRadius: windowAverage * 3, backgroundColor: "#fff"}}></View>}
              </View>
              <Text style={{color: textColor, fontSize: windowAverage * 7}}>
                Sort by exercise's name invert
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
    height: "100%",
    gap: windowAverage * 4,
    boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"
  },
  text: {
    fontSize: windowAverage * 8,
    fontFamily: "YS-text"
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
  },
  image: {
    borderTopLeftRadius: windowAverage * 5,
    borderTopRightRadius: windowAverage * 5,
    width: (windowWidth / 2 - windowAverage * 6.3),
    height: windowAverage * 70,
    top: 0
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
    width: windowAverage * 160,
    height: windowAverage * 100,
    borderRadius: windowAverage * 20
  },
  PopupInput: {
    width: windowAverage * 120,
    height: windowAverage * 21,
    borderRadius: windowAverage * 5,
    paddingLeft: windowAverage * 5
  },
  PopupButton: {
    paddingHorizontal: windowAverage * 8,
    paddingVertical: windowAverage * 5,
    borderRadius: windowAverage * 4
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



