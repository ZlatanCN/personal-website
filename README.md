# 🌟 个人博客网站

> 基于 Next.js 和 Tailwind CSS 构建的现代化个人博客，支持 MDX 内容创作和多种高级功能。

## ✨ 特性

- 🚀 **现代化技术栈** - Next.js 15 + React 19 + TypeScript
- 🎨 **精美设计** - Tailwind CSS v4 响应式设计
- 📝 **MDX 支持** - 支持 Markdown 和 React 组件混合编写
- 🔍 **SEO 优化** - 自动生成 sitemap 和优化的 meta 标签
- 🌙 **主题切换** - 支持亮色/暗色主题
- 📊 **数学公式** - KaTeX 数学公式渲染支持
- 🎯 **代码高亮** - Prism.js 语法高亮
- 📚 **内容管理** - Contentlayer 驱动的内容管理系统
- 🔗 **自动链接** - 标题自动生成锚点链接
- 📖 **阅读时间** - 自动计算文章阅读时间
- 🎨 **Mermaid 图表** - 支持流程图和图表渲染
- 📋 **引用系统** - 学术引用和参考文献支持

## 🛠️ 技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| **Next.js** | React 框架 | v15.2.4 |
| **React** | UI 库 | v19.0.0 |
| **TypeScript** | 类型安全 | v5.1.3 |
| **Tailwind CSS** | 样式框架 | v4.0.5 |
| **Contentlayer** | 内容管理 | v0.5.5 |
| **MDX** | 内容格式 | - |
| **Biome** | 代码格式化 | v2.1.4 |

## 📂 项目结构

```
personal-website/
├── 📁 app/                 # Next.js App Router
├── 📁 components/          # React 组件
├── 📁 css/                # 样式文件
├── 📁 data/               # 博客内容 (MDX)
├── 📁 layouts/            # 页面布局
├── 📁 public/             # 静态资源
├── 📁 scripts/            # 构建脚本
├── 📄 contentlayer.config.ts  # 内容配置
├── 📄 next.config.js      # Next.js 配置
└── 📄 package.json        # 项目依赖
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Yarn 3.6.1+

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/ZlatanCN/personal-website.git
cd personal-website

# 安装依赖
yarn install

# 复制环境变量文件
cp .env.example .env.local

# 启动开发服务器
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 可用命令

```bash
yarn dev      # 启动开发服务器
yarn build    # 构建生产版本
yarn serve    # 启动生产服务器
yarn lint     # 代码检查和格式化
yarn analyze  # 分析打包大小
```

## 📝 内容创作

### 创建新文章

1. 在 `data/blog/` 目录下创建新的 `.mdx` 文件
2. 添加文章元数据（Front Matter）：

```yaml
---
title: '文章标题'
date: '2024-01-01'
tags: ['标签1', '标签2']
draft: false
summary: '文章摘要'
---
```

3. 使用 Markdown 和 React 组件编写内容

### 支持的功能

- ✅ 标准 Markdown 语法
- ✅ React 组件嵌入
- ✅ 数学公式 (LaTeX)
- ✅ 代码高亮
- ✅ Mermaid 图表
- ✅ 标注和提示框
- ✅ 自动目录生成

## 🎨 自定义

### 主题配置

编辑 `css/tailwind.css` 自定义颜色、字体等样式。

### 网站配置

编辑 `data/siteMetadata.js` 修改网站基本信息。

### 内容类型

编辑 `contentlayer.config.ts` 添加新的内容类型。

## 📈 性能优化

- 🔄 自动代码分割
- 🖼️ 图片优化
- 📦 Bundle 分析
- ⚡ 静态生成 (SSG)
- 🗜️ CSS/JS 压缩

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Contentlayer 文档](https://contentlayer.dev/docs)
- [MDX 文档](https://mdxjs.com/docs/)

---

⭐ 如果这个项目对你有帮助，欢迎给一个 Star！