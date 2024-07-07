// renders the header for the bottom tabs navigation

// may add something that makes the logo go to the left or the center
import { 
    View,
    Image,
    StyleSheet
 } from 'react-native'

import { Color } from '../assets/general/GlobalStyles'

const TabBarHeader = () =>{
    return(
        <View style = {[styles.containerStyle]}>
            <Image
            resizeMode="cover"
            source={require("../assets/logo/pawslink_colored.png")}
            style ={[styles.logoSize]}
            />
        </View>
    )
}

export default TabBarHeader

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
        justifyContent: 'center',
    },
})