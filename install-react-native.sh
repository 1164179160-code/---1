#!/bin/bash

echo "🚀 开始安装 React Native 开发环境..."
echo ""

# 检查是否已安装 Homebrew
if ! command -v brew &> /dev/null; then
    echo "📦 步骤 1/4: 安装 Homebrew..."
    echo "⚠️  这一步可能需要 5-10 分钟，请耐心等待..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # 配置 Homebrew 环境变量
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
    echo "✅ Homebrew 安装完成"
else
    echo "✅ Homebrew 已安装，跳过..."
fi

echo ""

# 安装 Node.js
if ! command -v node &> /dev/null; then
    echo "📦 步骤 2/4: 安装 Node.js..."
    brew install node
    echo "✅ Node.js 安装完成"
else
    echo "✅ Node.js 已安装: $(node -v)"
fi

echo ""

# 安装 Watchman (React Native 推荐)
if ! command -v watchman &> /dev/null; then
    echo "📦 步骤 3/4: 安装 Watchman..."
    brew install watchman
    echo "✅ Watchman 安装完成"
else
    echo "✅ Watchman 已安装"
fi

echo ""

# 安装 Expo CLI
echo "📦 步骤 4/4: 安装 Expo CLI..."
npm install -g expo-cli
echo "✅ Expo CLI 安装完成"

echo ""
echo "🎉 React Native 开发环境安装完成！"
echo ""
echo "📱 接下来的步骤："
echo "1. cd BikeApp-ReactNative"
echo "2. npm install"
echo "3. npm start"
echo ""
echo "💡 提示："
echo "- 在手机上安装 Expo Go App 可以扫码预览"
echo "- 按 'w' 可以在浏览器中预览"
echo "- 按 'i' 可以在 iOS 模拟器预览（需要 Xcode）"
echo "- 按 'a' 可以在 Android 模拟器预览（需要 Android Studio）"
