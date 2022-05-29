import {
    Box,
    Button,
    Center,
    FormControl,
    Heading,
    HStack,
    Input,
    KeyboardAvoidingView,
    Link,
    Text,
    VStack
} from "native-base";
import {useState} from "react";
import CryptoJS from "react-native-crypto-js";
import {makeFetchRequest} from "../util/makeFetchRequest";

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const updateUsername = (text) => {
        setUsername(text);
    }

    const updatePassword = (text) => {
        setPassword(text);
    }

    const updateCPassword = (text) => {
        setCPassword(text);
    }

    const registerClick = async () => {
        if (!username || !password || !cPassword || (cPassword !== password)){
            clearFields();
            setUsername("Invalid registration");
        }
        else{
            let body = JSON.stringify({
                username: username,
                password: CryptoJS.MD5(password).toString()
            });
            let response = await makeFetchRequest("http://pic-pidgy.herokuapp.com/register/", body);

            if(response["success"]){
                global.uid = response["user"]["id"];
                navigation.navigate("Home");
            }
            else{
                clearFields();
                setUsername("Error registering user!")
            }
        }
    }

    function clearFields(){
        setUsername("");
        setPassword("");
        setCPassword("");
    }

    return (
        <KeyboardAvoidingView>
            <Center w="100%" h="100%">
                <Box safeArea p="2" w="90%" maxW="290" py="8">

                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Welcome
                    </Heading>

                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        Sign up to continue!
                    </Heading>
                    <VStack space={3} mt="5">

                        <FormControl isRequired>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input value={username} onChangeText={updateUsername}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input value={password} type="password" onChangeText={updatePassword}/>
                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label>Confirm Password</FormControl.Label>
                            <Input value={cPassword} type="password" onChangeText={updateCPassword}/>
                        </FormControl>

                        <Button mt="2" colorScheme="green" onPress={registerClick}>
                            Sign up
                        </Button>


                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="green.600" _dark={{
                                color: "green.200"
                            }}>
                                Already registered?
                            </Text>
                            <Link onPress={() => navigation.navigate('Login')} _text={{
                                color: "green.500",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }}>
                                Sign in
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </KeyboardAvoidingView>
    );
}
