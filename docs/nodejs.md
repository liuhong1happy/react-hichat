# win7下安装nodejs

1. 去官网下载最新的msi安装包，官网[地址](https://nodejs.org/en/)

2. 安装完成后，打开cmd，输入`node -v`查看当前版本号，输入`npm -v`查看npm包管理工具的版本号。

3. 设置淘宝npm镜像库

        npm config set registry "http://registry.npm.taobao.org"