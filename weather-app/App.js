import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar"; // third-party package
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
// ES6문법 객체 안의 width를 가져와서 이름을 SCREEN_WIDTH로 바꾼다
const { width: SCREEN_WIDTH } = Dimensions.get("window");
// const SCREEN_WIDTH = Dimensions.get("window");

const API_KEY = "a1da58522d99fbca59a77e361689bc8d";

const icons = {
  Clouds: "cloudy",
};

// console.log(SCREEN_WIDTH);
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    // const location = await Location.getCurrentPositionAsync({ accuracy: 5 });
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    const json = await response.json();
    setDays(json.weather);
    // console.log(json.weather);
    console.log(json);
    console.log(typeof json);
    // console.log(days); //[] 빈 배열
    // console.log(days.length); //0
    // console.log(typeof days); // object ? array가 아니라?
    // console.log(json.weather); //
  };
  //컴포넌트가 마운트 되면 useEffect를 사용해서 getPermissions function 호출
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              size="large"
              style={{ marginTop: 10 }}
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>27</Text>
              <Fontisto
                style={{ marginBottom: 40 }}
                name="cloudy"
                size={48}
                color="black"
              />
              <Text style={styles.description}>{day.description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "black",
    fontSize: 58,
    fontWeight: 500,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 180,
    marginTop: 45,
  },
  description: {
    marginTop: -30,
    fontSize: 45,
  },
});
