import React, { useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";

import { RouteProp } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Formik } from "formik";
import CRUDvalidation from "../validation/CRUDValidation";

import { inject, observer } from "mobx-react";

import { ImageBackground } from "react-native";

import uuid from "react-native-uuid";

import {
  Flex,
  Text,
  FormControl,
  Input,
  TextArea,
  Button,
  Icon,
  ScrollView,
  WarningOutlineIcon,
  useToast,
} from "native-base";

import * as ImagePicker from "expo-image-picker";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import ButtonIcon from "../components/ButtonIcon";
import ButtonFab from "../components/ButtonFab";

import ListStoreInterface from "../stores/ListStore";

import { Data } from "../stores/ListStore";

interface AddItemProps {
  route: RouteProp<any>;
  navigation: NativeStackNavigationProp<any, any>;
  ListStore: ListStoreInterface;
}

const duration: number = 1500;
const placement: "top" = "top";

const AddUpdateItem: React.FC<AddItemProps> = ({
  route,
  navigation,
  ListStore,
  ...props
}) => {
  const { addUpdateItem } = ListStore;

  const oldItem: Readonly<Data> | null =
    route.params !== undefined ? JSON.parse(String(route.params)) : null;

  const toast = useToast();

  const [imagesUri, setImagesUri] = useState<string[]>(
    oldItem ? oldItem.imagesPaths : []
  );

  const initialValues: any = {
    title: oldItem ? oldItem.title : "",
    description: oldItem ? oldItem.description : "",
    imagesPaths: oldItem ? oldItem.imagesPaths : [],
  };

  const setImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (result.cancelled) return;

    const arrayImages = imagesUri;

    arrayImages.push(result.uri);

    return setImagesUri((prevs) => [...arrayImages]);
  };

  const removeImage = (index: number) => {
    const arrayImages = imagesUri;

    arrayImages.splice(index, 1);

    return setImagesUri((prevs) => [...arrayImages]);
  };

  const submit = (values: any) => {
    try {
      if (!oldItem) {

        values.id = String(uuid.v4());
        values.createdDate = new Date();

        addUpdateItem(values);

      } else {

        const data: Data = {
          id: oldItem.id,
          createdDate: new Date(),
          ...values,
        };

        addUpdateItem(data);

      }

      toast.show({
        title: `Tarefa ${values.title} ${oldItem ? "atualizada" : "adicionada"
          }`,
        status: "success",
        duration,
        placement,
      });

      navigation.goBack();
    } catch (e) {
      toast.show({
        title: `Error ao adicionar tarefa`,
        status: "error",
        duration,
        placement,
      });
    }
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={CRUDvalidation}
        onSubmit={submit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          values.imagesPaths = imagesUri;

          return (
            <>
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
                  {`${oldItem ? "Atualizar" : "Nova"} Tarefa`}
                </Text>

                <FormControl
                  isRequired
                  isInvalid={touched.title && Boolean(errors.title)}
                >
                  <FormControl.Label marginTop={4}>Título</FormControl.Label>

                  <Input
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.title}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={touched.description && Boolean(errors.description)}
                >
                  <FormControl.Label marginTop={4}>Descrição</FormControl.Label>

                  <TextArea
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                    multiline
                    height={100}
                  />

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.description}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={
                    Boolean(errors.imagesPaths) &&
                    (values.imagesPaths.length < 1 ||
                      values.imagesPaths.length > 5) &&
                    Boolean(touched.imagesPaths)
                  }
                  style={{ paddingBottom: 10 }}
                >
                  <FormControl.Label marginTop={4}>
                    Adicione 1 imagem (Máximo de 5)
                  </FormControl.Label>

                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.imagesPaths}
                  </FormControl.ErrorMessage>

                  <Button
                    marginTop={2}
                    marginBottom={5}
                    style={{
                      marginHorizontal: 3,
                      marginBottom: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    bg="grey"
                    onPress={() => {
                      handleBlur("imagesPaths");
                      setImage();
                    }}
                  >
                    <Icon
                      as={FontAwesome5}
                      name="camera"
                      color="white"
                      size={6}
                      alignSelf="center"
                    />
                  </Button>
                </FormControl>

                {values.imagesPaths.map((url: string, index: number) => (
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
                  >
                    <ButtonIcon
                      size={7}
                      name="trash-bin"
                      colorButton="#FF0000"
                      colorIcon="white"
                      icon={<Ionicons />}
                      onPress={() => {
                        handleBlur("imagesPaths");
                        removeImage(index);
                      }}
                    />
                  </ImageBackground>
                ))}
              </ScrollView>

              <ButtonFab
                label={oldItem ? "Atualizar" : "Salvar"}
                bg="green.400"
                color="white"
                onPress={handleSubmit}
              />
            </>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default inject("ListStore")(observer(AddUpdateItem));
