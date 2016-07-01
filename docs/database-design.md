## 群/多人对话表

* group_id 组id
* group_type 组类型
* group_name 组名
* group_no 群号 `用于搜索`
* group_description 组的描述
* group_remove 组是否被解散
* group_users 组的用户 `["xxx-xxx","xxx-xxx"]`
* update_dt 群/多人对话表更新时间
* create_dt 群/多人对话表创建时间

注：

1. 多人会话只剩两人时，有一人退出会话，则会话解散。
2. 群可以搜到，多人会话不能被搜索到。

## 群消息表

* msg_id 消息id
* group_id 组id
* msg_content 消息内容
* msg_date 消息时间

## 用户表

* user_id 用户id
* user_type 用户类型
* user_name 用户名
* user_no 用户号 `用于搜索`
* user_description 用户的描述
* user_pwd 用户密码
* user_groups 用户的组 `["xxx-xxx","xxx-xxx"]`
* user_friends 用户的好友  `["xxx-xxx","xxx-xxx"]`
* upadte_dt 用户表更新时间
* create_dt 用户表创建时间

## 两人对话消息表

* msg_id 消息id
* user_friends 两人对话的用户 `["xxx-xxx","xxx-xxx"]`
* msg_content 消息内容
* msg_date 消息时间
* user_id 发送者

## 注：

**数据加载顺序**

1. 获取用户信息
2. 获取用户组信息
3. 获取用户好友信息
4. 获取用户组上次缓存点的数据
5. 获取用户好友上次缓存点的数据

**实时消息发送和接收**

1. 注册监听频道，组和好友
2. 好友或组发送实时消息
3. 判断是否刚刚上线，如果是，重新抓取最新的数据
4. 如果不是，则直接更新消息

** 断线与恢复判断 ** 

1. 浏览器端监听网络状态
2. 浏览器端监听socket事件
3. 断线，重置用户状态为离线
4. 恢复，重新抓取最新的数据


