class EmployeePayroll {
    //property
    id;
    salary;
    gender;
    startDate;
    note;
    department;
    profilePic;


//getter and setter method
get id() { return this._id; }
set id(id) { this._id = id; }

get name() {return this._name;}
set name(name) {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{3,}$');
    if (nameRegex.test(name))
    this._name = name;
    else throw 'Name is Incorrect';
 }

 get salary() {
     return this._salary;
 }
 set salary(salary)
 {
    this._salary = this.salary;
 }

 get profilePic() { return this._profilePic; }
 set profilePic(profilePic) {this._profilePic = this.profilePic; }

 get gender() { return this._gender; }
 set gender(gender) {this._gender = this.gender; }

 get startDate() { return this._startDate; }
 set startDate(startDate) {
    let now = new Date() ;
    if (startDate > now) throw 'Start Date is a Future Date!!';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
    throw 'Start date is beyond 30 days!!';
    this._startDate = this.startDate; 
}

 get note() { return this._note; }
 set note(note) { this._note = this.note; }

 get department() { return this._department; }
 set department(department) { this._department = this.department; }

//method
toString() {
    const options = { year: 'numeric', month: 'short', day: 'numeric'};
    const empdate = !this.date  ? "undefined":
                    this.date.toLocaleDateString("en-US", options);
    return "id= " + this.id +", name= " + this.name + ", salary= " + this.salary +
    ", gender= " + this.gender + ", startDate= " + empdate + ", note= " + this.note + ", department= " + this.department
    + ", profilePic= " + this.profilePic;
}
}

