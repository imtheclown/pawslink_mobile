
// implementation of qr code scanner
// provides proper modification for the vision camera to be used as a functional qr code scanner
import { Camera, CameraProps, CameraDevice, useCodeScanner, Code } from 'react-native-vision-camera'
import Reanimated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import { interpolate, Extrapolation } from 'react-native-reanimated';
import { 
    Vibration
} from 'react-native'
import { useState } from 'react'

// creates an animated camera
// necessary for the zoom capability of the qr code camera
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

// props of the component
interface QRCodeCameraProps {
    device: CameraDevice
}
const QRCodeCamera:React.FC<QRCodeCameraProps> = ({device}) =>{
    // scan qr code once per component render
    const [scanned, setScanned] = useState(false);
    // normal zoom for the camera
    const zoom = useSharedValue(device.neutralZoom)
    const zoomOffset = useSharedValue(0);
    // captures the pinching movement in the screen
    const gesture = Gesture.Pinch()
    // default value
        .onBegin(() => {
            zoomOffset.value = zoom.value
        })
        // updates the value of the zoom based on the update on the pinch done by the user
        .onUpdate(event => {
            const z = zoomOffset.value * event.scale
            zoom.value = interpolate(
            z,
            [1, 10],
            [device.minZoom, device.maxZoom],
            Extrapolation.CLAMP,
            )
        })
    // callback when the qr code scanner scans a qr code
    // --in progress
    // -- add a function that queries from the local database for the item with the given value of the qr code
    // -- create a screen after this one
    const handleScan = (codes: Code[]) => {
        // if the component has not scanned a qr code yet
        if(!scanned){
            // set the scanned flag to false
            setScanned(true);
            // make the device vibrate
            // informs user that the device has scanned a qr code
            Vibration.vibrate();
            // --erase this
            console.log(`Scanned ${codes.length} codes!`)
            // --add additional functions after this line
        }
    }
    // qr code scanner configuration
    const codeScanner = useCodeScanner({
        // defines the type of code to scan, in this case, qr for QR code
        codeTypes: ['qr', 'ean-13'],
        // calls the callback function once a code was scanned
        onCodeScanned: handleScan
    })
    // props for the camera zoom
    const animatedProps = useAnimatedProps<CameraProps>(
        () => ({ zoom: zoom.value }),
        [zoom]
    )
    return (
        // enables the program to detect gestures
        <GestureDetector gesture={gesture}>
            <ReanimatedCamera
                style = {StyleSheet.absoluteFill}
                device={device}
                isActive = {true}
                zoom={zoom}
                animatedProps={animatedProps}
                codeScanner={codeScanner}
            />
        </GestureDetector>
    )
}

export default QRCodeCamera