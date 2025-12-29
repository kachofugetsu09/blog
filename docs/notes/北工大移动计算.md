---
outline: default
---
## Overview
### 手机平台特点
1. 一个设备承担了非常多的功能，非常多的传感器（摄像，平衡仪，温度，地磁.... ）
2. 手机是一个绝对私人的设备（不涉及类似服务器或者主机的共享资源）
3. 手机的各种资源都非常有限（CPU， 内存， 储存， 电量）
4. 手机代替钱包，成为随身携带的物品和支付方式
5. 越来越多的功能都能被手机的OS承担
### 安卓（Android）
安卓开源，并且有商业友好的license，这让大商业公司可以直接使用和修改系统来满足业务需要

#### 安卓技术栈
- 安卓应用
- 安卓应用框架（阿帕奇基金会的java兼容库）
- 库和中间件
- Linux 内核
#### 安卓硬件组成
| 组件                   | 主要功能                     |
| -------------------- | ------------------------ |
| **CPU**              | 执行系统与应用代码；多为 ARM 架构      |
| **Modem/Radio**      | 连接移动网络，实现语音与数据传输         |
| **RAM**              | 易失性存储，用于系统与应用运行          |
| **NAND Flash**       | 非易失存储，用于系统、用户数据保存        |
| **GPS**              | 利用卫星定位，支持地图与导航           |
| **WiFi / Bluetooth** | 无线连接外部设备与网络              |
| **SD 卡**             | 可移除、非易失存储，用于大文件          |
| **屏幕**               | 用户主要交互界面（LCD/OLED + 触控层） |
| **相机**               | 前后摄像 + GPS 标注地理坐标        |
| **键盘**               | 屏幕虚拟键盘，可自动旋转适配方向         |
#### 安卓应用分发渠道
Google play商店以及各个平台的第三方应用商店

#### 安卓成功的原因
##### **对用户**
- 价格层次丰富、可选范围大。
- 与 Google 服务（搜索、Gmail、地图、YouTube）深度整合。
- 应用生态极其庞大。
##### **对制造商**

- “**Better than free**”：免费系统 + 强大支持 = 高吸引力。
- 可自定义 UI，提供差异化体验。
##### **对开发者**

- 高自由度，无需冗长审核流程。
- 工具齐全、费用低廉、SDK 优秀。
- 允许创新与快速上线。

### 安卓的架构
#### **进程与线程管理**
- 每个 App 独立运行在自己的进程中。
- 每个 App 拥有独立 UID/GID。
- 每个 App 拥有独立 Dalvik/ART 虚拟机实例。
- 应用间进程隔离，**单个崩溃不会影响系统整体稳定性**。
- 内核（Kernel）负责安全管理与进程调度。
#### 安卓应用的四大组件（Building block） 
| **组件**               | **功能说明**                          |
| -------------------- | --------------------------------- |
| **Activity**         | 用户界面组件（相当于窗口/界面）                  |
| **Content Provider** | 数据共享组件（跨应用访问数据）                   |
| **Service**          | 后台任务（无界面）                         |
| **Intent**           | 系统级消息（communication）机制（事件广播与组件通信） |
<blockquote>安卓应用模型鼓励跨应用共享数据，因此一个使用content provider可以管理你自己的应用数据，也能别的应用访问你的应用数据，实现共享</blockquote>
### 安卓应用的架构

| **文件/文件夹**              | **功能**              |
| ----------------------- | ------------------- |
| **AndroidManifest.xml** | 应用配置文件（核心）          |
| **/src/**               | 源代码目录（Java/Kotlin）  |
| **/res/**               | 静态资源文件夹（图片、布局、文本）   |
| **/libs/**              | 外部库依赖               |
| **/bin/**               | 编译生成的二进制文件          |
| **/gen/**               | 自动生成的 R.java 资源索引文件 |
| **/assets/**            | 原始数据资源（不会被编译）       |
| **/tests/**             | 测试用例                |
在Android Manifest.xml中，你需要列出
1. 应用的全部services和activities
2. 这个应用在系统内的定位（你是什么种类的应用（比如你是浏览器，选择浏览器打开时，列表里就是你和chrome））
3. 应用的系统需求，版本号
4. 这个应用需要哪些权限，库和依赖
5. 
**其他资源文件：**
- **strings.xml**：定义文本常量。
- **colors.xml**：定义颜色（十六进制 #RRGGBB）。
- **dimens.xml**：定义尺寸（dp/sp）。
- **styles.xml**：定义主题与样式。
在src中包含着所有基本的资源文件

**剩下的都是第二课ppt的东西，懒得写了，跳了，愿意的可以去看Limboo的笔记**.  
[链接](https://lim-blog-rho.vercel.app/notes/%E5%85%B6%E4%BB%96/%E5%8C%97%E5%B7%A5%E5%A4%A7%E5%AE%89%E5%8D%93%E5%BC%80%E5%8F%91.html#%E8%BF%9E%E6%8E%A5%E4%BB%A3%E7%A0%81%E4%B8%8E%E5%B8%83%E5%B1%80-xml)

### 四大组件
#### Activity
##### 生命周期（Lifecycle）
一个安卓应用的生命周期
```
Active(运行)
	|
Paused （暂停，主要用在还在主界面但是失去焦点的情况，比如弹出一个对话框）
	｜
Stopped (运行的程序还没有被杀掉，但是被放到了后台，主页面是其他activity)
	｜
dead  （没有启动过或者因为内存不足而被杀进程了）
```
也就是说一个安卓应用在active以外大致可分为两个流程，一个启动流程一个销毁流程
启动流程：
onCreate（创建 Activity，加载布局、数据） 
→ onStart (Activity 可见但未获得焦点，在create和restart之后会被call)/ onRestart（从stop状态中restart后被call）
→ onResume （进入焦点，可以互动）（从pause中恢复后会被call）
销毁流程：
onPause（失去焦点） 
→ onStop （进入后台，不可见）
→ onDestroy （进程被关闭，内存释放）

因为安卓应用经常会在多个状态（pause，start等）间切换，那么开发者就不应该让用户感觉到明显的状态切换，确保体验的一致性。 并且应当在比如说`onPause（）`被唤起的时候保存一些临时数据，这样可以用`onResume()`来恢复数据，或者使用`onSaveInstanceState（）`保存整体状态，这样可以在系统杀内存或者普通的销毁activity之后`onRestoreInstanceState()`恢复所有的数据，保证用户状态的一致性。

安卓系统有Back stack存储所有的没有销毁的activity，对于管理activity有四种模式
```
Standard： 每次都创建新实例
Single Top： 如果现在栈顶是要创建的实例，就复用，不然就创建新的
Single Task： 查找整个栈，没找到才创建新的
Single Instance：一个应用自己占一个栈，不共享，适合全屏应用
```
> 应该不是很重要，老师都没展开讲

##### Fragment（如果意译的话应该是组件）
Fragment是安卓3引入的一个可复用的，可拆卸的UI组件
Fragment 有独立的生命周期，但是依赖于activity， 需要嵌入到activity里展现。
**作用**： 方便在不同的屏幕尺寸重用同一个Fragment，让UI变得模块化
example：老师ppt里的这个就很形象
![](/image/mobileComputingExample1.png)
Fragment的生命周期跟一个activity很像

| **方法**                       | **说明**                                        |
| ---------------------------- | --------------------------------------------- |
| 创建                           |                                               |
| onAttach()                   | Fragment 绑定到 Activity                         |
| onCreateView()               | 创建界面（类似 Activity 的 onCreate，pause/stop的恢复后方法） |
| onViewCreated()              | 视图创建完成，可绑定数据                                  |
| onStart() / onResume()       | 进入可见 / 可交互状态                                  |
| 销毁流程                         |                                               |
| onPause() / onStop()         | 暂停或隐藏                                         |
| onDestroyView() / onDetach() | 销毁并解除绑定                                       |
Fragment的管理：
`getFragmentManager()`可以创建一个管理fragment的组件
使用Fragment manager可以
- 查找 `findFragmentById()`,`findFragmentByTag()`
- 移除: `popBackStack()`
- 监听栈: `addOnBackStackChangedListener()`
Fragment transaction是一个负责栈里增，删，替换fragment的组件，使用fragment manager 创建
具体用法有点类似数据库的session， 在`add()`,`remove()`或者`replace()`之后需要先把操作加入栈`addToBackStack(null)` 然后提交`commit()`.
Fragment使用`getActivity()`可以获得宿主activity对象， Activity使用`getFragmentManager`后可以使用对应的查找方法找到Fragment。
##### Layout 和 View
View就是所有显示内容的单元，负责在屏幕上绘制内容
Layout（ViewGroup）是view的容器，是管理view的结构。主要负责的是view的布局
常见的Layout布局

|**布局类型**|**特点**|
|---|---|
|**LinearLayout**|按水平或垂直方向线性排列|
|**RelativeLayout**|相对位置布局（相对父元素或兄弟元素）|
|**ConstraintLayout**|现代布局方式，基于约束线的高效布局|
|**FrameLayout**|简单叠放式布局，常用于 Fragment 容器|
|**GridLayout / TableLayout**|表格或网格排列|
构建layout的方式

| **方面**           | **XML Layout**                                            | **Jetpack Compose**                           |
| ---------------- | --------------------------------------------------------- | --------------------------------------------- |
| **范式（Paradigm）** | 命令式（imperative）——在 XML 中描述 UI 结构，再由 Java/Kotlin 操控 UI 状态。 | 声明式（declarative）——使用 Kotlin 代码直接描述界面随状态变化的样子。 |
| **开发效率**         | 依赖 XML 与 Java/Kotlin 分离，修改需在 layout 文件与 Activity 间切换。     | 所有 UI 逻辑集中在 Kotlin 函数中，**代码更简洁、可组合性强**。       |
| **状态管理**         | 手动 findViewById 、数据绑定复杂。                                  | 自动响应式更新（recomposition），随 state 变化自动刷新界面。      |
| **UI 复用性**       | 通过 include 或 fragment 引用布局文件。                             | 通过 Composable 函数复用，灵活性更高。                     |
| **可视化支持**        | Android Studio 布局编辑器成熟，设计师-开发协作方便。                        | 预览支持 (@Preview) 良好，但可视化编辑仍在完善中。               |
| **学习成本**         | 生态成熟、资料多。                                                 | 新框架、需理解 Kotlin 与声明式思想。                        |
| **兼容性**          | 可用于所有现有项目（长期主流）。                                          | 向后兼容性逐步完善，可与 XML 混用。                          |

使用XML的优势：
- 可视化编辑成熟，可以不用代码进行设计
- 将代码和UI分开

将布局插入activity中
在初始化布局`onCreate()`时使用`setContentView(R.layout.sth)`就行
#### Intent
Intent是一种信息传输机制， 它可以启动activity， 启动service或者全局广播一个消息
它有两种类型，分别是显式的Intent和隐式的Intent
显式：指定service或则activity的类名
使用`startService()`和`startActivity()`启动
```
Intent intent = new Intent(MyActivity.this, targetActivity.class)
startActivity(intent)
```
隐式： 只声明要干的事情，由系统或者其他的app分配处理的组件
```
new Intent(Intent.ACTION_VIEW, Uri.parse("http://google.com"))
```
若需返回结果（如拍照后返回照片路径），用

```
startActivityForResult(intent, requestCode); //这里使用request code来标识这个activity
```

这样可以开启一个子activity，子 Activity 可调用 `setResult(RESULT_OK, data) `返回数据。

但是这种开启子activity的方法也有缺点，比如requestCode需要是独特的，如果在后面程序复杂了之后可能会出现重复，难以管理，而且当activity或者fragment重启（Recreated）之后，有可能丢失掉之前的关联。

因此安卓加入了新的更现代的`Activity Result APIs`和`ActivityResultContracts`来创建和管理

> 这个感觉老师也没咋展开，提一嘴就行
##### Intent 的参数表

看看功能就行

| **参数**        | **含义**                        |
| ------------- | ----------------------------- |
| **Action**    | 动作，如 ACTION_VIEW, ACTION_SEND |
| **Category**  | 类别，如 DEFAULT, LAUNCHER        |
| **MIME Type** | 数据类型，如 text/plain, image/*    |
| **Component** | 目标组件类                         |
| **Extras**    | 附加数据（Bundle 对象）               |
##### Intent Routing（路由过程）
系统决定哪个组件响应 Intent 的逻辑：
1. 必须匹配 action；
2. 必须支持指定的 MIME 类型；
3. 必须包含所有 category；
4. 若多个匹配，系统会让用户选择（如“用地图或浏览器打开”）。
默认选项可在设置中更改
##### Intent Filters（意图过滤器）

在一个activity中可以用`<intent-filter>`标签来定义一个意图过滤器，告知系统自己可以处理什么Intent，这样这个应用就相当于在系统上注册了。
样例

```xml
<activity android:name=".ViewActivity">
<intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<data android:mimeType="text/plain" />
</intent-filter>

// 想要声明新的过滤器，只需要在<activity>标签中添加<intent-filter>标签
<intent-filter>
<action android:name="android.intent.action.VIEW" />
<category android:name="android.intent.category.DEFAULT" />
<data android:mimeType="image/*" />
</intent-filter>
</activity> 
```

> 老师这里有一个注释是同时声明activity和intent-filter是新手常见错误，我将其理解成每次都重新声明activity和intent-filter
##### Boardcast receiver （广播接收器）

可以使用boardcast receiver来监听系统广播，比如开机，收到电话短信和网络变化

它可以是静态的也可以是动态的

| 类型                 | 特点                       | 注册方式                                          |
| ------------------ | ------------------------ | --------------------------------------------- |
| **静态接收器（Static）**  | 在 Manifest 中声明，应用关闭也能触发。 | `<receiver android:name=".MyReceiver" />`     |
| **动态接收器（Dynamic）** | 在代码中注册，只在应用运行时有效。        | `registerReceiver()` 与 `unregisterReceiver()` |
> Android 限制动态广播接收器的使用以节省电池

##### 生命周期
- 接收器是短暂的（**只存活于 `onReceive()` 执行期间**）；
- 执行完毕即被销毁；
- 若在 `Service` 或 `Activity` 内实现，需要手动注册与反注册；
- 否则会造成内存泄漏

代码：
```java
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "Device booted", Toast.LENGTH_SHORT).show();
    }
}
```
xml方法：
```xml
<receiver android:name=".BootReceiver">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
</receiver>
```

#### Services
**Service** 是一种在后台执行长时间操作的应用组件。
- 它 **没有用户界面（UI）**。
- 可由其他组件通过 API 或 IPC（进程间通信）启动。
- 默认运行在应用的 **主线程（Main Thread）**，因此通常需要使用：
    - `HandlerThread`
    - `AsyncTask`
    - 或显式创建新线程。

##### 为什么需要Service？
因为如果应用只有activity，那么当离开主界面的时候，播放的音乐，导航什么的就断了，因此后台任务的需求导致了Service 的出现。

##### Service 主要有三种类型和几个主要方法

- `onCreate()`：首次创建时调用
- `onStartCommand()`：启动服务时调用
- `onBind()`：绑定到服务时调用
- `onDestroy()`：销毁时调用

| 类型                  | 启动方式                                 | 生命周期                                    | 特点                |
| ------------------- | ------------------------------------ | --------------------------------------- | ----------------- |
| **Started Service** | `startService()`                     | 独立运行直到调用 `stopService()` 或 `stopSelf()` | 不返回结果给启动者         |
| **Bound Service**   | `bindService()`                      | 与调用者绑定，当所有绑定解除后销毁                       | 提供客户端-服务端接口，可双向通信 |
| **混合型服务**           | 同时实现 `onStartCommand()` 与 `onBind()` | 既可独立运行，也可被绑定使用                          |                   |

以下代码可以实现简单的service 启停
```
startService(new Intent(this, OurService.class));
stopService(new Intent(this, OurService.class));
```

##### Frontground Service（前台服务）
**前台服务**是一种用户明确知道并且可互动的服务类型，比如音乐，导航
```
startForeground();
stopForeground();
```
长时间运行在后台而没有前台标识的服务会被系统杀掉，因此需要在前台显示一个通知，来保证运行。

##### 光有一个线程是不够的
因为Service是默认和activity一个**主线程**的，因此只能干一个后台的事情，如果要干一个比较耗时的任务（下载大文件）同时听歌还要看activityUI，那么就会三个抢一个主线程，然后卡住，因此运行service经常伴随着开多个线程，这时候就需要线程管理器了

##### IntentService
这个东西是一个自动线程管理器（栈类似），只要你把想干的任务写进去，它就能自动在运行的时候顺序执行任务，分配线程，结束时再关掉。是不是很方便，类似电脑端的自动多线程管理。
##### WorkManager
对于长线后台工作来可以使用Workmanager来调度进程，规划工作，创建service。这个是一个调度框架（类似于系统级api），让系统安排线程工作。系统安排的优点就是任务最终能保证执行，缺点是交给系统时间上就没准了。（不保证immediately）

> 乍一看这个东西似乎很意义不明，因为开发者已经有IntentService这个组件了，为什么还需要用着这么一个不能保证及时处理任务的东西来调度任务。

实际上这个不是一个进步，而是个妥协，是把功能收回到系统管理
到了Android 8之后，系统对于后台service的限制很激进，为了省电会直接把没专门标记前台的service直接杀掉（骗你的，标记了也杀，其实标了前台只是优先级很高），而IntentService也是一个service。因此到了8之后必须走WorkManager这个api扔给系统后才能执行任务

##### Alarm Manager
这个东西可以设置一个定时任务（恰如其名alarm）。
激活时会触发一个 **Intent**，执行关联操作。
> api18以前，可以设定详细时间`setExact()`，后来系统为了省电就把这个玩意删了（  
> 现在变成几个邻近定时任务绑一块触发了（会误差几秒以内）

关机后重启定时任务会丢失
要用在manifest里注册一个监听重新设定Alarm manager
```
<receiver android:name=".RunOnBootToSetupAlarms"> // 当接收到下面的intent时候运行指向的文件
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>  // 定义要接受的intent是BOOT_COMPLETED 消息
    </intent-filter>
</receiver>
```

#### Content Provider

Content Provider（内容提供者） 是 Android 用于在不同应用之间共享数据的标准接口。
- 封装了安卓系统操作，访问数据的逻辑
- 允许跨应用安全访问数据
- 生命周期由系统管理

注意： content provider只是一个api，它的内在逻辑由软件开发者来确定，比如储存哪种数据类型（datastorage中的四种类型）或者具体CRUD的实现

##### Native Content Provider （系统自带的content provider）
系统自带的content provider也就是全局可用的数据
- CallLog（通话记录）
- Contacts（联系人）
- MediaStore（媒体文件）
- Settings（系统设置）
- UserDictionary（用户字典） 

只要应用在使用时声明权限就可以访问,语句example：  
```
<uses-permission android:name="android.permission.READ_CONTACTS"/>
```

##### 访问content provider- content resolver
content resolver是系统定义的content provider的访问接口，他可以访问content provider的数据，并且可以定义自己的查询条件。并且所有的对于content provider的访问都通过content resolver完成。 

一个标准的数据查询流程
```
你的应用 A ───────► ContentResolver ───────► 系统 Binder IPC ─────► 应用 B 的 ContentProvider
          (query/insert...)                               (跨进程通信)
```
从代码上来说就是
```
1. 创建content resolver
ContentResolver resolver = getContentResolver();
2. 实例化一个content URI。这个其实就是访问目标的地址。
Uri uri = ContactsContract.Contacts.CONTENT_URI;
3. 调用content resolver.  // 现在可以传入CRUD的请求了,下面会说具体查询方法
```
content provider支持两种数据访问模式：

1. SQL-like 模式： 如果你使用`.query()`，那就是SQL-like模式，也就是通过SQL语句查询访问数据
当我们调用：
```
Cursor cursor = getContentResolver().query(
    uri, projection, selection, selectionArgs, sortOrder
);

uri对应的是查询指向的数据集 -> SQL中的table（表）   ｜ content://contacts/example

projection返回指定的列名  -> SQL中的SELECT       ｜ new String[]{"name", "phone"}

selection是搜索条件 -> SQL中的WHERE。            ｜ "age > ? AND city = ?"

selectionArgs是selection的参数，也就是问号里的部分 ｜ new String[]{"18", "Beijing"}.  
//这个是为了安全性防止注入攻击，实际上会和selection
//合成成一个SQL语句 age > 18 AND city = Beijing

sortOrder是排序条件 -> SQL中的ORDER BY           ｜ "name DESC"
```
其实就是在通过 ContentResolver → ContentProvider → SQLite 执行一条 SELECT 查询。     
2. File-like 模式：  
通过`OutputStream` 和 `InputStream`方法访问里面的数据   
没有细说，过

##### URI （uniform resource identifier）   
URI是统一资源标识符，它是一种用于标识资源的统一格式。    
U代表Uniform（统一）而不是Unique（独特）  
Unique Resource Identifier： 这个名称包含的东西太大了任何地方都可以用，因此对于安卓情境下，URI代表的是统一资源标识。  
格式：
`content://<authority>/<path>/<id>`
- authority：内容提供者的标识符，通常为包名
- path：内容提供者的路径
- id（可选）：表中某个数据记录的ID

##### 什么时候需要content provider

| 需求场景         | 建议                             |
| ------------ | ------------------------------ |
| 仅本地使用数据      | 直接用 SQLite / Room，不必写 Provider |
| 希望共享数据给其他应用  | 必须使用 Content Provider        |
| 需要封装复杂数据访问逻辑 | 推荐使用 Provider                |

简言之：
只有当你想让其他 app 访问你的数据时才需要写 ContentProvider。

### 安卓应用

**Android 应用是由一系列松耦合的组件组成的集合**，包括：
- Activities（活动）
- Services（服务）
- Content Providers（内容提供者）
- Broadcast Receivers（广播接收器）
- Intents（意图）
- Notifications（通知）
- Widgets（桌面小部件）
- Fragments（UI碎片）
- Action Bar（动作栏）

这体现了 Android 的**组件化与解耦设计思想**——每个组件可独立运行，由系统通过 Intent 调度。

#### Application 类
一般不需要动application类，除非有特殊需求
可以自定义 Application 类来执行：
在第一个 Activity 创建之前运行的全局初始化任务；
管理全局状态或单例对象；
集成崩溃报告、持久化、统计分析等逻辑。

使用方式：  
AndroidManifest.xml:
```
<application  
    android:name=".MyCustomApplication"  
    android:icon="@drawable/icon"  
    android:label="@string/app_name" >
</application>
```
代码：
```
public class MyCustomApplication extends Application {

    //生命周期里也就四个方法
    @Override
    public void onCreate() {  
        // 在第一个 Activity 创建之前运行,全局初始化任务
        super.onCreate();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        // 配置改变时逻辑， 比如屏幕旋转，语言变化
        super.onConfigurationChanged(newConfig);
    }

    @Override
    public void onLowMemory() {
        // 运行时内存不足时逻辑
        super.onLowMemory();
    }

    @Override
    public void onTerminate() {
        // 运行时退出逻辑，但是不是很靠谱，因为系统随时可以杀进程而不call onTerminate方法
        super.onTerminate();
    }
}
```
#### 应用优先级
应用优先级关系着被系统杀进程的优先级，资源调度和响应性。  
> 一个应用的优先级等于它组件中优先级最大的那个  
> 如果一个应用依赖于另一个应用，那么后者优先级大于等于前者
> 如果两个应用同优先级，那么运行时间长的优先被杀

| 优先级                        | 状态                                              | 描述          |
| -------------------------- | ----------------------------------------------- | ----------- |
| **Critical (Active)**      | 前台运行的 Activity、前台 Service、BroadcastReceiver 执行中 | 最高优先级，不会被杀死 |
| **High (Visible)**         | 可见但非活跃 Activity                                 | 次高优先级       |
| **High (Started Service)** | 启动的后台服务                                         | 中等优先级       |
| **Low (Background)**       | 不可见且无 Service 的 Activity                        | 可被清理        |
| **Low (Empty Process)**    | 缓存进程（已退出的应用残留）                                  | 最易被系统杀死     |

一个应用对于自己的生命周期只有很低的控制力，系统可以随意玩弄应用，而且系统杀进程不会按照流程执行通知，因此开发者需要一些措施来保证可以随时恢复到可用状态
因此开发者要：
- 在 onPause() / onSaveInstanceState() 保存关键状态；
- 不依赖 onDestroy() 或 onTerminate() 进行清理；
- 使用持久化存储（SharedPreferences / DB）保存数据

#### 激进的生命周期管理
##### **Doze Mode**

- 当设备闲置（屏幕关闭、未充电）时触发；
- 暂停后台 CPU、网络访问与闹钟；
- 仅允许高优先级任务（例如前台服务）运行；
- 需使用 **WorkManager / JobScheduler** 执行延迟后台任务。

##### **App Standby**

- 用户长时间未使用的应用会进入“待机桶”（Standby Bucket）；
- 按使用频率分为：Active / Working Set / Frequent / Rare / Restricted；
- 背景任务、同步与闹钟会被更严格延迟

因此就像是一开始在FrontService那一节提到的，想要实现长时间后台运行，需要在前台保持一个可见的通知

### 传感器和位置服务

手机比电脑最大的不同的就在于手机拥有传感器，可以感知周围的变化，拥有持续的，实时的，大量的数据输入。

#### 传感器类型
- **Accelerometer**(加速度计)：测量设备在 XYZ 轴上的加速度，帮助检测设备的运动。
- **Gyroscope**(陀螺仪)：提供设备的角度变化，帮助确定设备的方向
- **Ambient Light Sensor**(光传感器)：检测环境光线强度，自动调节屏幕亮度
- **Proximity Detection**(接近检测): 在靠近物体的时候关掉屏幕，防止误触
- **Pressure / Temperature / Humidity Sensor**(气压，温度湿传感器)：有些手机包括这些环境传感器，用于监测气压，温度，湿度变化
- **Magnetometer**（磁力计）：用于制作数字指南针，但容易受金属干扰
- comming soon...

#### 安卓传感器框架 - SensorManager
SensorManager是一个传感器管理框架，用于帮助开发者访问设备上的传感器（**注意，不包括麦克风和摄像头**）


主要的类和方法：

- SensorManager：负责访问所有传感器。
- Sensor：表示特定的传感器，如加速度计、温度传感器等。
- SensorEventListener：监听传感器事件，处理数据变化。

###### 监听传感器
SensorEvent 是什么呢？
SensorEvent类封装了传感器数据，包括传感器类型、时间戳、传感器值等信息。

| 字段            | 类型        | 说明                                                                               |
| ------------- | --------- | -------------------------------------------------------------------------------- |
| **sensor**    | `Sensor`  | 触发事件的传感器对象，包含有关传感器的元数据（如类型、最大值、单位等）。                                             |
| **timestamp** | `long`    | 事件的时间戳，表示从系统启动到事件发生的时间（单位：纳秒）。                                                   |
| **values**    | `float[]` | 存储传感器的数值数组。不同的传感器返回的值不同。比如，`Sensor.TYPE_ACCELEROMETER` 会返回一个三维的加速度值数组 `x, y, z`。 |

```
public class SensorActivity extends Activity implements SensorEventListener {
    // 实现传感器监听类SensorEventListener
    private SensorManager mSensorManager;
    private Sensor mLight;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mLight = mSensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
    }
    //指定监听的传感器类型为光线传感器

    @Override
    public void onSensorChanged(SensorEvent event) {
        float lux = event.values[0]; // 获取光线传感器的数值
        // 处理这个传感器的值
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // 处理传感器准确度的变化
    }
}
```

#### 位置服务
如何感知现在的位置呢？
- GPS 全球定位系统
- 移动网络（通过手机接入信号塔的覆盖范围可以得知大概位置）
- WIFI 与信号塔原理基本一致

##### 安卓位置框架 - LocationManager
LocationManager类是Android Location API的主要类，用于获取设备位置信息。
使用 `requestLocationUpdates()` 获取最新位置。
一个典型的位置信息请求代码： 
首先先在安卓的AndroidManifest.xml声明所需权限：
```
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```
然后在Activity中获取位置信息：
```
LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
// 创建位置监听器
LocationListener locationListener = new LocationListener() {
    @Override
    public void onLocationChanged(Location location) {
        // 获取新的位置
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {}

    @Override
    public void onProviderEnabled(String provider) {}

    @Override
    public void onProviderDisabled(String provider) {}
};
locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, locationListener);

```

### 安全

当前的安全策略越来越复杂，但是依然有很多系统被黑。
简单的防治措施：
- 只使用可信来源的应用： free（自由）/open source（开源）软件
- 让每个应用都运行在自己的沙箱里，隔离开来
- 最小权限原则，只给所需要的最少权限，不多给

#### 安卓的安全措施
Android 的安全体系是基于 Linux 内核安全模型 + 应用沙箱机制 + 权限控制） 构建的。  
其核心思想是：“每个应用都在自己的安全空间（sandbox）中运行，默认互不干扰。”   
每一个应用都有自己的独立UID，独立进程和独立沙箱，并且要求有signing(签名)
##### sandbox（沙箱）
| 功能       | 说明                                      |
| -------- | --------------------------------------- |
| **文件隔离** | 其他应用无法直接访问你的 `data/data/<package>` 文件夹。 |
| **内存隔离** | 无法读取其他应用的进程内存。                          |
| **权限控制** | 访问敏感功能（如摄像头、麦克风）需系统授权。                  |

##### permission（权限）
权限是固定的，在应用安装之后就不能修改了
权限作用于Activity， Service， BroadcastReceiver， ContentProvider。
在AndroidManifest.xml中添加
```
<manifest ... >
<usespermission android:name="android.permission.RECEIVE_SMS" />
</manifest>
```
安卓将权限分为了三等：

| 类型                  | 说明           | 示例         |
| ------------------- | ------------ | ---------- |
| **普通权限（Normal）**    | 不涉及隐私，系统自动授予 | 访问网络、设置壁纸  |
| **危险权限（Dangerous）** | 涉及用户隐私，需用户授权 | 摄像头、麦克风、定位 |
| **签名权限（Signature）** | 仅授予使用相同签名的应用 | 系统级 API 权限 |

危险权限的创建需要面对多语言用户的审查，因此开发者要注意：
1. 清晰说明用户面临的安全决策；
2. 权限字符串必须支持多语言本地化；
3. 用户可能因为描述模糊或风险提示而拒绝安装。

#### 关于安全性，三方能做的

##### 用户能干的事情
- 启用设备加密
- 设置密码 / PIN / 图案 / 面部解锁
- 关闭网络访问（如 WiFi、移动数据）
- 禁止未知来源安装
- 从 Google Play 安装应用（安装时显示权限请求）
对于一个应用，用户可选择：
同意（安装）  
拒绝（放弃安装）  
可对安装应用进行报告、评分与评论

##### 平台（Google/第三方平台）
- 移除违规应用
- 审查
- 保留开发者信息

##### 开发者
- 声明权限
- 获得权限后再调用功能
- 遵循API规范
- 遵循安全指南
- 隐藏组件，不对外暴露
- 最小权限原则
- 加密消息（HTTPS）

### Debugging（调试）
#### 为什么要Debug？
Debug可以让程序按照你设想的方式运行，减少bug和缺陷。 
安卓系统上的应用都套上了层层框架（App ->Android Libs -> Dalvik -> OS）以及运行环境相差很大（CPU，硬件等），错误不容易被简单的看出来
不Debug怎么学习！
#### 给安卓应用Debug
1. 模拟器默认允许debug，实机进开发者模式后可以手动打开USB debug。
2. 允许debug后，进入android studio， 选择debug， 选择进程android studio会监听对应进程，开始debug

老师主要介绍了两种debug方式
##### LogCat 看日志
安卓的log与java的log类略有不同，有以下这几类
| 方法        | 日志等级    | 用途           |
| --------- | ------- | ------------ |
| `Log.v()` | VERBOSE | 详细信息（几乎所有日志） |
| `Log.d()` | DEBUG   | 调试信息（开发时使用）  |
| `Log.i()` | INFO    | 一般状态信息       |
| `Log.w()` | WARN    | 警告（潜在问题）     |
| `Log.e()` | ERROR   | 错误与异常信息      |

使用方法：
```
//代码块
Log.d("MainActivity", "onCreate() started");
Log.e("Database", "Failed to open connection!");
```

##### Debugger打断点
孩子们，这个真的要介绍吗

#### 其他方法
- Lint 代码质量检测器，修补代码结构上的问题
- Hierarchy Viewer 优化用户界面
- Traceview 日志的可视化查看法
- Systrace 代码执行情况

### 发布

一个好的app需要
- 有创新性
- 好看
- 块
- 稳定

那么怎么做一个好的app呢？
- 组建/雇佣 设计师
- 设计与功能无缝匹配
- 好的名字加icon
- test

好的app除了上述4点，还要能恰米
- 免费 聚集用户后再加收益项（广告啊，引流啊）
- 免费 捐款
- 免费 广告
- 免费 高级版付费
- 付费

好的app还要有好售后
- 听顾客的需求
- 鼓励feekback
- 学习用户用你app的方式（别教玩家怎么打游戏，学）

找问题：
- 市场feedback
- 谷歌统计
- 禁用有问题的手机（还有捂嘴）
- 解决问题

宣传
- 找应用评测网站
- 主动推广（别害羞）
- 选择合适的网站推广（你也不想在steam推广学习强国吧）
- 发送新闻稿
- 应用发布前给测评网站试用
- 免费/付费打广告
- 去论坛提起你的应用来宣传

社交媒体
- 博客
- Twitter ,Facebook, google+
- 别用社媒推送信息，互动一下证明你活着就好
- 个人化回复， 最好能双向交流

怎么可持续性的开发呢？
开发你有兴趣的应用，找到可持续的业务模型，加入或者创建一个同好开发者社区