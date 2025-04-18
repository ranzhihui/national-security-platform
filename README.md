# 国家安全知识学习平台

这是一个面向学生、教师和学校管理者的国家安全知识学习平台。平台提供视频课程、知识游戏、学习资源等功能，帮助用户更好地学习和了解国家安全知识。

## 功能特点

- 多角色支持：学生、教师、学校管理员
- 视频课程学习
- 互动知识游戏
- 学习资源下载
- 学习进度跟踪
- 班级管理功能
- 学校管理功能

## 技术栈

- HTML5
- CSS3
- JavaScript
- Python (用于本地开发服务器)

## 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/security-learning-platform.git
```

2. 进入项目目录：
```bash
cd security-learning-platform
```

3. 启动本地服务器：
```bash
python -m http.server 8000
```

4. 在浏览器中访问：
```
http://localhost:8000
```

## 项目结构

```
security-learning-platform/
├── css/
│   ├── style.css
│   └── games.css
├── js/
│   ├── main.js
│   └── puzzle.js
├── index.html
├── login.html
├── register.html
├── student.html
├── teacher.html
├── school.html
├── video.html
├── games.html
├── resources.html
└── README.md
```

## 使用说明

1. 学生用户：
   - 观看视频课程
   - 参与知识游戏
   - 下载学习资源
   - 查看学习进度

2. 教师用户：
   - 管理班级学生
   - 查看学生学习进度
   - 发送通知
   - 导出学习数据

3. 学校管理员：
   - 管理教师账号
   - 查看全校学习情况
   - 导出统计数据
   - 发送全校通知

## 贡献指南

欢迎提交问题和改进建议！请遵循以下步骤：

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License 