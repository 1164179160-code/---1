# BikeApp - React Native版 (Expo)

## 快速开始

### 1. 安装依赖
```bash
cd BikeApp-ReactNative
npm install
```

### 2. 运行项目
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 功能特性

- ✅ 跨平台（iOS + Android）
- ✅ 底部 Tab 导航
- ✅ 英雄海报区（渐变背景）
- ✅ 爆款推荐横向滚动
- ✅ 车型网格展示
- ✅ 配件商城
- ✅ Feed 流推荐
- ✅ 响应式布局

## 系统要求

- Node.js 18+
- npm 或 yarn
- Expo CLI
- iOS: Xcode 15+ (macOS)
- Android: Android Studio

## 项目结构

```
BikeApp-ReactNative/
├── App.tsx           # 主应用文件
├── package.json      # 依赖配置
└── README.md         # 说明文档
```

## 开发工具

推荐使用 Expo Go App 在真机上预览：
1. 在手机上安装 Expo Go
2. 运行 `npm start`
3. 扫描二维码即可预览

## 发布

```bash
# 构建 iOS
eas build --platform ios

# 构建 Android
eas build --platform android
```
