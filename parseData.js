// This file holds functions for parsing the data 

import { json } from "body-parser"

function helper(a) {
    return a
}

export function makeQuery(data) {

    const consent_data = data[0]

    var {button_pressed, time_elapsed} = consent_data
    // Use JSON.parse for dictionary strings
    console.log(button_pressed,time_elapsed)
    return "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
}