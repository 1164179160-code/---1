import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {selectedTab === 0 && <HomeScreen />}
        {selectedTab === 1 && <BikesScreen />}
        {selectedTab === 2 && <AccessoriesScreen />}
        {selectedTab === 3 && <ProfileScreen />}
      </View>
      
      <View style={styles.tabBar}>
        <TabButton icon="🏠" label="首页" active={selectedTab === 0} onPress={() => setSelectedTab(0)} />
        <TabButton icon="🚴" label="车型" active={selectedTab === 1} onPress={() => setSelectedTab(1)} />
        <TabButton icon="🛍️" label="配件" active={selectedTab === 2} onPress={() => setSelectedTab(2)} />
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

function HomeScreen() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* 顶部导航 */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>极速骑行</Text>
        <TouchableOpacity style={styles.searchIcon}>
          <Text style={styles.searchIconText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* 英雄海报 */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
        style={styles.heroBanner}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.heroBannerOverlay}>
          <Text style={styles.heroBannerSubtitle}>承包一座山峰</Text>
          <Text style={styles.heroBannerTitle}>征服每一座山峰</Text>
          <Text style={styles.heroBannerDesc}>专业级山地车，为极限而生</Text>
          <TouchableOpacity style={styles.heroBannerButton}>
            <Text style={styles.heroBannerButtonText}>立即探索</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 周边分类 */}
      <View style={styles.categorySection}>
        <CategoryItem image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80" label="越野车" />
        <CategoryItem image="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80" label="公路车" />
        <CategoryItem image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80" label="E-Bike" />
        <CategoryItem image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80" label="儿童车" />
      </View>

      {/* 周边上新 */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>周边上新</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <NewProductCard
            image="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&q=80"
            title="专业骑行手套"
            subtitle="防滑透气"
            price="299"
          />
          <NewProductCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
            title="智能运动手表"
            subtitle="GPS定位"
            price="1,299"
          />
          <NewProductCard
            image="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80"
            title="偏光骑行眼镜"
            subtitle="防紫外线"
            price="599"
          />
        </ScrollView>
      </View>

      {/* TREK品牌专区 */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TREK</Text>
          <View style={styles.brandBadge}>
            <Text style={styles.brandBadgeText}>品牌专区</Text>
          </View>
          <TouchableOpacity style={styles.sectionMoreRight}>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <BrandCard
          image="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80"
          model="TREK Domane AL 2"
          subtitle="铝合金车架 · 舒适耐用"
          price="4,999"
          originalPrice="5,999"
        />
      </View>

      {/* 爆款好货 */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>爆款好货</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看更多 →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productGrid}>
          <ProductCard
            image="https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80"
            model="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80"
            model="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
        <View style={styles.productGrid}>
          <ProductCard
            image="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80"
            model="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
          <ProductCard
            image="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80"
            model="Madone SLR 9 Gen 8"
            subtitle="碳纤维车架 · 专业竞速"
            price="199"
            unit="万起"
            reviews="36"
          />
        </View>
      </View>
    </ScrollView>
  );
}

function CategoryItem({ image, label }: any) {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <ImageBackground source={{ uri: image }} style={styles.categoryImage} imageStyle={{ borderRadius: 12 }}>
        <View style={styles.categoryOverlay} />
      </ImageBackground>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function NewProductCard({ image, title, subtitle, price }: any) {
  return (
    <TouchableOpacity style={styles.newProductCard}>
      <ImageBackground source={{ uri: image }} style={styles.newProductImage} imageStyle={{ borderRadius: 12 }} />
      <Text style={styles.newProductTitle}>{title}</Text>
      <Text style={styles.newProductSubtitle}>{subtitle}</Text>
      <Text style={styles.newProductPrice}>¥{price}</Text>
    </TouchableOpacity>
  );
}

function BrandCard({ image, model, subtitle, price, originalPrice }: any) {
  return (
    <TouchableOpacity style={styles.brandCard}>
      <ImageBackground source={{ uri: image }} style={styles.brandCardImage} imageStyle={{ borderRadius: 16 }}>
        <View style={styles.brandCardOverlay}>
          <Text style={styles.brandCardModel}>{model}</Text>
          <Text style={styles.brandCardSubtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>
      <View style={styles.brandCardFooter}>
        <View>
          <Text style={styles.brandCardPrice}>¥{price} <Text style={styles.brandCardUnit}>起</Text></Text>
          <Text style={styles.brandCardOriginalPrice}>¥{originalPrice}</Text>
        </View>
        <TouchableOpacity style={styles.brandCardButton}>
          <Text style={styles.brandCardButtonText}>查看详情</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function ProductCard({ image, model, subtitle, price, unit, reviews }: any) {
  return (
    <TouchableOpacity style={styles.productCard}>
      <ImageBackground source={{ uri: image }} style={styles.productCardImage} imageStyle={{ borderRadius: 12 }}>
        <View style={styles.colorDots}>
          <View style={[styles.colorDot, { backgroundColor: '#333' }]} />
          <View style={[styles.colorDot, { backgroundColor: '#e74c3c' }]} />
          <View style={[styles.colorDot, { backgroundColor: '#3498db' }]} />
        </View>
      </ImageBackground>
      <Text style={styles.productCardModel}>{model}</Text>
      <Text style={styles.productCardSubtitle}>{subtitle}</Text>
      <View style={styles.productCardFooter}>
        <View>
          <Text style={styles.productCardPrice}>¥{price} <Text style={styles.productCardUnit}>{unit}</Text></Text>
          <Text style={styles.productCardReviews}>{reviews}条评价</Text>
        </View>
        <TouchableOpacity style={styles.productCardButton}>
          <Text style={styles.productCardButtonText}>BETA</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function BikesScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>全部车型</Text>
      <Text style={styles.comingSoon}>更多车型即将上线...</Text>
    </ScrollView>
  );
}

function AccessoriesScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>全部配件</Text>
      <Text style={styles.comingSoon}>更多配件即将上线...</Text>
    </ScrollView>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>个人中心</Text>
      <Text style={styles.comingSoon}>功能开发中...</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    padding: 20,
  },
  comingSoon: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 100,
  },
  
  // 顶部导航
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  searchIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIconText: {
    fontSize: 18,
  },
  
  // 英雄海报
  heroBanner: {
    height: 200,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroBannerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'center',
  },
  heroBannerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
    letterSpacing: 1,
  },
  heroBannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  heroBannerDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  heroBannerButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroBannerButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  
  // 分类
  categorySection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryItem: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  categoryOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  
  // 区块容器
  sectionContainer: {
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
  brandBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  brandBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '500',
  },
  sectionMoreRight: {
    marginLeft: 'auto',
  },
  sectionMore: {
    fontSize: 12,
    color: '#999',
    marginLeft: 'auto',
  },
  
  // 横向滚动
  horizontalScroll: {
    paddingLeft: 16,
  },
  
  // 新品卡片
  newProductCard: {
    width: 120,
    marginRight: 12,
  },
  newProductImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
  },
  newProductTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  newProductSubtitle: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  newProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  
  // 品牌卡片
  brandCard: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  brandCardImage: {
    width: '100%',
    height: 180,
  },
  brandCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  brandCardModel: {
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: 'normal',
  },
  brandCardOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  brandCardButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  brandCardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 产品网格
  productGrid: {
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
    height: 160,
    padding: 8,
  },
  colorDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 8,
    left: 8,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  productCardModel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 12,
    marginTop: 8,
  },
  productCardSubtitle: {
    fontSize: 11,
    color: '#999',
    paddingHorizontal: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  productCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  productCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  productCardUnit: {
    fontSize: 12,
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
    paddingVertical: 4,
    borderRadius: 12,
  },
  productCardButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  
  // 底部导航
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 4,
    opacity: 0.5,
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
});
