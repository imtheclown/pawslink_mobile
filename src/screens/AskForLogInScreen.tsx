// asks user to log in
// anonymous or login with credentials

import { 
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet, 
} from "react-native";
import React, { useEffect, useState } from "react";
import { generalStyles } from '../assets/general/generalStyles';
import { FontFamily } from "../assets/general/GlobalStyles";
import LoadingModalScreen from "../components/LoadingModal";
// props for the decision button component
interface DecisionButtonProps{
    content: string,
    callBack: () => void,
    decision: decisions
}
// generates decison buttons
// generates only three buttons, neutral, negative and positive
// each has different styling
// each button has a corresspoding decisions type
const DecisionButton: React.FC<DecisionButtonProps> = ({content, callBack,decision}) =>{
    const handlePress = () =>{
        callBack();
    }
    const getButtonColor = () =>{
        if(decision === decisions.negative){
            return {
                backgroundColor: "#666666"
            }
        }
        if(decision === decisions.neutral){
            return {
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'palevioletred',
            }
        }
        return {
            backgroundColor: 'palevioletred',
        }
            
    }
    const getContentColor = () =>{
        if(decision === decisions.neutral){
            return {
                color: 'palevioletred'
            }
        }else{
            return{
                color: '#fff',
            }
        }
    }
    return (
        <TouchableOpacity style = {[styles.loginButton, getButtonColor()]} onPress={handlePress}>
            <Text style = {[styles.buttonText, getContentColor()]}>{content}</Text>
        </TouchableOpacity>
    )
}
// defines the decisions
// positive
// negative
// neutral
enum decisions {
    negative = -1,
    neutral = 0,
    positive = 1
}
// screen that asks for user input in terms of what database to use
// local database
// sync database with cloud database
// sign in 
import { useAuth } from "@realm/react";
const AskForLoginScreen = () =>{
    const [loading, setLoading] = useState(false);
    const [loadingTitle, setLoadingTitle] = useState("")
    const decisionList = [decisions.negative, decisions.neutral, decisions.positive];
    const {logInWithAnonymous, result} =useAuth();
    const handleDecision = (decision:decisions) =>{
        if(decision === decisions.neutral){
            updateOnly();
        }
    }
    const updateOnly = () =>{
        setLoadingTitle("signing in as anonymous");
        setLoading(true)
        logInWithAnonymous();
    }
    useEffect(() =>{
        if(result.pending){
            setLoading(true);
        }
        if(result.error){
            console.log(result.error);
        }
    }, [])
    return(
        <SafeAreaView style ={[generalStyles.centerContainer, generalStyles.flexContainer]}>
            {result.pending && <LoadingModalScreen title= {loadingTitle} isLoading= {loading}/>}
            <Text style={[styles.notifTextStyle]}>{`you are connected to the internet`}</Text>
            {decisionList.map((decision, index) =>{
                var content = "use offline content"
                if(decision === decisions.neutral){
                    content = "update"
                }
                if(decision === decisions.positive){
                    content = "sign in"
                }

                const callBack = () =>{
                    handleDecision(decision)
                }
                return(
                    <DecisionButton 
                        decision={decision}
                        key={index}
                        content={content}
                        callBack={callBack}
                    />
                )
            })}
        </SafeAreaView>
    )
}

export default AskForLoginScreen

const styles = StyleSheet.create({
    loginButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        margin: 5,
        width: '50%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    notifTextStyle: {
        color: 'black',
        fontSize: 20,
        fontFamily: FontFamily.epilogueBold,
        marginBottom: 10,
    }
})