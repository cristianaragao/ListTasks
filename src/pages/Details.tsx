import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { View, Text, Button } from "react-native";

const Details = ({ navigation } : { navigation: NativeStackNavigationProp<any, any> }) => {

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Details</Text>
            <Button
                title="Go to back"
                onPress={() => navigation.goBack()}
            />
        </View>
    )

}

export default Details;