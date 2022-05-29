import {StyleSheet} from "react-native";
import {Camera, CameraType} from "expo-camera";
import {useEffect, useState} from "react";
import {Button, HStack, Image, Pressable, Text, View} from "native-base";
import {makeFetchRequest} from "../../util/makeFetchRequest";

export default function CameraScreen() {
    // Permissions
    const [hasPermission, setHasPermission] = useState(null);

    // Camera flipping
    const [type, setType] = useState(CameraType.back);

    // Camera reference
    const [camera, setCamera] = useState(null);

    // Picture uri reference
    const [imageUri, setImageUri] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            console.log(data.uri);
            setImageUri(data.uri);
        }
    }

    const uploadPicture = async () => {
        const form = new FormData();
        form.append("file", {
           uri: imageUri,
           type: "image/jpg"
        });


        let response = await makeFetchRequest("http://0.0.0.0:3000/uploads/", form);
    }

    const setUriNull = () => {
        setImageUri(null);
    }


    if (imageUri === null){
        return (
            <View style={styles.container}>
                <Camera style={styles.camera} type={type} ref={(ref) => setCamera(ref)}/>
                <HStack style={styles.buttonContainer}>
                    <Button style={styles.clickButton} onPress={takePicture}>Click!</Button>
                    <Button style={styles.flipButton} onPress={() => {
                        setType(type === CameraType.back ? CameraType.front : CameraType.back);
                    }}>Flip!</Button>
                </HStack>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.imageContainer} source={{uri: imageUri}} alt="Image you just took"></Image>

            <HStack style={styles.buttonContainer}>
                <Button style={styles.clickButton} onPress={uploadPicture}>Upload?</Button>
                <Button style={styles.flipButton} onPress={setUriNull}>Nah :P</Button>
            </HStack>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    camera: {
        height: "90%",
        width: "100%"
    },
    imageContainer: {
        width: "100%",
        height: "90%"
    },
    clickButton: {
        backgroundColor: "green",
        width: "20%",
        height: "80%",
        marginRight: "50%"
    },
    flipButton: {
        backgroundColor: "green",
        width: "20%",
        height: "80%"
    }
});
