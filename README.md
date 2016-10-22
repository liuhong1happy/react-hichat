# react-hichat

HiChat with React &amp; WebSocket &amp; IndexedDB

## Develop

    # 安装依赖
    npm install
    # 运行mongodb
    docker run --name hichat-mongo -p 27017:27017 -v /Users/hollyliu/data/mongo:/data/db -it -d mongo --auth
    docker exec -it hichat-mongo mongo admin
    db.createUser({ user: 'admin', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });
    # 运行server
    npm run server
    # 运行dev server
    npm start
    # 打包压缩并拷贝的生产环境目录
    npm run build