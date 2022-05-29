import {Text, View} from "react-native";
import * as React from "react";
import {
    Card,
    Container,
    ScrollView,
    Body,
    VStack,
    Divider,
    Box,
    HStack,
    Spinner,
    Heading,
    Image,
    Center
} from "native-base";
import {useEffect, useState} from "react";
import {makeFetchRequest} from "../../util/makeFetchRequest";
import Header from "../../components/Header";

function Content(props) {
    return null;
}

function CardItem(props) {
    return null;
}

export default function FeedScreen() {
    const [data, setData] = useState(null);

    useEffect( () => {
        const fetchData = async () => {
            let response = await makeFetchRequest("https://pic-pidgy.herokuapp.com/uploads/getAllUploads/");

            if(!response.success){
                console.log("There was an error");
                setData(null);
            }

            else{
                setData(response.data);
            }
        }
        fetchData().then().catch((err) => console.log(err));


    });

    if (data == null){
        return (
            <Box style={{height: "100%", width: "100%"}} space={2} justifyContent="center">
                <Center>
                    <HStack>
                        <Heading color="green.500" fontSize="md">
                            Loading
                        </Heading>
                        <Spinner color="green.500" accessibilityLabel="Loading posts" />
                    </HStack>
                </Center>
            </Box>
        );
    }

    return (
        <ScrollView>
            {data.map((item, index)=>{
                return (
                    <Box border="1" borderRadius="md">
                        <VStack space="4" divider={<Divider />}>
                            <Box px="4">
                                <Center>
                                    <Image style= {{ height:320, width: 350 }} source={{uri: item.url}} alt={item.username}></Image>
                                </Center>
                            </Box>
                            <Heading px="4" pb="4">
                                {item.username}
                            </Heading>
                        </VStack>
                    </Box>
                );
            })}
        </ScrollView>
    );
}
