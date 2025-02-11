import { StyleSheet, View, Text, Alert, TouchableOpacity, Button } from 'react-native';
import { Link } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { windowAverage, windowHeight, windowWidth } from '@/constants/dimensions';
import { setExercises } from '@/store/exercisesSlice';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Image } from 'react-native';
import BenchPressSVG from '@/assets/images/calculators/BenchPressSVG';
import PullUpSVG from '@/assets/images/calculators/PullUpSVG';
import PushUpSVG from '@/assets/images/calculators/PushUpSVG';
import SquatSVG from '@/assets/images/calculators/SquatSVG';
import SortSVG from '@/assets/images/common/SortSVG';
import AddSVG from '@/assets/images/common/AddSVG';
import SearchSVG from '@/assets/images/common/SearchSVG';
import { changeImage } from '@/store/exercisesSlice';
import { TextInput } from 'react-native';
import type { Trains } from '@/store/trainsSlice';
import type { Exercises } from '@/store/exercisesSlice';
import { addExercise } from '@/store/exercisesSlice';
import type { NativeSyntheticEvent } from 'react-native';
import { TextInputChangeEventData } from 'react-native';

//import * as FileSystem from 'expo-file-system';


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
  headerColor: string,
}

export default function MainPartExercises({bgColor, textColor, bgItemColor, headerColor}: MainPartCalculatorsProps) {

  const dispatch = useAppDispatch()

  const exercises = useAppSelector((state) => state.exercises)

  // useEffect(() => {
  //   let exercisesJSON = localStorage.getItem("exercises")
  //   if (exercisesJSON !== null) {
  //     const parsed: Exercises = JSON.parse(exercisesJSON)
  //     dispatch(setExercises(parsed))
  //   }
  // }, [dispatch])
  
  const [isPopupActive, setIsPopupActive] = useState(false)
  const [sortedArr, setSortedArr] = useState(exercises)

  useEffect(() => {
    setSortedArr(exercises)
  }, [exercises])

  function handlePopup() {
    setIsPopupActive((isPopupActive) => !isPopupActive)
  }

  // function onSort(event) {
  //   if (event.target.value === "date") {
  //     const arr = [...exercises].sort((a, b) => a.ID - b.ID)
  //     setSortedArr(arr)
  //   }

  //   if (event.target.value === "name") {
  //     const arr = [...exercises].sort((a, b) => {
  //       return b.ExerciseName.localeCompare(a.ExerciseName)       
  //   });
  //     console.log(arr)
  //     setSortedArr(arr)
  //   }
  // }

  // function onSearch(event) {
  //   const filteredArr = [...exercises].filter(item =>
  //     item.ExerciseName.toLowerCase().includes(event.target.value.toLowerCase()))
  //   setSortedArr(filteredArr)
  // }

  //===================

 // const [image, setImage] = useState<string | null>(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  // useEffect(() => {
  //   async function checkImages() {
  //     for (let i = 0; i < exercises.length; i++) {
  //       if (exercises[i].ImagePath.length > 0) {
  //         const fileInfo = await FileSystem.getInfoAsync(exercises[i].ImagePath);
        
  //         if (fileInfo.exists) {
  //         } else {
  //           console.warn('Файл не найден по адресу:', exercises[i].ImagePath);
  //         }
  //       }       
  //     } 
  //   }

  //   checkImages()
  // }, [])

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

    // Открываем галерею
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(changeImage({ID: ID, ImagePath: result.assets[0].uri}))
    }
  };

  return (
    <>
    <Popup isPopupActive={isPopupActive} setIsPopupActive={setIsPopupActive}/>

    <View style={[styles.header, {backgroundColor: headerColor}]}>
      <View style={[styles.searchContainer, {backgroundColor: "#303134"}]}>
        <SearchSVG size="18px" color='#838383'/>
        <TextInput placeholder="Enter the exercise's name" placeholderTextColor="#838383" cursorColor="#008ef4" style={[styles.search, {backgroundColor: "#303134", color: textColor}]}/>
      </View> 
      <TouchableOpacity>
        <View style={[styles.icon, {backgroundColor: "#303134"}]}>
          <SortSVG size='18px' color={textColor}/>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsPopupActive(isPopupActive => !isPopupActive)}>
        <View style={[styles.icon, {backgroundColor: "#303134", width: windowAverage * 26}]}>
          <AddSVG size='22px' color={textColor}/>
        </View>  
      </TouchableOpacity>
    </View>
    
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View style={styles.wrapper}> 
      {sortedArr.map((item: any, index: any) => (
          <Link key={item.ID} href={`/(exercises)/${item.ID}:`}>
            <View 
              key={item.ID} 
              style={[styles.item, {backgroundColor: bgItemColor}, item.ImagePath.trim().length > 0 ? {paddingBottom: windowAverage * 6, justifyContent: "flex-start"} : {paddingVertical: windowAverage * 12, justifyContent: "center"}]} 
              // onTouchEnd={() => pickImage(item.ID)}
            >
              {item.ImagePath.trim().length > 0 && <Image source={{ uri: item.ImagePath}} style={styles.image} />}
              <Text style={[styles.text, {color: textColor, paddingHorizontal: windowAverage * 6}]}>
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


interface PopupProps {
  isPopupActive: boolean,
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Popup = ({ isPopupActive, setIsPopupActive }: PopupProps) => {

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
      <View style={styles.PopupWrapper} onTouchEnd={e => e.stopPropagation()}>
        <Text style={{color: "#fff", fontSize: windowAverage * 9}}>
          Enter an exercise title
        </Text>
        <TextInput value={text} onChange={(e) => onChange(e)} style={styles.PopupInput} placeholder='barbell 100kg'/>
        <Button onPress={createExercise} title='Click'/>
      </View>
    </View>
    }
    </>
  )
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
    backgroundColor: "#000", 
    opacity: 70,
    width: windowAverage * 140,
    height: windowAverage * 100,
    borderRadius: windowAverage * 4
  },
  PopupInput: {
    backgroundColor: "#fff",
    width: windowAverage * 110,
    height: windowAverage * 21,
    borderRadius: windowAverage * 5,
    paddingLeft: windowAverage * 5
  }
});

