# react-hichat

HiChat with React &amp; WebSocket &amp; IndexedDB

## Develop

    # 安装依赖
    npm install
    # 运行mongodb
    docker run --name hichat-mongo -p 27017:27017 -v /Users/hollyliu/data/mongo:/data/db -it -d mongo --auth
    docker exec -it hichat-mongo mongo admin
    db.createUser({ user: 'admin', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });


## Technology Stack

* frontend
        
        * React 
        * Flux
        * react-umeditor
        * WebSocket
        * IndexedDB
        
* backend
    
        * MongoDB
        * Expressjs
        * Socket.io

## Todo

- [x] Express `2016-07-01`
- [x] Socket.io `2016-09-11`
- [ ] React
- [ ] MongoDB
- [ ] API
- [ ] WebSocket
