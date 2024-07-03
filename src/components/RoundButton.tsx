// general purpose button
import { 
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native"
import React from "react"
import { generalStyles } from "../assets/general/generalStyles"
import { FontFamily,Color } from "../assets/general/GlobalStyles"

interface RoundButtonProps {
    title: string
    callBack: () => void,
    backgroundColor: string
}
const RoundButton:React.FC<RoundButtonProps> = ({title, callBack, backgroundColor}) =>{
    const handleClick = () =>{
        callBack();
    }
    return (
        <TouchableOpacity style ={[styles.buttonContainer, generalStyles.centerContainer, {backgroundColor: backgroundColor}]} onPress={handleClick}>
            <Text style = {[styles.buttonText]}>{title}</Text>
        </TouchableOpacity>
    )
}
export default RoundButton;

const styles = StyleSheet.create({
    buttonContainer:{
        marginVertical: 10,
        borderRadius: 34,
        width: "100%",
        height: 68,
        elevation: 2,
        marginBottom: 10
    },
    buttonText:{
        fontSize: 18,
        fontFamily: FontFamily.interBold,
        color: Color.colorWhite,
        textAlign: "left",
        fontWeight: "700",
        lineHeight: 26,
    }
})