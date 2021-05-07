const stringifyDate = (startDate) => {
const options = { day: 'numeric', month: 'short', year: 'numeric'};
const newDate = !startDate ? "undefined":
                new Date(Date.parse(startDate)).toLocaleDateString('en-GB', options);
return newDate;
}

const update = (node) => {
    console.log("node: ", node.id);
    let empPayrollData = empPayrollList.find(empData => empData.id == node.id)
    if(!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(site.add_emp_payroll_page);
}

