
/*jshint esversion:6*/

function showList(){
  let inputText = document.querySelector('#task').value;
  if(inputText === ""){
    window.alert('请输入代辦事項！');
  }
  else{
    let inputTag = document.createElement('input');
    inputTag.type = "checkbox";
    inputTag.className = "item";
    inputTag.name = "listItem";

    let labelTag = document.createElement('label');
    let textNode = document.createTextNode(inputText);
    labelTag.htmlFor = "listItem";
    labelTag.appendChild(textNode);

    let btnTag = document.createElement('button');
    btnTag.className = "deleItem";
    btnTag.textContent = "x";

    let liTag = document.createElement('li');
    liTag.appendChild(inputTag);
    liTag.appendChild(labelTag);
    liTag.appendChild(btnTag);

    /***********************************************************************
    想法順序五
    1. 只要是物件都可以掛監聽，不是只有已經在 html 上的 DOM 才可掛
    2. 執行一次 show 方法，只會建立一個 btnTag 物件跟 liTag 物件，
       btnTag 物件掛監聽後，把要刪除的 liTag 物件傳進 deleteItem 方法裡，
       這裡很清楚是哪個物件(因為不管是 btn 或 li 都只有一個)，不用像之前還要再判斷
    3. function(e)，console 看 e 是 MouseEvent，
       這是web api 的 addEventListener 事件對 click 類型做 callback 方法時會傳入的事件
    ************************************************************************/
    btnTag.addEventListener('click',
    function(e){
      deleteItem(e,liTag);
    });


    document.querySelector('#newList').appendChild(liTag);

    /***********************************************************************
    想法順序二
    1. 最開始用let btnDelete = document.querySelector('.deleItem');
       要注意 querySelector 只會抓到第一個刪除紐而已
    2. 後來用 querySelectorAll 抓到所有刪除鈕，
       用 forEach 對每個刪除鈕加上監聽事件，再把點擊到的刪除鈕 index 傳到 deleteItem 方法
    沒考慮到
    1. 第一次執行 show 方法，index 0 的刪除鈕掛上監聽事件
    2. 第二次執行 show 方法，index 0 和 index 1 的刪除鈕掛上監聽事件(index 0 掛了兩次)
    3. 依此類推，許多刪除鈕會重複掛到多次監聽事件
    ************************************************************************/
    // let btnDelete = document.querySelectorAll('.deleItem');
    // btnDelete.forEach(function(item,index){
    //   item.addEventListener('click',function(){deleteItem(index)});
    // });


  }//else 結尾
}

/***********************************************************************
想法順序六
deleteItem 方法只要把傳進來的 li 物件刪除就好
************************************************************************/
function deleteItem(e,liTag){
  // console.log(e);
  // console.log('liTag',liTag);
  document.querySelector('#newList').removeChild(liTag);
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
//   let liTag = document.querySelectorAll('li');
//   liTag.forEach(function(item,liIndex){
//     if(index === liIndex){
//       document.querySelector('#newList').removeChild(item);
//     }
//   });
// }

/***********************************************************************
想法順序四
同上，刪除一個li index，下面的li index 會往前補，if 判斷式一直是true
************************************************************************/
// function deleteItem(index){
//   let liTag = document.querySelectorAll('li');
//   let found = false;
//   liTag.forEach(function(item,liIndex){
//     console.log(item);
//     if(!found && index === liIndex){
//       document.querySelector('#newList').removeChild(item);
//       found = true;
//     }
//   });
// }


let btnAdd = document.querySelector('#addNew');
btnAdd.addEventListener('click',showList);

/***********************************************************************
想法順序ㄧ
上面的 btnAdd 物件在一開始渲染 html 時就有，所以執行時可以抓到，
這裡 btnDelete 原本 html 上沒有，所以 console 看 btnDelete 會是 null，
再執行監聽事件會報錯，所以後來移到 show 方法裡
************************************************************************/
// let btnDelete = document.querySelector('.deleItem');
// btnDelete.addEventListener('click',deleteItem);


/***********************************************************************
按下鍵盤 enter 事件，未完成
************************************************************************/
// let inputText = document.querySelector('#task');
// inputinputText.addEventListener('keydown',function(e){
//   if( e.keyCode === 13){

//   }
// });
