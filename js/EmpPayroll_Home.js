let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
  localStorage.removeItem('editEmp');

  empPayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  });

  const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
  }

  const createInnerHtml = () => {
    if (empPayrollList.length == 0) return;
    console.log(document.querySelector('.emp-count'));
    const headerHtml ="<th></th><th>Name</th><th>Gender</th><th>Department</th>" + 
                      "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    // let empPayrollData = createEmployeePayrollJSON()[0];
    
    let innerHtml = `${headerHtml}`;
    // let empPayrollList = createEmployeePayrollJSON();
    console.log(empPayrollList);
    // document.querySelector(".emp-count").textContent = empPayrollList.length;
    console.log(empPayrollList.length);
    for (const empPayrollData of empPayrollList){
    console.log(empPayrollData.id);
    innerHtml = `${innerHtml}
  <tr>
    <td><img class="profile" src="${empPayrollData.profilePic}" alt=""></td>
    <td>${empPayrollData.name}</td>
    <td>${empPayrollData.gender}</td>
    <td>${getDeptHtml(empPayrollData.department)}</td>
    <td>${empPayrollData.salary}</td>
    <td>${stringifyDate(empPayrollData.startDate)}</td>
    <td>
      <img id="${empPayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
      <img id="${empPayrollData.id}"  onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
    </td>
  </tr>
  `;
    }
  document.querySelector('.emp-count').textContent = empPayrollList.length;
  document.querySelector('#table-display').innerHTML = innerHtml;
}


// const createEmployeePayrollJSON = () => {
//     let empPayrollList = [
//         {
//         _name: 'Narayan Mahadevan',
//         _gender: 'male',
//         _department: ['HR', 'Finance'],
//         _salary: '500000',
//         _startDate: '29 Oct 2019',
//         _note: '',
//         _id: new Date().getTime(),
//         _profilePic: "../assets/profile-images/Ellipse -2.png",
//     },
//     {
//         _name: 'Aishwarya P',
//         _gender: 'female',
//         _department: ['HR', 'Engineering'],
//         _salary: '500000',
//         _startDate: '19 Oct 2019',
//         _note: '',
//         _id: new Date().getTime(),
//         _profilePic: "../assets/profile-images/Ellipse -1.png",
//      },
//     {
//       _name: 'Mohit kumar test',
//       _gender: 'male',
//       _department: ['HR','Finance'],
//       _salary: '30000',
//       _startDate: '1 Jan 2020',
//       _note: '',
//       _id: new Date().getTime(),
//       _profileUrl: "../assets/profile-images/Ellipse -3.png",
//     }
//     ];
//     return empPayrollList;
// }

const getDeptHtml = (deptList) => {
  if (deptList == null) return;
  else {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
     return deptHtml;
    }
    
}

const remove = (node) => {
  console.log("node id "+ node.id);
  let empPayrollData = empPayrollList.find(empData => empData.id == node.id);
  if (!empPayrollData) return;
  const index = empPayrollList.map(empData => empData.id)
                              .indexOf(empPayrollData.id);
  console.log("index id "+ index);
  empPayrollList.splice(index, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
  document.querySelector(".emp-count").textContent = empPayrollList.length;
  createInnerHtml();
  window.location.href = "../pages/EmpPayrollHomePg.html"
}

