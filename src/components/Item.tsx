import { Flex, Text, useToast } from "native-base";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { observer, inject } from "mobx-react";

import moment from "moment";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import ButtonIcon from "./ButtonIcon";
import Modal from "./Modal";

import ListStoreUI, { Data } from "../stores/ListStore";

interface ItemProp {
  data: any;
  navigation: NativeStackNavigationProp<any, any>;
  ListStore: ListStoreUI;
}

const duration: number = 1500;
const placement: "top" = "top";

const Item: React.FC<ItemProp> = ({ navigation, data, ListStore }) => {
  const { item }: { item: Data } = data;

  const toast = useToast();

  const { removeItem } = ListStore;

  return (
    <Flex
      style={{
        padding: 5,
        marginBottom: 8,
        width: "100%",
        elevation: 2,
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontSize="sm">{`${moment(item.createdDate).format("DD/MM/YYYY")} - ${
        item.title
      }`}</Text>
      <Flex direction="row">
        <ButtonIcon
          size={7}
          name="eye"
          colorButton="blue.400"
          colorIcon="white"
          icon={<AntDesign />}
          onPress={() => navigation.navigate("ViewItem", JSON.stringify(item))}
        />
        <ButtonIcon
          size={7}
          name="edit"
          colorButton="green.500"
          colorIcon="white"
          icon={<MaterialIcons />}
          onPress={() =>
            navigation.navigate("AddUpdateItem", JSON.stringify(item))
          }
        />
        <Modal
          color="red.600"
          label="Excluir Tarefa"
          description="Deseja mesmo excluir esta tarefa?"
          doneLabel="Excluir"
          donePress={() => {
            try {
              removeItem(item.id);
              toast.show({
                title: `Tarefa excluída`,
                status: "success",
                duration,
                placement,
              });
            } catch (e) {
              toast.show({
                title: `Error ao excluir tarefa`,
                status: "error",
                duration,
                placement,
              });
            }
          }}
        />
      </Flex>
    </Flex>
  );
};

export default inject("ListStore")(observer(Item));
