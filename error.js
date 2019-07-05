self.onmessage = function (event){
  console.log(event.data)
  self.postMessage(x)
  self.close()
}