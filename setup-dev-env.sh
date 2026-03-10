#!/bin/bash

echo "🚀 开始安装移动开发环境..."

# 1. 安装 Homebrew
echo "\n📦 步骤 1/5: 安装 Homebrew..."
if ! command -v brew &> /dev/null; then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
else
    echo "✅ Homebrew 已安装"
fi

# 2. 安装 Node.js (React Native 需要)
echo "\n📦 步骤 2/5: 安装 Node.js..."
if ! command -v node &> /dev/null; then
    brew install node
else
    echo "✅ Node.js 已安装"
fi

# 3. 安装 Watchman (React Native 需要)
echo "\n📦 步骤 3/5: 安装 Watchman..."
if ! command -v watchman &> /dev/null; then
    brew install watchman
else
    echo "✅ Watchman 已安装"
fi

# 4. 安装 CocoaPods (iOS 依赖管理)
echo "\n📦 步骤 4/5: 安装 CocoaPods..."
if ! command -v pod &> /dev/null; then
    sudo gem install cocoapods
else
    echo "✅ CocoaPods 已安装"
fi

# 5. 安装 Flutter
echo "\n📦 步骤 5/5: 安装 Flutter..."
if ! command -v flutter &> /dev/null; then
    cd ~
    git clone https://github.com/flutter/flutter.git -b stable
    echo 'export PATH="$HOME/flutter/bin:$PATH"' >> ~/.zshrc
    export PATH="$HOME/flutter/bin:$PATH"
    flutter doctor
else
    echo "✅ Flutter 已安装"
fi

echo "\n✅ 基础环境安装完成！"
echo "\n📱 接下来需要手动安装："
echo "1. Android Studio: https://developer.android.com/studio"
echo "2. Xcode (完整版): 从 App Store 安装"
echo "\n运行 'flutter doctor' 检查环境状态"
