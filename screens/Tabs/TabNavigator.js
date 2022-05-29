import Ionicons from "react-native-vector-icons/Ionicons";
import * as React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import FeedScreen from "./FeedScreen";
import CameraScreen from "./CameraScreen";
import LeaderboardScreen from "./LeaderboardScreen";

export default function Home(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'home-outline'
                            : 'home-outline';
                    } else if (route.name === 'Camera') {
                        iconName = focused ? 'camera-outline' : 'camera-outline';
                    }
                    else {
                        iconName = focused ? 'trophy-outline' : 'trophy-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'purple',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Feed" component={FeedScreen} options={{ tabBarBadge: 3}} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Tab.Navigator>
    );
}
