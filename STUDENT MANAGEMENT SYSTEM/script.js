let student = [];
function addStudentDetails() {
    let a = document.getElementById("studentname").value;
    let b = document.getElementById("deptname").value;
    let c = document.getElementById("rollnoid").value;
    let d = document.querySelector("input[name='gender']:checked").value;
    if (!a || !b || !c || !d) {
        alert("please fill all the details");
        return;
    }
    else {
        let obj = {
            name: a, dept: b, rollno: c, gender: d
        };
        student.push(obj);
        alert("student details added successfully");
        document.getElementById("formid").reset();
    }
}
function displayStudentDetails() {
    let y = document.getElementById("z");
    if (student.length === 0) {
        y.innerHTML = "<p>No student records found</p>";
        return;
    }
    let x = `<table border="1" cellpadding="10">
    <tr>
    <th>Name</th><th>Department</th><th>Gender</th><th>Roll No</th><th>Action</th>
    </tr>`;
    student.forEach((obj, i) => {
        x += `<tr>
        <td>${obj.name}</td>
        <td>${obj.dept}</td>
        <td>${obj.gender}</td>
        <td>${obj.rollno}</td>
        <td><button onclick="deleteStudentDetails(${i})">Delete</button></td>
       </tr>
        `;
    });
    x += `</table>`;
    y.innerHTML = x;
}
function deleteStudentDetails(i) {
    student.splice(i, 1);
    displayStudentDetails();
}
function updateStudentDetails() {
    let r = document.getElementById("rollnoid").value;
    let n = document.getElementById("studentname").value;
    let d = document.getElementById("deptname").value;
    let g = document.querySelector("input[name='gender']:checked");
    if (!g) {
        alert("select gender");
        return;
    }
    let gender = g.value;
    let flag = false;
    for (let i = 0; i < student.length; i++) {
        if (student[i].rollno == r) {
            student[i].name = n;
            student[i].dept = d;
            student[i].gender = gender;
            flag = true;
            break;
        }
    }
    if (flag) {
        alert("student details updated");
        displayStudentDetails();
        document.getElementById("formid").reset();
    }
    else {
        alert("student with this roll number not found");
    }
}