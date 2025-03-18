import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { windowAverage, windowWidth } from '@/constants/Dimensions';

import BenchPressSVG from '@/assets/images/actions/BenchPressSVG';
import PullUpSVG from '@/assets/images/actions/PullUpSVG';
import PushUpSVG from '@/assets/images/actions/PushUpSVG';
import SquatSVG from '@/assets/images/actions/SquatSVG';
import UploadSVG from '@/assets/images/common/UploadSVG';
import DownloadSVG from '@/assets/images/common/DownloadSVG';


interface MainPartCalculatorsProps {
  bgColor: string,
  textColor: string,
  bgItemColor: string,
  AppTheme: any
}

export default function MainPartActions({bgColor, textColor, bgItemColor, AppTheme}: MainPartCalculatorsProps) {

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <View>
        <Text style={{color: textColor, fontSize: windowAverage * 12, paddingLeft: windowAverage * 5, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Информация" : AppTheme?.language === "eng" ? "Info" : "Info"}:
        </Text>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 10), alignSelf: "center"}}></View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <Link href="/(info)/PullUpsPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Турник" : AppTheme?.language === "eng" ? "Pull-ups" : "Klimmzüge"}
              </Text>
            </View>
            <View style={{}}>
              <PullUpSVG width={windowAverage * 50} height={windowAverage * 78} color={textColor}/>
            </View>        
          </View>
        </Link>
        <Link href="/(info)/PushUpsPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Отжиман." : AppTheme?.language === "eng" ? "Push-ups" : "Liegestütz"}
              </Text>
            </View>
            <View style={{}}>
              <PushUpSVG width={windowAverage * 84} height={windowAverage * 43} color={textColor}/>
            </View>        
          </View>
        </Link>
      </View>
      
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>   
        <Link href="/(info)/SquatPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Присед" : AppTheme?.language === "eng" ? "Squat" : "Kniebeuge"}
              </Text>
            </View>
            <View style={{}}>
              <SquatSVG width={windowAverage * 68} height={windowAverage * 80} color={textColor}/>
            </View>        
          </View>
        </Link>
        <View style={[styles.item, {backgroundColor: bgItemColor, boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: textColor, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
              {AppTheme?.language === "rus" ? "Скоро" : AppTheme?.language === "eng" ? "Coming" : "Kommt"}
            </Text>
            {AppTheme?.language !== "rus" && <Text style={{color: textColor, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
              {AppTheme?.language === "eng" ? "soon" : "bald"}
            </Text>}
          </View>
        </View>
      </View>

      <View>
        <Text style={{color: textColor, fontSize: windowAverage * 12, paddingLeft: windowAverage * 5, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Калькуляторы" : AppTheme?.language === "eng" ? "Calculators" : "Rechner"}:
        </Text>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 10), alignSelf: "center"}}></View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
        <View style={[styles.item, {backgroundColor: bgItemColor, boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
          <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: textColor, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
              {AppTheme?.language === "rus" ? "Скоро" : AppTheme?.language === "eng" ? "Coming" : "Kommt"}
            </Text>
            {AppTheme?.language !== "rus" && <Text style={{color: textColor, fontSize: windowAverage * 12, fontFamily: "YS-text"}}>
              {AppTheme?.language === "eng" ? "soon" : "bald"}
            </Text>}
          </View>
        </View>
        <Link href="/(info)/BenchPressPage">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)"}]}>
            <View style={{flexDirection: "column", position: "absolute", right: windowAverage * 8, alignItems: "center"}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Жим" : AppTheme?.language === "eng" ? "Bench" : "Bank"}
              </Text>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "лёжа" : AppTheme?.language === "eng" ? "press" : "drücken"}
              </Text>
            </View>
            <View style={{top: windowAverage * 15}}>
              <BenchPressSVG width={windowAverage * 81} height={windowAverage * 105} color={textColor}/>
            </View>        
          </View>
        </Link>
      </View>

      <View>
        <Text style={{color: textColor, fontSize: windowAverage * 12, paddingLeft: windowAverage * 5, fontFamily: "YS-text"}}>
          {AppTheme?.language === "rus" ? "Другое" : AppTheme?.language === "eng" ? "Others" : "Others"}:
        </Text>
        <View style={{backgroundColor: textColor, height: 2, width: (windowWidth - windowAverage * 10), alignSelf: "center"}}></View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}> 
        <Link href="/(upload)/Upload">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)", flexDirection: "column-reverse", alignItems: "center"}]}>
            <View style={{flexDirection: "row"}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Загрузить" : AppTheme?.language === "eng" ? "Upload" : "Laden"}
              </Text>
            </View>
            <View style={{}}>
              <UploadSVG size={windowAverage * 60} color={textColor}/>
            </View>        
          </View>
        </Link>
        <Link href="/(download)/Download">
          <View style={[styles.item, {backgroundColor: bgItemColor, position: "relative", boxShadow: "2px 2px 8px 0px rgba(34, 60, 80, 0.2)", flexDirection: "column-reverse", alignItems: "center"}]}>
            <View style={{flexDirection: "row"}}>
              <Text style={{color: textColor, fontSize: windowAverage * 9, fontFamily: "YS-text"}}>
                {AppTheme?.language === "rus" ? "Выгрузить" : AppTheme?.language === "eng" ? "Download" : "Herunterladen"}
              </Text>
            </View>
            <View style={{}}>
              <DownloadSVG size={windowAverage * 60} color={textColor}/>
            </View>        
          </View>
        </Link>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: windowAverage * 4,
    width: windowWidth,
    paddingTop: windowAverage * 3,
    paddingBottom: windowAverage * 35,
    justifyContent: "center"
  },
  item: {
    width: windowAverage * 92,
    height: windowAverage * 92,
    borderRadius: windowAverage * 5,
    justifyContent: "center",   
  },
});


