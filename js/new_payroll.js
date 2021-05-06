let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
//     const name = document.querySelector('#name');
//     const textError = document.querySelector('.text-error');
//     name.addEventListener('input', function() {
//         if(name.value.length == 0) {
//             textError.textContent = "";
//             return;
//         }
//         try {
//            (new EmployeePayroll()).name = name.value;
//            textError.textContent = "";
//         } catch (e) {
//             textError.textContent = e;
//         }
// });
const name = document.querySelector('#name');
name.addEventListener('input', function() {
    if(name.value.length == 0) {
        setTextValue('.text-error',"");
        return;
    }
    try {
        (new EmployeePayroll()).name = name.value;
            setTextValue('.text-error', "");
    } catch (e) {
            setTextValue('.text-error', e);
    }
 });

const startDate = document.querySelector('#date');
date.addEventListener('input', function() {
    let date = getInputValueById('#day')+" "+getInputValueById('#month')+
                    " "+getInputValueById('#year');
    try{
        (new EmployeePayroll()).date = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
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
    checkForUpdate();
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
     employeePayroll.date = getInputValueById('#day')+" " + getInputValueById('#month')+" "+
                getInputValueById('#year');
    //  console.log(date);
    //  employeePayroll.date = Date.parse(date);
     console.log(employeePayroll.date);
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

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj.profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj.gender);
    setSelectedValues('[name=department]', employeePayrollObj.department);
    setValue('#salary', employeePayrollObj.salary);
    setTextValue('.salary-output', employeePayrollObj.salary);
    setValue('#notes', employeePayrollObj.note);
    let startDate = (employeePayrollObj.date).split(" ");
    console.log (startDate);
    setValue('#day', startDate[0]);
    setValue('#month', startDate[1]);
    setValue('#year',startDate[2]);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value === value)
        item.checked = true;
    });
}

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    // setValue('#day','1');
    // setValue('#month','January');
    // setValue('#year','2021');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}