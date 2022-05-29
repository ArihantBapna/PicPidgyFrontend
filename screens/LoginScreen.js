import {
    Box,
    Center,
    FormControl,
    Heading,
    HStack,
    Input,
    Link,
    VStack,
    Button,
    Text,
    View,
    KeyboardAvoidingView
} from "native-base";
import {useState} from "react";
import {makeFetchRequest} from "../util/makeFetchRequest";
import CryptoJS from "react-native-crypto-js";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [placeholder, setPlaceholder] = useState('');

    const updateUsername = (text) => {
        setUsername(text);
    }

    const updatePassword = (text) => {
        setPassword(text);
    }

    const loginClick = async () => {
        let body = JSON.stringify({
            username: username,
            password: CryptoJS.MD5(password).toString()
        })
        let response = await makeFetchRequest("https://pic-pidgy.herokuapp.com/login/", body);
        // If logged in successfully
        if (response["success"]){
            global.uid = response["user"]["id"]
            navigation.navigate("Home");
        }
        else{
            setUsername("");
            setPassword("");
            setPlaceholder("Incorrect username or password");
        }

    }


    return (
        <KeyboardAvoidingView>
            <Center w="100%" h="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to continue!
                    </Heading>

                    <VStack space={3} mt="5">

                        <FormControl isRequired>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input value={username} onChangeText={updateUsername} placeholder={placeholder}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input value={password} type="password" onChangeText={updatePassword}/>
                            <Link _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormControl>

                        <Button mt="2" colorScheme="indigo" onPress={loginClick}>
                            Sign in
                        </Button>


                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                I'm a new user.{" "}
                            </Text>
                            <Link onPress={() => navigation.navigate('Register')} _text={{
                                color: "indigo.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }}>
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    );
}
