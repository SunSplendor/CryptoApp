
  export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
  }

  export function percentDifference(a, b) {
    let num1 = parseFloat(a);
    let num2 = parseFloat(b);

    // Check if either number is NaN after parsing, or if their sum is too close to zero
    if (isNaN(num1) || isNaN(num2) || Math.abs(num1 + num2) < Number.EPSILON) {
        return NaN;
    }

    return +(100 * Math.abs((num1 - num2) / ((num1 + num2) / 2))).toFixed(2);
}