let student = JSON.parse(localStorage.getItem("students")) || [];

function saveStudent() {
  let name = studentname.value.trim();
  let dept = deptname.value.trim();
  let roll = rollnoid.value.trim();
  let genderInput = document.querySelector("input[name='gender']:checked");
  let editIndex = document.getElementById("editIndex").value;

  if (!name || !dept || !roll || !genderInput) {
    alert("Please fill all details");
    return;
  }

  let gender = genderInput.value;

  if (editIndex === "") {
    student.push({ name, dept, roll, gender });
  } else {
    student[editIndex] = { name, dept, roll, gender };
    document.getElementById("editIndex").value = "";
  }

  localStorage.setItem("students", JSON.stringify(student));
  formid.reset();
  displayStudentDetails();
}

function displayStudentDetails() {
  let z = document.getElementById("z");
  let search = document.getElementById("search").value.toLowerCase();

  let filtered = student.filter(s =>
    s.name.toLowerCase().includes(search) ||
    s.roll.toLowerCase().includes(search)
  );

  count.innerText = filtered.length;

  if (filtered.length === 0) {
    z.innerHTML = "<p>No students found</p>";
    return;
  }

  let html = `<table>
    <tr>
      <th>Name</th><th>Dept</th><th>Gender</th><th>Roll</th><th>Action</th>
    </tr>`;

  filtered.forEach((s, i) => {
    html += `
      <tr>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.gender}</td>
        <td>${s.roll}</td>
        <td>
          <button class="action-btn edit" onclick="editStudent(${i})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${i})">Delete</button>
        </td>
      </tr>`;
  });

  html += "</table>";
  z.innerHTML = html;
}

function deleteStudent(i) {
  if (confirm("Delete this student?")) {
    student.splice(i, 1);
    localStorage.setItem("students", JSON.stringify(student));
    displayStudentDetails();
  }
}

function editStudent(i) {
  let s = student[i];
  studentname.value = s.name;
  deptname.value = s.dept;
  rollnoid.value = s.roll;
  document.querySelector(`input[value="${s.gender}"]`).checked = true;
  editIndex.value = i;
}

displayStudentDetails();
