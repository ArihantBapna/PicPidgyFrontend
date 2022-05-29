import {FlatList, Text, View} from "react-native";
import * as React from "react";
import {Avatar, Box, Center, Heading, HStack, VStack} from "native-base";
import {useEffect, useState} from "react";
import {Spacer} from "native-base/src/components/primitives/Flex";
import {makeFetchRequest} from "../../util/makeFetchRequest";

export default function LeaderboardScreen() {
    const [data, setData] = useState(null);

    useEffect( () => {
        let uid = global.uid;

        const fetchData = async () => {

            let response = await makeFetchRequest("https://pic-pidgy.herokuapp.com/groups/getUserLeaderboard/",
                JSON.stringify({uid: uid}));

            if(!response.success){
                setData(null);
            }
            else{
                let data = response.data;
                data.sort((a,b) => (a["score"] < b["score"] ? 1 : -1))
                setData(response.data);
            }
        }
        fetchData().then().catch((err) => console.log(err));

    }, []);

    return (
        <Box>
            <FlatList data={data} renderItem={({
                                                   item, index
                                               }) => <Box borderBottomWidth="1" _dark={{
            }} borderColor="coolGray.150" backgroundColor={item.id === global.uid && "green" || index === 0 && "gold" || index === 1 && "silver" || index === 2 && "brown" || index > 2 && "coolGray.10"} pl="4" pr="5" py="2">
                <HStack space={5} justifyContent="space-between">
                    <Center>
                        <Heading>{index+1}</Heading>
                    </Center>
                    <VStack>
                        <Center>
                            <Heading _dark={{
                                color: "warmGray.50"
                            }} color={item.id === global.uid && "coolGray.400"} bold>
                                {item.username}
                            </Heading>
                        </Center>
                    </VStack>
                    <Spacer />
                    {item.score > 0 &&
                        <Heading _dark={{
                            color: "warmGray.200"
                        }} size="xl"  alignSelf="flex-start">
                            {item.score}
                        </Heading>
                    }
                </HStack>
            </Box>} keyExtractor={item => item.id} />
        </Box>
    );
}
