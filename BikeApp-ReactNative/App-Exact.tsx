import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerBg = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(0,0,0,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
  });

  const logoColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(255,255,255,1)', 'rgba(0,0,0,1)'],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航 - 滚动变色 */}
      <Animated.View style={[styles.topNav, { backgroundColor: headerBg }]}>
        <Animated.Text style={[styles.navLogo, { color: logoColor }]}>极速骑行</Animated.Text>
        <TouchableOpacity style={styles.navSearch}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.content}>
        {selectedTab === 0 && <HomeScreen scrollY={scrollY} />}
        {selectedTab === 1 && <OtherScreen title="分类" />}
        {selectedTab === 2 && <OtherScreen title="购物车" />}
        {selectedTab === 3 && <OtherScreen title="我的" />}
      </View>
      
      {/* 底部导航 */}
      <View style={styles.bottomNav}>
        <NavItem icon="⚡" label="首页" active={selectedTab === 0} onPress={() => setSelectedTab(0)} />
        <NavItem icon="📋" label="分类" active={selectedTab === 1} onPress={() => setSelectedTab(1)} />
        <NavItem icon="🛒" label="购物车" active={selectedTab === 2} onPress={() => setSelectedTab(2)} />
        <NavItem icon="👤" label="我的" active={selectedTab === 3} onPress={() => setSelectedTab(3)} />
      </View>
    </SafeAreaView>
  );
}

function NavItem({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ scrollY }: any) {
  return (
    <Animated.ScrollView
      style={styles.homeScroll}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* 顶部大Banner */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
        style={styles.heroBanner}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroSmall}>承包一座山峰</Text>
          <Text style={styles.heroTitle}>征服每一座山峰</Text>
          <Text style={styles.heroDesc}>专业级山地车，为极限而生</Text>
          <TouchableOpacity style={styles.heroBtn}>
            <Text style={styles.heroBtnText}>立即探索</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 分类标签 */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>推荐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>热卖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>新品</Text>
        </TouchableOpacity>
      </View>

      {/* 车型入口 4宫格 */}
      <View style={styles.gridSection}>
        <View style={styles.gridRow}>
          <GridItem image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80" label="越野车" />
          <GridItem image="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80" label="公路车" />
        </View>
        <View style={styles.gridRow}>
          <GridItem image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80" label="E-Bike" />
          <GridItem image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" label="儿童车" />
        </View>
      </View>

      {/* 周周上新 */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>周周上新</Text>
          <Text style={styles.sectionMore}>查看更多 →</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.75}
          decelerationRate="fast"
          contentContainerStyle={styles.cardScroll}
        >
          <NewCard
            image="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80"
            title="专业骑行手套"
            desc="防滑透气 · 舒适耐用"
            price="299"
          />
          <NewCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
            title="智能运动手表"
            desc="GPS定位 · 心率监测"
            price="1,299"
          />
          <NewCard
            image="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80"
            title="偏光骑行眼镜"
            desc="防紫外线 · 高清视野"
            price="599"
          />
        </ScrollView>
      </View>

      {/* TREK品牌 */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>TREK</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>品牌专区</Text>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.sectionMore}>查看更多 →</Text>
        </View>
        <TouchableOpacity style={styles.brandBox}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80' }}
            style={styles.brandImg}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.brandInfo}>
              <Text style={styles.brandModel}>TREK Domane AL 2</Text>
              <Text style={styles.brandDesc}>铝合金车架 · 舒适耐用</Text>
            </View>
          </ImageBackground>
          <View style={styles.brandFoot}>
            <View>
              <Text style={styles.brandPrice}>¥4,999 <Text style={styles.brandUnit}>起</Text></Text>
              <Text style={styles.brandOld}>¥5,999</Text>
            </View>
            <TouchableOpacity style={styles.brandBtn}>
              <Text style={styles.brandBtnText}>查看详情</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* 爆款好货 */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>爆款好货</Text>
          <Text style={styles.sectionMore}>查看更多 →</Text>
        </View>
        <View style={styles.prodRow}>
          <ProdCard
            image="https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProdCard
            image="https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
        <View style={styles.prodRow}>
          <ProdCard
            image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProdCard
            image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
      </View>

      <View style={{ height: 30 }} />
    </Animated.ScrollView>
  );
}

function GridItem({ image, label }: any) {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <ImageBackground source={{ uri: image }} style={styles.gridImg} imageStyle={{ borderRadius: 12 }}>
        <View style={styles.gridMask}>
          <Text style={styles.gridLabel}>{label}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function NewCard({ image, title, desc, price }: any) {
  return (
    <View style={styles.newCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.newImg}
        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <View style={styles.newInfo}>
        <Text style={styles.newTitle}>{title}</Text>
        <Text style={styles.newDesc}>{desc}</Text>
        <Text style={styles.newPrice}>¥{price}</Text>
      </View>
    </View>
  );
}

function ProdCard({ image, name, desc, price, unit, reviews }: any) {
  return (
    <TouchableOpacity style={styles.prodCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.prodImg}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: '#2c3e50' }]} />
          <View style={[styles.dot, { backgroundColor: '#e74c3c' }]} />
          <View style={[styles.dot, { backgroundColor: '#3498db' }]} />
        </View>
      </ImageBackground>
      <View style={styles.prodInfo}>
        <Text style={styles.prodName} numberOfLines={1}>{name}</Text>
        <Text style={styles.prodDesc} numberOfLines={1}>{desc}</Text>
        <View style={styles.prodFoot}>
          <View>
            <Text style={styles.prodPrice}>¥{price} <Text style={styles.prodUnit}>{unit}</Text></Text>
            <Text style={styles.prodReviews}>{reviews}条评价</Text>
          </View>
          <TouchableOpacity style={styles.prodBtn}>
            <Text style={styles.prodBtnText}>BETA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function OtherScreen({ title }: any) {
  return (
    <View style={styles.other}>
      <Text style={styles.otherText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  
  // 顶部导航
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 44,
    paddingBottom: 12,
  },
  navLogo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navSearch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  content: {
    flex: 1,
  },
  homeScroll: {
    flex: 1,
  },
  
  // Hero Banner
  heroBanner: {
    width: width,
    height: 240,
    marginBottom: 0,
  },
  heroContent: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    paddingTop: 80,
  },
  heroSmall: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  
  // 标签
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
  },
  tabActive: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
    backgroundColor: '#000',
    borderRadius: 16,
  },
  tabText: {
    fontSize: 13,
    color: '#666',
  },
  tabTextActive: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  
  // 4宫格
  gridSection: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  gridImg: {
    width: '100%',
    height: 100,
  },
  gridMask: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  gridLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 区块
  section: {
    marginBottom: 24,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  badge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  sectionMore: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  
  // 周周上新
  cardScroll: {
    paddingLeft: 16,
  },
  newCard: {
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  newImg: {
    width: '100%',
    height: 200,
  },
  newInfo: {
    padding: 16,
  },
  newTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  newDesc: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  newPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  
  // 品牌
  brandBox: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  brandImg: {
    width: '100%',
    height: 160,
  },
  brandInfo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  brandModel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  brandDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  brandFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  brandPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  brandUnit: {
    fontSize: 13,
    fontWeight: 'normal',
  },
  brandOld: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  brandBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  brandBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 产品
  prodRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  prodCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  prodImg: {
    width: '100%',
    height: 140,
  },
  dots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  prodInfo: {
    padding: 12,
  },
  prodName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  prodDesc: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  prodFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  prodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  prodUnit: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  prodReviews: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  prodBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  prodBtnText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 底部导航
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    paddingBottom: 20,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.4,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 10,
    color: '#999',
  },
  navLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  
  // 其他页面
  other: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherText: {
    fontSize: 16,
    color: '#999',
  },
});
