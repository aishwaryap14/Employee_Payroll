// let isUpdate = false;
// let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
           (new EmployeePayroll()).name = name.value;
           textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
});


const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
// setTextValue('.salary-output', salary.value);
output.textContent = salary.value;
salary.addEventListener('input', function() {
    output.textContent = salary.value;
    // setTextValue('.salary-output', salary.value);
});
    // checkForUpdate();
});


const save = () => {
    // event.preventDefault();
    // event.stopPropagation();
    try {
        // setEmployeePayrollObject();
        let employeePayroll = createEmployeePayroll();
        createAndUpdateStorage(employeePayroll);
        // createAndUpdateStorage();
        // resetForm();
        // window.location.replace(site.home_page);
    } catch (e) {
        return;
    }
}

function createAndUpdateStorage (employeePayroll) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined) {
        // let empPayrollData = employeePayrollList
        //                     .find(empData._id == employeePayrollObj._id);
        // if(!empPayrollData) {
        employeePayrollList.push(employeePayroll);
        // } else {
        //     const index = employeePayrollList.map(empData => empData._id)
        //                                      .indexOf(employeePayroll._id);
        //     employeePayrollList.splice(index, 1, createEmployeePayroll(employeePayroll._id));
        // }
    } else {
        employeePayrollList = [employeePayroll]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}


const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
     employeePayroll.profilePic = getSelectedValues(' [name=profile]').pop();
     employeePayroll.gender = getSelectedValues('[name=gender]').pop();
     employeePayroll.department = getSelectedValues('[name=department]');
     employeePayroll.salary = getInputValueById('#salary');
     employeePayroll.note = getInputValueById('#notes');
     let date = getInputValueById('#day')+" " + getInputValueById('#month')+" "+
                getInputValueById('#year');
     employeePayroll.date = Date.parse(date);
     alert(employeePayroll.toString());
     return employeePayroll;
}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

