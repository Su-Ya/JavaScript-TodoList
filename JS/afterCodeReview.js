/************************************************************
新增 TodoItem
************************************************************/
function showTodos(){
  //取得 inputTask 文字
  let strInputTask = document.querySelector('.inputTask').value;

  //判斷 inputTask 是否為空
  if(strInputTask === ""){
    window.alert('请输入代辦事項！');
  }
  else{
    //取得 <template> 裡的 todoItem 模板
    let temp = document.getElementsByTagName('template')[0];
    let toDoItemTemp = temp.content.querySelector('.toDoItem');

    //複製一份 todoItem 模板
    let toDoItem = document.importNode(toDoItemTemp, true);

    //把 todoItem 裡的文字改為 inputTask 文字
    toDoItem.children[1].textContent = strInputTask;//toDoItem.children回傳HTMLCollection(6)

    //把 todoItem 放入 toDoList
    let toDoList = document.querySelector('.toDoList');
    toDoList.appendChild(toDoItem);

    //對 itemCheckBox 監聽，如果寫在外面用querySelector('.itemCheckBox')會抓到一個而已
    toDoItem.children[0].addEventListener('click',function(e){
      noneCheckedTodos(e.target);
    });
  }

  //把inputTask 文字清空
  document.querySelector('.inputTask').value = "";

}

let btnAddTodo = document.querySelector('.btnAddNew');
btnAddTodo.addEventListener('click',function(e){
  //preventDefault 移除 button 預設的 submit 事件
  e.preventDefault();
  showTodos();
});

//對 inputTask 監聽鍵盤 enter 事件
let inputTask = document.querySelector('.inputTask');
inputTask.addEventListener('keydown',function(e){
  if( e.keyCode === 13){
    showTodos();
  }
});

/************************************************************
在篩選狀態下 checked TodoItem 消失
************************************************************/
let filterStatus = "All"
function noneCheckedTodos(item){
  if(filterStatus !== "All"){
    item.parentElement.classList.add('JSNone');
  }
}

/************************************************************
編輯、編輯完成、刪除 TodoItem
************************************************************/
//edit 編輯
function editTodoItem(itemText,itemInputText,btnEdit,btnRevised){
  // itemInputText 放入 toDoItem 文字
  itemInputText.value = itemText.textContent;

  //消失 toDoItem 文字
  itemText.classList.add('JSNone');

  //出現 itemInputText
  itemInputText.classList.remove('JSNone');

  //消失 btnEdit
  btnEdit.classList.add('JSNone');

  //出現 btnRevised
  btnRevised.classList.remove('JSNone');
}

//revised 編輯完成
function revisedTodoItem(itemText,itemInputText,btnEdit,btnRevised){
  if(itemInputText.value === ""){
    window.alert('修改文字不能空白！');
  }
  else{
    //把編輯框文字放入label裡
    itemText.textContent = itemInputText.value;

    //出現label文字
    itemText.classList.remove('JSNone');

    //隱藏編輯框
    itemInputText.classList.add('JSNone');

    //出現BtnEdit
    btnEdit.classList.remove('JSNone');

    //消失btnRevised
    btnRevised.classList.add('JSNone');
  }
}

//delete 刪除
function deleteTodoItem(toDoList,toDoItem){
  toDoList.removeChild(toDoItem);
}

let toDoList = document.querySelector('.toDoList');
toDoList.addEventListener('click',function(e){
  let itemText = e.target.parentElement.querySelector('label');
  let itemInputText = e.target.parentElement.querySelector('.itemInputText');
  let btnEdit = e.target.parentElement.querySelector('.btnEdit');
  let btnRevised = e.target.parentElement.querySelector('.btnRevised');
  let btnDelete = e.target.parentElement.querySelector('.btnDelete');
  let toDoItem = e.target.parentElement.querySelector('.toDoItem');
  if (e.target.matches('.btnEdit')) {
    e.preventDefault();
    editTodoItem(itemText,itemInputText,btnEdit,btnRevised);
  }
  if (e.target.matches('.btnRevised')) {
    e.preventDefault();
    revisedTodoItem(itemText,itemInputText,btnEdit,btnRevised);
  }
  if (e.target.matches('.btnDelete')) {
    e.preventDefault();
    deleteTodoItem(toDoList,toDoItem);
  }

  //對 itemInputText 監聽鍵盤 enter 事件
  itemInputText.addEventListener('keydown',function(e){
    if( e.keyCode === 13){
      revisedTodoItem(itemText,itemInputText,btnEdit,btnRevised);
    }
  });

});

/************************************************************
篩選TodoItems
************************************************************/
function showAllTodos(toDoList,itemCheckBox){
  filterStatus = "All";

  itemCheckBox.forEach(function(item,index){
    //移除所有 className = "JSNone"
    item.parentElement.classList.remove('JSNone');

    //重新添加所有 todos
    toDoList.appendChild(item.parentElement);
  });
}

function showCompletedTodos(itemCheckBox){
  filterStatus = "Completed";

  itemCheckBox.forEach(function(item,index){
    //移除所有 className = "JSNone"
    item.parentElement.classList.remove('JSNone');

    //隱藏未完成的 todos
    if(!item.checked){
      item.parentElement.classList.add('JSNone');
    }
  });
}

function showIncompletedTodos(itemCheckBox){
  filterStatus = "Incompleted";

  itemCheckBox.forEach(function(item,index){
    //移除所有 className = "JSNone"
    item.parentElement.classList.remove('JSNone');

    //隱藏完成的 todos
    if(item.checked){
      item.parentElement.classList.add('JSNone');
    }
  });
}

let filter = document.querySelector('.filter-container');
filter.addEventListener('click',function(e){
  let toDoList = document.querySelector('.toDoList');
  let itemCheckBox = document.querySelectorAll('.itemCheckBox');
  // let toDoItem = document.querySelectorAll(".toDoItem");
  // let toDoItemArray = Array.apply(null, toDoItem);
  if(e.target.matches('.btnAll')){
    e.preventDefault();
    showAllTodos(toDoList,itemCheckBox);
  }
  if(e.target.matches('.btnCompleted')){
    e.preventDefault();
    showCompletedTodos(itemCheckBox);
  }
  if(e.target.matches('.btnIncompleted')){
    e.preventDefault();
    showIncompletedTodos(itemCheckBox);
  }
});
