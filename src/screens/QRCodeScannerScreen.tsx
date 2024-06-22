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

interface CameraCannotLoadComponentProps{
    reason: string,
    errorType: string,
    callBackFunction: (() => void) | null
}

const CameraCannotLoadComponent : React.FC<CameraCannotLoadComponentProps> = ({reason, errorType, callBackFunction}) =>{

    const handlePress = () =>{
        if(callBackFunction !== null){
            callBackFunction();
        }
    }
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


const QRCodeScanner = () =>{
    const {hasPermission} = useCameraPermission();
    const device = useCameraDevice('back');
    const [permitted, setPermitted] = useState("denied")

    useEffect(() =>{
        if(!hasPermission){
            getCameraPermission();
        }
    }, [])
    const getCameraPermission = async() =>{
        const permit = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Permission Required",
                message: 'Pawslink wanted to access your camera',
                buttonPositive: 'Allow',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Don\'t allow'
            }
        )
        setPermitted(permit);
    }
    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`)
        }
      })
    if(!device){
        return (
            <CameraCannotLoadComponent callBackFunction={null} errorType="device" reason="Cannot access the camera"/>
        )
    }
    if(!hasPermission || !(permitted === PermissionsAndroid.RESULTS.GRANTED)){
        return (
            <CameraCannotLoadComponent callBackFunction={getCameraPermission} errorType="permission" reason="Pawslink is not permitted to access camera"/>
        )
    }
    return (
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