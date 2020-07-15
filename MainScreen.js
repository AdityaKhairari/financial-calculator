import React , { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Alert } from 'react-native';

// TODO : try to make input border bigger when it is empty
// TODO : make a general function for displaying alert box -- maybe 
// TODO : check if Throw is working properly
// TODO : Add throws instead of alert box wherever you can
// TODO : code cleanup and refactoring

export default function MainScreen({ navigation }) {
    
  var bgColor = "black";

  var numButtonColor = "silver";
  var opButtonColor = "orange";
  var sysButtonColor = "slategray";

  // var numTxtColor = "";
  // var opTxtColor = "";
  // var sysTxtColor = "";
  var inpTxtColor = "white";

  var themeTxt = "Light Mode";

  var pvBorderColor = "black";
  var fvBorderColor = "black";
  var nBorderColor = "black";
  var rBorderColor = "black";
  var pmtBorderColor = "black";

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

  if (theme == "dark") {
    bgColor = "black";
    numButtonColor = "silver";
    opButtonColor = "orange";
    sysButtonColor = "slategray";
    // numTxtColor = "";
    // opTxtColor = "";
    // sysTxtColor = "";
    inpTxtColor = "white";
    themeTxt = "Light Mode";
    pvBorderColor = (selectedInp == "pv")? "white" : "black";
    fvBorderColor = (selectedInp == "fv")? "white" : "black";
    nBorderColor = (selectedInp == "n")? "white" : "black";
    rBorderColor = (selectedInp == "r")? "white" : "black";
    pmtBorderColor = (selectedInp == "pmt")? "white" : "black";
  } else {
    bgColor = "white";
    numButtonColor = "whitesmoke";
    opButtonColor = "orange";
    sysButtonColor = "steelblue";
    // numTxtColor = "";
    // opTxtColor = "";
    // sysTxtColor = "";
    inpTxtColor = "black";
    themeTxt = "Dark Mode";
    pvBorderColor = (selectedInp == "pv")? "black" : "white";
    fvBorderColor = (selectedInp == "fv")? "black" : "white";
    nBorderColor = (selectedInp == "n")? "black" : "white";
    rBorderColor = (selectedInp == "r")? "black" : "white";
    pmtBorderColor = (selectedInp == "pmt")? "black" : "white";
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
    //   console.log("correct input");
    //   console.log(emptyField);
    //   console.log(inputArray);
      try {
        if (emptyField == "pv") {
          setInput("pv");
          setPv(calculatePv(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "fv") {
          setInput("fv");
          setFv(calculateFv(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "n") {
          setInput("n");
          setN(calculateN(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "r") {
          setInput("r");
          setR(calculateR(inputArray).toFixed(decDigits).toString());
        } else if (emptyField == "pmt") {
          setInput("pmt");
          setPmt(calculatePmt(inputArray).toFixed(decDigits).toString());
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

// handle r == 0 --> done
// if current formula doesn't work simply use a for loop --> working
const calculatePv = (inputArg) => {
  var fvValue = inputArg[1];
  var nValue = inputArg[2];
  var rValue = inputArg[3] / 100;
  var oneR = 1 + rValue;
  var pmtValue = inputArg[4];

  if (rValue == 0) {
    return -(fvValue + (nValue*pmtValue));
  }

  if (inputArg[0] == "END") {
    return -( (fvValue / (oneR**nValue)) + ( (pmtValue/rValue)* ( 1 - (1/(oneR**nValue)) ) ) );
  } else {
    return -( (fvValue / (oneR**nValue)) + ( (pmtValue/rValue)* ( 1 - (1/(oneR**(nValue-1))) ) ) + pmtValue );
  }
}

// handle r == 0 --> done
// if current formula doesn't work simply use a for loop --> working
const calculateFv = (inputArg) => {
  var pvValue = inputArg[1];
  var nValue = inputArg[2];
  var rValue = inputArg[3] / 100;
  var oneR = 1 + rValue;
  var pmtValue = inputArg[4];

  if (rValue == 0) {
    return -(pvValue + (nValue*pmtValue));
  }

  if (inputArg[0] == "END") {
    return -( (pvValue * (oneR**nValue)) + ( (pmtValue/rValue)* ( (oneR**nValue) - 1 ) ) );
  } else {
    return -( (pvValue * (oneR**nValue)) + ( (pmtValue/rValue)* ( (oneR**nValue) - 1 ) * oneR)  );
  }
}

// handle r == 0 --> done
const calculatePmt = (inputArg) => {
  var pvValue = inputArg[1];
  var fvValue = inputArg[2];
  var nValue = inputArg[3];
  var rValue = inputArg[4] / 100;
  var oneR = 1 + rValue;

  var totalFv = fvValue + (pvValue*(oneR**nValue));
  if (rValue == 0) {
    return -(totalFv / nValue);
  }

  if (inputArg[0] == "END") {
    return -( totalFv / (((oneR**nValue) - 1) / rValue) );
  } else {
    return -( totalFv / ((((oneR**nValue) - 1) / rValue)*oneR) );
  }
}

// handle r == 0 --> done
// handle pmt == 0 --> done
const calculateN = (inputArg) => {
  var pvValue = inputArg[1];
  var fvValue = inputArg[2];
  var rValue = inputArg[3] / 100;
  var oneR = 1 + rValue;
  var pmtValue = inputArg[4];

  // todo: fv and pv can't have the same sign when pmt is zero --> done
  // todo: future value or pv can't be zero when pmt is zero --> done
  if (pmtValue == 0) {
    if (rValue == 0){
      // check if pv == -fv or send alert --> done
      if (pvValue != -fvValue) {
        throw "No feasible N value for given input";
      } 
      return 0;
    } else {
        if (pvValue*fvValue >= 0) {
            throw "FV and PV can't have same sign if Pmt = 0";
        } 
        return (Math.log(-(fvValue/pvValue)) / Math.log(oneR));
    }
  }

  // pmt and totalFV should have opposite signs ################ pending - check this condition again ############################
  if (inputArg[0] == "END") {
    return ( (Math.log(((pmtValue)-(fvValue*rValue)) / ((pvValue*rValue)+(pmtValue))) / Math.log(oneR)) );
  } else {
    return ( (Math.log(((pmtValue*oneR)-(fvValue*rValue)) / ((pvValue*rValue)+(pmtValue*oneR))) / Math.log(oneR)) );
  }
  
}

// fix this formula --> pending ################# works only in one direction right now ###################
const calculateR = (inputArg) => {
  var pvValue = inputArg[1];
  var fvValue = inputArg[2];
  var nValue = inputArg[3];
  var pmtValue = inputArg[4];

  if (pmtValue == 0) { // pv and fv should have opposite signs and shouldn't be zero --> done
    if (pvValue*fvValue >= 0) {
        throw "FV and PV can't have same sign if Pmt = 0";
    } 
    return (((-fvValue/pvValue) ** (1/nValue)) - 1);
  }

  var increment = 0.01;

  var difference = 0;
  if (inputArg[0] == "END") {
    for (var i = 0; i < 100; i += increment) { 
      var oneR_test = (i / 100) + 1;
      var pvCompund = pvValue*(oneR_test);

      for (var j = 0; j < nValue - 1; j++) {
        pvCompund = (pvCompund + pmtValue)*(oneR_test);
      }

      pvCompund = pvCompund + pmtValue;

      if (pvCompund == -fvValue) {
        return i;
      }
      
      if (i == 0) {
        difference = Math.abs(fvValue - (-pvCompund));
      } else {
        if (Math.abs(fvValue - (-pvCompund)) > difference) {
          return (i - increment);
        } else {
          difference = Math.abs(fvValue - (-pvCompund));
        }
      }
    }
  } else {
    for (var i = 0; i < 100; i += increment) { 
      var oneR_test = (i / 100) + 1;
      var pvCompund = pvValue;

      for (var j = 0; j < nValue; j++) {
        pvCompund = (pvCompund + pmtValue)*(oneR_test);
      }

      if (pvCompund == -fvValue) {
        return i;
      }

      if (i == 0) {
        difference = Math.abs(fvValue - (-pvCompund));
      } else {
        if (Math.abs(fvValue - (-pvCompund)) > difference) {
          return (i - increment);
        } else {
          difference = Math.abs(fvValue - (-pvCompund));
        }
      }
    }
  }
  // throw exception here if no approriate value found --> done
  throw "R value not found between 0 and 100";
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


