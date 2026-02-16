let students =  JSON.parse(localStorage.getItem("students"))||[];
display();
function add() {
    let a = document.getElementById("name").value.trim();
    let b = document.getElementById("dept").value.trim();
    let c = document.getElementById("roll").value.trim();
    let d = document.getElementById("marks").value.trim();
    let e = document.querySelector('input[name="gender"]:checked');
    if (!a || !b || !c || !d || !e) {
        alert("Enter all the details");
        return;
    }
    let rc = students.findIndex(s => s.roll === c);
    if (rc !== -1) {
        alert("Student with this roll number already exists");
        return;
    }
    let obj = {
        name: a,
        dept: b,
        roll: c,
        marks: d,
        gender: e.value
    };
    students.push(obj);
    localStorage.setItem("students", JSON.stringify(students));
    alert("Student added successfully");
    document.getElementById("formId").reset();
    display();
}
function update() {
    let a = document.getElementById("name").value.trim();
    let b = document.getElementById("dept").value.trim();
    let c = document.getElementById("roll").value.trim();
    let d = document.getElementById("marks").value.trim();
    let e = document.querySelector('input[name="gender"]:checked');
    if (!c) {
        alert("Enter roll number to update");
        return;
    }
    let index = students.findIndex(s => s.roll === c);
    if (index === -1) {
        alert("Student not found");
        return;
    }
    if (!a || !b || !d || !e) {
        alert("Enter all details to update");
        return;
    }
    students[index].name = a;
    students[index].dept = b;
    students[index].marks = d;
    students[index].gender = e.value;
    localStorage.setItem("students", JSON.stringify(students));
    alert("Student updated successfully");
    document.getElementById("formId").reset();
    display();
}
function display() {
    if (students.length === 0) {
        document.getElementById("output").innerHTML = "<h3>No students found</h3>";
        return;
    }

    let output = `
    <table border="1" cellpadding="8">
        <tr>
            <th>NAME</th>
            <th>DEPT</th>
            <th>ROLL NO</th>
            <th>MARKS</th>
            <th>GENDER</th>
            <th>ACTION</th>
        </tr>
    `;

    for (let s of students) {
        output += `
        <tr>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.roll}</td>
            <td>${s.marks}</td>
            <td>${s.gender}</td>
            <td>
                <button onclick='del("${s.roll}")'>DELETE</button>
            </td>
        </tr>
        `;
    }
    output += "</table>";
   document.getElementById("output").innerHTML = output;
}
function del(roll) {
    let index = students.findIndex(s => s.roll === roll);
    if (index !== -1) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student deleted successfully");
    } else {
        alert("Student not found");
        return;
    }
    display();
}
