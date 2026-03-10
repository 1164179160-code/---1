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
  PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.55; // 卡片更窄
const CARD_HEIGHT = 260;

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
      {/* 顶部导航 */}
      <Animated.View style={[styles.header, { backgroundColor: headerBg }]}>
        <Animated.Text style={[styles.headerLogo, { color: logoColor }]}>极速骑行</Animated.Text>
        <TouchableOpacity style={styles.headerSearch}>
          <Text style={styles.headerSearchIcon}>🔍</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.content}>
        {selectedTab === 0 && <HomeScreen scrollY={scrollY} />}
        {selectedTab === 1 && <EmptyScreen title="分类" />}
        {selectedTab === 2 && <EmptyScreen title="购物车" />}
        {selectedTab === 3 && <EmptyScreen title="我的" />}
      </View>
      
      {/* 底部导航 */}
      <View style={styles.tabBar}>
        <TabItem icon="⚡" label="首页" active={selectedTab === 0} onPress={() => setSelectedTab(0)} />
        <TabItem icon="📋" label="分类" active={selectedTab === 1} onPress={() => setSelectedTab(1)} />
        <TabItem icon="🛒" label="购物车" active={selectedTab === 2} onPress={() => setSelectedTab(2)} />
        <TabItem icon="👤" label="我的" active={selectedTab === 3} onPress={() => setSelectedTab(3)} />
      </View>
    </SafeAreaView>
  );
}

function TabItem({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress}>
      <Text style={[styles.tabItemIcon, active && styles.tabItemIconActive]}>{icon}</Text>
      <Text style={[styles.tabItemLabel, active && styles.tabItemLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ scrollY }: any) {
  return (
    <Animated.ScrollView
      style={styles.scrollView}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* Banner */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
        style={styles.banner}
      >
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerSmall}>承包一座山峰</Text>
          <Text style={styles.bannerTitle}>征服每一座山峰</Text>
          <Text style={styles.bannerDesc}>专业级山地车，为极限而生</Text>
          <TouchableOpacity style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>立即探索</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 分类Tab */}
      <View style={styles.categoryTabs}>
        <TouchableOpacity style={styles.categoryTabActive}>
          <Text style={styles.categoryTabTextActive}>推荐</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryTabText}>热卖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryTab}>
          <Text style={styles.categoryTabText}>新品</Text>
        </TouchableOpacity>
      </View>

      {/* 车型入口 */}
      <View style={styles.bikeTypes}>
        <View style={styles.bikeTypeRow}>
          <BikeType image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80" label="越野车" />
          <BikeType image="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80" label="公路车" />
        </View>
        <View style={styles.bikeTypeRow}>
          <BikeType image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80" label="E-Bike" />
          <BikeType image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" label="儿童车" />
        </View>
      </View>

      {/* 周周上新 - 杂志翻页效果 */}
      <View style={styles.weeklySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>周周上新</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <MagazineCards />
      </View>

      {/* TREK品牌 */}
      <View style={styles.brandSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TREK</Text>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>品牌专区</Text>
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.brandCard}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80' }}
            style={styles.brandCardImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.brandCardOverlay}>
              <Text style={styles.brandCardTitle}>TREK Domane AL 2</Text>
              <Text style={styles.brandCardSubtitle}>铝合金车架 · 舒适耐用</Text>
            </View>
          </ImageBackground>
          <View style={styles.brandCardFooter}>
            <View>
              <Text style={styles.brandCardPrice}>¥4,999 <Text style={styles.brandCardUnit}>起</Text></Text>
              <Text style={styles.brandCardOldPrice}>¥5,999</Text>
            </View>
            <TouchableOpacity style={styles.brandCardButton}>
              <Text style={styles.brandCardButtonText}>查看详情</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* 爆款好货 */}
      <View style={styles.hotSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>爆款好货</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productRow}>
          <ProductCard
            image="https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
        <View style={styles.productRow}>
          <ProductCard
            image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80"
            name="Madone SLR 9 Gen 8"
            desc="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </Animated.ScrollView>
  );
}

function BikeType({ image, label }: any) {
  return (
    <TouchableOpacity style={styles.bikeTypeCard}>
      <ImageBackground source={{ uri: image }} style={styles.bikeTypeImage} imageStyle={{ borderRadius: 12 }}>
        <View style={styles.bikeTypeOverlay}>
          <Text style={styles.bikeTypeLabel}>{label}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

// 杂志翻页卡片组件 - 真正丝滑版
function MagazineCards() {
  const cards = [
    {
      id: 1,
      category: '手套',
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80',
      title: '专业骑行手套',
      desc: '防滑透气 · 舒适耐用',
      price: '299',
    },
    {
      id: 2,
      category: '手表',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      title: '智能运动手表',
      desc: 'GPS定位 · 心率监测',
      price: '1,299',
    },
    {
      id: 3,
      category: '眼镜',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80',
      title: '偏光骑行眼镜',
      desc: '防紫外线 · 高清视野',
      price: '599',
    },
    {
      id: 4,
      category: '头盔',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      title: '安全骑行头盔',
      desc: '轻量化 · 高强度防护',
      price: '899',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // 切换到指定索引 - 使用 useNativeDriver
  const switchToIndex = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    
    Animated.spring(scrollX, {
      toValue: targetIndex * CARD_WIDTH,
      tension: 100,
      friction: 10,
      useNativeDriver: true, // 关键：使用原生驱动
    }).start();
    
    setCurrentIndex(targetIndex);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 5,
      onPanResponderMove: (_, gesture) => {
        const newValue = currentIndex * CARD_WIDTH - gesture.dx;
        scrollX.setValue(newValue);
      },
      onPanResponderRelease: (_, gesture) => {
        const threshold = CARD_WIDTH * 0.3;
        let targetIndex = currentIndex;
        
        if (gesture.dx < -threshold && currentIndex < cards.length - 1) {
          targetIndex = currentIndex + 1;
        } else if (gesture.dx > threshold && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        }
        
        Animated.spring(scrollX, {
          toValue: targetIndex * CARD_WIDTH,
          tension: 100,
          friction: 10,
          useNativeDriver: true,
        }).start();
        
        setCurrentIndex(targetIndex);
      },
    })
  ).current;

  return (
    <View style={styles.magazineWrapper}>
      {/* 左侧分类列表 */}
      <View style={styles.categoryList}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={card.id}
            style={styles.categoryItem}
            onPress={() => switchToIndex(index)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.categoryItemText,
              index === currentIndex && styles.categoryItemTextActive
            ]}>
              {card.category}
            </Text>
            {index === currentIndex && <View style={styles.categoryItemDot} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* 卡片容器 */}
      <View style={styles.magazineContainer} {...panResponder.panHandlers}>
        {cards.map((card, index) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-50, 0, 50],
            extrapolate: 'clamp',
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.82, 1, 0.88],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.25, 1, 0.4],
            extrapolate: 'clamp',
          });

          const rotateZ = scrollX.interpolate({
            inputRange,
            outputRange: ['-5deg', '0deg', '4deg'],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [15, 0, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={card.id}
              style={[
                styles.magazineCard,
                {
                  zIndex: cards.length - Math.abs(index - currentIndex),
                  opacity,
                  transform: [
                    { translateX },
                    { translateY },
                    { scale },
                    { rotateZ },
                  ],
                },
              ]}
            >
              <ImageBackground
                source={{ uri: card.image }}
                style={styles.magazineCardImage}
                imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <View style={styles.magazineCardContent}>
                <Text style={styles.magazineCardTitle}>{card.title}</Text>
                <Text style={styles.magazineCardDesc}>{card.desc}</Text>
                <Text style={styles.magazineCardPrice}>¥{card.price}</Text>
              </View>
            </Animated.View>
          );
        })}
        
        {/* 指示器 */}
        <View style={styles.magazineIndicator}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.magazineIndicatorDot,
                index === currentIndex && styles.magazineIndicatorDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function ProductCard({ image, name, desc, price, unit, reviews }: any) {
  return (
    <TouchableOpacity style={styles.productCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.productCardImage}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View style={styles.productCardColors}>
          <View style={[styles.productCardColor, { backgroundColor: '#2c3e50' }]} />
          <View style={[styles.productCardColor, { backgroundColor: '#e74c3c' }]} />
          <View style={[styles.productCardColor, { backgroundColor: '#3498db' }]} />
        </View>
      </ImageBackground>
      <View style={styles.productCardContent}>
        <Text style={styles.productCardName} numberOfLines={1}>{name}</Text>
        <Text style={styles.productCardDesc} numberOfLines={1}>{desc}</Text>
        <View style={styles.productCardFooter}>
          <View>
            <Text style={styles.productCardPrice}>¥{price} <Text style={styles.productCardUnit}>{unit}</Text></Text>
            <Text style={styles.productCardReviews}>{reviews}条评价</Text>
          </View>
          <TouchableOpacity style={styles.productCardButton}>
            <Text style={styles.productCardButtonText}>BETA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EmptyScreen({ title }: any) {
  return (
    <View style={styles.emptyScreen}>
      <Text style={styles.emptyScreenText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  
  // Header
  header: {
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
  headerLogo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSearch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSearchIcon: {
    fontSize: 16,
  },
  
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  
  // Banner
  banner: {
    width: width,
    height: 240,
  },
  bannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
    paddingTop: 80,
  },
  bannerSmall: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    letterSpacing: 2,
  },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  bannerDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  bannerButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  
  // Category Tabs
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
  },
  categoryTabActive: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 12,
    backgroundColor: '#000',
    borderRadius: 16,
  },
  categoryTabText: {
    fontSize: 13,
    color: '#666',
  },
  categoryTabTextActive: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  
  // Bike Types
  bikeTypes: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  bikeTypeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bikeTypeCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  bikeTypeImage: {
    width: '100%',
    height: 100,
  },
  bikeTypeOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  bikeTypeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  
  // Section
  weeklySection: {
    marginBottom: 24,
  },
  brandSection: {
    marginBottom: 24,
  },
  hotSection: {
    marginBottom: 24,
  },
  sectionHeader: {
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
  sectionMore: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  
  // Magazine Cards
  magazineWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
    paddingLeft: 16,
  },
  categoryList: {
    paddingTop: 20,
    paddingRight: 30, // 增加间距
    justifyContent: 'flex-start',
  },
  categoryItem: {
    marginBottom: 24, // 增加间距
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItemText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '400',
  },
  categoryItemTextActive: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  categoryItemDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginLeft: 6,
  },
  magazineContainer: {
    flex: 1,
    height: CARD_HEIGHT + 60,
    position: 'relative',
  },
  magazineCard: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  magazineCardImage: {
    width: '100%',
    height: 180,
  },
  magazineCardContent: {
    padding: 16,
  },
  magazineCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  magazineCardDesc: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  magazineCardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  magazineIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  magazineIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  magazineIndicatorDotActive: {
    width: 20,
    backgroundColor: '#000',
  },
  
  // Brand
  brandBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  brandBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  brandCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  brandCardImage: {
    width: '100%',
    height: 160,
  },
  brandCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  brandCardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  brandCardSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  brandCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  brandCardPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  brandCardUnit: {
    fontSize: 13,
    fontWeight: 'normal',
  },
  brandCardOldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  brandCardButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  brandCardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  
  // Products
  productRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  productCardImage: {
    width: '100%',
    height: 140,
  },
  productCardColors: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  productCardColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  productCardContent: {
    padding: 12,
  },
  productCardName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productCardDesc: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  productCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  productCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  productCardUnit: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  productCardReviews: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  productCardButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  productCardButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.4,
  },
  tabItemIconActive: {
    opacity: 1,
  },
  tabItemLabel: {
    fontSize: 10,
    color: '#999',
  },
  tabItemLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  
  // Empty
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyScreenText: {
    fontSize: 16,
    color: '#999',
  },
});
