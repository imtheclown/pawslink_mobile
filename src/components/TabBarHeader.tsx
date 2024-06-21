// renders the
import { 
    View,
    Image,
    StyleSheet
 } from 'react-native'
const TabBarHeader = () =>{
    return(
        <View>
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
    },
})