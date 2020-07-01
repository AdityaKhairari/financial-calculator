import React, {useState} from 'react'
import { View , Text, ScrollView, TextInput, Button, Alert} from 'react-native'
import CashFlowInput from './CashFlowInput.js'

// TODO: potentially add a remove button
export default function CashFlowScreen() {
    // const textArray = [["CF 0 : ", "Enter Cashflow Amount"], ["CF 1 : ", "Enter Cashflow Amount"], ["F1 : ", "Enter Frequency of cashflow"]]
    const [textArray, setArray] = useState([])
    const [counter, setCount] = useState(1)
    const inputList = textArray.map((singleEntry) => 
        <CashFlowInput key={singleEntry[0]} title={singleEntry[0]} placeholder={singleEntry[1]}/>
    );
    // var counter = 2;
    const addCashflow = () => {
        if (textArray.length < 17) {
            var cfInput = ["CF" + (counter+1).toString() + " : " , "Enter Cashflow Amount"]
            var fInput = ["F" + (counter+1).toString() + " : " , "Enter Frequency of cashflow"]
            setArray((textArray) => [...textArray, cfInput, fInput])
            setCount(counter+1)
        } else {
            Alert.alert(
                "Note",
                "You have reached the limit",
                { cancelable: false }
            );
        }
    }

    const removeCashflow = () => {
        if (textArray.length > 0) {
            setArray(textArray.filter((singleEntry) => singleEntry[0] != "CF" + counter.toString() + " : " && singleEntry[0] != "F" + counter.toString() + " : " ))
            setCount(counter-1)
        } else {
            Alert.alert(
                "Note",
                "You need to have at least CF0 and CF1",
                { cancelable: false }
            );
        }
    }

    return (
        <ScrollView style={{padding: 10}}>
            <CashFlowInput title="CF 0 : " placeholder="Enter Cashflow Amount"/>
            <CashFlowInput title="CF 1 : " placeholder="Enter Cashflow Amount"/>
            <CashFlowInput title="F1 : " placeholder="Enter Frequency of cashflow"/>
            {inputList}
            <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
                <Button title="Add Cashflow" onPress={() => addCashflow()}/>
                <Button title="Remove Cashflow" onPress={() => removeCashflow()}/>
            </View>
            <CashFlowInput title="NPV : " placeholder="Enter Net Present Value (NPV)"/>
            <CashFlowInput title="IRR : " placeholder="Enter Internal Rate of Return (IRR)"/>
            <Button title="Calculate"/>
        </ScrollView>
    );
}


