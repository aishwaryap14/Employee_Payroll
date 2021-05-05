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
set id(_id) { this._id = id; }

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
 set salary(_salary)
 {
    this._salary = this.salary;
 }

 get profilePic() { return this._profilePic; }
 set profilePic(_profilePic) {this._profilePic = this.profilePic; }

 get gender() { return this._gender; }
 set gender(_gender) {this._gender = this.gender; }

 get startDate() { return this._startDate; }
 set startDate(_startDate) {
    let now = new Date() ;
    if (_startDate > now) throw 'Start Date is a Future Date!!';
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30)
    throw 'Start date is beyond 30 days!!';
    this._startDate = this.startDate; 
}

 get note() { return this._note; }
 set note(_note) { this._note = this.note; }

 get department() { return this._department; }
 set department(_department) { this._department = this.department; }

//method
toString() {
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    const empdate = this.startDate == undefined ? "undefined":
                    this.startDate.tpLocaleDateString("en-US", options);
    return "id= " + this.id +", name= " + this.name + ", salary= " + this.salary +
    ", gender= " + this.gender + ", startDate= " + empdate + ", note= " + this.note + ", department= " + this.department
    + ", profilePic= " + this.profilePic;
}
}

