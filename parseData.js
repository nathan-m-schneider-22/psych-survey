// This file holds functions for parsing the data 

import { json } from "body-parser"

function helper(a) {
    return a
}

export function makeQuery(data) {

    const consent_data = data[0]
    const time_elapsed = consent_data.time_elapsed
    console.log(time_elapsed)
    // Use JSON.parse for dictionary strings
    return "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
}