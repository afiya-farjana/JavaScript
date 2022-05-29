const form = document.querySelector('#taskForm');
const taskList = document.querySelector('.listCollection');
const clearAll = document.querySelector('#clrBtn');
const taskInput = document.querySelector('#addTask');
const addTask = document.querySelector('.addIcon');
const label = document.querySelector('#taskLabel');
let listStatus = 'new';
taskInput.value = '';
console.log(clearAll);

//load all event listeners
loadEventListeners();

function loadEventListeners(){
  addTask.addEventListener('click', addToList);
  taskList.addEventListener('click',modifyList);
  clearAll.addEventListener('click', clearAllList);
}

function addToList(e){
  if(taskInput.value === ''){
    alert('Please Add a Task First!');
    return;
  }

  // if(taskInput.value !== '' && listStatus === 'new'){
  //   alert('Saved List Successfully');
  // }
  
  if(listStatus === 'edit'){
    addEditedList(e);
    return;
  }
  //Create li element
  const li = document.createElement('li');
  li.className = "list";

  //Create label element 
  const checkBox = document.createElement('a');
  checkBox.className = "check-item";
  checkBox.innerHTML = '<i class="fa-regular fa-square fa-xl"></i>';
  checkBox.style.paddingRight = '5px';
  checkBox.style.color = '#26a69a';
  li.appendChild(checkBox);

 // Create text node and append it to label
  const textNode = document.createElement('span');
  textNode.style.color = 'rgb(70, 69, 69)';
  textNode.style.fontSize = '1.25em';
  textNode.className = 'text';
  textNode.appendChild(document.createTextNode(taskInput.value));
  li.appendChild(textNode);


  //Create Delete Link
  const deletelink = document.createElement('a');
  deletelink.className = "delete-item secondary-content";
  deletelink.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(deletelink);

  //Create Edit Link
  const editLink = document.createElement('a');
  editLink.className = "edit-item secondary-content";
  editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  li.appendChild(editLink);
  
  //append li to ul
  taskList.appendChild(li);

  //Clear Text Area
  taskInput.value = '';
  
  e.preventDefault();
}

function modifyList(e){
  let evt = e.target.parentElement;
  //console.log(evt);
  
  //Check List
  if(evt.classList.contains('check-item')){
    checkedItem(e);
  }

  //edit list
  if(evt.classList.contains('edit-item')){
    editList(e);
  }

  //delete list
  if(evt.classList.contains('delete-item')){
    removeList(e);
  }
  
  e.preventDefault();
}

function checkedItem(e){
  let item = e.target;
  if(item.classList.contains('fa-square')){
    item.parentElement.innerHTML = '<i class="fa-regular fa-square-check fa-xl"></i>';
 }

 if(item.classList.contains('fa-square-check')){
  item.parentElement.innerHTML = '<i class="fa-regular fa-square fa-xl"></i>';
 }
}

function removeList(e){
  if(confirm('Are you sure you want to delete?')){
    e.target.parentElement.parentElement.remove();
  }
}

function editList(e){
  let editItem = e.target.parentElement;
  let txt = editItem.parentElement.children[1];
  let val = txt.innerText;

  label.innerHTML = 'Edit List';
  listStatus = 'edit';
  editItem.style.color = 'rgb(255, 72, 0)';
  taskInput.value = val;
  addTask.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

  taskInput.addEventListener('input', function(evt){
    txt.innerText = evt.target.value;
  });
}

function addEditedList(e){
  let saveEdit =  document.querySelector('.edit-item');
 // console.log(evt);
  if(taskInput.value === ''){
    alert('Please Add a Task First!');
    return;
  }
  if(taskInput.value !== '' && listStatus === 'edit'){
   taskInput.value = '';
    alert('Saved Successfully!');
    addTask.innerHTML = '<i class="fa-solid fa-square-plus"></i>';
    label.innerHTML = 'Add New Task';
    saveEdit.style.color = '#26a69a';
    listStatus = 'new';
  }
}

function clearAllList(e){
  console.log(taskList.firstChild);
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}




