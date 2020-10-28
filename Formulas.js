// Formula reference:- http://www.tvmcalcs.com/index.php/tvm/formulas/tvm_formulas

/**
 * Calculate Present Value.
 * @param {Array} inputArg Parameters for calculating PV.
 * @return {float} The Present Value.
 */
export const calculatePv = (inputArg) => {
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
  
/**
 * Calculate Future Value.
 * @param {Array} inputArg Parameters for calculating FV.
 * @return {float} The Future Value.
 */
export const calculateFv = (inputArg) => {
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
  
/**
 * Calculate Annuity Payment.
 * @param {Array} inputArg Parameters for calculating Annuity.
 * @return {float} The Annuity Payment.
 */
export const calculatePmt = (inputArg) => {
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
  
/**
 * Calculate number of compounding periods.
 * @param {Array} inputArg Parameters for calculating number of compounding periods.
 * @return {float} The number of compounding periods.
 */
export const calculateN = (inputArg) => {
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
  
    if (rValue == 0) {
        return -((pvValue+fvValue)/pmtValue);
    }
  
    // check if log numerator is negative --> done
    // these formulas aren't found online, rather are deduced by converting other formulas and making n the subject.
    var numerator = 0;
    if (inputArg[0] == "END") {
      numerator = ((pmtValue)-(fvValue*rValue)) / ((pvValue*rValue)+(pmtValue));
    } else {
      numerator = ((pmtValue*oneR)-(fvValue*rValue)) / ((pvValue*rValue)+(pmtValue*oneR));
    }
  
    if (numerator < 0) {
        throw "Error in sign of input values";
    }
    return ( Math.log(numerator) / Math.log(oneR) );
}
  
/**
 * Calculate interest rate.
 * @param {Array} inputArg Parameters for calculating interest rate.
 * @return {float} The interest rate.
 */
export const calculateR = (inputArg) => {
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
              var toret = i - increment;
              if (toret == 0) { // correct rate of return is negative
                  throw "R value not found between 0 and 100";
              }
              return toret;
          } else {
            difference = Math.abs(fvValue - (-pvCompund));
          }
        }
      }
    } else { // BGN mode
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
              var toret = i - increment;
              if (toret == 0) { // correct rate of return is negative
                  throw "R value not found between 0 and 100";
              }
              return toret;
          } else {
            difference = Math.abs(fvValue - (-pvCompund));
          }
        }
      }
    }
    // throw exception here if no approriate value found --> done
    throw "R value not found between 0 and 100";
}