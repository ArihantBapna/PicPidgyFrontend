import {Image, Text, View} from "native-base";
import {StyleSheet} from "react-native";
export default function ImageHeader() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/logo_new.png')}
                    resizeMode='contain'
                    alt="Logo"
                />
            </View>
        )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 300,
        height: 60,
        zIndex: -100
    },


})
