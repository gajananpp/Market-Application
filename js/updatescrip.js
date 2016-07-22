setInterval(frequentCb,1000);

function frequentCb() {

  if (scripList.length !== 0) {
    for (var  i=0;i<scripList.length;i++) {
      handleXhr(scripList[i]);
    }
  }
}

function passResponse(respjson,currScrip) {

  var card =  document.getElementById(currScrip);
  console.log(card,respjson);

  updateValues(respjson,card);

  // for (var i=0;i<scripList.length;i++) {
  //   console.log(doc.getElementById(scripList[i]));
  // }
}
