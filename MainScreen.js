import React , { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native';
import {Colors} from './Colors';
import * as Formulas from './Formulas'

// TODO : try to make input border bigger when it is empty
// TODO : make a general function for displaying alert box -- maybe 
// TODO : check if Throw is working properly
// TODO : Add throws instead of alert box wherever you can
// TODO : refactoring view rendering

export default function MainScreen({ navigation }) {
    
  var bgColor = Colors.darkBg;
  var numButtonColor = Colors.darkB1;
  var opButtonColor = Colors.darkB2;
  var sysButtonColor = Colors.darkB3;

  var inpTxtColor = Colors.darkInpTxt;

  var themeTxt = "Light Mode";

  var pvBorderColor = Colors.darkBorderUnselect;
  var fvBorderColor = Colors.darkBorderUnselect;
  var nBorderColor = Colors.darkBorderUnselect;
  var rBorderColor = Colors.darkBorderUnselect;
  var pmtBorderColor = Colors.darkBorderUnselect;

  const [theme, setTheme] = useState("dark");

  const [pvInputTxt, setPv] = useState("");
  const [fvInputTxt, setFv] = useState("");
  const [nInputTxt, setN] = useState("");
  const [rInputTxt, setR] = useState("");
  const [pmtInputTxt, setPmt] = useState("");

  const [selectedInp, setInput] = useState("pv");

  const [bgnTxt, setMode] = useState("BGN");

  const toggleTheme = () => {
    if (theme == "dark") {
      return "light";
    }
    return  "dark";
  }

  if (theme == "dark") { // dark theme setup
    themeTxt = "Light Mode";

    inpTxtColor = Colors.darkInpTxt;

    bgColor = Colors.darkBg;
    numButtonColor = Colors.darkB1;
    opButtonColor = Colors.darkB2;
    sysButtonColor = Colors.darkB3;
    
    pvBorderColor = (selectedInp == "pv")? Colors.darkBorderSelect : Colors.darkBorderUnselect;
    fvBorderColor = (selectedInp == "fv")? Colors.darkBorderSelect : Colors.darkBorderUnselect;
    nBorderColor = (selectedInp == "n")? Colors.darkBorderSelect : Colors.darkBorderUnselect;
    rBorderColor = (selectedInp == "r")? Colors.darkBorderSelect : Colors.darkBorderUnselect;
    pmtBorderColor = (selectedInp == "pmt")? Colors.darkBorderSelect : Colors.darkBorderUnselect;
  } else { // light theme setup
    themeTxt = "Dark Mode";
  
    inpTxtColor = Colors.lightInpTxt;

    bgColor = Colors.lightBg;
    numButtonColor = Colors.lightB1;
    opButtonColor = Colors.lightB2;
    sysButtonColor = Colors.lightB3;

    pvBorderColor = (selectedInp == "pv")? Colors.lightBorderSelect : Colors.lightBorderUnselect;
    fvBorderColor = (selectedInp == "fv")? Colors.lightBorderSelect : Colors.lightBorderUnselect;
    nBorderColor = (selectedInp == "n")? Colors.lightBorderSelect : Colors.lightBorderUnselect;
    rBorderColor = (selectedInp == "r")? Colors.lightBorderSelect : Colors.lightBorderUnselect;
    pmtBorderColor = (selectedInp == "pmt")? Colors.lightBorderSelect : Colors.lightBorderUnselect;
  }

  const clearInput = () => {
    setPv("");
    setFv("");
    setN("");
    setR("");
    setPmt("");
  }

  const typeInput = (inp) => {
    if (selectedInp == "pv") {
      (pvInputTxt.length < 15)? setPv(pvInputTxt + inp) : setPv(pvInputTxt);
    } else if (selectedInp == "fv") {
      (fvInputTxt.length < 15)? setFv(fvInputTxt + inp) : setFv(fvInputTxt);
    } else if (selectedInp == "n") {
      (nInputTxt.length < 15)? setN(nInputTxt + inp) : setN(nInputTxt);
    } else if (selectedInp == "r") {
      (rInputTxt.length < 15)? setR(rInputTxt + inp) : setR(rInputTxt);
    } else {
      (pmtInputTxt.length < 15)? setPmt(pmtInputTxt + inp) : setPmt(pmtInputTxt);
    }
  }

  const delInput = () => {
    if (selectedInp == "pv" && pvInputTxt.length > 0) {
      setPv(pvInputTxt.substring(0, pvInputTxt.length - 1));
    } else if (selectedInp == "fv" && fvInputTxt.length > 0) {
      setFv(fvInputTxt.substring(0, fvInputTxt.length - 1));
    } else if (selectedInp == "n" && nInputTxt.length > 0) {
      setN(nInputTxt.substring(0, nInputTxt.length - 1));
    } else if (selectedInp == "r" && rInputTxt.length > 0) {
      setR(rInputTxt.substring(0, rInputTxt.length - 1));
    } else if (selectedInp == "pmt" && pmtInputTxt.length > 0) {
      setPmt(pmtInputTxt.substring(0, pmtInputTxt.length - 1));
    }
  }

  const delAll = () => {
    if (selectedInp == "pv") {
      setPv("");
    } else if (selectedInp == "fv") {
      setFv("");
    } else if (selectedInp == "n") {
      setN("");
    } else if (selectedInp == "r") {
      setR("");
    } else {
      setPmt("");
    }
  }

  const toggleMode = () => {
    if (bgnTxt == "BGN") {
      setMode("END");
    } else {
      setMode("BGN");
    }
  }

  const equalsTo = () => {

    // check if empty (only one empty value allowed) --> done
    // check for power sign and change it to ** --> done
    var totalEmpty = 0;
    var inputArray = [bgnTxt];
    var emptyField = "";

    var decDigits = 2;

    if (!pvInputTxt) { // pv field is empty
      emptyField = "pv";
      totalEmpty += 1;
    } else {
      try {
        var pvEval = eval(pvInputTxt.replace(/\^/g, "**"));
        setPv(pvEval.toString());
        inputArray.push(pvEval);
      } catch(e) {
        Alert.alert(
          "PV Input Error",
          e.message.replace(/\*\*/g, "^"),
          { cancelable: false }
        );
        return;
      }
    }

    if (!fvInputTxt) { // fv is empty
      emptyField = "fv";
      totalEmpty += 1;
    } else {
      try {
        var fvEval = eval(fvInputTxt.replace(/\^/g, "**"));
        setFv(fvEval.toString());
        inputArray.push(fvEval);
      } catch(e) {
        Alert.alert(
          "FV Input Error",
          e.message.replace(/\*\*/g, "^"),
          { cancelable: false }
        );
        return;
      }
    }

    // handle n has to be positive integer --> done
    if (!nInputTxt) { // n is empty
      emptyField = "n";
      totalEmpty += 1;
    } else {
      try {
        var nEval = eval(nInputTxt.replace(/\^/g, "**"));
        if (!Number.isInteger(nEval) || nEval <= 0) {
            Alert.alert(
                "N Input Error",
                "Number of compunding periods has to be a positive integer",
                { cancelable: false }
            );
            return;
        } 
        setN(nEval.toString());
        inputArray.push(nEval);
      } catch(e) {
        Alert.alert(
          "N Input Error",
          e.message.replace(/\*\*/g, "^"),
          { cancelable: false }
        );
        return;
      }
    }

    // percentage should be between 0 and 100 --> done
    if (!rInputTxt) { // r is empty
      emptyField = "r";
      totalEmpty += 1;
    } else {
      try {
        var rEval = eval(rInputTxt.replace(/\^/g, "**"));
        if (rEval < 0 || rEval > 100) {
            Alert.alert(
                "R Input Error",
                "R values should be between 0 and 100",
                { cancelable: false }
            );
            return;
        }
        setR(rEval.toString()); 
        inputArray.push(rEval);
      } catch(e) {
        Alert.alert(
          "R Input Error",
          e.message.replace(/\*\*/g, "^"),
          { cancelable: false }
        );
        return;
      }
    }

    if (!pmtInputTxt) { // pmt is empty
      emptyField = "pmt";
      totalEmpty += 1;
    } else {
      try {
        var pmtEval = eval(pmtInputTxt.replace(/\^/g, "**"));
        setPmt(pmtEval.toString()); 
        inputArray.push(pmtEval);
      } catch(e) {
        Alert.alert(
          "PMT Input Error",
          e.message.replace(/\*\*/g, "^"),
          { cancelable: false }
        );
        return;
      }
    }

    if (totalEmpty == 0 || totalEmpty > 1) {
      Alert.alert(
        "Input Error",
        "Leave exactly one parameter that you want to calculate as blank",
        { cancelable: false }
      );
      return;
    } else {
      try {
        setInput(emptyField);
        if (emptyField == "pv") {
          setPv(Formulas.calculatePv(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "fv") {
          setFv(Formulas.calculateFv(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "n") {
          setN(Formulas.calculateN(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "r") {
          setR(Formulas.calculateR(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "pmt") {
          setPmt(Formulas.calculatePmt(inputArray).toFixed(decDigits).toString());
        } else {
          console.log("Error in empty field value");
        }
      } catch(e) {
        Alert.alert(
          "Calculation Error",
          e.message,
          { cancelable: false }
        );
        return;
      }
    }
  }

  // maybe try button instead of tochable opacity
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>

      <View style={styles.inputView}>

        <View style={styles.inputRow}>
          <Text style={[styles.inputTxt, {color: inpTxtColor}]}>PV = </Text>
          <TouchableOpacity 
          style = {{flexGrow: true, borderWidth: 1, borderColor: pvBorderColor, padding: 2}}
          onPress = {() => setInput("pv")}
          >
              <Text style={[styles.inputTxt, {color: inpTxtColor}]}>{pvInputTxt}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.inputTxt, {color: inpTxtColor}]}>FV = </Text>
          <TouchableOpacity 
          style = {{flexGrow: true, borderWidth: 1, borderColor: fvBorderColor, padding: 2}}
          onPress = {() => setInput("fv")}
          >
              <Text style={[styles.inputTxt, {color: inpTxtColor}]}>{fvInputTxt}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.inputTxt, {color: inpTxtColor}]}>N = </Text>
          <TouchableOpacity 
          style = {{flexGrow: true, borderWidth: 1, borderColor: nBorderColor, padding: 2}}
          onPress = {() => setInput("n")}
          >
              <Text style={[styles.inputTxt, {color: inpTxtColor}]}>{nInputTxt}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.inputTxt, {color: inpTxtColor}]}>R = </Text>
          <TouchableOpacity 
          style = {{flexGrow: true, borderWidth: 1, borderColor: rBorderColor, padding: 2}}
          onPress = {() => setInput("r")}
          >
              <Text style={[styles.inputTxt, {color: inpTxtColor}]}>{rInputTxt}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={[styles.inputTxt, {color: inpTxtColor}]}>PMT = </Text>
          <TouchableOpacity 
          style = {{flexGrow: true, borderWidth: 1, borderColor: pmtBorderColor, padding: 2}}
          onPress = {() => setInput("pmt")}
          >
              <Text style={[styles.inputTxt, {color: inpTxtColor}]}>{pmtInputTxt}</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.buttonView}>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, {backgroundColor: sysButtonColor}]}
            onPress={() => setTheme(toggleTheme())}
          >
            <Text style = {[styles.buttonTxt, {fontSize: 18}]}>{themeTxt}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: sysButtonColor}]}
          onPress = {() => toggleMode()}
          >
            <Text style = {styles.buttonTxt}>{bgnTxt}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: sysButtonColor}]}
          onPress={() => navigation.navigate("Cash Flow Table")}
          >
            <Text style = {styles.buttonTxt}>CF</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: sysButtonColor}]}
          onPress={clearInput}
          >
            <Text style = {styles.buttonTxt}>CLR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("(")}
          >
            <Text style = {styles.buttonTxt}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput(")")}
          >
            <Text style = {styles.buttonTxt}>)</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("^")}
          >
            <Text style = {styles.buttonTxt}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("/")}
          >
            <Text style = {styles.buttonTxt}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("7")}
          >
            <Text style = {styles.buttonTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("8")}
          >
            <Text style = {styles.buttonTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("9")}
          >
            <Text style = {styles.buttonTxt}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("*")}
          >
            <Text style = {styles.buttonTxt}>*</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}> 
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("4")}
          >
            <Text style = {styles.buttonTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("5")}
          >
            <Text style = {styles.buttonTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("6")}
          >
            <Text style = {styles.buttonTxt}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("-")}
          >
            <Text style = {styles.buttonTxt}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("1")}
          >
            <Text style = {styles.buttonTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("2")}
          >
            <Text style = {styles.buttonTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("3")}
          >
            <Text style = {styles.buttonTxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => typeInput("+")}
          >
            <Text style = {styles.buttonTxt}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput(".")}
          >
            <Text style = {[styles.buttonTxt,{fontWeight: "bold"}]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress={() => typeInput("0")}
          >
            <Text style = {styles.buttonTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: numButtonColor}]}
          onPress= {() => delInput()}
          onLongPress= {() => delAll()}
          >
            <Text style = {styles.buttonTxt}>DEL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.button, {backgroundColor: opButtonColor}]}
          onPress={() => equalsTo()}
          >
            <Text style = {styles.buttonTxt}>=</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  buttonView: {
    flex: 7, 
    margin: 5,
  },
  buttonRow: {
    flexDirection: "row",
    flex:1,
  },
  button: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  buttonTxt: {
    fontSize: 24,
    textAlign: "center",
  },
  inputView: {
    flex: 3,
    margin: 5,
  },
  inputRow: {
    flexDirection: "row",
    flex:1,
    paddingLeft: 15,
    alignItems: "center",
  },
  inputTxt: {
    fontSize: 24,
  }
});


