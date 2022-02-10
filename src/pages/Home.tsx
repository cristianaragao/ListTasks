import React, { useEffect } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { FlatList, Flex, Text } from "native-base";

import { observer, inject } from "mobx-react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import ListStoreInterface from "../stores/ListStore";

import Item from "../components/Item";
import ButtonFab from "../components/ButtonFab";

interface HomeProps {
  navigation: NativeStackNavigationProp<any, any>;
  ListStore: ListStoreInterface;
}

const Home: React.FC<HomeProps> = ({ navigation, ListStore }) => {
  const { list, getList } = ListStore;

  useEffect(() => {
    getList();
  }, []);

  return (
    <Flex
      style={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: getStatusBarHeight() + 20,
      }}
    >
      <Text fontWeight="bold" fontSize="2xl" marginBottom={4}>
        Lista de tarefas
      </Text>

      {list.length > 0 ? (
        <FlatList
          data={list}
          keyExtractor={(item) => String(item.id)}
          renderItem={(item) => (
            <Item data={item} navigation={navigation} ListStore={ListStore} />
          )}
          width="100%"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text fontWeight="bold" margin="auto" fontSize="md">
          Lista vazia. Adicione uma tarefa.
        </Text>
      )}

      <ButtonFab
        label="Adicionar"
        bg="green.500"
        color="white"
        onPress={() => navigation.navigate("AddUpdateItem")}
      />
    </Flex>
  );
};

export default inject("ListStore")(observer(Home));
