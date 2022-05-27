const form = document.querySelector('#taskForm');
const taskList = document.querySelector('.listCollection');
const clearAll = document.querySelector('.btn');
const taskInput = document.querySelector('#addTask');
const addTask = document.querySelector('.addIcon');

//load all event listeners
loadEventListeners();

function loadEventListeners(){
  addTask.addEventListener('click', addToList);
  taskList.addEventListener('click',RemoveToDoList)
}

function addToList(e){
  if(taskInput.value === ''){
    alert('Please Add a Task First!');
    return;
  }
  
  //Create li element
  const li = document.createElement('li');
  li.className = "list";

  //Create label element
  const chkBoxLabel = document.createElement('label');

  // chkboxx.innerHTML = `<input type="checkbox" class="filled-in" checked="checked"/>`;

  const chkbox = document.createElement('input');
  chkbox.type = 'checkbox';
  chkbox.className = 'filled-in';
  chkbox.checked = false;
  chkbox.id = 'chkBox'
  chkBoxLabel.htmlFor = 'chkBox';
  

  //Create text node and append it to label
  const textNode = document.createElement('span');
  textNode.style.color = 'rgb(70, 69, 69)';

  textNode.appendChild(document.createTextNode(taskInput.value));
  chkBoxLabel.appendChild(chkbox);
  chkBoxLabel.appendChild(textNode);

  li.appendChild(chkBoxLabel);

  //Create Delete Link
  const deletelink = document.createElement('a');
  deletelink.className = "delete-item secondary-content";
  deletelink.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(deletelink);

  //Create Edit Link
  const editLink = document.createElement('a');
  editLink.className = "delete-item secondary-content";
  editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  li.appendChild(editLink);
  
  //append li to ul
  taskList.appendChild(li);

  //Clear Text Area
  taskInput.value = '';

  const checked = document.querySelector('#chkBox');
  checked.addEventListener('click',function(e){
    if(e.checked = true){
      checked.checked = false;
    }else{
      checked.checked = true;
    }
    console.log(checked.checked)
  });
  

  e.preventDefault();
}

function RemoveToDoList(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete?')){
      e.target.parentElement.parentElement.remove();
    }
  }
  e.preventDefault();
}


