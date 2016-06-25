# win7安装MongoDB服务

  1. 下载MongoDB的windows版本，下载[地址](https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.7-signed.msi)。
  
  2. 安装成功后路径在：`C:\Program Files\MongoDB\Server\3.2`，在`C:\Program Files\MongoDB\Server\3.2`下创建db目录和logs目录，用来存数据文件和日志。
  
  3. 新建环境变量`mongodb_home`，值为`C:\Program Files\MongoDB\Server\3.2`，在`Path`里添加 `%mongodb_home%\bin`;
  
  4. 在`%mongodb_home%`目录创建`mongo.conf`文件，配置`dbpath`和`logpath`等信息：
  
        dbpath = C:\Program Files\MongoDB\Server\3.2\db  
        logpath = C:\Program Files\MongoDB\Server\3.2\logs\mongodb.log   
        port = 27017  
        logappend = true  
        
5. 在`%mongodb_home%\bin`目录执行安装`mongod`服务的命令(如果执行了步骤3后并重启过电脑，可以直接在CMD中运行mongod命令)：

        mongod --config C:\Program Files\MongoDB\Server\3.2\mongo.conf   --serviceName MongoDB --install
        
    PS：如果此命令不能正常启动， 就改为以管理员身份启动CMD窗口。
    
6. 启动MongoDB服务：
    
        net start MongoDB
        
6.  mongoDB的端口为27017， 在浏览器访问 http://localhost:27017， 会输出提示：

    It looks like you are trying to access MongoDB over HTTP on the native driver port.
    
7. 打开CMD输入`mongo`，提示：

        2015-07-09T22:24:21.791+0800 I CONTROL  [thread1] Hotfix KB2731284 or later upda  
        te is not installed, will zero-out data files  
        MongoDB shell version: 3.1.4  
        connecting to: test  
        Server has startup warnings:  
        2015-07-09T22:18:28.395+0800 I CONTROL  [initandlisten]  
        2015-07-09T22:18:28.395+0800 I CONTROL  [initandlisten] ** NOTE: This is a devel  
        opment version (3.1.4) of MongoDB.  
        2015-07-09T22:18:28.395+0800 I CONTROL  [initandlisten] **       Not recommended  
         for production.  
        2015-07-09T22:18:28.395+0800 I CONTROL  [initandlisten]  
        
8.  查看`MongoDB`日志， 在`C:\Program Files\MongoDB\Server\3.2\logs`目录下， 存着`MongoDB`的操作日志，可对mongDB的运行情况进行查看或排错。

9.  操作命令：

    启动MongoDB：net start MongoDB
    停止MongoDB：net stop MongoDB
    删除MongoDB：sc delete MongoDB

10. 设置数据库管理账号

        mongo
        use admin
        db.createUser({user: "mongo",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
        db.auth("mongo","123456")
        exit
        mongo admin -u mongo -p 123456
        

