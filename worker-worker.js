let num_workers = 10
let items_per_worker = 1000

let result = 0
let pending_workers = num_workers

for(let i=0;i<num_workers;i++){
  let worker =new Worker('worker-worker-core.js')
  worker.postMessage(i*items_per_worker)
  worker.postMessage((i+1)*items_per_worker)
  worker.postMessage((i+2)*items_per_worker)
  worker.onmessage = storeResult
}

function storeResult(event){
  result += event.data
  pending_workers -= 1
  if(pending_workers <= 0){
    postMessage(result)
  }
}