// Your code here
// Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents
function createEmployeeRecord(employee){
    return { // return js object 
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
function createEmployeeRecords (employeeRowData) {
    return employeeRowData.map(data =>{
        return createEmployeeRecord(data)
    })
}

// Add an Object with keys to the timeInEvents Array on the record Object:
// type: Set to "TimeIn"
// hour: Derived from the argument
// date: Derived from the argument
function createTimeInEvent (employee, dateStamp){
    let [date, hour] = dateStamp.split('')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

//Add an Object with keys to the timeOutEvents Array on the record Object:
// type: Set to "TimeOut"
// hour: Derived from the argument
// date: Derived from the argument
function createTimeOutEvent(employee, dateStamp){
    let [date, hour] = dateStamp.split('')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

// Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
function hoursWorkedOnDate (employee, soughtDate){
    let inEvent = employee.timeInEvents.find((event) =>{
        return event.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(event =>{
        return event.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

// Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number
function wagesEarnedOnDate(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number. HINT: You will need to find the available dates somehow..
function allWagesFor (employee){
    let eligibleDates = employee.timeInEvents.map(event =>{
        return event.date
    })
    let payable = eligibleDates.reduce((memo, date) =>{
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

//Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
function calculatePayroll (arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((memo, record) =>{
        return memo + allWagesFor(record)
    }, 0)
}
