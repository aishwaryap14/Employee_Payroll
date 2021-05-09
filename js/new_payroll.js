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
        // (new EmployeePayroll()).name = name.value;
        checkName(name.value);
            setTextValue('.text-error', "");
    } catch (e) {
            setTextValue('.text-error', e);
    }
 });

const date = document.querySelector('#date');
date.addEventListener('input', function() {
    let startDate = getInputValueById('#day')+" "+getInputValueById('#month')+
                    " "+getInputValueById('#year');
    try{
        console.log( startDate);
        checkStartDate(new Date(Date.parse(startDate)));
        // (new EmployeePayroll()).startDate = startDate;
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
// document.querySelector('#cancelButton').href = site.home_page;
checkForUpdate();
});


const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        if (site.use_local_storage.match("true")) {
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site.home_page);
        } else {
            createOrUpdateEmployeePayroll();
        }
        // let employeePayroll = createEmployeePayroll();
        // createAndUpdateStorage(employeePayroll);
        // window.location.replace(site.home_page);
    } catch (e) {
        return;
    }
}

const createOrUpdateEmployeePayroll = () => {
    let postURL = site.server_url;
    let methodCall = "POST";
    if(isUpdate) {
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayrollObj)
    .then(responseText => {
        resetForm();
        window.location.replace(site.home_page);
    })
    .catch(error =>{
        throw error;
    });
}

/*used to set values after modification*/
const setEmployeePayrollObject = () => {
    if(!isUpdate && site.use_local_storage.match("true")) {
        employeePayrollObj.id = createNewEmployeeId();
    }
    employeePayrollObj.name = getInputValueById('#name');
    employeePayrollObj.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj.department = getSelectedValues('[name=department]');
    employeePayrollObj.salary = getInputValueById('#salary');
    employeePayrollObj.note = getInputValueById('#notes');
    employeePayrollObj.startDate = getInputValueById('#day')+" "+getInputValueById('#month')+" "+
               getInputValueById('#year');
    // console.log(startDate);
    // employeePayrollObj.startDate = date;
    // console.log(employeePayrollObj._startDate);
}

function createAndUpdateStorage () {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList) {
        console.log(employeePayrollObj);
        let empPayrollData = employeePayrollList
                            .find(empData => {console.log(empData.id,employeePayrollObj.id,empData.id === employeePayrollObj.id);
                              return empData.id === employeePayrollObj.id} );
        
        if(!empPayrollData) {
        employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList.map(empData => empData.id)
                                             .indexOf(employeePayrollObj.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    } else {
        let newEmp = employeePayrollObj();
        console.log(newEmp);
        employeePayrollList = [newEmp]
    }
    // alert(employeePayrollList.toString());
    alert("Employee Details Submitted !!");
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// const createEmployeePayrollData = (id) => {
//     let employeePayroll =  employeePayrollObj;
//     if (!id) employeePayroll.id = createNewEmployeeId();
//     else employeePayroll.id = id;
//     // setEmployeePayrollData(employeePayroll);
//     return employeePayroll;
// }

// const setEmployeePayrollData = (employeePayroll) => {
//     try {
//         employeePayroll.name = employeePayrollObj._name;
//     } catch (e) {
//         setTextValue('.text-error', e);
//         throw e;
//     }
//     employeePayroll.profilePic = employeePayrollObj._profilePic;
//     employeePayroll.gender = employeePayrollObj._gender;
//     employeePayroll.department = employeePayrollObj._department;
//     employeePayroll.salary = employeePayrollObj._salary;
//     employeePayroll.note = employeePayrollObj._note;
//     try {
//         // employeePayroll.startDate = new Date(Date.parse(employeePayrollObj._startDate));
//         employeePayroll.startDate = employeePayrollObj._startDate;
//     } catch (e) {
//         setTextValue('.date-error', e);
//         throw e;
//     }
//     alert(employeePayroll.toString());
// }

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
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
     employeePayroll.startDate = getInputValueById('#day')+" " + getInputValueById('#month')+" "+
                getInputValueById('#year');
    //  console.log(date);
    //  employeePayroll.startDate = new Date(parseInt(document.getElementById("year").value), 
    //                         parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
     console.log(employeePayroll.startDate);
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

/* setForm used to show name & other contents while clicked on update */
const setForm = () => {
    setValue('#name', employeePayrollObj.name);
    setSelectedValues('[name=profile]', employeePayrollObj.profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj.gender);
    setSelectedValues('[name=department]', employeePayrollObj.department);
    setValue('#salary', employeePayrollObj.salary);
    setTextValue('.salary-output', employeePayrollObj.salary);
    setValue('#notes', employeePayrollObj.note);
    // let date = stringifyDate(employeePayrollObj.startDate).split(" ");
    let date = employeePayrollObj.startDate.split(" ");
    console.log ("After: "+date);
    setValue('#day', date[0]);
     console.log (date[0])
    setValue('#month', date[1]);
     console.log (date[1]);
    setValue('#year',date[2]);
    console.log(date[2]);
}

/* setSelectedValues used to show employee details on form while editing */
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

/* resetForm used to clear the form content */
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
    console.log("Update employee: ",employeePayrollObj);
    setForm();
}