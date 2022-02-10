import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./pages/Home";
import Details from "./pages/Details";
import AddUpdateItem from "./pages/AddUpdateItem";
import ViewItem from "./pages/ViewItem";

const Stack = createNativeStackNavigator();

const Routes = () => {

  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddUpdateItem" component={AddUpdateItem} />
        <Stack.Screen name="ViewItem" component={ViewItem} />
      </Stack.Navigator>
  );
}

export default Routes;