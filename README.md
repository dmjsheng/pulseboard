# PulseBoard

**Version:** V1.0

**Author:** Gala

**GitHub:** [dmjsheng](https://github.com/dmjsheng)

PulseBoard 是一个原创的响应式网页前端项目，用来展示个人任务、项目进度、专注节奏和快速笔记。项目采用纯 HTML、CSS 和 JavaScript 编写，不依赖前端框架，适合作为第一个 GitHub 前端作品、个人作品集展示页或静态网页模板继续扩展。

## 项目亮点

- 响应式仪表盘界面，适配桌面端和平板、手机端
- 侧边栏导航、数据卡片、项目进度、日历日程和笔记模块
- 明暗主题切换
- 专注时长快捷切换
- 点击日期添加事件，并保存到浏览器本地存储
- 快速添加完成任务计数
- 使用 `sessionStorage` 保存本次浏览器会话中的笔记
- 无需安装依赖，打开 `index.html` 即可预览

## 技术栈

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js 静态预览服务器

## 文件结构

```text
.
├── index.html      # 页面结构和主要内容
├── styles.css      # 响应式布局、主题和视觉样式
├── script.js       # 页面交互逻辑
├── server.cjs      # 本地静态预览服务器
├── package.json    # 项目信息和脚本命令
├── LICENSE         # MIT License
└── README.md       # 项目介绍
```

## 本地运行

方式一：直接打开页面

双击 `index.html` 即可在浏览器中查看。

方式二：使用本地静态服务器

```bash
npm run dev
```

然后访问：

```text
http://localhost:5173
```

## 检查脚本

```bash
npm run check
```

该命令会检查 `script.js` 是否存在 JavaScript 语法错误。

## 适合扩展的方向

- 接入真实待办事项数据
- 增加事件分类、重复日程和提醒通知
- 添加登录和云端同步
- 增加 GitHub Pages 在线预览
- 加入更多图表组件
- 改造成 React、Vue 或 Vite 项目

## 版本记录
### V1.1 

新增日历日程功能，支持月份切换、点击日期、添加事件、删除事件，
并使用 localStorage 保存本地事件数据。
同时优化了日历模块的响应式布局，并更新了 README 和 CHANGELOG。


### V1.0

- 完成原创首页和响应式布局
- 完成明暗主题切换
- 完成项目进度、专注计时、时间线和快速笔记模块
- 新增日历日程模块，支持点击日期并添加事件
- 完成本地预览脚本和项目文档

## 许可证

本项目由 Gala 原创编写，使用 [MIT License](LICENSE) 发布。
