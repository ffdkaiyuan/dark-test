---
AIGC:
    ContentProducer: MiniMax Agent AI
    ContentPropagator: MiniMax Agent AI
    Label: AIGC
    ProduceID: "00000000000000000000000000000000"
    PropagateID: "00000000000000000000000000000000"
    ReservedCode1: 3045022100e0a2d50b31b416be820b48c12035fc086944d3c33c05a809ea654672a14f7b8402202e4b0c1a88e5cac87fd7efaeeb11d921bebd965de8a092da56feb5f31e4d41aa
    ReservedCode2: 304402203122d8d3e95878bed2e8300944ae2996b9d87da75590b0b5e8aceac9f4fae76402202acf3f245ed8d1e9281af2c7a5426d9a037bae226b91cb752f3c12ec86c312fe
---

# 🎭 黑暗人格测试系统

一个完整的在线心理测试系统，包含**10个维度**的深度人格分析，采用雷达图可视化展示结果。

## ✨ 核心特性

### 🎯 10维人格分析

1. **利己主义** - 过度关注自身利益，甚至牺牲他人
2. **贪婪** - 对资源、地位、权力有着强烈渴望
3. **马基雅维利主义** - 为达目的不择手段，善于操控
4. **道德推脱** - 为自己的错误行为寻找借口
5. **自恋** - 极度的自我中心和优越感
6. **心理权力** - 认为理应享有特权和优待
7. **精神变态** - 缺乏同理心和悔意，情感淡漠
8. **施虐倾向** - 通过让他人痛苦来获得快感
9. **自我为中心** - 只从自己的角度思考问题
10. **恶毒倾向** - 即使损己也要伤害他人

### 🎨 视觉亮点

- **深色主题** - 神秘深邃的视觉风格，符合黑暗人格测试调性
- **粒子动画** - 飘动的粒子背景效果，增加沉浸感
- **雷达图** - 10维人格可视化雷达图，专业且直观
- **圆环分数** - 动态圆环展示Dark Index，视觉冲击力强
- **渐变色系** - 紫色到粉色的渐变配色，时尚且抓人眼球

### 🔐 验证系统

- **设备绑定** - 一个兑换码仅限一台设备使用
- **时间限制** - 24小时内可重复测试
- **离线存储** - 使用localStorage保存激活状态

## 🚀 快速使用

### 1. 本地测试

双击打开 `index.html` 文件即可在浏览器中运行。

### 2. 演示兑换码

```
TEST-1234-5678  (全功能演示)
FREE-0000-0001  (备用演示码)
DEMO-9999-9999  (备用演示码)
```

### 3. 添加新兑换码

在 `index.html` 文件中找到 `VALID_CODES` 对象，添加新的兑换码：

```javascript
var VALID_CODES = {
    'TEST-1234-5678': { used: false, deviceId: null, activateTime: null },
    'YOUR-NEW-CODE': { used: false, deviceId: null, activateTime: null }
};
```

## 📊 测试题目

共 **20道题目**，每道题涉及1-2个维度，通过李克特5点量表（1-5分）评估用户在不同情境下的倾向性。

### 页面结构

1. **首页** - 输入兑换码开始测试，展示系统特色
2. **答题页** - 20道心理测试题目，带进度条
3. **结果页** - 
   - Dark Index总分（圆环可视化）
   - 10维雷达图（ECharts专业图表）
   - 各维度详细分数和描述
   - 综合解读和特别提醒

## 🛠️ 部署到GitHub Pages

### 步骤1：创建GitHub仓库

1. 打开 [GitHub](https://github.com) 并登录
2. 点击右上角 "+" → "New repository"
3. 填写仓库名（如：`dark-personality-test`）
4. 选择 "Public"
5. 点击 "Create repository"

### 步骤2：上传文件

**方法一：使用GitHub网页上传**

1. 进入刚创建的仓库页面
2. 点击 "uploading an existing file"
3. 将 `index.html` 和 `README.md` 文件拖拽到上传区域
4. 填写提交信息（如 "Initial commit"）
5. 点击 "Commit changes"

**方法二：使用Git命令**

```bash
# 克隆仓库到本地
git clone https://github.com/你的用户名/dark-personality-test.git
cd dark-personality-test

# 将 index.html 和 README.md 放入仓库目录

# 提交并推送
git add .
git commit -m "Initial commit: 黑暗人格测试系统"
git push origin main
```

### 步骤3：启用GitHub Pages

1. 进入仓库页面
2. 点击 "Settings" 标签
3. 左侧菜单选择 "Pages"
4. 在 "Source" 下选择 "main" 分支
5. 点击 "Save"
6. 等待1-2分钟，页面会生成访问链接

### 步骤4：访问测试

访问 `https://你的用户名.github.io/dark-personality-test/`

## 🔗 小红书自动发货配置（URL带兑换码）

### 新功能：URL自动填充兑换码

系统支持通过URL参数自动填充兑换码，用户打开链接后无需手动输入。

**URL格式：**
```
https://你的链接.com/?code=兑换码
```

**示例：**
```
https://xuewu.github.io/dark-test/?code=A001-0001-0001
```

### 使用流程

1. **用户购买** → 小红书自动发送带兑换码参数的链接
2. **用户打开** → 兑换码自动填入，无需手动输入
3. **用户测试** → 设备绑定 + 24小时有效限制

### 生成带参数的链接

使用 `link-generator.html` 链接生成器：

1. 双击打开 `link-generator.html`
2. 输入您的测试链接（如：`https://xuewu.github.io/dark-test/`）
3. 选择或输入兑换码（如：`A001-0001-0001`）
4. 点击"生成链接"
5. 复制生成的完整链接发送给买家

### 兑换码格式

当前已预置 **50个兑换码**（A001批次）：

```
A001-0001-0001 ~ A001-0001-0050
```

### 小红书自动发货配置

在小红书商家后台设置自动发送消息：

**消息模板：**
```
感谢购买黑暗人格测试！

点击下方链接开始测试：
[自动生成的链接]

一个链接仅限一台设备，24小时内可重复测试。
```

## 🔐 兑换码管理系统

### 兑换码格式

系统支持格式：`XXXX-XXXX-XXXX`（12位大写字母数字）

### 兑换码验证流程

1. 用户输入兑换码
2. 系统检查：
   - 兑换码是否存在
   - 是否已使用
   - 是否在同一设备上
   - 是否在24小时内
3. 验证通过后开始测试
4. 测试完成后生成报告

### 批量生成兑换码（进阶）

如果需要大量兑换码，可以使用以下Python脚本：

```python
import random
import string

def generate_codes(count, prefix='DRK'):
    codes = set()
    while len(codes) < count:
        suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        code = f'{prefix}-{suffix[:4]}-{suffix[4:]}'
        codes.add(code)
    return codes

# 生成100个兑换码
codes = generate_codes(100)
for code in codes:
    print(f"'{code}': {{ used: false, deviceId: null, activateTime: null }},")
```

## 💰 小红书变现指南

### 1. 商品设置

- **类目**：艺术潮玩 → 虚拟定制产品
- **价格**：建议 ¥0.9 - ¥2.9
- **形式**：在线测试链接 + 兑换码

### 2. 发货方式

选择"无需物流"发货，买家付款后自动发送包含链接和兑换码的消息。

### 3. 变现技巧

- 标题要抓眼球："测测你的黑暗人格"、"10维深度分析"
- 展示雷达图示例，引发好奇心
- 低价引流，高价出售

### 4. 商品标题参考

```
黑暗人格测试｜10维深度分析｜秒出报告｜揭示你的真实自我
```

### 5. 商品主图建议

- 尺寸：1:1 或 3:4
- 内容：雷达图展示、测试标题、价格
- 风格：神秘、暗色调、与系统风格一致

### 6. 爆款笔记文案

**标题：**
```
测完黑暗人格，我整个人都不好了...
```

**正文：**
```
姐妹们！最近发现一个超准的心理测试！

黑暗人格测试据说可以测出你的10个人格维度

我做完整个人都惊了...那个雷达图太准了！

🎭 测试包含：
• 20道专业心理题目
• 10个维度分析报告
• 可视化雷达图展示
• 详细的性格解读

关键是只要几块钱！一杯奶茶的钱都不到！

做完还可以重复看，24小时内随时重测

姐妹们快去试试！评论区告诉我你们的指数是多少！

#心理测试 #性格测试 #黑暗人格 #趣味测试
```

## 📝 小红书笔记模板

### 发布内容建议

1. **测试结果分享** - 展示自己的雷达图和分数
2. **话题讨论** - 引发关于人格特质的讨论
3. **对比测评** - 与其他人格测试进行对比
4. **趣味互动** - 邀请粉丝参与测试并分享结果

### 互动技巧

- 在笔记中设置悬念，引发好奇心
- 鼓励用户在评论区分享结果
- 及时回复评论，增加互动率

## 🔧 自定义修改

### 修改题目

编辑 `questions` 数组：

```javascript
var questions = [
    {
        text: "你的新题目",
        dimensions: ['egoism', 'greed'],  // 对应维度
        options: [
            { text: "完全不会", score: 1 },
            { text: "很少会", score: 2 },
            { text: "偶尔会", score: 3 },
            { text: "经常会", score: 4 },
            { text: "完全会", score: 5 }
        ]
    },
    // 更多题目...
];
```

### 修改维度

编辑 `dimensions` 对象：

```javascript
var dimensions = {
    egoism: { name: '利己主义', color: '#7c4dff' },
    greed: { name: '贪婪', color: '#e040fb' },
    // 添加或修改维度...
};
```

### 修改颜色主题

在 `<style>` 区域修改CSS：

```css
:root {
    --primary: #e040fb;  // 主色调（紫粉色）
    --secondary: #7c4dff; // 辅助色（紫色）
    --bg-primary: #0a0a0f  // 背景色
}
```

## ⚠️ 注意事项

### 1. 合规问题

- 商品详情页必须标注"测评结果仅供娱乐参考"
- 避免使用"诊断"、"治疗"等医学术语
- 不要声称具有心理治疗效果

### 2. 版权声明

- 本系统仅供个人学习和研究使用
- 商业使用请购买商业授权

### 3. 兑换码安全

- 当前版本兑换码存储在前端，适合小规模使用
- 大规模运营建议升级到后端验证系统

## 📈 数据统计（进阶）

如果需要统计测试数据，可以使用免费的分析工具：

1. **Google Analytics** - 网站流量分析
2. **百度统计** - 国内访问统计
3. **Vercel Analytics** - 部署在Vercel时可用

### 添加统计代码

在 `<head>` 中添加：

```html
<!-- Google Analytics 示例 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 更新日志

**v2.0.0** (2026-01-21)
- 全新升级为10维人格分析系统
- 题目从12道增加到20道
- 新增5个分析维度（贪婪、施虐倾向、自我为中心、恶毒倾向、精神变态）
- 视觉全面升级：粒子动画、圆环分数、渐变配色
- 雷达图更加专业美观
- 综合解读更加详细

**v1.0.0** (2026-01-20)
- 初始版本发布
- 12道马基雅维利测试题目
- 4维度分析报告
- 雷达图可视化
- 兑换码验证系统

## 📞 技术支持

如果遇到问题：

1. 检查GitHub Pages是否正确部署
2. 确认访问链接是否正确
3. 测试兑换码格式是否正确

## 📄 许可证

MIT License - 可以自由使用和修改

---

**祝你测试大卖！** 🎉
