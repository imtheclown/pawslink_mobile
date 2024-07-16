// renders the header for the bottom tabs navigation

// may add something that makes the logo go to the left or the center
import { 
    View,
    Image,
    StyleSheet,
    ViewStyle,
    TouchableOpacity
 } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { StackNavigationProp } from '@react-navigation/stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'
import { Color } from '../assets/general/GlobalStyles'
import { generalStyles } from '../assets/general/generalStyles'
import { memo } from 'react'

// necessary props for the tab bar header
// back is optional as it is only present in the stack navigator
// navigation is object that is present both in the stack and bottom tabs navigator
interface TabBarHeaderProps {
    back?: {title:string}|undefined,
    navigation: StackNavigationProp<ParamListBase, string, undefined>|BottomTabNavigationProp<ParamListBase, string, undefined>
}
const TabBarHeader:React.FC<TabBarHeaderProps> = ({back, navigation}) =>{
    // returns to the previous screen
    // function rerenders only if there is a change in the back or navigation props
    // prevents reconstruction of the function when the parent rerenders
    const handlePress = React.useCallback(() =>{
        if(navigation && back){
            navigation.goBack();
        }
    }, [navigation, back]);
    return(
        <View style = {[styles.containerStyle]}>
            {back && 
                <View style = {[generalStyles.flexContainer]}>
                <TouchableOpacity onPress={handlePress}>
                    <Feather name='arrow-left-circle' size={34} color={Color.colorPaleovioletred} style ={[styles.iconStyle]}/>
                </TouchableOpacity>
                </View>
            }
            <View style ={[generalStyles.flexContainer]}>
                <Image
                    resizeMode="cover"
                    source={require("../assets/logo/pawslink_colored.png")}
                    style ={[styles.logoSize]}
                />
            </View>
            {
                back && <View style ={[generalStyles.flexContainer]}>

                </View>
            }
        </View>
    )
}

export default memo(TabBarHeader);

const styles = StyleSheet.create({
    // top logo
    logoSize:{
        width: 129,
        height: 57,
        margin: 10,
    },
    containerStyle: {
        backgroundColor: Color.colorWhite,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconStyle:{
        marginLeft: 10,
    }
})