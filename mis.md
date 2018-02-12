#   *MIS*

前端
-
* 首页查询页
&nbsp;&nbsp;&nbsp;&nbsp;首页用户输入手机号，点击查询按钮；
>**&nbsp;&nbsp;&nbsp;&nbsp;*index.jsp***

* 列表显示页
&nbsp;&nbsp;&nbsp;&nbsp;列表页显示用户的记录信息，以列表呈现；用户可点击单条查看，也可选中多条点击打印按钮；
>**&nbsp;&nbsp;&nbsp;&nbsp;*result_list.jsp***

* 打印页面
&nbsp;&nbsp;打印页面在列表页弹出呈现，显示用户选择都记录详情。用户可点击确认打印或取消按钮选择打印信息或取消本次操作。
>**&nbsp;&nbsp;&nbsp;&nbsp;*print.jsp***

后端
-
* 数据库查询
&nbsp;&nbsp;&nbsp;&nbsp;后端收到用户请求后，查询数据库中对应该用户的信息，以列表的json格式返回。
>***api.js***

表设计
-
* 用户信息表
用户信息表当前字段：
1) id：用户记录的唯一性标识。自增主键，最多容纳1亿条记录。(bigint(8) primary key auto_increment)
2) pid：用户手机号。(bigint(15) not null index pid_index)
3) detail_info：用户详细信息。(varchar(512) default null)
4) timestamp：时间戳。(bigint(10) default 0)

```mysql
CREATE TABLE `mis_info` (
  `id` bigint(8) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `pid` bigint(15) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户手机号',
  `detail_info` varchar(512) COLLATE utf8_unicode_ci DEFAULT '' COMMENT '用户详情',
  `timestamp` varchar(10) COLLATE utf8_unicode_ci DEFAULT '0' COMMENT '时间戳',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_pid` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';
```