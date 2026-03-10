# 🧩 UIKit 组件库 — 轻量版提案 v0.1

> **定位**：面向整个 UED 团队的跨平台设计系统基础规范
> **数据来源**：8个已交付项目源码（React Native / SwiftUI / Kotlin Compose / Flutter）
> **状态**：提案阶段，待产品设计师补充品牌方向后迭代为正式版
> **作者**：小野（UED Leader）× 野野（产品设计师）

---

## 一、项目背景

我们在过去的协作中交付了以下项目：

| # | 项目 | 平台 | 视觉风格 | 场景 |
|---|------|------|----------|------|
| 1 | 极速骑行 | React Native | 暗色系 · 渐变 · 运动感 | 山地车电商（首页/车型/配件/发现） |
| 2 | 极速骑行 | SwiftUI | 暗色系 · 系统风格 | 同上（iOS 原生） |
| 3 | 极速骑行 | Kotlin Compose | 暗色系 · Material3 | 同上（Android 原生） |
| 4 | 极速骑行 | Flutter | 暗色系 · 跨平台 | 同上（Flutter 跨平台） |
| 5 | 蓝莓骑行 | React Native | 浅色系 · Figma 还原 | 租赁平台首页 |
| 6 | 还车网点 | React Native | 浅色系 · 工具型 | 搜索页 |
| 7 | BikeBook | Web (HTML/CSS/JS) | 暗色系 · 3D 沉浸 | 车型展示 Gallery |
| 8 | 总结网站 | Web (HTML/CSS/JS) | 暗色系 · 粒子动效 | 项目展示 Portfolio |

**核心发现**：存在两套视觉语言——
- **极速骑行系**：暗底 `#0A0A0A`，主色 `#667EEA`，强调 `#F5576C`，运动/电商调性
- **蓝莓骑行系**：浅底 `#F2F2F8`，主色 `#0A0519`，信息密度高，租赁/工具调性

---

## 二、Design Tokens（设计令牌）

### 2.1 色彩系统

#### 基础色板（从代码中提取的所有色值）

**极速骑行系 — Dark Theme**

| Token 名称 | 色值 | 用途 | 出现文件 |
|------------|------|------|----------|
| `bg-primary` | `#0A0A0A` | 页面主背景 | RN / Flutter / Kotlin |
| `bg-surface` | `#1A1A1A` | 卡片/TabBar/表面 | RN / Flutter / Kotlin |
| `bg-elevated` | `#333333` | 图片占位/分割线 | RN / Kotlin |
| `brand-primary` | `#667EEA` | 主品牌色/价格/激活态 | 全部4个平台 |
| `brand-secondary` | `#764BA2` | 渐变终点色 | RN / Flutter / Kotlin |
| `accent-hot` | `#F5576C` | HOT标签/热门话题 | 全部4个平台 |
| `text-primary` | `#FFFFFF` | 主文字 | 全部 |
| `text-secondary` | `#999999` | 副文字/描述 | RN / Flutter |
| `text-tertiary` | `#666666` | 辅助信息/划线价 | RN / Flutter / Kotlin |
| `border-default` | `#333333` | TabBar顶部边框 | RN |

**蓝莓骑行系 — Light Theme**

| Token 名称 | 色值 | 用途 | 出现文件 |
|------------|------|------|----------|
| `bg-primary` | `#F2F2F8` | 页面主背景 | 蓝莓首页 |
| `bg-surface` | `#FFFFFF` | 卡片/筛选条 | 蓝莓首页 |
| `bg-muted` | `#F7F7F7` | 价格栏背景 | 蓝莓首页 |
| `bg-search` | `#F5F5F5` | 搜索框背景 | 还车网点 |
| `brand-dark` | `#0A0519` | 主文字/按钮/筛选激活 | 蓝莓首页 |
| `text-primary` | `#333333` | 列表文字 | 还车网点 |
| `text-secondary` | `#999999` | 距离/辅助 | 还车网点 |
| `text-tertiary` | `#879099` | 零售价/弱信息 | 蓝莓首页 |
| `text-desc` | `#666666` | 描述文字 | 蓝莓首页 |
| `border-clear` | `#C0C0C0` | 清除按钮 | 还车网点 |
| `card-teek` | `#1C3762` | TEEK品牌卡背景 | 蓝莓首页 |
| `card-blueberry` | `#2D1B4E` | Blueberry品牌卡背景 | 蓝莓首页 |
| `card-brompton` | `#1B3A2F` | 小布品牌卡背景 | 蓝莓首页 |
| `card-specialized` | `#3B2A1A` | Specialized品牌卡背景 | 蓝莓首页 |


### 2.2 字体系统

#### 字号规范（从代码中提取的所有 fontSize）

| Token | 尺寸 | 字重 | 用途 | 出现频率 |
|-------|------|------|------|----------|
| `text-hero` | 32px | Bold (700) | 英雄区标题 | ★★★ |
| `text-screen-title` | 28px | Bold (700) | 页面标题 | ★★ |
| `text-section-title` | 24px | Bold (700) / SemiBold (600) | 区块标题（爆款热销/周周上新） | ★★★ |
| `text-card-brand` | 22px | SemiBold (600) | 品牌卡名称 | ★★ |
| `text-price-lg` | 20px | Bold (700) | 大号价格 | ★★★★ |
| `text-card-title` | 16px | SemiBold (600) | 卡片标题/按钮文字 | ★★★★★ |
| `text-body` | 15px | Regular (400) / Light (300) | 正文/副标题 | ★★★ |
| `text-card-name` | 14px | SemiBold (600) / Regular (400) | 卡片名称/筛选/品牌Tab/搜索 | ★★★★★ |
| `text-desc` | 13px | Regular (400) | 描述/副信息 | ★★★ |
| `text-caption` | 12px | Regular (400) / SemiBold (600) | 标签/距离/描述/按钮 | ★★★★ |
| `text-tag` | 11px | Bold (700) / SemiBold (600) | HOT标签/Tab标签/小字 | ★★★★ |
| `text-micro` | 10px | Regular (400) | 零售价/badge/最小文字 | ★★★ |
| `text-nano` | 9px | Regular (400) | 底部TabBar标签 | ★ |

#### 字重映射

| Token | 值 | 用途 |
|-------|-----|------|
| `weight-bold` | 700 | 标题/价格 |
| `weight-semibold` | 600 | 卡片标题/按钮/激活态 |
| `weight-medium` | 500 | 状态栏时间/次要按钮 |
| `weight-regular` | 400 | 正文/描述 |
| `weight-light` | 300 | Hero 副标题 |

### 2.3 圆角系统

| Token | 值 | 用途 | 出现频率 |
|-------|-----|------|----------|
| `radius-pill` | 100px | 胶囊按钮/Hero CTA/底部TabBar | ★★★ |
| `radius-full` | 25-26px | CTA按钮/圆形头像 | ★★★ |
| `radius-xl` | 20px | 大卡片（featuredCard） | ★★★ |
| `radius-lg` | 16px | 标准卡片/bikeCard/feedCard | ★★★★★ |
| `radius-md` | 12px | 图片/HOT标签/分类卡/周周上新卡 | ★★★★★ |
| `radius-sm` | 8px | feedTag/筛选条/买按钮 | ★★★★ |
| `radius-xs` | 6px | badge小标签 | ★★ |

### 2.4 间距系统

| Token | 值 | 用途 |
|-------|-----|------|
| `space-xxl` | 24px | 区块间距（section paddingVertical） |
| `space-xl` | 20px | 页面内边距/Hero padding |
| `space-lg` | 16px | 卡片内边距/列表间距/标准 gap |
| `space-md` | 12px | 紧凑内边距/标签间距/图标间距 |
| `space-sm` | 8px | 元素间小间距/分类卡 gap |
| `space-xs` | 6px | 最小间距/badge padding |
| `space-xxs` | 4px | 微间距/dot/icon margin |

### 2.5 阴影系统

| Token | 值 | 用途 |
|-------|-----|------|
| `shadow-card` | `0px 2px 8px rgba(17,17,17,0.04)` | 周周上新卡片（蓝莓） |
| `shadow-elevated` | `0 5px 10px rgba(0,0,0,0.1)` | iOS 卡片浮起效果 |
| `shadow-none` | 无 | 极速骑行暗色系（暗底不需要阴影） |

---

## 三、高频组件清单

按出现频率排序（跨8个文件统计）：

| 排名 | 组件 | 出现次数 | 涉及项目 | 复杂度 |
|------|------|----------|----------|--------|
| 1 | **ProductCard（产品卡片）** | 12+ | 全部项目 | ★★★ |
| 2 | **TabBar（底部导航）** | 6 | 极速骑行×4 + 蓝莓 + 还车 | ★★ |
| 3 | **Tag/Badge（标签）** | 8+ | 极速骑行×4 + 蓝莓 | ★ |
| 4 | **SectionHeader（区块标题）** | 6+ | 极速骑行 + 蓝莓 | ★ |
| 5 | **SearchBar（搜索栏）** | 2 | 还车网点 + 蓝莓 | ★★ |
| 6 | **HeroBanner（英雄横幅）** | 5 | 极速骑行×4 + 蓝莓 | ★★★ |
| 7 | **FilterChips（筛选条）** | 2 | 蓝莓首页 + 还车 | ★★ |
| 8 | **FeedCard（信息流卡片）** | 4 | 极速骑行×4 | ★★ |
| 9 | **GradientOverlay（渐变遮罩）** | 3 | 蓝莓首页 | ★★ |
| 10 | **CapsuleButton（胶囊按钮）** | 2 | 蓝莓 + 还车 | ★ |

---

## 四、Top 5 组件 API 草案

### 4.1 ProductCard

```
<ProductCard
  variant="featured" | "grid" | "list" | "full-width"
  theme="dark" | "light"
  title={string}
  subtitle={string}
  price={string}
  originalPrice={string?}
  tag={{ text: string, type: "hot" | "new" | "rank" }}
  image={ImageSource}
  onPress={() => void}
/>
```

**变体说明**：
- `featured`：横滑大卡（极速骑行爆款推荐，280×auto）
- `grid`：双列网格（车型页/配件页）
- `list`：横向列表（信息流 FeedCard）
- `full-width`：全宽卡（蓝莓更多好车，含价格栏）

### 4.2 TabBar

```
<TabBar
  variant="standard" | "floating"
  theme="dark" | "light"
  items={[{ icon: string | ReactNode, label: string }]}
  activeIndex={number}
  onChange={(index: number) => void}
/>
```

**变体说明**：
- `standard`：固定底部（极速骑行，bg #1A1A1A，borderTop）
- `floating`：浮动胶囊（蓝莓骑行，bg #0F0F0F，borderRadius 34，悬浮于内容上方）

### 4.3 Tag / Badge

```
<Tag
  variant="filled" | "tinted" | "outline"
  color="primary" | "hot" | "custom"
  size="sm" | "md"
  text={string}
/>
```

**变体说明**：
- `filled`：实色背景（HOT标签 #F5576C，年度爆款 #667EEA）
- `tinted`：半透明背景（feedTag，rgba 20% 透明度）
- `outline`：描边（badge #202229 + border #1D1F24）

### 4.4 SectionHeader

```
<SectionHeader
  title={string}
  badge={{ text: string, color: string }?}
  trailing={{ text: string, onPress: () => void }?}
/>
```

### 4.5 SearchBar

```
<SearchBar
  value={string}
  onChangeText={(text: string) => void}
  placeholder={string}
  showClear={boolean}
  trailing={ReactNode?}  // 搜索按钮 or 胶囊
  theme="dark" | "light"
/>
```

---

## 五、跨平台差异对照

| 维度 | React Native | SwiftUI | Kotlin Compose | Flutter |
|------|-------------|---------|----------------|---------|
| 主色定义 | `'#667EEA'` | `.purple` (系统色) | `Color(0xFF667EEA)` | `Color(0xFF667EEA)` |
| 圆角语法 | `borderRadius: 16` | `.cornerRadius(16)` | `RoundedCornerShape(16.dp)` | `BorderRadius.circular(16)` |
| 渐变 | `expo-linear-gradient` | `LinearGradient` | `Brush.linearGradient` | `LinearGradient` |
| 阴影 | `shadowColor/Offset/Opacity/Radius` | `.shadow()` | `elevation` | 无（暗色不需要） |
| 字重 | `fontWeight: '600'` | `.fontWeight(.semibold)` | `FontWeight.SemiBold` | `FontWeight.w600` |
| 间距单位 | 无单位（dp等效） | `.padding(16)` | `16.dp` | `EdgeInsets.all(16)` |

**关键发现**：
- iOS 版使用系统 `.purple` 而非精确 `#667EEA`，需统一
- Kotlin 使用 Material3 的 `darkColorScheme`，与手写 token 有差异
- Flutter 和 RN 的 token 值最一致，建议以此为基准

---

## 六、待补充 · 开放问题

> 以下问题需要野野（产品设计师）确认方向，小野将据此迭代正式版。

### Q1：品牌统一还是双轨？
极速骑行（暗色电商）和蓝莓骑行（浅色租赁）是否统一为一套 Design System？
- **方案A**：统一系统，通过 `theme="dark" | "light"` 切换
- **方案B**：两套独立系统，共享基础 token（圆角/间距/字号），色彩各自定义
- **建议**：方案A，降低维护成本，团队学习成本更低

### Q2：业务场景补全
目前覆盖：首页、搜索、Gallery（3个场景）
缺失：订单流、支付、个人中心、骑行记录、消息通知
- 组件库是否需要预留这些场景的组件？
- 还是先做已有场景的组件，后续按需扩展？

### Q3：Figma 组件库对齐
- 野野那边是否有已建立的 Figma Component Library？
- 如果有，Token 命名需要和 Figma 侧保持一致
- 如果没有，建议同步建立 Figma Token + Code Token 的映射关系

### Q4：组件库输出形态
面向整个 UED 团队，输出形态建议：
- **Figma 侧**：Token Variables + Component Set（设计师用）
- **代码侧**：React Native 组件包（开发用），附带 Storybook 文档
- **文档侧**：在线可预览的规范文档（就是我们现在要做的这个页面）

---

## 七、下一步计划

| 阶段 | 内容 | 负责人 | 状态 |
|------|------|--------|------|
| Phase 0 | 轻量版提案（本文档） | 小野 | ✅ 完成 |
| Phase 1 | 野野确认品牌方向 + 业务范围 | 野野 | ⏳ 待确认 |
| Phase 2 | 正式版 Token 规范 + Figma Variables | 小野 + 野野 | 🔜 |
| Phase 3 | Top 5 组件开发（RN） | 小野 | 🔜 |
| Phase 4 | Storybook 文档 + 团队培训 | 小野 + 野野 | 🔜 |

---

*本文档基于 8 个已交付项目的真实代码提取，所有 Token 值均有源码出处。*
*最后更新：2026-03-10*
