## 获取页面初始化所有消息

- **所属模块**

	消息管理

- **功能描述**

	获取页面初始化所有消息，用作数据同步。

- **请求URL**

	POST `/api/msg/all`

- **请求示例**

	```js
	{
		"friends_msg":{
			"start_date":new Date().valueOf(),
			"end_date":new Date().valueOf()
		},
		"groups_msg":{
			"start_date":new Date().valueOf(),
			"end_date":new Date().valueOf()
		}
	}
	```

- **请求参数说明**

	- friends_msg.start_date 本地存储的好友消息的开始时间
	- friends_msg.end_date 本地存储的好友消息的结束时间
	- groups_msg.start_date 本地存储的分组消息的开始时间
	- gruops_msg.end_date 本地存储的分组消息的结束时间

- **返回示例**

	```js
	{
		"status":200,
		"msg":"success",
		"data":{
			"friends_msg":[{
				msg_id:"xxx-xxx",
				user_friends:["xxx-xxx","xxx-xxx"],
				msg_content: "xxx",
				msg_date: new Date().valueOf(),
				user_id: "xxx"
			}],
			"groups_msg":[{
				msg_id:"xxx-xxx",
				group_id:"xxx-xxx",
				msg_content: "xxx",
				msg_date: new Date().valueOf(),
				user_id: "xxx"
			}]
		}
	}
	```

- **响应参数说明**

	- status 200 成功
	- msg  消息
	- data.friends_msg.msg_id 消息id
	- data.friends_msg.user_friends 频道
	- data.friends_msg.msg_content 消息内容
	- data.friends_msg.msg_date 消息时间
	- data.friends_msg.user_id 消息发送者
	- data.groups_msg.msg_id 消息id
	- data.groups_msg.user_friends 频道
	- data.groups_msg.msg_content 消息内容
	- data.groups_msg.msg_date 消息时间
	- data.groups_msg.user_id 消息发送者

- **备注**

	(无)
	
## 获取用户信息

- **所属模块**

	用户管理

- **功能描述**

	获取用户信息。

- **请求URL**

	GET `/api/user`

- **请求示例**

	(无)

- **请求参数说明**

	(无)

- **返回示例**

	```js
	{
		"status":200,
		"msg":"success",
		"data":{
			user_id: "xxx-xxx",
			user_type: "user",
			user_name: "xxx",
			user_no: "284362",
			user_description: "我是一名热爱计算机科学的人",
			user_groups: ["xxx-xxx","xxx-xxx"],
			user_friends: ["xxx-xxx","xxx-xxx"],
			update_dt: new Date().valueOf(),
			create_dt: new Date().valueOf()
		}
	}
	```

- **响应参数说明**

	- status 200 成功
	- msg  消息
	- data.user_id 用户id

- **备注**

	(无)
	
## 注册用户

- **所属模块**

	用户管理

- **功能描述**

	注册用户信息。

- **请求URL**

	POST `/api/user`

- **请求示例**

	{
		user_type: "user",
		user_name: "xxx",
		user_no: "284362",
		user_description: "我是一名热爱计算机科学的人",
	}

- **请求参数说明**

	- user_type 用户类型
	- 

- **返回示例**

	```js
	{
		"status":200,
		"msg":"success",
		"data":{
			user_id: "xxx-xxx"
		}
	}
	```

- **响应参数说明**

	- status 200 成功
	- msg  消息
	- data.user_id 用户id

- **备注**

	(无)
## 新建群
## 添加好友
## 添加群
## 创建多人对话