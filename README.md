---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 304502210091605456ddb7d94c371fba0bb3022491deb01514bde2bbd2e0baa5495a32c7d5022066114538e707c6518b223bb26156f7272283f2577dca0065e3a77df750c467c6
    ReservedCode2: 3045022100ac0bc8424e94be4892f888d205cfc88f9ce257d4b4c12748546643735d6f1f1f022072d72c51886c9e1ec1eb79d98fddb5abc485751a8558a8792b27ea7c40a7e796
---

# 黑暗人格测试 - Vercel 版本

## 功能特点

- **全自动兑换码分配**：不同用户访问同一链接，系统自动分配不同兑换码
- **服务器端存储**：兑换码状态保存在服务器，不会丢失
- **10维人格分析**：专业的心理分析维度
- **雷达图可视化**：清晰展示各项人格特征

## 部署到 Vercel

### 方法一：GitHub 一键部署（推荐）

1. 在 GitHub 创建新仓库
2. 上传以下文件：
   - `package.json`
   - `vercel.json`
   - `api/assign-code.js`
   - `public/index.html`
3. 访问 https://vercel.com
4. 点击 "Add New..." → "Project"
5. 选择您刚创建的 GitHub 仓库
6. 点击 "Deploy"

### 方法二：Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 进入项目目录
cd psych-test-vercel

# 部署
vercel
```

## 访问方式

部署完成后，所有用户使用**同一个链接**，系统自动分配不同兑换码！

例如：`https://your-project.vercel.app/`

## 兑换码管理

- 共 50 个兑换码
- 服务器自动分配
- 每个兑换码绑定设备 24 小时
- 过期后自动释放，可重新分配

## 技术架构

- **前端**：纯静态 HTML + JavaScript
- **后端**：Vercel Serverless Functions
- **存储**：内存存储（生产环境建议连接数据库）
