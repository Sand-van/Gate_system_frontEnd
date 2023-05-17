## 项目综述

这是本人门禁系统的前端子项目，基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template) 进行二次开发，使用Vue版本为2.6.10。本人使用VSCode进行代码编写。如果你是从零开始，请看 [学习路径](https://github.com/Sand-van/Gate_system_backEnd/blob/master/学习路径.md)

## 使用方法

1. clone本仓库后使用HbuilderX或者VScode打开
2. 在终端中，本项目的根目录下执行`npm install`,安装依赖包（本人使用的npm版本为8.19.2）
3. 依赖包安装完成后，执行`npm run dev`，将在端口9528启动前端服务器，浏览器中访问即可。（后端服务器的ip地址与端口号、前端服务器启动的端口号均在vue.config.js中修改）

## 项目结构

参考[尚硅谷VUE项目实战，前端项目-尚品汇(大型\重磅)](https://www.bilibili.com/video/BV1Vf4y1T7bw/) p123

## TODO

- [ ] 将每个页面中的组件独立出来，精简结构，可以参考uni-app端是怎么写的
- [ ] token过期问题
- [ ] 升级为websocket，做到及时通知
- [ ] 按钮级权限
- [ ] 我的申请添加修改操作
- [ ] 申请管理，我的申请与我管理的申请的刷新问题
- [ ] 用户详情 修改密码
- [ ] 用户详情 添加通行权限，添加管理权限
- [ ] 给所有的表格添加刷新按钮
