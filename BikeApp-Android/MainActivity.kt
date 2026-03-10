package com.example.bikeapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BikeAppTheme {
                MainScreen()
            }
        }
    }
}

@Composable
fun BikeAppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = Color(0xFF667EEA),
            secondary = Color(0xFF764BA2),
            background = Color(0xFF0A0A0A),
            surface = Color(0xFF1A1A1A)
        ),
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen() {
    var selectedTab by remember { mutableStateOf(0) }
    
    Scaffold(
        bottomBar = {
            NavigationBar(
                containerColor = Color(0xFF1A1A1A)
            ) {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Home, "首页") },
                    label = { Text("首页") },
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.DirectionsBike, "车型") },
                    label = { Text("车型") },
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.ShoppingBag, "配件") },
                    label = { Text("配件") },
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.GridView, "发现") },
                    label = { Text("发现") },
                    selected = selectedTab == 3,
                    onClick = { selectedTab = 3 }
                )
            }
        }
    ) { padding ->
        Box(modifier = Modifier.padding(padding)) {
            when (selectedTab) {
                0 -> HomeScreen()
                1 -> BikesScreen()
                2 -> AccessoriesScreen()
                3 -> FeedScreen()
            }
        }
    }
}

@Composable
fun HomeScreen() {
    LazyColumn {
        item {
            // 英雄海报
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(400.dp)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(Color(0xFF667EEA), Color(0xFF764BA2))
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Text(
                        text = "征服每一座山峰",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        text = "专业级山地车，为极限而生",
                        fontSize = 16.sp,
                        color = Color.White.copy(alpha = 0.9f)
                    )
                    Button(
                        onClick = {},
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color.White,
                            contentColor = Color(0xFF667EEA)
                        ),
                        shape = RoundedCornerShape(25.dp)
                    ) {
                        Text(
                            text = "立即探索",
                            fontSize = 16.sp,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.padding(horizontal = 24.dp, vertical = 4.dp)
                        )
                    }
                }
            }
        }
        
        item {
            Spacer(modifier = Modifier.height(24.dp))
            
            // 爆款推荐标题
            Row(
                modifier = Modifier.padding(horizontal = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = "爆款热销",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = Color(0xFFF5576C)
                ) {
                    Text(
                        text = "HOT",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(16.dp))
        }
        
        item {
            // 爆款推荐横向滚动
            LazyRow(
                contentPadding = PaddingValues(horizontal = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    FeaturedBikeCard(
                        title = "Thunder Pro 碳纤维",
                        subtitle = "销量突破10000+台",
                        price = "¥18,999",
                        oldPrice = "¥24,999",
                        tag = "年度爆款",
                        isHot = true
                    )
                }
                item {
                    FeaturedBikeCard(
                        title = "Storm Elite 电助力",
                        subtitle = "智能电控系统",
                        price = "¥28,999",
                        oldPrice = null,
                        tag = "新品上市",
                        isHot = false
                    )
                }
                item {
                    FeaturedBikeCard(
                        title = "Viper X1 速降车",
                        subtitle = "专业竞技级",
                        price = "¥42,999",
                        oldPrice = null,
                        tag = "新品上市",
                        isHot = false
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(24.dp))
        }
    }
}

@Composable
fun FeaturedBikeCard(
    title: String,
    subtitle: String,
    price: String,
    oldPrice: String?,
    tag: String,
    isHot: Boolean
) {
    Card(
        modifier = Modifier
            .width(280.dp)
            .padding(vertical = 8.dp),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A1A))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(Color.Gray.copy(alpha = 0.2f))
            ) {
                Surface(
                    shape = RoundedCornerShape(12.dp),
                    color = if (isHot) Color(0xFF667EEA) else Color(0xFFF5576C),
                    modifier = Modifier
                        .align(Alignment.TopStart)
                        .padding(12.dp)
                ) {
                    Text(
                        text = tag,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = Color.White,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                    )
                }
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = title,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            
            Text(
                text = subtitle,
                fontSize = 13.sp,
                color = Color.Gray
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Text(
                    text = price,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color(0xFF667EEA)
                )
                
                oldPrice?.let {
                    Text(
                        text = it,
                        fontSize = 13.sp,
                        color = Color.Gray,
                        textDecoration = TextDecoration.LineThrough
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BikesScreen() {
    val bikes = listOf(
        Triple("XC竞速系列", "轻量化碳纤维车架", "¥15,999"),
        Triple("Trail全能系列", "150mm行程避震", "¥22,999"),
        Triple("Enduro极限系列", "180mm双避震系统", "¥35,999")
    )
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("精选车型") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1A1A1A)
                )
            )
        }
    ) { padding ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            contentPadding = PaddingValues(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.padding(padding)
        ) {
            items(bikes) { bike ->
                BikeCard(name = bike.first, desc = bike.second, price = bike.third)
            }
        }
    }
}

@Composable
fun BikeCard(name: String, desc: String, price: String) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A1A))
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(120.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.Gray.copy(alpha = 0.2f))
            )
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = name,
                fontSize = 14.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            
            Text(
                text = desc,
                fontSize = 11.sp,
                color = Color.Gray
            )
            
            Spacer(modifier = Modifier.height(6.dp))
            
            Text(
                text = price,
                fontSize = 16.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF667EEA)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AccessoriesScreen() {
    val accessories = listOf(
        listOf("🧤", "专业手套", "防滑透气", "¥299"),
        listOf("⌚", "运动手表", "GPS定位", "¥1,299"),
        listOf("🕶️", "骑行眼镜", "防紫外线", "¥599"),
        listOf("🎽", "速干衣", "排汗快干", "¥399"),
        listOf("🪖", "安全头盔", "轻量防护", "¥899"),
        listOf("👟", "锁鞋", "专业锁踏", "¥799")
    )
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("骑行装备") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1A1A1A)
                )
            )
        }
    ) { padding ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            contentPadding = PaddingValues(16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            modifier = Modifier.padding(padding)
        ) {
            items(accessories) { item ->
                AccessoryCard(
                    icon = item[0],
                    name = item[1],
                    desc = item[2],
                    price = item[3]
                )
            }
        }
    }
}

@Composable
fun AccessoryCard(icon: String, name: String, desc: String, price: String) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A1A))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Text(text = icon, fontSize = 36.sp)
            Text(
                text = name,
                fontSize = 12.sp,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            Text(
                text = desc,
                fontSize = 10.sp,
                color = Color.Gray
            )
            Text(
                text = price,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = Color(0xFF667EEA)
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FeedScreen() {
    val feeds = listOf(
        listOf("车型推荐", "2024年度最佳山地车TOP10", "12.5k", "328"),
        listOf("热门话题", "川藏线骑行攻略完整版", "28.3k", "892"),
        listOf("产品服务", "免费保养服务升级", "8.9k", "156"),
        listOf("车型推荐", "新手入门车型选购指南", "15.7k", "445"),
        listOf("热门话题", "骑行减肥30天挑战", "35.2k", "1.2k"),
        listOf("产品服务", "以旧换新活动开启", "19.8k", "567")
    )
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("发现更多") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color(0xFF1A1A1A)
                )
            )
        }
    ) { padding ->
        LazyColumn(
            contentPadding = PaddingValues(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.padding(padding)
        ) {
            items(feeds) { feed ->
                FeedCard(
                    tag = feed[0],
                    title = feed[1],
                    views = feed[2],
                    comments = feed[3]
                )
            }
        }
    }
}

@Composable
fun FeedCard(tag: String, title: String, views: String, comments: String) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1A1A1A))
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(90.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.Gray.copy(alpha = 0.2f))
            )
            
            Column(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = if (tag == "热门话题") 
                        Color(0xFFF5576C).copy(alpha = 0.2f) 
                    else 
                        Color(0xFF667EEA).copy(alpha = 0.2f)
                ) {
                    Text(
                        text = tag,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = if (tag == "热门话题") Color(0xFFF5576C) else Color(0xFF667EEA),
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 4.dp)
                    )
                }
                
                Text(
                    text = title,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color.White,
                    maxLines = 2
                )
                
                Row(horizontalArrangement = Arrangement.spacedBy(16.dp)) {
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Icon(
                            Icons.Default.Visibility,
                            contentDescription = null,
                            tint = Color.Gray,
                            modifier = Modifier.size(14.dp)
                        )
                        Text(text = views, fontSize = 11.sp, color = Color.Gray)
                    }
                    Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                        Icon(
                            Icons.Default.ChatBubble,
                            contentDescription = null,
                            tint = Color.Gray,
                            modifier = Modifier.size(14.dp)
                        )
                        Text(text = comments, fontSize = 11.sp, color = Color.Gray)
                    }
                }
            }
        }
    }
}
