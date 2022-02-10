import React, { useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RouteProp } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ImageBackground } from "react-native";

import {
  Flex,
  Text,
  ScrollView,
} from "native-base";

import ButtonFab from "../components/ButtonFab";

import { Data } from "../stores/ListStore";
import moment from "moment";

interface AddItemProps {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any, any>;
}

const componentWillMount = (func: () => void) => {
  const willMount = React.useRef(true);

  if (willMount.current) func();

  willMount.current = false;
};

const ViewItem: React.FC<AddItemProps> = ({ route, navigation }) => {

  const [item, setItem] = useState<Readonly<Data> | undefined>(undefined);

  componentWillMount(() => setItem(JSON.parse(String(route.params))));

  if (item === undefined)
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );

  return (
    <Flex
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: getStatusBarHeight() + 30,
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: "100%",
          marginHorizontal: 10,
          padding: 20,
          marginTop: 10,
          marginBottom: 100,
          elevation: 2,
          backgroundColor: "#FFF",
        }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          {`Tarefa - ${moment(item.createdDate).format("DD/MM/YYYY HH:mm")}`}
        </Text>

        <Text marginTop={4} fontWeight="bold">Título:</Text>

        <Text>{item.title}</Text>

        <Text marginTop={6} fontWeight="bold">Descrição:</Text>

        <Text>{item.description}</Text>

        <Text marginTop={6} fontWeight="bold">{item.imagesPaths.length > 1 ? "Imagens" : "Imagem"}:</Text>

        {item.imagesPaths.map((url: string, index: number) => (
          <ImageBackground
            key={index}
            source={{ uri: url }}
            style={{
              width: "100%",
              height: 200,
              marginBottom: 40,
              display: "flex",
              alignItems: "flex-end",
            }}
            resizeMode="center"
          />
        ))}
      </ScrollView>

      <ButtonFab
        label="Voltar"
        bg="blue.400"
        color="white"
        onPress={() => navigation.goBack()}
      />
    </Flex>
  );
};

export default ViewItem;
