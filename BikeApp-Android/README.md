# BikeApp - Android版 (Jetpack Compose + Kotlin)

## 使用方法

1. 打开 Android Studio
2. 创建新项目：File → New → New Project
3. 选择 Empty Activity (Compose)
4. 项目名称：BikeApp
5. Package name: com.example.bikeapp
6. 将 `MainActivity.kt` 的内容复制到项目中
7. 运行项目

## 功能特性

- ✅ 底部导航栏
- ✅ 英雄海报区
- ✅ 爆款推荐横向滚动
- ✅ 车型网格展示
- ✅ 配件商城
- ✅ Feed 流推荐
- ✅ Material Design 3
- ✅ 深色主题

## 系统要求

- Android Studio Hedgehog | 2023.1.1+
- Kotlin 1.9.0+
- Compose BOM 2024.01.00+
- Min SDK: 24 (Android 7.0)
- Target SDK: 34 (Android 14)

## 依赖配置

在 `build.gradle.kts` (Module) 中添加：

```kotlin
dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation(platform("androidx.compose:compose-bom:2024.01.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
}
```
