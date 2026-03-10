import 'package:flutter/material.dart';

void main() {
  runApp(const BikeApp());
}

class BikeApp extends StatelessWidget {
  const BikeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '极速骑行',
      theme: ThemeData.dark().copyWith(
        primaryColor: const Color(0xFF667EEA),
        scaffoldBackgroundColor: const Color(0xFF0A0A0A),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF667EEA),
          secondary: Color(0xFF764BA2),
        ),
      ),
      home: const MainScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const BikesScreen(),
    const AccessoriesScreen(),
    const FeedScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF1A1A1A),
        selectedItemColor: const Color(0xFF667EEA),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
          BottomNavigationBarItem(icon: Icon(Icons.directions_bike), label: '车型'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_bag), label: '配件'),
          BottomNavigationBarItem(icon: Icon(Icons.grid_view), label: '发现'),
        ],
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          // 英雄海报
          Container(
            height: 400,
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [Color(0xFF667EEA), Color(0xFF764BA2)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: SafeArea(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      '征服每一座山峰',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      '专业级山地车，为极限而生',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white70,
                      ),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFF667EEA),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 40,
                          vertical: 16,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(25),
                        ),
                      ),
                      child: const Text(
                        '立即探索',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          
          // 爆款推荐
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text(
                      '爆款热销',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF5576C),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text(
                        'HOT',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                SizedBox(
                  height: 300,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children: const [
                      FeaturedBikeCard(
                        title: 'Thunder Pro 碳纤维',
                        subtitle: '销量突破10000+台',
                        price: '¥18,999',
                        oldPrice: '¥24,999',
                        tag: '年度爆款',
                        isHot: true,
                      ),
                      FeaturedBikeCard(
                        title: 'Storm Elite 电助力',
                        subtitle: '智能电控系统',
                        price: '¥28,999',
                        tag: '新品上市',
                        isHot: false,
                      ),
                      FeaturedBikeCard(
                        title: 'Viper X1 速降车',
                        subtitle: '专业竞技级',
                        price: '¥42,999',
                        tag: '新品上市',
                        isHot: false,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class FeaturedBikeCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final String price;
  final String? oldPrice;
  final String tag;
  final bool isHot;

  const FeaturedBikeCard({
    super.key,
    required this.title,
    required this.subtitle,
    required this.price,
    this.oldPrice,
    required this.tag,
    required this.isHot,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      margin: const EdgeInsets.only(right: 16),
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 160,
            decoration: BoxDecoration(
              color: Colors.grey[800],
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(20),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Align(
                alignment: Alignment.topLeft,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: isHot
                        ? const Color(0xFF667EEA)
                        : const Color(0xFFF5576C),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    tag,
                    style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 6),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 13,
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Text(
                      price,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF667EEA),
                      ),
                    ),
                    if (oldPrice != null) ...[
                      const SizedBox(width: 8),
                      Text(
                        oldPrice!,
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey[700],
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ],
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class BikesScreen extends StatelessWidget {
  const BikesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final bikes = [
      {'name': 'XC竞速系列', 'desc': '轻量化碳纤维车架', 'price': '¥15,999'},
      {'name': 'Trail全能系列', 'desc': '150mm行程避震', 'price': '¥22,999'},
      {'name': 'Enduro极限系列', 'desc': '180mm双避震系统', 'price': '¥35,999'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('精选车型'),
        backgroundColor: const Color(0xFF1A1A1A),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          childAspectRatio: 0.75,
        ),
        itemCount: bikes.length,
        itemBuilder: (context, index) {
          final bike = bikes[index];
          return BikeCard(
            name: bike['name']!,
            desc: bike['desc']!,
            price: bike['price']!,
          );
        },
      ),
    );
  }
}

class BikeCard extends StatelessWidget {
  final String name;
  final String desc;
  final String price;

  const BikeCard({
    super.key,
    required this.name,
    required this.desc,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: Colors.grey[800],
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(16),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(12),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  desc,
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  price,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF667EEA),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class AccessoriesScreen extends StatelessWidget {
  const AccessoriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final accessories = [
      {'icon': '🧤', 'name': '专业手套', 'desc': '防滑透气', 'price': '¥299'},
      {'icon': '⌚', 'name': '运动手表', 'desc': 'GPS定位', 'price': '¥1,299'},
      {'icon': '🕶️', 'name': '骑行眼镜', 'desc': '防紫外线', 'price': '¥599'},
      {'icon': '🎽', 'name': '速干衣', 'desc': '排汗快干', 'price': '¥399'},
      {'icon': '🪖', 'name': '安全头盔', 'desc': '轻量防护', 'price': '¥899'},
      {'icon': '👟', 'name': '锁鞋', 'desc': '专业锁踏', 'price': '¥799'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('骑行装备'),
        backgroundColor: const Color(0xFF1A1A1A),
      ),
      body: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
        ),
        itemCount: accessories.length,
        itemBuilder: (context, index) {
          final item = accessories[index];
          return AccessoryCard(
            icon: item['icon']!,
            name: item['name']!,
            desc: item['desc']!,
            price: item['price']!,
          );
        },
      ),
    );
  }
}

class AccessoryCard extends StatelessWidget {
  final String icon;
  final String name;
  final String desc;
  final String price;

  const AccessoryCard({
    super.key,
    required this.icon,
    required this.name,
    required this.desc,
    required this.price,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(12),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(icon, style: const TextStyle(fontSize: 32)),
          const SizedBox(height: 8),
          Text(
            name,
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
            ),
            textAlign: TextAlign.center,
          ),
          Text(
            desc,
            style: TextStyle(
              fontSize: 9,
              color: Colors.grey[600],
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 4),
          Text(
            price,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: Color(0xFF667EEA),
            ),
          ),
        ],
      ),
    );
  }
}

class FeedScreen extends StatelessWidget {
  const FeedScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final feeds = [
      {'tag': '车型推荐', 'title': '2024年度最佳山地车TOP10', 'views': '12.5k', 'comments': '328'},
      {'tag': '热门话题', 'title': '川藏线骑行攻略完整版', 'views': '28.3k', 'comments': '892'},
      {'tag': '产品服务', 'title': '免费保养服务升级', 'views': '8.9k', 'comments': '156'},
      {'tag': '车型推荐', 'title': '新手入门车型选购指南', 'views': '15.7k', 'comments': '445'},
      {'tag': '热门话题', 'title': '骑行减肥30天挑战', 'views': '35.2k', 'comments': '1.2k'},
      {'tag': '产品服务', 'title': '以旧换新活动开启', 'views': '19.8k', 'comments': '567'},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('发现更多'),
        backgroundColor: const Color(0xFF1A1A1A),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: feeds.length,
        itemBuilder: (context, index) {
          final feed = feeds[index];
          return FeedCard(
            tag: feed['tag']!,
            title: feed['title']!,
            views: feed['views']!,
            comments: feed['comments']!,
          );
        },
      ),
    );
  }
}

class FeedCard extends StatelessWidget {
  final String tag;
  final String title;
  final String views;
  final String comments;

  const FeedCard({
    super.key,
    required this.tag,
    required this.title,
    required this.views,
    required this.comments,
  });

  @override
  Widget build(BuildContext context) {
    final isHot = tag == '热门话题';

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A1A),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          Container(
            width: 90,
            height: 90,
            decoration: BoxDecoration(
              color: Colors.grey[800],
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: isHot
                        ? const Color(0xFFF5576C).withOpacity(0.2)
                        : const Color(0xFF667EEA).withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    tag,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w600,
                      color: isHot
                          ? const Color(0xFFF5576C)
                          : const Color(0xFF667EEA),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.visibility, size: 14, color: Colors.grey[600]),
                    const SizedBox(width: 4),
                    Text(
                      views,
                      style: TextStyle(fontSize: 11, color: Colors.grey[600]),
                    ),
                    const SizedBox(width: 16),
                    Icon(Icons.chat_bubble, size: 14, color: Colors.grey[600]),
                    const SizedBox(width: 4),
                    Text(
                      comments,
                      style: TextStyle(fontSize: 11, color: Colors.grey[600]),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
