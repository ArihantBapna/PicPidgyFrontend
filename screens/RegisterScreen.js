import {Button, Text, View} from "react-native";

export default function RegisterScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is the register screen!</Text>
            <Button
                title="Register"
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Already registered? Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}
