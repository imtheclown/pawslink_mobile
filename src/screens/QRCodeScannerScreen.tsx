// screen for scanning qr codes
import { 
    PermissionsAndroid,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native"
import React from "react"
import { Camera } from "react-native-vision-camera"
import { useEffect, useState } from "react"
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera"
import { generalStyles } from "../assets/general/generalStyles"
import { FontFamily, FontSize, Color, Border } from '../assets/general/GlobalStyles';
import { useCodeScanner } from "react-native-vision-camera"
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// parameters of the component loaded when camera cannot be opened
// reason is the cause why camera cannot be loaded
// type determines the source of error
// type permission is when the application is not given the access to the camer
// type device when the back camera is not available
// callback function is the function that enables user to provide access to the application to use the camera
interface CameraCannotLoadComponentProps{
    reason: string,
    errorType: string,
    callBackFunction: (() => void) | null
}

// component loaded when the camera/qr code scanner cannot be opened
const CameraCannotLoadComponent : React.FC<CameraCannotLoadComponentProps> = ({reason, errorType, callBackFunction}) =>{
    // executes the callback function
    const handlePress = () =>{
        if(callBackFunction !== null){
            callBackFunction();
        }
    }
    // generates a button that is displayed below the reason text
    // applicable only for permission based errors
    const getPermissionButton = () =>{
        if(errorType==='permission')return (
            <TouchableOpacity onPress={handlePress} style ={[styles.button, generalStyles.centerContainer]}>
                <Text style ={[styles.cannotLoadCameraErrorText]}>{`manage permissions`}</Text>
            </TouchableOpacity>
        )
        return null
    }
    return(
        <View style = {[generalStyles.centerContainer, generalStyles.flexContainer]}>
            <View style = {[generalStyles.rowContainer]}>
                <MaterialIcons name="error-outline" size={20} color={"red"}/>
                <Text style = {[styles.cannotLoadCameraErrorText]}>{reason}</Text>
            </View>
            {getPermissionButton()}
        </View>
    )
} 

// screen that displays the qr code scanner screen
const QRCodeScanner = () =>{
    // checks if the application is permitted to use the camera
    const {hasPermission} = useCameraPermission();
    // specifies the camera to use
    // in this case the back camera of the device
    const device = useCameraDevice('back');
    const [permitted, setPermitted] = useState("denied")
    // asks permission from the user everytime the component is loaded
    // applocable only if the application is not yet permitted
    useEffect(() =>{
        if(!hasPermission){
            getCameraPermission();
        }
    }, [])
    // implementation of function that asks user to allow the application to access the camera
    const getCameraPermission = async() =>{
        const permit = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Permission Required",
                message: 'Pawslink wanted to access your camera',
                // grants access
                buttonPositive: 'Allow',
                // neutral
                buttonNeutral: 'Ask Me Later',
                // usage of camera is not allowed by the user
                buttonNegative: 'Don\'t allow'
            }
        )
        // update the state
        // reloads the component
        setPermitted(permit);
    }
    // qr code scanner configuration
    const codeScanner = useCodeScanner({
        // type of code to scan
        // in this case, qr code
        codeTypes: ['qr', 'ean-13'],
        // call back function when a code is successfully read
        // temporary for now
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`)
        }
      })
    // do not load the camera when no physical camera is not found
    if(!device){
        return (
            <CameraCannotLoadComponent callBackFunction={null} errorType="device" reason="Cannot access the camera"/>
        )
    }
    // do not load the camera when expression is not granted
    if(!hasPermission || !(permitted === PermissionsAndroid.RESULTS.GRANTED)){
        return (
            <CameraCannotLoadComponent callBackFunction={getCameraPermission} errorType="permission" reason="Pawslink is not permitted to access camera"/>
        )
    }
    return (
        // qr code scanner
        // in progress
        <Camera
            device={device}
            codeScanner={codeScanner}
            style={StyleSheet.absoluteFill}
            isActive={true}
        />
    )
}

export default QRCodeScanner
const styles = StyleSheet.create({
    cannotLoadCameraErrorText:{
        color:'black',
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_2xs,
        margin: 10
    },
    button:{
        width: 'auto',
        height: 40,
        backgroundColor: Color.colorGainsboro,
        borderRadius: Border.br_5xs
    },
})