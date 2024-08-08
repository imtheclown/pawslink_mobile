// sign in screen

import { 
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
} from "react-native";
import { Color,  } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
const SignInScreen = () =>{
    return (
        <SafeAreaView style = {[generalStyles.flexContainer,styles.mainContainer, ]}>
            <Image
                source={require("../../assets/logo/pawslink_colored.png")}
                resizeMode="cover"
                style = {[styles.logoStyle]}
            />
        </SafeAreaView>
    )
}
export default SignInScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.colorWhite,
    },
    logoStyle : {
        width: 167,
        height: 74,
    }
})