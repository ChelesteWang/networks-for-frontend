# HTTP版本

## HTTP/1.0

最早的http只是使用在一些较为简单的网页上和网络请求上，所以比较简单，每次请求都打开一个新的TCP链接，收到响应之后立即断开连接。

## HTTP/1.1

- HTTP/1.1 引入了更多的缓存控制策略，如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等
- HTTP/1.1 允许范围请求，即在请求头中加入Range头部
- HTTP/1.1 的请求消息和响应消息都必须包含Host头部，以区分同一个物理主机中的不同虚拟主机的域名
- HTTP/1.1 默认开启持久连接，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟。

## HTTP/2.0

在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream），理解这两个概念是理解下面多路复用的前提。帧代表数据传输的最小的单位，每个帧都有序列标识表明该帧属于哪个流，流也就是多个帧组成的数据流，每个流表示一个请求。这里有个chrome扩展程序，可以方便的查看当前网站的HTTP请求版本（安装后在chrome开发工具-Network-在Name/Size/Time表格头右键选择Procotol，即可查看协议版本）。

- **新的二进制格式**： HTTP/1.x的解析是基于文本的。基于文本协议的解析存在天然缺陷，文本的表现形式有多样性，要做到全面性考虑的场景必然很多。二进制则不同，只识别0和1的组合。基于这种考虑HTTP/2.0的协议解析采用二进制格式，方便且强大。
- **多路复用**： HTTP/2.0支持多路复用，这是HTTP/1.1持久连接的升级版。多路复用，就是在一个 TCP 连接中可以存在多条流，也就是可以发送多个请求，服务端则可以通过帧中的标识知道该帧属于哪个流（即请求），通过重新排序还原请求。多路复用允许并发的发起多个请求，每个请求及该请求的响应不需要等待其他的请求或响应，避免了线头阻塞问题。这样某个请求任务耗时严重，不会影响到其它连接的正常执行,极大的提高传输性能。
- **头部压缩**： HTTP/1.x的请求和响应头部带有大量信息，而且每次请求都要重复发送，HTTP/2.0使用encoder来减少需要传输的头部大小，通讯双方各自cache一份头部 fields表，既避免了重复头部的传输，又减小了需要传输的大小。
- **服务端推送**： 这里的服务端推送指把客户端所需要的css/js/img资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤（从缓存中取）。

## HTTP/3.0

HTTP/2.0 使用了多路复用，一般来说同一域名下只需要使用一个 TCP 连接。但当这个连接中出现了丢包的情况，那就会导致整个 TCP 都要开始等待重传，也就导致了后面的所有数据都被阻塞了。反而对于 HTTP/1.0 来说，可以开启多个 TCP 连接，出现丢包反倒只会影响其中一个连接，剩余的 TCP 连接还可以正常传输数据。出现包阻塞的原因是因为底层TCP协议导致的问题，但是修改TCP协议是不现实的问题，就像typeof null === 'object'一样，修改这个问题会导致出现更多的问题。既然不能修改你，那就另起一个协议取代你。Google 基于 UDP 协议推出了一个的 QUIC 协议，并且使用在了 HTTP/3 上。

QUIC 基于 UDP，但是UDP本身存在不稳定性等诸多问题，所以QUIC在UDP的基础上新增了很多功能，比如多路复用、0-RTT、使用 TLS1.3 加密、流量控制、有序交付、重传等等功能。优点诸多，参考这里：

- **避免包阻塞**： 多个流的数据包在TCP连接上传输时，若一个流中的数据包传输出现问题，TCP需要等待该包重传后，才能继续传输其它流的数据包。但在基于UDP的QUIC协议中，不同的流之间的数据传输真正实现了相互独立互不干扰，某个流的数据包在出问题需要重传时，并不会对其他流的数据包传输产生影响。
- **快速重启会话**： 普通基于tcp的连接，是基于两端的ip和端口和协议来建立的。在网络切换场景，例如手机端切换了无线网，使用4G网络，会改变本身的ip，这就导致tcp连接必须重新创建。而QUIC协议使用特有的UUID来标记每一次连接，在网络环境发生变化的时候，只要UUID不变，就能不需要握手，继续传输数据。

# HTTP 1.0 和 HTTP 1.1 之间有哪些区别？

- **连接方面**，http1.0 默认使用非持久连接，而 http1.1 默认使用持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。
- **资源请求方面**，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
- **缓存方面**，在 http1.0 中主要使用 header 里的 If-Modified-Since、Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略，例如 Etag、If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。
- http1.1 中**新增了 host 字段**，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，这样就可以将请求发往到同一台服务器上的不同网站。
- http1.1 相对于 http1.0 还**新增了很多请求方法**，如 PUT、HEAD、OPTIONS 等。

# HTTP 1.1 和 HTTP 2.0 之间有哪些区别？

- **二进制协议**：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"，可以分为头信息帧和数据帧。帧的概念是它实现多路复用的基础。
- **多路复用**： HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，这样就避免了"队头堵塞"【1】的问题。
- **数据流**： HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每个数据流都有一个独一无二的编号。数据包发送时，都必须标记数据流 ID ，用来区分它属于哪个数据流。
- **头信息压缩**： HTTP/2 实现了头信息压缩，由于 HTTP 1.1 协议不带状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就能提高速度了。
- **服务器推送**： HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送提前给客户端推送必要的资源，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。

**【1】队头堵塞：**

> 队头阻塞是由 HTTP 基本的“请求 - 应答”模型所导致的。HTTP 规定报文必须是“一发一收”，这就形成了一个先进先出的“串行”队列。队列里的请求是没有优先级的，只有入队的先后顺序，排在最前面的请求会被最优先处理。如果队首的请求因为处理的太慢耽误了时间，那么队列里后面的所有请求也不得不跟着一起等待，结果就是其他的请求承担了不应有的时间成本，造成了队头堵塞的现象。