/*jshint esversion:6*/

function showList(){
  //建立變數存新增代辦事項 input 的文字
  let addNewListText = document.querySelector('.task').value;

  if(addNewListText === ""){
    window.alert('请输入代辦事項！');
  }
  else{
    //建立 checkbox 物件
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "checkItem unchecked";
    checkbox.name = "check";

    //建立 label 物件用來放代辦事項文字，為搭配 checkbox 出現文字刪除線所以用 label
    let listItemText = document.createElement('label');
    let textNode = document.createTextNode(addNewListText);
    listItemText.htmlFor = "check";
    listItemText.appendChild(textNode);

    //建立 input 物件，用來修改代辦事項文字，一開始先隱藏
    let updatelistItem = document.createElement('input');
    updatelistItem.type = "text";
    updatelistItem.style.visibility = "hidden";
    updatelistItem.className = "inputUpdate";

    //建立 Button 物件，當編輯鈕
    let btnUpdate = document.createElement('button');
    btnUpdate.className = "btnUpdate";
    btnUpdate.textContent = "Edit";

    //建立 Button 物件，當編輯完成鈕，一開始先隱藏
    let btnRevised = document.createElement('button');
    btnRevised.className = "btnRevised";
    btnRevised.style.display = "none";
    btnRevised.textContent = "Revised";

    //建立 Button 物件，當刪除鈕
    let btnDelete = document.createElement('button');
    btnDelete.className = "btnDelete";
    btnDelete.textContent = "Delete";

    //建立 li 物件，當用來清單項目，放入上面建立的物件
    let listItem = document.createElement('li');
    listItem.appendChild(checkbox);
    listItem.appendChild(listItemText);
    listItem.appendChild(updatelistItem);
    listItem.appendChild(btnUpdate);
    listItem.appendChild(btnRevised);
    listItem.appendChild(btnDelete);


    btnDelete.addEventListener('click',
    function(e){
      deleteItem(e,listItem);
    });

    btnUpdate.addEventListener('click',
    function(e){
      updateItem(e,updatelistItem,btnUpdate,btnRevised,listItemText);
    });

    btnRevised.addEventListener('click',
    function(e){
      revisedItem(e,updatelistItem,btnUpdate,btnRevised,listItemText);
    });

    //按下鍵盤 enter 事件
    updatelistItem.addEventListener('keydown',function(e){
      if(e.keyCode === 13){
        e.preventDefault();
        revisedItem(e,updatelistItem,btnUpdate,btnRevised,listItemText);
      }
    });

    checkbox.addEventListener('click',function(e){
      addClassName(checkbox);
    });

    //取得 ul 物件，放入 li 物件(清單項目)
    document.querySelector('.newList').appendChild(listItem);

  }//else 結尾

  //把代辦事項 input 的文字清空
  document.querySelector('.task').value = "";
}


function deleteItem(e,listItem){
  document.querySelector('.newList').removeChild(listItem);
}

//當 btnUpdate clicked 執行 function (編輯狀態)
function updateItem(e,updatelistItem,btnUpdate,btnRevised,listItemText){
  updatelistItem.value = listItemText.textContent;
  // console.log('updateFu',updatelistItem.value );
  listItemText.style.display = "none";
  updatelistItem.style.visibility = null;
  btnUpdate.style.display = "none";
  btnRevised.style.display = "inline-block";
}

//當 btnRevised clicked 執行 function (編輯完成狀態)
function revisedItem(e,updatelistItem,btnUpdate,btnRevised,listItemText){
  let originalText = listItemText.textContent;
  if(updatelistItem.value === ""){
    listItemText.textContent = originalText;
  }
  else{
    listItemText.textContent = updatelistItem.value;
  }
  listItemText.style.display = "inline";
  updatelistItem.style.visibility = "hidden";
  btnUpdate.style.display = "inline-block";
  btnRevised.style.display = "none";
}


let btnAdd = document.querySelector('.btnAddNew');
btnAdd.addEventListener('click',function(e){
  e.preventDefault();
  showList();
});

//建立 input 物件(新增事項輸入框)，監聽鍵盤 enter 事件
let inputNewList = document.querySelector('.task');
inputNewList.addEventListener('keydown',function(e){
  if( e.keyCode === 13){
    e.preventDefault();
    showList();
  }
});

function addClassName(checkbox){
  if(checkbox.checked === true){
    checkbox.className = "checkItem checked";
  }
  else{
    checkbox.className = "checkItem unchecked";
  }

  if(filterStatus === "All"){
    showAllList();
  }
  else if(filterStatus === "Completed"){
    showCompletedList();
  }
  else if(filterStatus === "InCompleted"){
    showInCompletedList();
  }
  // console.log(checkbox.className);
  // console.log(filterStatus);
}

var filterStatus = "All";
function showAllList(){
  let allList = document.querySelectorAll('.checkItem');
  allList.forEach(function(item,index){
    item.parentElement.removeAttribute("style");
  });
  filterStatus = "All";
}
let btnAll = document.querySelector('.btnAll');
btnAll.addEventListener('click',function(e){
  e.preventDefault();
  showAllList();
});

function showCompletedList(){
  // let checkedList = document.querySelectorAll('.checkItem.checked');
  // console.log(checkedList);
  let uncheckedList = document.querySelectorAll('.checkItem.unchecked');
  uncheckedList.forEach(function(item,index){
    //parentElement 取得父層節點
    item.parentElement.style.display = "none";
  });
  let inCompletedList = document.querySelectorAll('.checkItem.checked');
  inCompletedList.forEach(function(item,index){
    // console.log(item.parentElement);
    item.parentElement.removeAttribute("style");
  });
  filterStatus = "Completed";
}
let btnCompleted = document.querySelector('.btnCompleted');
btnCompleted.addEventListener('click',function(e){
  e.preventDefault();
  showCompletedList();
});

function showInCompletedList(){
  let allList = document.querySelectorAll('.checkItem.unchecked');
  allList.forEach(function(item,index){
    // console.log(item.parentElement);
    item.parentElement.removeAttribute("style");
  });
  let inCompletedList = document.querySelectorAll('.checkItem.checked');
  inCompletedList.forEach(function(item,index){
    // console.log(item.parentElement);
    item.parentElement.style.display = "none";
  });
  filterStatus = "InCompleted";
}
let btnInCompleted = document.querySelector('.btnInCompleted');
btnInCompleted.addEventListener('click',function(e){
  e.preventDefault();
  showInCompletedList();
});
