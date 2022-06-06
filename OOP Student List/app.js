'use strict';

const container = document.querySelector('.container');
const studentForm = document.querySelector('#student-form');
const studentName = document.querySelector('.student');
const studentClass = document.querySelector('.class');
const studentSection = document.querySelector('.section');
const studentRoll = document.querySelector('.roll');
const studentList = document.getElementById('student-list');
const table = document.querySelector('table');
const invalidName = document.getElementById('pName');
const invalidClass = document.getElementById('pClass');
const invalidSection = document.getElementById('pSection');
const invalidRoll = document.getElementById('pRoll');

//Student Constructor
function Student(id, Name, Class, section, roll) {
  this.id = id;
  this.Name = Name;
  this.Class = Class;
  this.section = section;
  this.roll = roll;
}

//UI Constructor
function UI() {}

//Local Storage
class Store {
  static getStudents() {
    let students;
    if (localStorage.getItem('students') === null) {
      students = [];
    } else {
      students = JSON.parse(localStorage.getItem('students'));
    }

    return students;
  }

  static displayStudents() {
    const students = Store.getStudents();
    students.forEach(function (student) {
      const ui = new UI();
      ui.addStudentTOList(student);
    });
  }

  static addStudent(student) {
    const students = Store.getStudents();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
  }

  static removeStudent(id) {
    const students = Store.getStudents();
    students.forEach(function (student, index) {
      if (student.id === Number(id)) {
        students.splice(index, 1);
      }
    });
    localStorage.setItem('students', JSON.stringify(students));
    Store.displayStudents();
  }
}

UI.prototype.addStudentTOList = function (student) {
  const row = document.createElement('tr');
  let rowCount = table.tBodies[0].rows.length + 1;
  row.innerHTML = `
    <th scope="row">${rowCount}</th>
    <td>${student.Name}</td>
    <td>${student.Class}</td>
    <td>${student.section}</td>
    <td>${student.roll}</td>
    <td><img src="xmark-solid.svg" height="15px" class="delete"></td>
  `;

  studentList.appendChild(row);
};

UI.prototype.ClearAllFields = function () {
  studentName.value = '';
  studentClass.value = '';
  studentSection.value = '';
  studentRoll.value = '';
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const parent = document.querySelector('#main');
  parent.insertBefore(div, studentForm);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
};

UI.prototype.deleteStudent = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
};

//Event Listeners
studentForm.addEventListener('submit', formSubmit);
studentName.addEventListener('keypress', function (e) {
  invalidName.style.display = 'none';
  studentName.style.borderColor = '#d9d9d9';
});
studentClass.addEventListener('keypress', function (e) {
  invalidClass.style.display = 'none';
  studentClass.style.borderColor = '#d9d9d9';
  const nmbr = checkNumber(e);
  if (!nmbr) {
    errorMessage(invalidClass, studentClass, 'class');
  }
});
studentSection.addEventListener('keypress', function (e) {
  invalidSection.style.display = 'none';
  studentSection.style.borderColor = '#d9d9d9';
});
studentRoll.addEventListener('keypress', function (evt) {
  invalidRoll.style.display = 'none';
  studentRoll.style.borderColor = '#d9d9d9';
  const nmbr = checkNumber(evt);
  if (!nmbr) {
    errorMessage(invalidRoll, studentRoll, 'roll');
  }
});
studentList.addEventListener('click', function (e) {
  const ui = new UI();
  ui.deleteStudent(e.target);
  Store.removeStudent(
    e.target.parentElement.parentElement.children[0].textContent
  );
  ui.showAlert('Successfully remove', 'success');
  location.reload();
});

document.addEventListener('DOMContentLoaded', Store.displayStudents);

function checkNumber(evt) {
  evt = evt ? evt : window.event;
  let charCode = evt.which ? evt.which : evt.keyCode;
  if ((charCode > 31 && charCode < 48) || charCode > 57) {
    return false;
  }
  return true;
}

function formSubmit(e) {
  //form values
  const stdntName = studentName.value,
    stdntClass = studentClass.value,
    stdntSection = studentSection.value,
    stdntRoll = studentRoll.value;

  let id = table.tBodies[0].rows.length + 1;
  //const students = Store.getStudents();

  const student = new Student(
    id,
    stdntName,
    stdntClass,
    stdntSection,
    stdntRoll
  );

  const isNameValid = invalidFieldCheck(
    stdntName,
    invalidName,
    studentName,
    'name'
  );
  const isClassValid = invalidFieldCheck(
    stdntClass,
    invalidClass,
    studentClass,
    'class'
  );
  const isSectionValid = invalidFieldCheck(
    stdntSection,
    invalidSection,
    studentSection,
    'section'
  );
  const isRollValid = invalidFieldCheck(
    stdntRoll,
    invalidRoll,
    studentRoll,
    'roll'
  );

  const ui = new UI();
  if (!isNameValid && !isClassValid && !isSectionValid && !isRollValid) {
    ui.addStudentTOList(student);
    Store.addStudent(student);
    ui.ClearAllFields();
    ui.showAlert('Successfully Updated!', 'success');
  } else {
    ui.showAlert("Couldn't Update Student Info!", 'error');
  }

  e.preventDefault();
}

function invalidFieldCheck(
  inputFieldValue,
  inputFieldError,
  inputFieldName,
  fieldName
) {
  if (inputFieldValue === '') {
    errorMessage(inputFieldError, inputFieldName, fieldName);
    return true;
  } else {
    return false;
  }
}

function errorMessage(inputFieldError, inputFieldName, fieldName) {
  inputFieldError.textContent = `Please enter a valid ${fieldName}`;
  inputFieldError.style.display = 'block';
  inputFieldName.style.borderColor = 'red';
}
