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
} from "react-native";
import { theme } from "./colors";

export default function App() {
  //useState(기본값 true)사용, 구조분해할당으로 working이 현재상태, setWorking이 Setter함수
  ////useState를 호출하면 배열이 반환되는데, 첫 번째 원소는 현재 상태, 두 번째 원소는 Setter 함수다.
  const [working, setWorking] = useState(true);
  //user가 입력한 값 저장
  const [text, setText] = useState("");
  //travel 함수
  const travel = () => setWorking(false);
  const [toDos, setToDos] = useState();
  //work 함수
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    //alert(text);//작동확인용
    if (text === "") {
      //todo의 현재값(text)이 비어있다면 함수 종료
      return;
    }
    const newToDos = Object.assign(
      //Object.assign으로 두 가지 객체 합쳐서 내보내기
      {}, //target object
      toDos, //이전의 toDos
      {
        [Date.now()]: { text, work: working }, //새로운 todo
      }
    );
    // save to do 나중에 할 것(일단은 공란으로 둔다)
    setToDos(newToDos);
    setText("");
  };
  console.log(toDos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        {/* work 누르면 work 함수 호출 */}
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
        {/* travel 누르면 travel 함수 호출 */}
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
        // multiline
        // secureTextEntry
        // keyboardType="numbers-and-punctuation"
        // returnKeyType="yahoo"
        onSubmitEditing={addToDo}
        value={text}
        onChangeText={onChangeText}
        placeholder={working ? "Add a To Do" : "Where do you wanna go?"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingVertical: 20, //CSS에서는 없는 속성
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
    marginTop: 20,
    fontSize: 16,
  },
});
