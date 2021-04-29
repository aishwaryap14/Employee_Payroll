// let EmployeePayroll;
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
  });

  const createInnerHtml = () => {
    const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department</th>" + 
                      "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let empPayrollData = createEmployeePayrollJSON()[0];
    const innerHtml = `${headerHtml}
    
  <tr>
    <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td><div class="dept-label">${empPayrollData._department[0]}</div></td>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
      <img name="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="E:\MERN\JS_CODE\Eployee_payroll\assets\icons\delete-black-18dp.svg">
      <img name="${empPayrollData._id}" onclick="update(this)" alt="edit" src="E:\MERN\JS_CODE\Eployee_payroll\assets\icons\create-black-18dp.svg">
    </td>
  </tr>
  `;
  document.querySelector('#table-display').innerHtml = innerHtml;
}


const createEmployeePayrollJSON = () => {
    let empPayrollListLocal = [
        {
        _name: 'Narayan Mahadevan',
        _gender: 'male',
        _department: ['HR', 'Finance'],
        _salary: '500000',
        _startDate: '29 Oct 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: 'E:\MERN\JS_CODE\Eployee_payroll\assets\profile-images\Ellipse -2.png',
    },
    {
        _name: 'Aishwarya P',
        _gender: 'female',
        _department: ['HR', 'Engineering'],
        _salary: '500000',
        _startDate: '19 Oct 2019',
        _note: '',
        _id: new Date().getTime(),
        _profilePic: 'E:\MERN\JS_CODE\Eployee_payroll\assets\profile-images\Ellipse -1.png',
    }
    ];
    return empPayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `$(deptHtml) <div class='dept-label'>$(dept)</div>`
    }
    return deptHtml;
}
