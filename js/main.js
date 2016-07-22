var doc = document;
var btn = doc.getElementsByTagName("BUTTON")[0];
var scripVal = doc.getElementsByTagName("INPUT")[0];
var scripList = [];

btn.addEventListener('click',function() {
  // console.log(scripVal.value);
  param = scripVal.value;
  handleXhr(param);
});

function handleXhr(param) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.status===200 & xhr.readyState===4) {
      handleResponse(xhr,param);
    }
  };
  xhr.open("GET","https://indianstockexchange.p.mashape.com/index.php?id="+param,true);
  xhr.setRequestHeader('X-Mashape-Key','F5AQZuthVKmshmuId3gvhlUB2ykWp1ZMiSkjsn9PWkb0wV1aOz');
  xhr.send();
}

function handleResponse(xhr,currScrip) {
  resp = xhr.responseText;
  var respjson = JSON.parse(resp);
  // console.log(respjson);
  if (scripList.indexOf(param) === -1 && respjson.status === "Ok") {
    scripList.push(param);
    createDOMElements(respjson);
  }
  else {
    passResponse(respjson,currScrip);
  }
}

function createDOMElements(respjson) {

  // console.log(scripList);


    var card = doc.getElementsByClassName('card-holder')[0].cloneNode(true);
    card.style.visibility = "visible";
    // console.log(card.style.visibility);

    card.id = param;

    card.querySelector('#scrip-id').innerText = param;

    updateValues(respjson,card);


    doc.getElementById('cards-stack').appendChild(card);

    // console.log(scripList);


}

function updateValues(respjson,card) {

  var high = card.querySelector('#high');
  var low = card.querySelector('#low');
  var previousClose = card.querySelector('#previousClose');
  var open = card.querySelector('#open');
  var current = card.querySelector('#current');
  var change = card.querySelector('#change');

  var arrow = card.querySelector('.fa');

  high.innerText = respjson.high;
  low.innerText = respjson.low;
  previousClose.innerText = respjson.previousClose;
  open.innerText = respjson.open;
  current.innerText = respjson.current;
  var changedBy = respjson.current - respjson.previousClose;
  changedBy = changedBy.toFixed(2);


  changeRateUpdate(arrow,change,changedBy);

}

function changeRateUpdate(arrow,change,changedBy) {
  change.innerText = changedBy;
  if (changedBy<0) {
    arrow.classList.remove('fa-arrow-up') || arrow.classList.add('fa-arrow-down');
    arrow.style.color = 'red';
    change.style.color = 'red';
    console.log(arrow.classList);
  }
  else {
    arrow.classList.add('fa-arrow-up') || arrow.classList.remove('fa-arrow-down');
    arrow.style.color = 'green';
    change.style.color = 'green';
    // console.log(arrow.style.color);
  }
}
