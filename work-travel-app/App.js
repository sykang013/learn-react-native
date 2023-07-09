import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, //opacity 애니메이션 있음
  TouchableHighlight, //배경색 하이라이트
  TouchableWithoutFeedback, //아무 반응도 일어나지 않음
  TextInput,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "./colors";

export default function App() {
  //useState(기본값 true)사용, 구조분해할당으로 working이 현재상태, setWorking이 Setter함수
  ////useState를 호출하면 배열이 반환되는데, 첫 번째 원소는 현재 상태, 두 번째 원소는 Setter 함수다.
  const [working, setWorking] = useState(true);
  //user가 입력한 값 저장
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text === "") {
      //todo의 현재값(text)이 비어있다면 함수 종료
      return;
    }
    const newToDos = {
      ...toDos, //toDos의 값들을 전개한 값
      [Date.now()]: { text, working }, //계산된 속성명을 통한 Date.now()함수 반환값을 아이디로,
    };
    setToDos(newToDos);
    setText("");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              ...styles.btnText, //rest parameter로 styles.btnText 안의 것들 가져옴
              color: working ? "white" : theme.grey, //(스타일)컬러값은, 현재상태(working)이 true야? 그러면 white. 아니면 theme.grey
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey, //(스타일)컬러값은, 현재상태(working)이 false야? 그러면 white. 아니면 theme.grey
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo} //submit버튼이 눌려지면 호출될 콜백함수
        onChangeText={onChangeText} //text input의 텍스트가 변경될 때 호출될 콜백함수. 변경된 텍스트는 콜백 핸들러에 단일 문자열 인수로 전달됩니다.
        returnKeyType="done"
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you wanna go?"}
        style={styles.input}
      />
      {/* 스크롤이 가능한 컨테이너 역할 */}
      <ScrollView>
        {/* map을 돌리기 위해 Object의 키들을 배열로 추출-keys() 한 후 map 돌림 */}
        {Object.keys(toDos).map(
          (
            key //toDos객체 안의 key(id)들을 배열로 반환, map메서드로 각 키를 순회하며 View,Text 생성
          ) =>
            toDos[key].working === working ? ( //toDos객체안의 key(id)의 working이 working과 strict하게 동일한가?
              <View style={styles.toDo} key={key}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            ) : null // 그렇다면 <View> 컴포넌트 반환, 아니라면 null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingVertical: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 40,
    fontWeight: 600,
    color: "white",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 16,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
