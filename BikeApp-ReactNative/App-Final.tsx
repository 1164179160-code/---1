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
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = 16;

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* 顶部导航栏 - 滚动时变色 */}
      <Animated.View style={[styles.header, { backgroundColor: headerOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)']
      })}]}>
        <View style={styles.headerContent}>
          <Text style={styles.logo}>极速骑行</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.content}>
        {selectedTab === 0 && <HomeScreen scrollY={scrollY} />}
        {selectedTab === 1 && <CategoryScreen />}
        {selectedTab === 2 && <CartScreen />}
        {selectedTab === 3 && <ProfileScreen />}
      </View>
      
      {/* 底部导航栏 */}
      <View style={styles.tabBar}>
        <TabButton icon="⚡" label="首页" active={selectedTab === 0} onPress={() => setSelectedTab(0)} />
        <TabButton icon="📋" label="分类" active={selectedTab === 1} onPress={() => setSelectedTab(1)} />
        <TabButton icon="🛒" label="购物车" active={selectedTab === 2} onPress={() => setSelectedTab(2)} />
        <TabButton icon="👤" label="我的" active={selectedTab === 3} onPress={() => setSelectedTab(3)} />
      </View>
    </SafeAreaView>
  );
}

function TabButton({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Text style={[styles.tabIcon, active && styles.tabIconActive]}>{icon}</Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function HomeScreen({ scrollY }: any) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const categories = ['推荐', '热卖', '新品'];

  return (
    <Animated.ScrollView 
      style={styles.screen} 
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* Banner区域 */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
          style={styles.banner}
          imageStyle={{ borderRadius: 0 }}
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerSubtitle}>承包一座山峰</Text>
            <Text style={styles.bannerTitle}>征服每一座山峰</Text>
            <Text style={styles.bannerDesc}>专业级山地车，为极限而生</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>立即探索</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* 类目切换 */}
        <View style={styles.categoryTabs}>
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryTab, selectedCategory === index && styles.categoryTabActive]}
              onPress={() => setSelectedCategory(index)}
            >
              <Text style={[styles.categoryTabText, selectedCategory === index && styles.categoryTabTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 车型入口 */}
      <View style={styles.bikeTypesSection}>
        <View style={styles.bikeTypesRow}>
          <BikeTypeCard
            image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80"
            label="越野车"
          />
          <BikeTypeCard
            image="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80"
            label="公路车"
          />
        </View>
        <View style={styles.bikeTypesRow}>
          <BikeTypeCard
            image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80"
            label="E-Bike"
          />
          <BikeTypeCard
            image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80"
            label="儿童车"
          />
        </View>
      </View>

      {/* 周周上新 - 卡片堆叠效果 */}
      <View style={styles.weeklyNewSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>周周上新</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + CARD_SPACING}
          decelerationRate="fast"
          contentContainerStyle={styles.weeklyNewScroll}
        >
          <WeeklyNewCard
            image="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&q=80"
            title="专业骑行手套"
            subtitle="防滑透气 · 舒适耐用"
            price="299"
          />
          <WeeklyNewCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
            title="智能运动手表"
            subtitle="GPS定位 · 心率监测"
            price="1,299"
          />
          <WeeklyNewCard
            image="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80"
            title="偏光骑行眼镜"
            subtitle="防紫外线 · 高清视野"
            price="599"
          />
        </ScrollView>
      </View>

      {/* TREK品牌专区 */}
      <View style={styles.brandSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TREK</Text>
          <View style={styles.brandTag}>
            <Text style={styles.brandTagText}>品牌专区</Text>
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
            <View style={styles.brandCardContent}>
              <Text style={styles.brandCardTitle}>TREK Domane AL 2</Text>
              <Text style={styles.brandCardSubtitle}>铝合金车架 · 舒适耐用</Text>
            </View>
          </ImageBackground>
          <View style={styles.brandCardFooter}>
            <View>
              <Text style={styles.brandCardPrice}>¥4,999 <Text style={styles.brandCardUnit}>起</Text></Text>
              <Text style={styles.brandCardOriginal}>¥5,999</Text>
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
            title="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80"
            title="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
        <View style={styles.productRow}>
          <ProductCard
            image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80"
            title="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80"
            title="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
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

function BikeTypeCard({ image, label }: any) {
  return (
    <TouchableOpacity style={styles.bikeTypeCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.bikeTypeImage}
        imageStyle={{ borderRadius: 12 }}
      >
        <View style={styles.bikeTypeOverlay}>
          <Text style={styles.bikeTypeLabel}>{label}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function WeeklyNewCard({ image, title, subtitle, price }: any) {
  return (
    <View style={styles.weeklyNewCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.weeklyNewImage}
        imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <View style={styles.weeklyNewContent}>
        <Text style={styles.weeklyNewTitle}>{title}</Text>
        <Text style={styles.weeklyNewSubtitle}>{subtitle}</Text>
        <Text style={styles.weeklyNewPrice}>¥{price}</Text>
      </View>
    </View>
  );
}

function ProductCard({ image, title, subtitle, price, unit, reviews }: any) {
  return (
    <TouchableOpacity style={styles.productCard}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.productImage}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <View style={styles.colorDots}>
          <View style={[styles.colorDot, { backgroundColor: '#2c3e50' }]} />
          <View style={[styles.colorDot, { backgroundColor: '#e74c3c' }]} />
          <View style={[styles.colorDot, { backgroundColor: '#3498db' }]} />
        </View>
      </ImageBackground>
      <View style={styles.productContent}>
        <Text style={styles.productTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.productSubtitle} numberOfLines={1}>{subtitle}</Text>
        <View style={styles.productFooter}>
          <View>
            <Text style={styles.productPrice}>¥{price} <Text style={styles.productUnit}>{unit}</Text></Text>
            <Text style={styles.productReviews}>{reviews}条评价</Text>
          </View>
          <TouchableOpacity style={styles.productButton}>
            <Text style={styles.productButtonText}>BETA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function CategoryScreen() {
  return (
    <View style={styles.emptyScreen}>
      <Text style={styles.emptyText}>分类页面</Text>
    </View>
  );
}

function CartScreen() {
  return (
    <View style={styles.emptyScreen}>
      <Text style={styles.emptyText}>购物车</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.emptyScreen}>
      <Text style={styles.emptyText}>个人中心</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  
  // 顶部导航
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 44,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
  },
  
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  
  // Banner
  bannerContainer: {
    marginBottom: 16,
  },
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
  bannerSubtitle: {
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
  
  // 类目切换
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
    borderRadius: 16,
  },
  categoryTabActive: {
    backgroundColor: '#000',
  },
  categoryTabText: {
    fontSize: 13,
    color: '#666',
  },
  categoryTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  
  // 车型入口
  bikeTypesSection: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  bikeTypesRow: {
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
  
  // 周周上新
  weeklyNewSection: {
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
  weeklyNewScroll: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  weeklyNewCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: CARD_SPACING,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weeklyNewImage: {
    width: '100%',
    height: 200,
  },
  weeklyNewContent: {
    padding: 16,
  },
  weeklyNewTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  weeklyNewSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  weeklyNewPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  
  // 品牌专区
  brandSection: {
    marginBottom: 24,
  },
  brandTag: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginLeft: 8,
  },
  brandTagText: {
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
  brandCardContent: {
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
  brandCardOriginal: {
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
  
  // 爆款好货
  hotSection: {
    marginBottom: 24,
  },
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
  productImage: {
    width: '100%',
    height: 140,
  },
  colorDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  productContent: {
    padding: 12,
  },
  productTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productSubtitle: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  productUnit: {
    fontSize: 11,
    fontWeight: 'normal',
  },
  productReviews: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  productButton: {
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  productButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 底部导航
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e5e5e5',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
    opacity: 0.4,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#999',
  },
  tabLabelActive: {
    color: '#000',
    fontWeight: '600',
  },
  
  // 空页面
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
