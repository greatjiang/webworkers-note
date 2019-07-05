var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  console.log('start:'+start)
  onmessage = getEnd;
}

var end;
function getEnd(event) {
  end = event.data;
  console.log('end:'+end)
  onmessage = test;
  // work();
}
 
function test(event){
  console.log('test:'+event.data)
  onmessage = null
  work();
}

function work() {
  var result = 0;
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  postMessage(result);
  close();
}