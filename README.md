# Web Workers
> 首先了解一点javascript是单线程运作的

> 异步能解决一部分单线程问题
  ```
    ajax 浏览器 api
    XMLHttpRequest
    所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。 IE5 和 IE6 使用 ActiveXObject
    异步  event loop
  ```

## html5几个开箱即用的新特性

1. SSE
  Server-Sent Events
  服务器向浏览器推送信息
  [Server-Sent Events 教程](https://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
2. Geolocation
  地理位置定位
3. Application cache
  离线缓存
4. Local Storage
  HTML5 Web 存储
5. Drag and Drop
  拖拽/拖放
6. Web Workers

## Web Workers
  [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
  1. 什么是Web Workers
    Web Workers 并不是 JavaScript 的一部分，他们是可以通过 JavaScript 进行操作的浏览器（宿主）功能之一。 还有XMLHttpRequest（ajax）
    为 JavaScript 引入线程技术
    Web Workers 是真正的多线程  
  2. workers 种类
    Dedicated Workers 专用workers
      是由主进程实例化并且只能与之进行通信
    Shared Workers 共用workers
      可以被运行在同源的所有进程访问（不同的浏览的选项卡，内联框架及其它shared workers）。
    Service Workers
      主要用来做持久的离线缓存
      必须在 HTTPS 环境下才能工作
      [Service Worker 简介](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/service-worker-introduction)

  我们将会专注于 Dedicated Workers 并以 『Web Workers』或者 『Workers』来称呼它。

  3. 如何使用

    ```
      主线程
      //1.初始化 task.js必须是网络文件！！！
      const worker = new Worker('task.js')

      //2.发送消息  发送的数据可以是各种数据类型
      worker.postMessage('hello world')

      //3.监听子线程worker
      worker.onmessage = function (event){
        console.log(event.data)
      }
      //4.错误监听
      worker.addEventListener('error', function(event){
        //event.lineno
        //event.filename
        //event.message
      }, false);
      //5.关闭连接
      worker.terminate()

      worker线程
      //self this 都是worker线程的全局对象
      //监听（接收）数据
      self.addEventListener('message', function (e) {
        self.postMessage('You said: ' + e.data);
      }, false);

      //发送数据
      self.postMessage(e.data);
      //关闭
      self.close()
    ```

  注意
    1. 文件存在且可访问，浏览器会生成一个线程来异步下载文件。当下载完成的时候，文件会立即执行然后 worker 开始运行。万一文件不存在，worker 会运行失败且没有任何提示。

  消息大小
    有两种向 Web Workers 发送消息的方法：
    1.复制消息 即直接传输
      worker.postMessage('nihaoya')
      消息越大，时间越长，性能开销大
    2.消息传输
      JavaScript 允许主线程把二进制数据直接转移给子线程，但是一旦转移，主线程就无法再使用这些二进制数据了
      要求必须是二进制

      ```
      // Transferable Objects 格式
      worker.postMessage(arrayBuffer, [arrayBuffer]);

      // 例子
      var ab = new ArrayBuffer(1);
      worker.postMessage(ab, [ab]);
      ```
    
  可使用
    1. navigator 对象
    2. location（只读）
    3. XMLHttpRequest
    4. setTimeout()/clearTimeout() 和 setInterval()/clearInterval()
    5. Application Cache
    6. 使用 importScripts 来引用外部脚本
    7. 创建其它 web workers
  局限性
    1. DOM
    2.window对象
    3.document对象
    4.parent对象
      附：Window对象、Parent对象、Frame对象、Document对象和Form对象的阶层关系：Windows对象→Parent对象→Frame对象→Document对象→Form对象， 
      如下：parent.frame1.document.forms[0].elements[0].value; 


  同页面的Web Worker

  importScripts

  worker创建worker
    主线程postMessage和worker线程是一一对应的顺序
  应用场景

## 参考资料
1. [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
2. [Web Workers 分类及 5 个使用场景](https://github.com/Troland/how-javascript-works/blob/master/worker.md)
