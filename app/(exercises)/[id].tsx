import { StyleSheet, Image, Platform, View, Text, ScrollView, Alert} from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import MainPartHome from '@/components/MainPartHome';
import { useEffect } from 'react';
import { windowAverage, windowHeight } from '@/constants/Dimensions';
import BenchPress from '@/components/BenchPress';
import MainPartCalculators from '@/components/MainPartActions';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useAppTheme } from '@/components/ThemeAppProvider';
import { ThemeAppProvider } from '@/components/ThemeAppProvider';
import { useLocalSearchParams } from 'expo-router';
import HeaderBack from '@/components/HeaderBack';
import { useAppDispatch } from '@/store/hooks';
import { changeImage } from '@/store/exercisesSlice';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

SplashScreen.preventAutoHideAsync();

export default function ExercisesIndex() {

    const { id } = useLocalSearchParams();

    const pageID = Number(id.slice(0, id.length - 1))

    const router = useRouter();

    const dispatch = useAppDispatch()

    const AppTheme = useAppTheme()

    const [loaded] = useFonts({
            SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
          });
        
          useEffect(() => {
            if (loaded) {
              SplashScreen.hideAsync();
            }
          }, [loaded]);
        
          if (!loaded) {
            return null;
          }

    const [status, requestPermission] = MediaLibrary.usePermissions();
  
    const onGestureEvent = (event: any) => {
      const { translationX, translationY } = event.nativeEvent;
  
      //console.error(Math.abs(translationX), Math.abs(translationY))

      if (Math.abs(translationX) > Math.abs(translationY)) {
        if (translationX > 40) {
          router.push('/(tabs)/ExercisesPage');
        }
      }
    }; //<Text style={{color: "#fff", fontSize: windowAverage * 10}}>Bench-press calculator</Text>

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

  return (
    <ScrollView style={{backgroundColor: AppTheme?.theme === "light" ? "#ffffff" : "#070707" }}>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={onGestureEvent}>                     
          <View>          
            <HeaderBack bgColor='#1D2025' textColor='#fff' iconColor='#808487'>
              Exercise {pageID}
            </HeaderBack>
            <View style={{backgroundColor: "#16A34A", padding: windowAverage * 6}} onTouchEnd={() => pickImage(pageID)}>
              <Text style={{color: "#fff"}}>Change image {pageID}</Text> 
            </View>
                     
          </View>             
        </PanGestureHandler>
      </GestureHandlerRootView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
