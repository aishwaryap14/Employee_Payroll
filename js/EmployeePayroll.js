class EmployeePayroll {
    //property
    id;
    salary;
    gender;
    startDate;
//constructor
// constructor(...params) {
//     this.id = params[0];
//     this.name = params[1];
//     this.salary = params[2];
//     this.gender = params[3];
//     this.startDate = params[4];
// }

//getter and setter method
get name() {return this._name;}
set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{3}$');
    if (nameRegex.test(name))
    this._name = name;
    else throw 'Name is Incorrect';
 }

//method
toString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const empdate = this.startDate == undefined ? "undefined":
                    this.startDate.tpLocaleDateString("en-US", options);
    return "id= " + this.id +", name= " + this.name + ", salary= " + this.salary +
    ", gender= " + this.gender + ", startDate= " + empdate;
}
}

// let employeePayrollData = new EmployeePayrollData(1, "Mark", 30000);
// console.log(employeePayrollData.toString());
// try{
// employeePayrollData.name = "John";
// console.log(employeePayrollData.toString());
// } catch(e){
//     console.error(e);
// }
// let newEmployeePayrollData = new EmployeePayrollData(1, "Terrisa", 3000, "F", new Date());
// console.log(newEmployeePayrollData.toString());
