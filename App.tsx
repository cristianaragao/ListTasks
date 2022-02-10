import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider } from "native-base";

import { Provider } from "mobx-react";

import Stores from "./src/stores";

import Routes from "./src/Routes";

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <NativeBaseProvider>
        <Provider {...Stores}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </>
  );
};

export default App;
