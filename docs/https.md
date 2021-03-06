# HTTP 协议存在的问题

- **通信使用明文（不加密），内容可能会被窃听**
- **不验证通信方的身份，可能遭遇伪装**
- **无法证明报文的完整性，可能遭遇篡改**

# 🍅 HTTPS 协议是什么

HTTP 是一种 `超文本传输协议(Hyper Text Transfer Protocol)`

HTTPS (`Hyper Text Transfer Protocol over SecureSocket Layer`）是在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性。

# 🍅 HTTPS 如何解决 HTTP 上述问题

在 HTTPS 中，使用`传输层安全性协议(TLS)`或`安全套接字协议(SSL)`对通信协议进行加密。也就是 `HTTP + SSL(TLS) = HTTPS`。

[](https://camo.githubusercontent.com/623dd4001bbcb18e4aaa885645a06735e6dcee0114a21f366b35388325234db2/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f30326362356231633932303434356165396532303464393162363732626538392e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

在采用SSL后，HTTP就拥有了HTTPS的加密、证书和完整性保护这些功能。也就是说**HTTP加上加密处理和认证以及完整性保护后即是HTTPS**。

[](https://camo.githubusercontent.com/fab2ec73e475a6f158075fb732ed350c6b9383d39ed1b6f64b6120ec2606b760/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f62333162623535373235643434326132396531323065363235306462653134662e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

HTTPS 协议的主要功能基本都依赖于 TLS/SSL 协议，TLS/SSL 的功能实现主要依赖于三类基本算法：`散列函数` 、`对称加密`和`非对称加密`，**其利用非对称加密实现身份认证和密钥协商，对称加密算法采用协商的密钥对数据加密，基于散列函数验证信息的完整性**。

[](https://camo.githubusercontent.com/f04c25bd402006c79d1a7f6b86ad2bef8b8d6390c73815ce6b69dd51b41240b1/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f62323633316662666464376334313537626366663834663539313438633365352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

**`HTTPS = HTTP+加密+认证+完整性保护`**

# 🍅 解决内容可能被窃听的问题——加密

- **对称加密**
  
  这种方式加密和解密同用一个密钥。加密和解密都会用到密钥。**没有密钥就无法对密码解密，反过来说，任何人只要持有密钥就能解密了。**
  
- **非对称加密**
  
  非对称加密使用一对非对称的密钥。一把叫做私钥，另一把叫做公钥。顾名思义，**私钥不能让其他任何人知道，而公钥则可以随意发布，任何人都可以获得。**
  
  使用非对称加密方式，发送密文的一方使用**对方的公钥**进行加密处理，对方收到被加密的信息后，再使用自己的私有密钥进行解密。利用这种方式，不需要发送用来解密的私有密钥，也不必担心密钥被攻击者窃听而盗走。
  
  **非对称加密的特点是信息传输一对多，服务器只需要维持一个私钥就能够和多个客户端进行加密通信。**
  
- **对称加密+非对称加密(HTTPS采用这种方式)**
  
  使用对称密钥的好处是解密的效率比较快，使用非对称密钥的好处是可以使得传输的内容不能被破解，因为就算你拦截到了数据，但是没有对应的私钥，也是不能破解内容的。就比如说你抢到了一个保险柜，但是没有保险柜的钥匙也不能打开保险柜。那我们就将对称加密与非对称加密结合起来,充分利用两者各自的优势，**在交换密钥环节使用非对称加密方式，之后的建立通信交换报文阶段则使用对称加密方式。**
  
  具体做法是：**发送密文的一方使用对方的公钥进行加密处理“对称的密钥”，然后对方用自己的私钥解密拿到“对称的密钥”，这样可以确保交换的密钥是安全的前提下，使用对称加密方式进行通信**。所以，HTTPS采用对称加密和非对称加密两者并用的混合加密机制。
  

[](https://camo.githubusercontent.com/e3d9c24332194ae174c68e2680d0774d8577acbf84a5d558e83b9ce6974d1541/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36336638343330386233663534336232613039396566656336386336343433622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

由图可见，HTTP 在传输数据的过程中，所有的数据都是明文传输，自然没有安全性可言，特别是一些敏感数据，比如用户密码和信用卡信息等，一旦被第三方获取，后果不堪设想。这里可能有人会说，我在前端页面对敏感数据进行加密不就行了，比如 MD5 加盐加密。这么想就太简单了。首先 MD5 并不是加密算法，其全称是 Message Digest Algorithm MD5，意为信息摘要算法。MD5，SHA-1 之类的哈希算法并不能让 HTTP 变得更安全。要想让 HTTP 更安全，只能使用真正的加密算法，因为加密算法可以用密钥加密或还原数据，只要确保密钥不被第三方获取，那就能确保数据传输的安全了。而这正是 HTTPS 的解决方案，那下面就来了解一下加密算法吧。

# 🍅 解决报文可能遭篡改问题——数字签名

网络传输过程中需要经过很多中间节点，虽然数据无法被解密，但可能被篡改，那如何校验数据的完整性呢？----校验数字签名。

**数字签名有两种功效：**

- 能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名。
- 数字签名能确定消息的完整性,证明数据是否未被篡改过。

**数字签名如何生成:**

[](https://camo.githubusercontent.com/96f4718c8db4d5ca0e5d792de45978545d6b00af801515de503ec019bf9ecdc5/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36313132363164353930633934643633393837393839646536373064623065622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

将一段文本先用Hash函数生成消息摘要，然后用发送者的私钥加密生成数字签名，与原文文一起传送给接收者。接下来就是接收者校验数字签名的流程了。

**校验数字签名流程：**

[](https://camo.githubusercontent.com/bfa378c907157e10ac2c3609bec3d00cdd530630a5d5525018ac581ce81ed7b0/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f65636434646431326437616434383935613162663730633764356138363837332e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

接收者只有用发送者的公钥才能解密被加密的摘要信息，然后用HASH函数对收到的原文产生一个摘要信息，与上一步得到的摘要信息对比。如果相同，则说明收到的信息是完整的，在传输过程中没有被修改，否则说明信息被修改过，因此数字签名能够验证信息的完整性。

假设消息传递在Kobe，James两人之间发生。James将消息连同数字签名一起发送给Kobe，Kobe接收到消息后，通过校验数字签名，就可以验证接收到的消息就是James发送的。当然，这个过程的前提是Kobe知道James的公钥。问题的关键的是，和消息本身一样，公钥不能在不安全的网络中直接发送给Kobe,或者说拿到的公钥如何证明是James的。

此时就需要引入了**证书颁发机构**`（Certificate Authority，简称CA）`，CA数量并不多，Kobe客户端内置了所有受信任CA的证书。CA对James的公钥（和其他信息）数字签名后生成证书。

# 🍅 解决通信方身份可能被伪装的问题——数字证书

数字证书认证机构处于客户端与服务器双方都可信赖的第三方机构的立场上。

我们来介绍一下数字证书认证机构的业务流程：

- 服务器的运营人员向第三方机构CA提交公钥、组织信息、个人信息(域名)等信息并申请认证;
- CA通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法，是否拥有域名的所有权等;
- 如信息审核通过，CA会向申请者签发认证文件-证书。证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA的信息、有效时间、证书序列号等信息的明文，同时包含一个签名。 其中签名的产生算法：- - 首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA的私钥对信息摘要进行加密，密文即签名;
- 客户端 Client 向服务器 Server 发出请求时，Server 返回证书文件;
- 客户端 Client 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即服务器的公开密钥是值得信赖的。
- 客户端还会验证证书相关的域名信息、有效时间等信息; 客户端会内置信任CA的证书信息(包含公钥)，如果CA不被信任，则找不到对应 CA的证书，证书也会被判定非法。

# 🍅 详解两种加密算法的区别和优缺点

`HTTPS` 解决数据传输安全问题的方案就是使用加密算法，具体来说是混合加密算法，也就是 **对称加密** 和 **非对称加密** 的混合使用，这里有必要先**了解一下这两种加密算法的区别和优缺点**。

## 🍎 对称加密

对称加密，顾名思义就是加密和解密都是使用同一个密钥，常见的对称加密算法有 DES、3DES 和 AES 等，其优缺点如下：

- **优点**：算法公开、计算量小、加密速度快、加密效率高，适合加密比较大的数据
  
- **缺点**：
  
  **1**.交易双方需要使用相同的密钥，也就无法避免密钥的传输，而密钥在传输过程中无法保证不被截获，因此对称加密的安全性得不到保证。
  
  **2**.每对用户每次使用对称加密算法时，都需要使用其他人不知道的惟一密钥，这会使得发收信双方所拥有的钥匙数量急剧增长，密钥管理成为双方的负担。对称加密算法在分布式网络系统上使用较为困难，主要是因为密钥管理困难，使用成本较高。
  

如果直接将对称加密算法用在 HTTP 中，会是下面的效果：

[](https://camo.githubusercontent.com/bc5396255be50228eb008d2e06190bd780ddbf3b0f359e2516d624efda1fb27f/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f35303433653066393031626134656464396436343432343335363734326166652e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

从图中可以看出，被加密的数据在传输过程中是无规则的乱码，即便被第三方截获，在没有密钥的情况下也无法解密数据，也就保证了数据的安全。但是有一个致命的问题，那就是既然双方要使用相同的密钥，那就必然要在传输数据之前先由一方把密钥传给另一方，那么在此过程中密钥就很有可能被截获，这样一来加密的数据也会被轻松解密。那如何确保密钥在传输过程中的安全呢？这就要用到非对称加密了。

## 🍎 非对称加密

非对称加密，顾名思义，就是加密和解密需要使用两个不同的密钥：`公钥(public key)`和`私钥(private key)`。公钥与私钥是一对，如果用公钥对数据进行加密，只有用对应的私钥才能解密；如果用私钥对数据进行加密，那么只有用对应的公钥才能解密。

非对称加密算法实现机密信息交换的基本过程是：甲方生成一对密钥并将其中的一把作为公钥对外公开；得到该公钥的乙方使用公钥对机密信息进行加密后再发送给甲方；甲方再用自己保存的私钥对加密后的信息进行解密。如果对公钥和私钥不太理解，可以想象成一把钥匙和一个锁头，只是全世界只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。

常用的非对称加密算法是 RSA 算法，其优缺点如下：

- **优点**：算法公开，加密和解密使用不同的钥匙，私钥不需要通过网络进行传输，安全性很高。
  
- **缺点**：计算量比较大，加密和解密速度相比对称加密慢很多。
  

由于非对称加密的强安全性，可以用它完美解决对称加密的密钥泄露问题，效果图如下：

[](https://camo.githubusercontent.com/1f7e3c2c9edac9fd437c7a5d52e78fccf5f14745f07945abd564fc5d495d9245/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f35393437636663363665663434666262383930656332356333363664303037352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

在上述过程中，客户端在拿到服务器的公钥后，会生成一个随机码 (用 KEY 表示，这个 KEY 就是后续双方用于对称加密的密钥)，然后客户端使用公钥把 KEY 加密后再发送给服务器，服务器使用私钥将其解密，这样双方就有了同一个密钥 KEY，然后双方再使用 KEY 进行对称加密交互数据。在非对称加密传输 KEY 的过程中，即便第三方获取了公钥和加密后的 KEY，在没有私钥的情况下也无法破解 KEY (私钥存在服务器，泄露风险极小)，也就保证了接下来对称加密的数据安全。而上面这个流程图正是 HTTPS 的雏形，HTTPS 正好综合了这两种加密算法的优点，不仅保证了通信安全，还保证了数据传输效率。

# 🍅 HTTPS 加密、解密、验证及数据传输过程

HTTPS 加密、解密、验证及数据传输过程如下图所示`(建议详读下图)`：

[](https://camo.githubusercontent.com/6bc8f1c6ba16346cdc5bfbe5d3d01d5bf8423bd2f64cdee019c1c348cb2da962/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36316436373161313935333334313534383434666638356262386532346633642e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

HTTPS 的整个通信过程可以分为两大阶段：证书验证和数据传输阶段，数据传输阶段又可以分为非对称加密和对称加密两个阶段。

具体流程按图中的序号讲解：

1. 客户端请求 HTTPS 网址，然后连接到 server 的 443 端口 (HTTPS 默认端口，类似于 HTTP 的80端口)。
  
2. 采用 HTTPS 协议的服务器必须要有一套数字 CA (Certification Authority)证书，证书是需要申请的，并由专门的数字证书认证机构(CA)通过非常严格的审核之后颁发的电子证书 (当然了是要钱的，安全级别越高价格越贵)。颁发证书的同时会产生一个私钥和公钥。私钥由服务端自己保存，不可泄漏。公钥则是附带在证书的信息中，可以公开的。证书本身也附带一个证书电子签名，这个签名用来验证证书的完整性和真实性，可以防止证书被篡改。
  
3. 服务器响应客户端请求，将证书传递给客户端，证书包含公钥和大量其他信息，比如证书颁发机构信息，公司信息和证书有效期等。Chrome 浏览器点击地址栏的锁标志再点击证书就可以看到证书详细信息。  
  [](https://camo.githubusercontent.com/c2806631a6cea48fbaf725cd0c9305b4ebf8e56af4bcfc611a8938b21807775d/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f31366534323665626463656234303737393232393330303737646337616466352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)
  
4. 客户端解析证书并对其进行验证。如果证书不是可信机构颁布，或者证书中的域名与实际域名不一致，或者证书已经过期，就会向访问者显示一个警告，由其选择是否还要继续通信。就像下面这样：  
  [](https://camo.githubusercontent.com/e15f76a6b63d4761d849564d13d8ace73c8d924630ec20d096765ccbdc13708d/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f31393063323131623832393134333237393038326237333464343337653236632e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)  
  如果证书没有问题，客户端就会从服务器证书中取出服务器的公钥A。然后客户端还会生成一个随机码 KEY，并使用公钥A将其加密。
  
5. 客户端把加密后的随机码 KEY 发送给服务器，作为后面对称加密的密钥。
  
6. 服务器在收到随机码 KEY 之后会使用私钥B将其解密。经过以上这些步骤，客户端和服务器终于建立了安全连接，完美解决了对称加密的密钥泄露问题，接下来就可以用对称加密愉快地进行通信了。
  
7. 服务器使用密钥 (随机码 KEY)对数据进行对称加密并发送给客户端，客户端使用相同的密钥 (随机码 KEY)解密数据。
  
8. 双方使用对称加密愉快地传输所有数据。
  

好了，以上就是 HTTPS 的原理详解了~

# 🍅 HTTP和HTTPS协议的主要区别

[](https://camo.githubusercontent.com/bebf7e84ed39f362af7d760bfc0519623b69fe728bc382caba7220e43713f127/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f37333863643531636635366534313662623138376166376164613738666164662e706e67)

- HTTPS协议需要CA证书，费用较高；而HTTP协议不需要；
- HTTP协议是超文本传输协议，信息是明文传输的，HTTPS则是具有安全性的SSL加密传输协议；
- 使用不同的连接方式，端口也不同，HTTP协议端口是80，HTTPS协议端口是443；
- HTTP协议连接很简单，是无状态的；HTTPS协议是有SSL和HTTP协议构建的可进行加密传输、身份认证的网络协议，比HTTP更加安全
- HTTPS比HTTP对搜索引擎更友好，利于SEO,谷歌、百度优先索引HTTPS网页

# 🍅 为何不是所有的网站都使用HTTPS

既然HTTPS那么安全可靠，那为何不所有的Web网站都使用HTTPS？

首先，很多人还是会觉得HTTPS实施有门槛，这个门槛在于需要权威CA颁发的SSL证书。从证书的选择、购买到部署，传统的模式下都会比较耗时耗力。

其次，HTTPS普遍认为性能消耗要大于HTTP，因为**与纯文本通信相比，加密通信会消耗更多的CPU及内存资源**。如果每次通信都加密，会消耗相当多的资源，平摊到一台计算机上时，能够处理的请求数量必定也会随之减少。但事实并非如此，用户可以通过性能优化、把证书部署在SLB或CDN，来解决此问题。举个实际的例子，“双十一”期间，全站HTTPS的淘宝、天猫依然保证了网站和移动端的访问、浏览、交易等操作的顺畅、平滑。通过测试发现，经过优化后的许多页面性能与HTTP持平甚至还有小幅提升，因此HTTPS经过优化之后其实并不慢。

除此之外，**想要节约购买证书的开销也是原因之一**。要进行HTTPS通信，证书是必不可少的。而使用的证书必须向认证机构（CA）购买。

最后是安全意识。相比国内，国外互联网行业的安全意识和技术应用相对成熟，HTTPS部署趋势是由社会、企业、政府共同去推动的。

# 参考

- [最精美详尽的 HTTPS 原理图！_l_瓶中精灵的博客-CSDN博客](https://blog.csdn.net/qq_36189144/article/details/109064207)
- [最精美详尽的 HTTPS 原理图_芋艿V-CSDN博客](https://blog.csdn.net/github_38592071/article/details/108591464)
- https://mp.weixin.qq.com/s/PdY5fXKOmTN1idiCYSJisw
- https://segmentfault.com/a/1190000018992153
- [关于面试：HTTP VS HTTPS（HTTP与HTTPS的区别） - 掘金](https://juejin.cn/post/6904227431939342344#heading-3)
- [硬核！30 张图解 HTTP 常见的面试题 - 掘金](https://juejin.cn/post/6844904084307181575#heading-6)
- [《大前端进阶 安全》系列 HTTPS详解（通俗易懂） - 掘金](https://juejin.cn/post/6844904127420432391#heading-5)
- [分分钟让你理解HTTPS - 掘金](https://juejin.cn/post/6844903599303032845#heading-7)
- [看完这篇 HTTPS，和面试官扯皮就没问题了 - 掘金](https://juejin.cn/post/6844904089495535624#heading-4)
- [前端面试查漏补缺--(九) HTTP与HTTPS - 掘金](https://juejin.cn/post/6844903781704925198#heading-16)

[查看原文](https://yuanyuan.blog.csdn.net/article/details/120257693)

## 博文系列目录

- JavaScript 深入系列
- JavaScript 专题系列
- JavaScript 基础系列
- 网络系列
- 浏览器系列
- 性能优化与网络安全系列
- Webpack 系列
- Vue 系列
- HTML 应知应会系列
- CSS 应知应会系列
- 算法入门系列

## 交流

各系列文章汇总：[GitHub - yuanyuanbyte/Blog: 我是圆圆，公众号「前端圆圆」作者，预计写七个系列：JavaScript深入系列、JavaScript专题系列、网络系列、Webpack系列、Vue系列、JavaScript基础系列、HTML&amp;CSS应知应会系列。](https://github.com/yuanyuanbyte/Blog)，内有优质前端资料，觉得不错点个star。

我是圆圆，专注于打造一系列能够帮助前端工程师提高的优质文章，希望我的文章能对你的学习成长有所帮助，一起加油！# HTTP 协议存在的问题

- **通信使用明文（不加密），内容可能会被窃听**
- **不验证通信方的身份，可能遭遇伪装**
- **无法证明报文的完整性，可能遭遇篡改**

# 🍅 HTTPS 协议是什么

HTTP 是一种 `超文本传输协议(Hyper Text Transfer Protocol)`

HTTPS (`Hyper Text Transfer Protocol over SecureSocket Layer`）是在HTTP的基础上通过传输加密和身份认证保证了传输过程的安全性。

# 🍅 HTTPS 如何解决 HTTP 上述问题

在 HTTPS 中，使用`传输层安全性协议(TLS)`或`安全套接字协议(SSL)`对通信协议进行加密。也就是 `HTTP + SSL(TLS) = HTTPS`。

[](https://camo.githubusercontent.com/623dd4001bbcb18e4aaa885645a06735e6dcee0114a21f366b35388325234db2/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f30326362356231633932303434356165396532303464393162363732626538392e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

在采用SSL后，HTTP就拥有了HTTPS的加密、证书和完整性保护这些功能。也就是说**HTTP加上加密处理和认证以及完整性保护后即是HTTPS**。

[](https://camo.githubusercontent.com/fab2ec73e475a6f158075fb732ed350c6b9383d39ed1b6f64b6120ec2606b760/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f62333162623535373235643434326132396531323065363235306462653134662e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

HTTPS 协议的主要功能基本都依赖于 TLS/SSL 协议，TLS/SSL 的功能实现主要依赖于三类基本算法：`散列函数` 、`对称加密`和`非对称加密`，**其利用非对称加密实现身份认证和密钥协商，对称加密算法采用协商的密钥对数据加密，基于散列函数验证信息的完整性**。

[](https://camo.githubusercontent.com/f04c25bd402006c79d1a7f6b86ad2bef8b8d6390c73815ce6b69dd51b41240b1/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f62323633316662666464376334313537626366663834663539313438633365352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

**`HTTPS = HTTP+加密+认证+完整性保护`**

# 🍅 解决内容可能被窃听的问题——加密

- **对称加密**
  
  这种方式加密和解密同用一个密钥。加密和解密都会用到密钥。**没有密钥就无法对密码解密，反过来说，任何人只要持有密钥就能解密了。**
  
- **非对称加密**
  
  非对称加密使用一对非对称的密钥。一把叫做私钥，另一把叫做公钥。顾名思义，**私钥不能让其他任何人知道，而公钥则可以随意发布，任何人都可以获得。**
  
  使用非对称加密方式，发送密文的一方使用**对方的公钥**进行加密处理，对方收到被加密的信息后，再使用自己的私有密钥进行解密。利用这种方式，不需要发送用来解密的私有密钥，也不必担心密钥被攻击者窃听而盗走。
  
  **非对称加密的特点是信息传输一对多，服务器只需要维持一个私钥就能够和多个客户端进行加密通信。**
  
- **对称加密+非对称加密(HTTPS采用这种方式)**
  
  使用对称密钥的好处是解密的效率比较快，使用非对称密钥的好处是可以使得传输的内容不能被破解，因为就算你拦截到了数据，但是没有对应的私钥，也是不能破解内容的。就比如说你抢到了一个保险柜，但是没有保险柜的钥匙也不能打开保险柜。那我们就将对称加密与非对称加密结合起来,充分利用两者各自的优势，**在交换密钥环节使用非对称加密方式，之后的建立通信交换报文阶段则使用对称加密方式。**
  
  具体做法是：**发送密文的一方使用对方的公钥进行加密处理“对称的密钥”，然后对方用自己的私钥解密拿到“对称的密钥”，这样可以确保交换的密钥是安全的前提下，使用对称加密方式进行通信**。所以，HTTPS采用对称加密和非对称加密两者并用的混合加密机制。
  

[](https://camo.githubusercontent.com/e3d9c24332194ae174c68e2680d0774d8577acbf84a5d558e83b9ce6974d1541/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36336638343330386233663534336232613039396566656336386336343433622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

由图可见，HTTP 在传输数据的过程中，所有的数据都是明文传输，自然没有安全性可言，特别是一些敏感数据，比如用户密码和信用卡信息等，一旦被第三方获取，后果不堪设想。这里可能有人会说，我在前端页面对敏感数据进行加密不就行了，比如 MD5 加盐加密。这么想就太简单了。首先 MD5 并不是加密算法，其全称是 Message Digest Algorithm MD5，意为信息摘要算法。MD5，SHA-1 之类的哈希算法并不能让 HTTP 变得更安全。要想让 HTTP 更安全，只能使用真正的加密算法，因为加密算法可以用密钥加密或还原数据，只要确保密钥不被第三方获取，那就能确保数据传输的安全了。而这正是 HTTPS 的解决方案，那下面就来了解一下加密算法吧。

# 🍅 解决报文可能遭篡改问题——数字签名

网络传输过程中需要经过很多中间节点，虽然数据无法被解密，但可能被篡改，那如何校验数据的完整性呢？----校验数字签名。

**数字签名有两种功效：**

- 能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名。
- 数字签名能确定消息的完整性,证明数据是否未被篡改过。

**数字签名如何生成:**

[](https://camo.githubusercontent.com/96f4718c8db4d5ca0e5d792de45978545d6b00af801515de503ec019bf9ecdc5/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36313132363164353930633934643633393837393839646536373064623065622e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

将一段文本先用Hash函数生成消息摘要，然后用发送者的私钥加密生成数字签名，与原文文一起传送给接收者。接下来就是接收者校验数字签名的流程了。

**校验数字签名流程：**

[](https://camo.githubusercontent.com/bfa378c907157e10ac2c3609bec3d00cdd530630a5d5525018ac581ce81ed7b0/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f65636434646431326437616434383935613162663730633764356138363837332e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

接收者只有用发送者的公钥才能解密被加密的摘要信息，然后用HASH函数对收到的原文产生一个摘要信息，与上一步得到的摘要信息对比。如果相同，则说明收到的信息是完整的，在传输过程中没有被修改，否则说明信息被修改过，因此数字签名能够验证信息的完整性。

假设消息传递在Kobe，James两人之间发生。James将消息连同数字签名一起发送给Kobe，Kobe接收到消息后，通过校验数字签名，就可以验证接收到的消息就是James发送的。当然，这个过程的前提是Kobe知道James的公钥。问题的关键的是，和消息本身一样，公钥不能在不安全的网络中直接发送给Kobe,或者说拿到的公钥如何证明是James的。

此时就需要引入了**证书颁发机构**`（Certificate Authority，简称CA）`，CA数量并不多，Kobe客户端内置了所有受信任CA的证书。CA对James的公钥（和其他信息）数字签名后生成证书。

# 🍅 解决通信方身份可能被伪装的问题——数字证书

数字证书认证机构处于客户端与服务器双方都可信赖的第三方机构的立场上。

我们来介绍一下数字证书认证机构的业务流程：

- 服务器的运营人员向第三方机构CA提交公钥、组织信息、个人信息(域名)等信息并申请认证;
- CA通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法，是否拥有域名的所有权等;
- 如信息审核通过，CA会向申请者签发认证文件-证书。证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA的信息、有效时间、证书序列号等信息的明文，同时包含一个签名。 其中签名的产生算法：- - 首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA的私钥对信息摘要进行加密，密文即签名;
- 客户端 Client 向服务器 Server 发出请求时，Server 返回证书文件;
- 客户端 Client 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即服务器的公开密钥是值得信赖的。
- 客户端还会验证证书相关的域名信息、有效时间等信息; 客户端会内置信任CA的证书信息(包含公钥)，如果CA不被信任，则找不到对应 CA的证书，证书也会被判定非法。

# 🍅 详解两种加密算法的区别和优缺点

`HTTPS` 解决数据传输安全问题的方案就是使用加密算法，具体来说是混合加密算法，也就是 **对称加密** 和 **非对称加密** 的混合使用，这里有必要先**了解一下这两种加密算法的区别和优缺点**。

## 🍎 对称加密

对称加密，顾名思义就是加密和解密都是使用同一个密钥，常见的对称加密算法有 DES、3DES 和 AES 等，其优缺点如下：

- **优点**：算法公开、计算量小、加密速度快、加密效率高，适合加密比较大的数据
  
- **缺点**：
  
  **1**.交易双方需要使用相同的密钥，也就无法避免密钥的传输，而密钥在传输过程中无法保证不被截获，因此对称加密的安全性得不到保证。
  
  **2**.每对用户每次使用对称加密算法时，都需要使用其他人不知道的惟一密钥，这会使得发收信双方所拥有的钥匙数量急剧增长，密钥管理成为双方的负担。对称加密算法在分布式网络系统上使用较为困难，主要是因为密钥管理困难，使用成本较高。
  

如果直接将对称加密算法用在 HTTP 中，会是下面的效果：

[](https://camo.githubusercontent.com/bc5396255be50228eb008d2e06190bd780ddbf3b0f359e2516d624efda1fb27f/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f35303433653066393031626134656464396436343432343335363734326166652e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

从图中可以看出，被加密的数据在传输过程中是无规则的乱码，即便被第三方截获，在没有密钥的情况下也无法解密数据，也就保证了数据的安全。但是有一个致命的问题，那就是既然双方要使用相同的密钥，那就必然要在传输数据之前先由一方把密钥传给另一方，那么在此过程中密钥就很有可能被截获，这样一来加密的数据也会被轻松解密。那如何确保密钥在传输过程中的安全呢？这就要用到非对称加密了。

## 🍎 非对称加密

非对称加密，顾名思义，就是加密和解密需要使用两个不同的密钥：`公钥(public key)`和`私钥(private key)`。公钥与私钥是一对，如果用公钥对数据进行加密，只有用对应的私钥才能解密；如果用私钥对数据进行加密，那么只有用对应的公钥才能解密。

非对称加密算法实现机密信息交换的基本过程是：甲方生成一对密钥并将其中的一把作为公钥对外公开；得到该公钥的乙方使用公钥对机密信息进行加密后再发送给甲方；甲方再用自己保存的私钥对加密后的信息进行解密。如果对公钥和私钥不太理解，可以想象成一把钥匙和一个锁头，只是全世界只有你一个人有这把钥匙，你可以把锁头给别人，别人可以用这个锁把重要的东西锁起来，然后发给你，因为只有你一个人有这把钥匙，所以只有你才能看到被这把锁锁起来的东西。

常用的非对称加密算法是 RSA 算法，其优缺点如下：

- **优点**：算法公开，加密和解密使用不同的钥匙，私钥不需要通过网络进行传输，安全性很高。
  
- **缺点**：计算量比较大，加密和解密速度相比对称加密慢很多。
  

由于非对称加密的强安全性，可以用它完美解决对称加密的密钥泄露问题，效果图如下：

[](https://camo.githubusercontent.com/1f7e3c2c9edac9fd437c7a5d52e78fccf5f14745f07945abd564fc5d495d9245/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f35393437636663363665663434666262383930656332356333363664303037352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

在上述过程中，客户端在拿到服务器的公钥后，会生成一个随机码 (用 KEY 表示，这个 KEY 就是后续双方用于对称加密的密钥)，然后客户端使用公钥把 KEY 加密后再发送给服务器，服务器使用私钥将其解密，这样双方就有了同一个密钥 KEY，然后双方再使用 KEY 进行对称加密交互数据。在非对称加密传输 KEY 的过程中，即便第三方获取了公钥和加密后的 KEY，在没有私钥的情况下也无法破解 KEY (私钥存在服务器，泄露风险极小)，也就保证了接下来对称加密的数据安全。而上面这个流程图正是 HTTPS 的雏形，HTTPS 正好综合了这两种加密算法的优点，不仅保证了通信安全，还保证了数据传输效率。

# 🍅 HTTPS 加密、解密、验证及数据传输过程

HTTPS 加密、解密、验证及数据传输过程如下图所示`(建议详读下图)`：

[](https://camo.githubusercontent.com/6bc8f1c6ba16346cdc5bfbe5d3d01d5bf8423bd2f64cdee019c1c348cb2da962/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f36316436373161313935333334313534383434666638356262386532346633642e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)

HTTPS 的整个通信过程可以分为两大阶段：证书验证和数据传输阶段，数据传输阶段又可以分为非对称加密和对称加密两个阶段。

具体流程按图中的序号讲解：

1. 客户端请求 HTTPS 网址，然后连接到 server 的 443 端口 (HTTPS 默认端口，类似于 HTTP 的80端口)。
  
2. 采用 HTTPS 协议的服务器必须要有一套数字 CA (Certification Authority)证书，证书是需要申请的，并由专门的数字证书认证机构(CA)通过非常严格的审核之后颁发的电子证书 (当然了是要钱的，安全级别越高价格越贵)。颁发证书的同时会产生一个私钥和公钥。私钥由服务端自己保存，不可泄漏。公钥则是附带在证书的信息中，可以公开的。证书本身也附带一个证书电子签名，这个签名用来验证证书的完整性和真实性，可以防止证书被篡改。
  
3. 服务器响应客户端请求，将证书传递给客户端，证书包含公钥和大量其他信息，比如证书颁发机构信息，公司信息和证书有效期等。Chrome 浏览器点击地址栏的锁标志再点击证书就可以看到证书详细信息。  
  [](https://camo.githubusercontent.com/c2806631a6cea48fbaf725cd0c9305b4ebf8e56af4bcfc611a8938b21807775d/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f31366534323665626463656234303737393232393330303737646337616466352e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)
  
4. 客户端解析证书并对其进行验证。如果证书不是可信机构颁布，或者证书中的域名与实际域名不一致，或者证书已经过期，就会向访问者显示一个警告，由其选择是否还要继续通信。就像下面这样：  
  [](https://camo.githubusercontent.com/e15f76a6b63d4761d849564d13d8ace73c8d924630ec20d096765ccbdc13708d/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f31393063323131623832393134333237393038326237333464343337653236632e706e673f782d6f73732d70726f636573733d696d6167652f77617465726d61726b2c747970655f5a484a766157527a5957357a5a6d467362474a685932732c736861646f775f35302c746578745f51314e4554694241355a7947355a79474d44453d2c73697a655f32302c636f6c6f725f4646464646462c745f37302c675f73652c785f3136)  
  如果证书没有问题，客户端就会从服务器证书中取出服务器的公钥A。然后客户端还会生成一个随机码 KEY，并使用公钥A将其加密。
  
5. 客户端把加密后的随机码 KEY 发送给服务器，作为后面对称加密的密钥。
  
6. 服务器在收到随机码 KEY 之后会使用私钥B将其解密。经过以上这些步骤，客户端和服务器终于建立了安全连接，完美解决了对称加密的密钥泄露问题，接下来就可以用对称加密愉快地进行通信了。
  
7. 服务器使用密钥 (随机码 KEY)对数据进行对称加密并发送给客户端，客户端使用相同的密钥 (随机码 KEY)解密数据。
  
8. 双方使用对称加密愉快地传输所有数据。
  

好了，以上就是 HTTPS 的原理详解了~

# 🍅 HTTP和HTTPS协议的主要区别

[](https://camo.githubusercontent.com/bebf7e84ed39f362af7d760bfc0519623b69fe728bc382caba7220e43713f127/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f37333863643531636635366534313662623138376166376164613738666164662e706e67)

- HTTPS协议需要CA证书，费用较高；而HTTP协议不需要；
- HTTP协议是超文本传输协议，信息是明文传输的，HTTPS则是具有安全性的SSL加密传输协议；
- 使用不同的连接方式，端口也不同，HTTP协议端口是80，HTTPS协议端口是443；
- HTTP协议连接很简单，是无状态的；HTTPS协议是有SSL和HTTP协议构建的可进行加密传输、身份认证的网络协议，比HTTP更加安全
- HTTPS比HTTP对搜索引擎更友好，利于SEO,谷歌、百度优先索引HTTPS网页

# 🍅 为何不是所有的网站都使用HTTPS

既然HTTPS那么安全可靠，那为何不所有的Web网站都使用HTTPS？

首先，很多人还是会觉得HTTPS实施有门槛，这个门槛在于需要权威CA颁发的SSL证书。从证书的选择、购买到部署，传统的模式下都会比较耗时耗力。

其次，HTTPS普遍认为性能消耗要大于HTTP，因为**与纯文本通信相比，加密通信会消耗更多的CPU及内存资源**。如果每次通信都加密，会消耗相当多的资源，平摊到一台计算机上时，能够处理的请求数量必定也会随之减少。但事实并非如此，用户可以通过性能优化、把证书部署在SLB或CDN，来解决此问题。举个实际的例子，“双十一”期间，全站HTTPS的淘宝、天猫依然保证了网站和移动端的访问、浏览、交易等操作的顺畅、平滑。通过测试发现，经过优化后的许多页面性能与HTTP持平甚至还有小幅提升，因此HTTPS经过优化之后其实并不慢。

除此之外，**想要节约购买证书的开销也是原因之一**。要进行HTTPS通信，证书是必不可少的。而使用的证书必须向认证机构（CA）购买。

最后是安全意识。相比国内，国外互联网行业的安全意识和技术应用相对成熟，HTTPS部署趋势是由社会、企业、政府共同去推动的。

#