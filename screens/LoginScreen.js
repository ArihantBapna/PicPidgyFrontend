import {Button, Text, View} from "react-native";
import * as React from "react";

export default function LoginScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is the login screen!</Text>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="A new user? Register now"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}
