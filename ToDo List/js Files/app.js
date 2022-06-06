const taskList = document.querySelector(".listCollection");
const clearAll = document.querySelector("#clrBtn");
const taskInput = document.querySelector("#addTask");
const addTask = document.querySelector(".addIcon");
const label = document.querySelector("#taskLabel");

let listStatus = "new";
let checkStatus = "unchecked";
let txtLabel;
taskInput.value = "";
console.log(addTask);
//load all event listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getLists);
  taskInput.addEventListener("keypress", EnterKeyEvent);
  addTask.addEventListener("click", addToList);
  taskList.addEventListener("click", modifyList);
  clearAll.addEventListener("click", clearAllList);
}

function EnterKeyEvent(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask.click();
  }
}

function getLists() {
  let lists = getListItems("lists");
  let checkBox = getListItems("checkStatus");

  lists.forEach(function (task, index) {
    const loadChkStatus = checkBox[index];
    createListElements(task, loadChkStatus);
  });
}

function addToList(e) {
  if (taskInput.value === "") {
    alert("Please Add a Task First!");
    return;
  }

  if (listStatus === "edit") {
    addEditedList(e);
    return;
  }
  if (checkStatus === "checked") {
    checkStatus = "unchecked";
  }
  createListElements(taskInput.value, checkStatus);

  //store list to local storage
  storeListInLocalStorage(taskInput.value, "lists");
  storeListInLocalStorage(checkStatus, "checkStatus");

  //Clear Text Area
  taskInput.value = "";

  e.preventDefault();
}

function createListElements(inputValue, newChkStatus) {
  //Create li element
  const li = document.createElement("li");
  li.className = "list";

  //Create checkbox element
  const checkBox = document.createElement("a");
  checkBox.className = "check-item";
  if (newChkStatus === "checked") {
    checkBox.innerHTML = '<i class="fa-regular fa-square-check fa-xl"></i>';
  } else {
    checkBox.innerHTML = '<i class="fa-regular fa-square fa-xl"></i>';
  }
  checkBox.style.paddingRight = "5px";
  checkBox.style.color = "#26a69a";
  li.appendChild(checkBox);

  // Create text node
  const textNode = document.createElement("span");
  textNode.style.color = "rgb(70, 69, 69)";
  textNode.style.fontSize = "1.25em";
  textNode.className = "text";
  textNode.appendChild(document.createTextNode(inputValue));
  li.appendChild(textNode);

  //Create Delete Link
  const deletelink = document.createElement("a");
  deletelink.className = "delete-item secondary-content";
  deletelink.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(deletelink);

  //Create Edit Link
  const editLink = document.createElement("a");
  editLink.className = "edit-item secondary-content";
  editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  li.appendChild(editLink);

  //append li to ul
  taskList.appendChild(li);
}

function storeListInLocalStorage(list, keyName) {
  let lists = getListItems(keyName);

  lists.push(list);

  localStorage.setItem(keyName, JSON.stringify(lists));
}

function modifyList(e) {
  let evt = e.target.parentElement;

  //Check List
  if (evt.classList.contains("check-item")) {
    checkedItem(e);
  }

  //edit list
  if (evt.classList.contains("edit-item")) {
    if (listStatus === "new") {
      editList(e);
    } else {
      alert("A List Item Is Already In Edit!");
    }
  }

  //delete list
  if (evt.classList.contains("delete-item")) {
    removeList(e);
  }

  e.preventDefault();
}

function checkedItem(e) {
  let item = e.target;
  // let editedText = saveEdit.parentElement.children[1];
  let listItems = item.parentElement.parentElement.parentElement.children;
  let index = Array.from(listItems).indexOf(item.parentElement.parentElement);
  let lists = getListItems("checkStatus");

  if (item.classList.contains("fa-square")) {
    item.parentElement.innerHTML =
      '<i class="fa-regular fa-square-check fa-xl"></i>';
    checkStatus = "checked";
    lists[index] = checkStatus;
    localStorage.setItem("checkStatus", JSON.stringify(lists));
  }

  if (item.classList.contains("fa-square-check")) {
    item.parentElement.innerHTML = '<i class="fa-regular fa-square fa-xl"></i>';
    checkStatus = "unchecked";
    lists[index] = checkStatus;
    localStorage.setItem("checkStatus", JSON.stringify(lists));
  }

  e.preventDefault();
}

function editList(e) {
  let editItem = e.target.parentElement;
  let txt = editItem.parentElement.children[1];
  let val = txt.innerText;
  txtLabel = editItem;
  label.innerHTML = "Edit List";
  listStatus = "edit";
  editItem.style.color = "rgb(255, 72, 0)";
  taskInput.value = val;
  addTask.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
}

function addEditedList(e) {
  let saveEdit = txtLabel;
  let editedText = saveEdit.parentElement.children[1];
  let listItems = saveEdit.parentElement.parentElement.children;
  let index = Array.from(listItems).indexOf(saveEdit.parentElement);
  let lists = getListItems("lists");

  if (taskInput.value === "") {
    alert("Please Add a Task First!");
    return;
  }
  if (taskInput.value !== "" && listStatus === "edit") {
    editedText.innerHTML = taskInput.value;
    lists[index] = taskInput.value;
    localStorage.setItem("lists", JSON.stringify(lists));
    taskInput.value = "";
    alert("Saved Successfully!");
    addTask.innerHTML = '<i class="fa-solid fa-square-plus"></i>';
    label.innerHTML = "Add New Task";
    saveEdit.style.color = "rgb(38,166,154)";
    listStatus = "new";
  }

  e.preventDefault();
}

function removeList(e) {
  if (confirm("Are you sure you want to delete?")) {
    e.target.parentElement.parentElement.remove();

    //Remove list from localStorage
    removeListFromLocalStorage(e.target.parentElement.parentElement);
  }
}

function removeListFromLocalStorage(todoList) {
  let lists = getListItems("lists");
  let checkboxLists = getListItems("checkStatus");

  lists.forEach(function (task, index) {
    if (todoList.textContent === task) {
      lists.splice(index, 1);
      checkboxLists.splice(index, 1);
    }
  });

  localStorage.setItem("lists", JSON.stringify(lists));
  localStorage.setItem("checkStatus", JSON.stringify(checkboxLists));
}

function clearAllList() {
  taskInput.value = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearAllListFromLocalStorage();
}

function clearAllListFromLocalStorage() {
  localStorage.clear();
}

function getListItems(keyName) {
  let lists;
  if (localStorage.getItem(keyName) === null) {
    lists = [];
  } else {
    lists = JSON.parse(localStorage.getItem(keyName));
  }

  return lists;
}
