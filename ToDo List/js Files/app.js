const form = document.querySelector('#taskForm');
const taskList = document.querySelector('.listCollection');
const clearAll = document.querySelector('.btn');
const taskInput = document.querySelector('#addTask');
const addTask = document.querySelector('.addIcon');
let listStatus = 'new';

//load all event listeners
loadEventListeners();

function loadEventListeners(){
  addTask.addEventListener('click', addToList);
  taskList.addEventListener('click',modifyList);
}

function addToList(e){
  console.log(listStatus);
  if(taskInput.value === ''){
    alert('Please Add a Task First!');
    return;
  }

  if(taskInput.value !== '' && listStatus === 'new'){
    alert('Saved List Successfully');
  }
  
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
  
  //Check List
  if(evt.classList.contains('check-item')){
    checkedItem(e);
  }

  //edit list
  if(evt.classList.contains('edit-item')){
    console.log('edit ' +listStatus);
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
  listStatus = 'edit';
  console.log(editItem);
  let txt = document.querySelector('.text');
  let val = txt.innerHTML;
  taskInput.value = val;
  console.log(e.target.parentElement.parentElement.classList);
  txt.innerHTML = '';
}

function addEditedList(e){
  if(taskInput.value === ''){
    alert('Please Add a Task First!');
    return;
  }
  if(taskInput.value !== '' && listStatus === 'edit'){
    let txt = document.querySelector('.text');
   txt.innerHTML = taskInput.value;
   taskInput.value = '';
    alert('Saved Edited List Successfully!');
    listStatus = 'new';
  }
}




