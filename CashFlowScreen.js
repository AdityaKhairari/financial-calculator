import React, {useState} from 'react'
import { View , Text, ScrollView, TextInput, Button, Alert} from 'react-native'
import CashFlowInput from './CashFlowInput.js'

// TODO: potentially add a remove button
export default function CashFlowScreen() {
    // const textArray = [["CF 0 : ", "Enter Cashflow Amount"], ["CF 1 : ", "Enter Cashflow Amount"], ["F1 : ", "Enter Frequency of cashflow"]]
    const [textArray, setArray] = useState([]);
    const [counter, setCount] = useState(1);

    const [cashInput, setCashInput] = useState(["", "", "", "", ""]);

    const handleValueChange = (value, index) => {
        let temp = [...cashInput];
        temp[index] = value;
        setCashInput(temp);
    }

    const inputList = textArray.map((singleEntry, index) => 
        <CashFlowInput key={singleEntry[0]} arrayIndex={index+5} title={singleEntry[0]} placeholder={singleEntry[1]} onValueChange={handleValueChange}/>  
    );
    // var counter = 2;
    const addCashflow = () => {
        if (textArray.length < 17) {
            var cfInput = ["CF" + (counter+1).toString() + " : " , "Enter Cashflow Amount"]
            var fInput = ["F" + (counter+1).toString() + " : " , "Enter Frequency of cashflow"]
            setArray((textArray) => [...textArray, cfInput, fInput])
            setCount(counter+1)
            let temp = [...cashInput];
            temp.push("");
            temp.push("");
            setCashInput(temp)
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
            let temp = [...cashInput];
            temp.pop();
            temp.pop();
            setCashInput(temp)
        } else {
            Alert.alert(
                "Note",
                "You need to have at least CF0 and CF1",
                { cancelable: false }
            );
        }
    }

    const calculateCashflow = () => {
        console.log(cashInput); // comment  this out later
        let cashflows = []
        for (let i = 2; i < cashInput.length; i++) {
            let floatNum = parseFloat(cashInput[i]);
            if (floatNum != NaN) {
                cashflows.push(floatNum);
            } else {
                Alert.alert(
                    "Error!!",
                    "Enter only numerical values",
                    { cancelable: false }
                );
                return;
            }
        }

        cashflows = convertFrequency(cashflows)
        if (cashflows == 0) {
            return;
        }

        if (cashInput[0] == "" && cashInput[1] == "") {
            Alert.alert(
                "Input error!!",
                "Leave either NPV or IRR as blank, not both",
                { cancelable: false }
            ); 
        } else if (cashInput[0] == "") { // calculate NPV
            let givenIrr = parseFloat(cashInput[1]);
            if (givenIrr != NaN) {
                try {
                    let npvValue = calculateNpv(givenIrr, cashflows);
                    Alert.alert(
                        "NPV found!!",
                        "NPV = " + npvValue.toFixed(2).toString(),
                        { cancelable: false }
                    ); 
                } catch(e) {
                    Alert.alert(
                        "NPV Calculation Math Error!",
                        e.message,
                        { cancelable: false }
                    );
                }
                
            } else {
                Alert.alert(
                    "Input error!!",
                    "Given IRR is not a acceptable",
                    { cancelable: false }
                ); 
            }
        } else if (cashInput[1] == "") { // calculate IRR
            let givenNpv = parseFloat(cashInput[0]);
            if (givenNpv != NaN) {
                try {
                    let irrValue = calculateIrr(givenNpv, cashflows);
                    if (isNaN(irrValue)) {
                        Alert.alert(
                            "IRR not found!!",
                            "Approriate IRR wasn't found between 0-100",
                            { cancelable: false }
                        ); 
                    } else {
                        Alert.alert(
                            "IRR found!!",
                            "IRR = " + irrValue.toFixed(2).toString(),
                            { cancelable: false }
                        ); 
                    }
                } catch(e) {
                    Alert.alert(
                        "IRR Calculation Math Error!",
                        e.message,
                        { cancelable: false }
                    );
                }
            } else {
                Alert.alert(
                    "Input error!!",
                    "Given NPV is not a number",
                    { cancelable: false }
                ); 
            }
        } else {
            Alert.alert(
                "Input error!!",
                "Leave either NPV or IRR as blank",
                { cancelable: false }
            ); 
        }
    }

    

    return (
        <ScrollView style={{padding: 10}}>
            <CashFlowInput arrayIndex={2} title="CF 0 : " placeholder="Enter Cashflow Amount" onValueChange={handleValueChange}/>
            <CashFlowInput arrayIndex={3} title="CF 1 : " placeholder="Enter Cashflow Amount" onValueChange={handleValueChange}/>
            <CashFlowInput arrayIndex={4} title="F1 : " placeholder="Enter Frequency of cashflow" onValueChange={handleValueChange}/>
            {inputList}
            <View style={{flexDirection:"row", justifyContent: "space-evenly"}}>
                <Button title="Add Cashflow" onPress={() => addCashflow()}/>
                <Button title="Remove Cashflow" onPress={() => removeCashflow()}/>
            </View>
            <CashFlowInput arrayIndex={0} title="NPV : " placeholder="Enter Net Present Value (NPV)" onValueChange={handleValueChange}/>
            <CashFlowInput arrayIndex={1} title="IRR : " placeholder="Enter Internal Rate of Return (IRR)" onValueChange={handleValueChange}/>
            <Button title="Calculate" onPress={() => calculateCashflow()}/>
        </ScrollView>
    );
}

const calculateNpv = (givenIrr, cashflows) => {
    let oneR = 1 + (givenIrr/100);
    let toret = cashflows[0];
    for (let i = 1; i < cashflows.length; i++) {
        toret += cashflows[i] / (oneR**i)
    }
    return -toret;
}

const calculateIrr = (givenNpv, cashflows) => {
    let difference = 0;
    for (let i = 0; i < 100; i += 0.01) {
        let npv = calculateNpv(i, cashflows);

        if (npv == givenNpv) {
            return i;
        }
        if (i == 0) {
            difference = Math.abs(npv - givenNpv)
        } else {
            if (Math.abs(npv - givenNpv) > difference) {
                return i - 0.01;
            } else {
                difference = Math.abs(npv - givenNpv)
            }
        }
    }
    return NaN;
}

const convertFrequency = (cashflowInput) => {
    let cashflows = [cashflowInput[0]];
    for (let i = 2; i < cashflowInput.length; i += 2) {
        let cashflow = cashflowInput[i-1];
        if (cashflowInput[i] > 0 && Number.isInteger(cashflowInput[i])) {
            for (let j = 0; j < cashflowInput[i]; j++) {
                cashflows.push(cashflow);
            }
        } else {
            Alert.alert(
                "Input error!!",
                "Frequencies can only be positive integer numbers",
                { cancelable: false }
            ); 
            return 0; // check return value // do error handling above properly
        }
    }
    return cashflows
}


