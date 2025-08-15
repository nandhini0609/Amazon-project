import { formattingPrice } from "../scripts/utils/fixPrice.js";
console.log('test suite:Automated testing for the formatting price)')

console.log('testing with random number')
if (formattingPrice(2095) === '20.95') {
    console.log('passes')
} else {
    console.log('fails')
}

console.log('testing with Zero')
if (formattingPrice(0) === '0.00') {
    console.log('passes')
} else {
    console.log('fails')
}

console.log('testing with negative number')
if (formattingPrice(2000.5) === '20.01') {
    console.log('passes')
} else {
    console.log('fails')
}