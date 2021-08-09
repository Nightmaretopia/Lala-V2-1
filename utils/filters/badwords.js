const { censored } = require('./censoredbadwords')

let fuck_array = [
    "test"
]

fuck_array.push(...censored)
console.log(fuck_array)