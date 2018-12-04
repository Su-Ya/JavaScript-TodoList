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

    /***********************************************************************
    想法順序五
    1. 只要是物件都可以掛監聽，不是只有已經在 html 上的 DOM 才可掛
    2. 執行一次 show 方法，只會建立一個 btnDelete 物件跟 listItem 物件，
       btnDelete 物件掛監聽後，把要刪除的 listItem 物件傳進 deleteItem 方法裡，
       這裡很清楚是哪個物件(因為不管是 btn 或 li 都只有一個)，不用像之前還要再判斷
    3. function(e)，console 看 e 是 MouseEvent，
       這是web api 的 addEventListener 事件對 click 類型做 callback 方法時會傳入的事件
    ************************************************************************/
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


    /***********************************************************************
    想法順序二
    1. 最開始用let btnDelete = document.querySelector('.btnDelete');
       要注意 querySelector 只會抓到第一個刪除紐而已
    2. 後來用 querySelectorAll 抓到所有刪除鈕，
       用 forEach 對每個刪除鈕加上監聽事件，再把點擊到的刪除鈕 index 傳到 deleteItem 方法
    沒考慮到
    1. 第一次執行 show 方法，index 0 的刪除鈕掛上監聽事件
    2. 第二次執行 show 方法，index 0 和 index 1 的刪除鈕掛上監聽事件(index 0 掛了兩次)
    3. 依此類推，許多刪除鈕會重複掛到多次監聽事件
    ************************************************************************/
    // let btnDelete = document.querySelectorAll('.btnDelete');
    // btnDelete.forEach(function(item,index){
    //   item.addEventListener('click',function(){deleteItem(index)});
    // });

  }//else 結尾

  //把代辦事項 input 的文字清空
  document.querySelector('.task').value = "";
}

/***********************************************************************
想法順序六
deleteItem 方法只要把傳進來的 li 物件刪除就好
************************************************************************/
function deleteItem(e,listItem){
  // console.log(e);
  // console.log('listItem',listItem);
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

/***********************************************************************
想法順序三
當刪除鈕按下後會傳入刪除鈕的 index (0,1,2...)，再判斷 li 的 index (0,1,2...)，
兩者ㄧ樣就刪除
沒考慮到
1.當按下 index 0 的刪除鈕，就算刪除 li index 0，
  但後面 li index 1 會自動往前補變成 li index 0，
  然後 if 判斷式一直是true，因為liIndex一直都有index 0，直到刪光 index 才會停止
************************************************************************/
// function deleteItem(index){
//   console.log(index);
//   let listItem = document.querySelectorAll('li');
//   listItem.forEach(function(item,liIndex){
//     if(index === liIndex){
//       document.querySelector('.newList').removeChild(item);
//     }
//   });
// }

/***********************************************************************
想法順序四
同上，刪除一個li index，下面的li index 會往前補，if 判斷式一直是true
************************************************************************/
// function deleteItem(index){
//   let listItem = document.querySelectorAll('li');
//   let found = false;
//   listItem.forEach(function(item,liIndex){
//     console.log(item);
//     if(!found && index === liIndex){
//       document.querySelector('.newList').removeChild(item);
//       found = true;
//     }
//   });
// }


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

/***********************************************************************
想法順序ㄧ
上面的 btnAdd 物件在一開始渲染 html 時就有，所以執行時可以抓到，
這裡 btnDelete 原本 html 上沒有，所以 console 看 btnDelete 會是 null，
再執行監聽事件會報錯，所以後來移到 show 方法裡
************************************************************************/
// let btnDelete = document.querySelector('.btnDelete');
// btnDelete.addEventListener('click',deleteItem);


function addClassName(checkbox){
  if(checkbox.checked === true){
    checkbox.className = "checkItem checked";
  }
  else{
    checkbox.className = "checkItem unchecked";
  }

  if(status === "All"){
    showAllList();
  }
  else if(status === "Completed"){
    showCompletedList();
  }
  else if(status === "InCompleted"){
    showInCompletedList();
  }
  console.log(checkbox.className);
  console.log(status);
}

var status = "All";
function showAllList(){
  let allList = document.querySelectorAll('.checkItem');
  allList.forEach(function(item,index){
    item.parentElement.removeAttribute("style");
  });
  status = "All"
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
  status = "Completed";
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
  status = "InCompleted";
}
let btnInCompleted = document.querySelector('.btnInCompleted');
btnInCompleted.addEventListener('click',function(e){
  e.preventDefault();
  showInCompletedList();
});
