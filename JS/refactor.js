

//用 array 來存所有新增的事項
let arrayTodoItems = [];

/************************************************************
篩選TodoItems
************************************************************/
function showAllTodos(filterStatus){
  filterStatus = "All";
  arrayTodoItems.forEach(function(arrayItem,arrayIndex){
    removeClassNameJSdisplayNone(arrayItem);
  });
}
let btnAll = document.querySelector('.btnAll');
btnAll.addEventListener('click',function(e){
  //preventDefault 移除 button 預設的 submit 事件
  e.preventDefault();
  showAllTodos();
});

function noneTodoItem(todoItem,filterStatus){
  console.log(filterStatus);
  //當 filterStatus = "All" 不用讓 todoItem 消失
  if(filterStatus === "Completed" || filterStatus === "InCompleted"){
    addClassNameJSdisplayNone(todoItem);
  }
}
function noneInCompletedTodoItems(filterStatus){
  arrayTodoItems.forEach(function(arrayItem,arrayIndex){
    removeClassNameJSdisplayNone(arrayItem);
    if(!isCheckedTodo(arrayItem)){
      noneTodoItem(arrayItem,filterStatus);
    }
  });
}
function showCompletedTodos(filterStatus){
  filterStatus = "Completed";
  noneInCompletedTodoItems(filterStatus);
}
let btnCompleted = document.querySelector('.btnCompleted');
btnCompleted.addEventListener('click',function(e){
  e.preventDefault();
  showCompletedTodos();
});

function isCheckedTodo(obj){
  return obj.childNodes[0].checked;
}
function removeClassNameJSdisplayNone(obj){
  obj.classList.remove("JSdisplayNone");
}
function addClassNameJSdisplayNone(obj){
  obj.classList.add("JSdisplayNone");
}

function noneCompletedTodoItems(filterStatus){
  arrayTodoItems.forEach(function(arrayItem,arrayIndex){
    removeClassNameJSdisplayNone(arrayItem);
    if(isCheckedTodo(arrayItem)){
      noneTodoItem(arrayItem,filterStatus);
    }
  });
}
function showInCompletedTodos(){
  filterStatus = "InCompleted";
  noneCompletedTodoItems(filterStatus);
}
let btnInCompleted = document.querySelector('.btnInCompleted');
btnInCompleted.addEventListener('click',function(e){
  e.preventDefault();
  showInCompletedTodos();
});


/************************************************************
刪除TodoItem
************************************************************/
function deleteTodoItem(todoItem,todoList){
  todoList.removeChild(todoItem);
}

function deleteArrayTodoItems(todoItem){
  arrayTodoItems.forEach(function(arrayItem,arrayIndex){
    console.log(getTodoItemText(arrayItem));
    console.log(getTodoItemText(todoItem));
    if(getTodoItemText(arrayItem) === getTodoItemText(todoItem)){
      console.log("delete",getTodoItemText(arrayItem));
      // arrayTodoItems.splice(arrayIndex,1);
    }
  });
}

function getTodoItemText(obj){
  return obj.childNodes[1].textContent;
}

/************************************************************
編輯TodoItem
************************************************************/
//edit 編輯狀態
function editTodoItem(todoText,todoEditTextArea,btnEditTodo,btnRevisedTodo){
  //編輯框先放入label文字
  putTodoTextInTodoEditTextArea(todoText,todoEditTextArea);

  //消失label文字
  addClassNameJSdisplayNone(todoText);

  //消失BtnEdit
  addClassNameJSdisplayNone(btnEditTodo);

  //出現BtnRevised
  removeClassNameJSdisplayNone(btnRevisedTodo);

  //出現編輯框(裡面已有label文字)
  removeClassNameJSdisplayNone(todoEditTextArea);
}
function putTodoTextInTodoEditTextArea(todoText,todoEditTextArea){
  todoEditTextArea.value = todoText.textContent;
}

//revised 編輯完成狀態
function revisedTodoItem(todoText,todoEditTextArea,btnEditTodo,btnRevisedTodo,todoItem){
  //取得編輯框文字
  let originalText = todoText.textContent;
  //把編輯框文字放入label裡
  if(todoEditTextArea.value === ""){
    todoText.textContent = originalText;
  }
  else{
    todoText.textContent = todoEditTextArea.value;
  }
  //出現label文字
  removeClassNameJSdisplayNone(todoText);

  //隱藏編輯框
  addClassNameJSdisplayNone(todoEditTextArea);

  //出現BtnEdit
  removeClassNameJSdisplayNone(btnEditTodo);

  //消失btnRevised
  addClassNameJSdisplayNone(btnRevisedTodo);
}

/************************************************************
新增TodoItem
************************************************************/
function showTodos(){
  let textAreaStr = document.querySelector('.input-task').value;
  if(textAreaStr === ""){
    window.alert('请输入代辦事項！');
  }
  else{
    createTodoItem(textAreaStr);
  }
  clearInputText();
}

//把新增代辦事項的 input 文字清空
function clearInputText(){
  document.querySelector('.input-task').value = "";
}

// 保存篩選鈕的狀態
let filterStatus = "All";
function createTodoItem(textAreaStr){
  let todoCheckBox = document.createElement('input');
  todoCheckBox.className = "JStodoCheckBox";
  todoCheckBox.type = "checkbox";
  todoCheckBox.name = "check";

  let todoText = document.createElement('label');
  todoText.textContent = textAreaStr;
  todoText.htmlFor = "check";

  //用來修改代辦事項文字，一開始先隱藏
  let todoEditTextArea = document.createElement('input');
  // todoEditTextArea.className = "JStodoEditTextArea JSvisibilityHidden";
  todoEditTextArea.className = "JStodoEditTextArea JSdisplayNone";
  todoEditTextArea.type = "text";

  let btnEditTodo = document.createElement('button');
  btnEditTodo.className = "JSbtnEdit";
  btnEditTodo.textContent = "Edit";

  //編輯完成鈕，一開始先隱藏
  let btnRevisedTodo = document.createElement('button');
  btnRevisedTodo.className = "JSbtnRevised JSdisplayNone";
  btnRevisedTodo.textContent = "Revised";

  let btnDeleteTodo = document.createElement('button');
  btnDeleteTodo.className = "JSbtnDelete";
  btnDeleteTodo.textContent = "Delete";

  let todoItem = document.createElement('li');
  todoItem.appendChild(todoCheckBox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoEditTextArea);
  todoItem.appendChild(btnEditTodo);
  todoItem.appendChild(btnRevisedTodo);
  todoItem.appendChild(btnDeleteTodo);

  let todoList = document.querySelector('.newList');
  todoList.appendChild(todoItem);

  createArrayTodoItems(todoItem);

  todoCheckBox.addEventListener('click',function(e){
    noneTodoItem(todoItem,filterStatus);
  });

  btnEditTodo.addEventListener('click',function(e){
    editTodoItem(todoText,todoEditTextArea,btnEditTodo,btnRevisedTodo);
  });

  btnRevisedTodo.addEventListener('click',function(e){
    revisedTodoItem(todoText,todoEditTextArea,btnEditTodo,btnRevisedTodo,todoItem);
  });

  //對編輯的 input 框掛監聽鍵盤 enter 事件
  todoEditTextArea.addEventListener('keydown',function(e){
    if( e.keyCode === 13){
      revisedTodoItem(todoText,todoEditTextArea,btnEditTodo,btnRevisedTodo,todoItem);
    }
  });

  btnDeleteTodo.addEventListener('click',function(e){
    deleteArrayTodoItems(todoItem);
    deleteTodoItem(todoItem,todoList);
  });
}

function createArrayTodoItems(todoItem){
  arrayTodoItems.push(todoItem);
}

let btnAddTodo = document.querySelector('.btnAddNew');
btnAddTodo.addEventListener('click',function(e){
  //preventDefault 移除 button 預設的 submit 事件
  e.preventDefault();
  showTodos();
});

//對新增代辦事項的 input 框掛監聽鍵盤 enter 事件
let textArea = document.querySelector('.input-task');
textArea.addEventListener('keydown',function(e){
  if( e.keyCode === 13){
    showTodos();
  }
});
