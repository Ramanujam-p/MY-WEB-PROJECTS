
function loaddata() {


    fetch("a12.json")


        .then(response => response.json())


        .then(data => {


            let output = `<center><table border="1" cellpadding="5px">
<tr>
<th>Name</th>
<th>Roll No</th>
<th>Age</th>
<th>Department</th>
</tr>`;
 
            data.forEach(user => {


                output += `<tr>
<td>${user.name}</td>
<td>${user.rn}</td>
<td>${user.age}</td>
<td>${user.department}</td>
</tr>`;


            });
 
            output += `</table></center>`;


            document.getElementById("output").innerHTML = output;


        })


        .catch(error => {


            document.getElementById("output").innerHTML = "Error loading data";


            console.error(error);


        });


}

let students = [];


let editIndex = -1;
 
function addStudent() {


    let name = document.getElementById("one").value;


    let rollno = document.getElementById("two").value;


    let age = document.getElementById("three").value;


    let department = document.getElementById("four").value;
 
    if (editIndex === -1) {


        students.push({ name, rollno, age, department });


    } else {


        students[editIndex] = { name, rollno, age, department };


        editIndex = -1;


    }
 
    clearForm();


    displayStudents();


}
 
function displayStudents() {


    let output = `
<table border="1">
<tr>
<th>Name</th>
<th>Roll No</th>
<th>Age</th>
<th>Department</th>
<th>Action</th>
</tr>


    `;
 
    students.forEach((s, index) => {


        output += `
<tr>
<td>${s.name}</td>
<td>${s.rollno}</td>
<td>${s.age}</td>
<td>${s.department}</td>
<td>
<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>
</td>
</tr>


        `;


    });
 
    output += "</table>";


    document.getElementById("output").innerHTML = output;


}
 
function deleteStudent(index) {


    students.splice(index, 1);


    displayStudents();


}
 
function editStudent(index) {


    let s = students[index];


    document.getElementById("one").value = s.name;


    document.getElementById("two").value = s.rollno;


    document.getElementById("three").value = s.age;


    document.getElementById("four").value = s.department;


    editIndex = index;


}
 
function clearForm() {


    document.getElementById("studentForm").reset();


}