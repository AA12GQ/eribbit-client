# 项目介绍

## [#](https://megasu.gitee.io/erabbit-client-pc-document/guide/01-intro.html#_01-项目介绍)01-项目介绍

> 目的：了解下项目的基本功能。

- 电商发展十余年，是个成熟的模式，小兔鲜儿是 B2C 电商平台，综合品类平台。
- 平台理念：（品质）新鲜、（价格）亲民、（物流）快捷。

![1616248027640](https://megasu.gitee.io/erabbit-client-pc-document/assets/img/1616248027640.e3494754.png)

目标功能：

- 首页模块：顶部通栏，吸顶导航，网站头部，左侧分类，轮播图，新鲜好物，人气推荐，热门品牌，分类商品推荐，专题推荐，网站底部。
- 一级分类：面包屑，轮播图，全部二级分类，二级分类推荐商品。
- 二级分类：筛选区域，排序功能，商品列表，无限加载。
- 商品详情：商品图片展示，基本信息展示，配送城市选择，SKU 选择，库存选择，商品详情展示，商品评价展示，24 小时热销，相关专题，加入购物车。
- 购物车
  - 头部购物车：展示商品数量和列表，删除商品，跳转购物车页面。
  - 购物车页面：购物车商品展示，选择商品，修改数量，修改商品规格，价格计算，跳转下单
- 登录模块：表单校验，账户密码登录，手机号登录，第三方登录，绑定手机，完善信息
- 填写订单：订单商品展示，收货地址选择，收货地址修改，支付方式选择，生成订单。
- 进行支付：订单信息展示，跳转支付网关，提示正在支付，等待支付结果，跳转支付成功页面。
- 个人中心
  - 中心首页：展示个人信息，近期收藏商品，近期足迹，猜你喜欢
  - 订单管理：全部订单，待付款，待发货，待收货，待评价，已完成，已取消。立即付款，取消订单，确认收货，删除订单，查看物流。
  - 订单详情：订单状态，订单进度，详细信息。

总结：完成电商支付闭环。

> 目的：概述下项目会运用到的技术点。

项目基于 vue 技术来实现，会使用以下技术：

- [vue3.0 (opens new window)](https://v3.cn.vuejs.org/guide/introduction.html)(使用组合 api 的方式来开发)
- [vue-cli (opens new window)](https://cli.vuejs.org/zh/guide/)(项目脚手架)
- [axios (opens new window)](https://axios-http.com/zh/docs/intro)(请求接口)
- [vue-router (opens new window)](https://next.router.vuejs.org/zh/guide/)(单页路由)
- [vuex (opens new window)](https://next.vuex.vuejs.org/zh/index.html)(状态管理)
- [vuex-persistedstate (opens new window)](https://www.npmjs.com/package/vuex-persistedstate)(vuex 数据持久化)
- [normalize.css (opens new window)](https://www.npmjs.com/package/normalize.css)(初始化样式)
- [@vueuse/core (opens new window)](https://vueuse.org/functions.html)(组合 api 常用工具库)
- [Power Set (opens new window)](https://gitee.com/Megasu/javascript-algorithms/tree/master/src/algorithms/sets/power-set)(幂集算法)
- [dayjs (opens new window)](https://dayjs.gitee.io/zh-CN/)(日期处理)
- [vee-validate (opens new window)](https://www.npmjs.com/package/vee-validate)（表单校验）

**重点：** 电商常见业务和解决方案，掌握基于 vue3.0 的组合 api 开发模式。

**说明：** 由于小兔鲜儿是前台项目，没有合适的 UI 组件库（没有适用 vue3.0 的 ui 库），所有组件基本自己封装。

- 轮播图组件
- 面包屑组件 render+createVnode
- 查看更多组件
- 骨架屏组件
- 复选框组件
- 单选框组件
- 对话框组件
- 消息提示组件 函数调用
- 消息确认组件 函数调用
- 分页组件
- 步骤条组件
- 时间线组件
- 标签页组件 render + jsx
- 城市选择组件

总结：基于 vue3.0 的技术栈，自己封装一个 Vue3 组件封装。项目介绍

## [#](https://megasu.gitee.io/erabbit-client-pc-document/guide/01-intro.html#_01-项目介绍)01-项目介绍

> 目的：了解下项目的基本功能。

- 电商发展十余年，是个成熟的模式，小兔鲜儿是 B2C 电商平台，综合品类平台。
- 平台理念：（品质）新鲜、（价格）亲民、（物流）快捷。

![1616248027640](https://megasu.gitee.io/erabbit-client-pc-document/assets/img/1616248027640.e3494754.png)

目标功能：

- 首页模块：顶部通栏，吸顶导航，网站头部，左侧分类，轮播图，新鲜好物，人气推荐，热门品牌，分类商品推荐，专题推荐，网站底部。
- 一级分类：面包屑，轮播图，全部二级分类，二级分类推荐商品。
- 二级分类：筛选区域，排序功能，商品列表，无限加载。
- 商品详情：商品图片展示，基本信息展示，配送城市选择，SKU 选择，库存选择，商品详情展示，商品评价展示，24 小时热销，相关专题，加入购物车。
- 购物车
  - 头部购物车：展示商品数量和列表，删除商品，跳转购物车页面。
  - 购物车页面：购物车商品展示，选择商品，修改数量，修改商品规格，价格计算，跳转下单
- 登录模块：表单校验，账户密码登录，手机号登录，第三方登录，绑定手机，完善信息
- 填写订单：订单商品展示，收货地址选择，收货地址修改，支付方式选择，生成订单。
- 进行支付：订单信息展示，跳转支付网关，提示正在支付，等待支付结果，跳转支付成功页面。
- 个人中心
  - 中心首页：展示个人信息，近期收藏商品，近期足迹，猜你喜欢
  - 订单管理：全部订单，待付款，待发货，待收货，待评价，已完成，已取消。立即付款，取消订单，确认收货，删除订单，查看物流。
  - 订单详情：订单状态，订单进度，详细信息。

总结：完成电商支付闭环。

## [#](https://megasu.gitee.io/erabbit-client-pc-document/guide/01-intro.html#_03-使用技术)03-使用技术

> 目的：概述下项目会运用到的技术点。

项目基于 vue 技术来实现，大概会使用以下技术：

- [vue3.0 (opens new window)](https://v3.cn.vuejs.org/guide/introduction.html)(使用组合 api 的方式来开发)
- [vue-cli (opens new window)](https://cli.vuejs.org/zh/guide/)(项目脚手架)
- [axios (opens new window)](https://axios-http.com/zh/docs/intro)(请求接口)
- [vue-router (opens new window)](https://next.router.vuejs.org/zh/guide/)(单页路由)
- [vuex (opens new window)](https://next.vuex.vuejs.org/zh/index.html)(状态管理)
- [vuex-persistedstate (opens new window)](https://www.npmjs.com/package/vuex-persistedstate)(vuex 数据持久化)
- [normalize.css (opens new window)](https://www.npmjs.com/package/normalize.css)(初始化样式)
- [@vueuse/core (opens new window)](https://vueuse.org/functions.html)(组合 api 常用工具库)
- [Power Set (opens new window)](https://gitee.com/Megasu/javascript-algorithms/tree/master/src/algorithms/sets/power-set)(幂集算法)
- [dayjs (opens new window)](https://dayjs.gitee.io/zh-CN/)(日期处理)
- [vee-validate (opens new window)](https://www.npmjs.com/package/vee-validate)（表单校验）

**重点：** 电商常见业务和解决方案，掌握基于 vue3.0 的组合 api 开发模式。

**说明：** 由于小兔鲜儿是前台项目，没有合适的 UI 组件库（没有适用 vue3.0 的 ui 库），所有组件基本自己封装。

- 轮播图组件
- 面包屑组件 render+createVnode
- 查看更多组件
- 骨架屏组件
- 复选框组件
- 单选框组件
- 对话框组件
- 消息提示组件 函数调用
- 消息确认组件 函数调用
- 分页组件
- 步骤条组件
- 时间线组件
- 标签页组件 render + jsx
- 城市选择组件

总结：基于 vue3.0 的技术栈，自己封装一个 Vue3 组件封装。

![node-current](https://img.shields.io/node/v/next) ![npm](https://img.shields.io/npm/v/n) ![npm (tag)](https://img.shields.io/npm/v/vue/next?color=green&label=vue)

> [演示地址](http://42.192.3.136:8082/#/)
