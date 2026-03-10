import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {selectedTab === 0 && <HomeScreen />}
        {selectedTab === 1 && <BikesScreen />}
        {selectedTab === 2 && <AccessoriesScreen />}
        {selectedTab === 3 && <FeedScreen />}
      </View>
      
      <View style={styles.tabBar}>
        <TabButton
          icon="🏠"
          label="首页"
          active={selectedTab === 0}
          onPress={() => setSelectedTab(0)}
        />
        <TabButton
          icon="🚴"
          label="车型"
          active={selectedTab === 1}
          onPress={() => setSelectedTab(1)}
        />
        <TabButton
          icon="🛍️"
          label="配件"
          active={selectedTab === 2}
          onPress={() => setSelectedTab(2)}
        />
        <TabButton
          icon="📱"
          label="发现"
          active={selectedTab === 3}
          onPress={() => setSelectedTab(3)}
        />
      </View>
    </SafeAreaView>
  );
}

function TabButton({ icon, label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
    >
      <Text style={styles.tabIcon}>{icon}</Text>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function HomeScreen() {
  const featuredBikes = [
    {
      title: 'Thunder Pro 碳纤维',
      subtitle: '销量突破10000+台',
      price: '¥18,999',
      oldPrice: '¥24,999',
      tag: '年度爆款',
      isHot: true,
    },
    {
      title: 'Storm Elite 电助力',
      subtitle: '智能电控系统',
      price: '¥28,999',
      tag: '新品上市',
      isHot: false,
    },
    {
      title: 'Viper X1 速降车',
      subtitle: '专业竞技级',
      price: '¥42,999',
      tag: '新品上市',
      isHot: false,
    },
  ];

  return (
    <ScrollView style={styles.screen}>
      {/* 英雄海报 */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>征服每一座山峰</Text>
        <Text style={styles.heroSubtitle}>专业级山地车，为极限而生</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>立即探索</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* 爆款推荐 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>爆款热销</Text>
          <View style={styles.hotBadge}>
            <Text style={styles.hotBadgeText}>HOT</Text>
          </View>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredBikes}
          keyExtractor={(item) => item.title}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => <FeaturedBikeCard {...item} />}
        />
      </View>
    </ScrollView>
  );
}

function FeaturedBikeCard({ title, subtitle, price, oldPrice, tag, isHot }: any) {
  return (
    <View style={styles.featuredCard}>
      <View style={styles.featuredImage}>
        <View style={[styles.tag, isHot ? styles.tagHot : styles.tagNew]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{title}</Text>
        <Text style={styles.featuredSubtitle}>{subtitle}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{price}</Text>
          {oldPrice && (
            <Text style={styles.oldPrice}>{oldPrice}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

function BikesScreen() {
  const bikes = [
    { name: 'XC竞速系列', desc: '轻量化碳纤维车架', price: '¥15,999' },
    { name: 'Trail全能系列', desc: '150mm行程避震', price: '¥22,999' },
    { name: 'Enduro极限系列', desc: '180mm双避震系统', price: '¥35,999' },
  ];

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>精选车型</Text>
      <View style={styles.grid}>
        {bikes.map((bike) => (
          <BikeCard key={bike.name} {...bike} />
        ))}
      </View>
    </ScrollView>
  );
}

function BikeCard({ name, desc, price }: any) {
  return (
    <View style={styles.bikeCard}>
      <View style={styles.bikeImage} />
      <View style={styles.bikeContent}>
        <Text style={styles.bikeName}>{name}</Text>
        <Text style={styles.bikeDesc}>{desc}</Text>
        <Text style={styles.bikePrice}>{price}</Text>
      </View>
    </View>
  );
}

function AccessoriesScreen() {
  const accessories = [
    { icon: '🧤', name: '专业手套', desc: '防滑透气', price: '¥299' },
    { icon: '⌚', name: '运动手表', desc: 'GPS定位', price: '¥1,299' },
    { icon: '🕶️', name: '骑行眼镜', desc: '防紫外线', price: '¥599' },
    { icon: '🎽', name: '速干衣', desc: '排汗快干', price: '¥399' },
    { icon: '🪖', name: '安全头盔', desc: '轻量防护', price: '¥899' },
    { icon: '👟', name: '锁鞋', desc: '专业锁踏', price: '¥799' },
  ];

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>骑行装备</Text>
      <View style={styles.accessoriesGrid}>
        {accessories.map((item) => (
          <AccessoryCard key={item.name} {...item} />
        ))}
      </View>
    </ScrollView>
  );
}

function AccessoryCard({ icon, name, desc, price }: any) {
  return (
    <View style={styles.accessoryCard}>
      <Text style={styles.accessoryIcon}>{icon}</Text>
      <Text style={styles.accessoryName}>{name}</Text>
      <Text style={styles.accessoryDesc}>{desc}</Text>
      <Text style={styles.accessoryPrice}>{price}</Text>
    </View>
  );
}

function FeedScreen() {
  const feeds = [
    { tag: '车型推荐', title: '2024年度最佳山地车TOP10', views: '12.5k', comments: '328' },
    { tag: '热门话题', title: '川藏线骑行攻略完整版', views: '28.3k', comments: '892' },
    { tag: '产品服务', title: '免费保养服务升级', views: '8.9k', comments: '156' },
    { tag: '车型推荐', title: '新手入门车型选购指南', views: '15.7k', comments: '445' },
    { tag: '热门话题', title: '骑行减肥30天挑战', views: '35.2k', comments: '1.2k' },
    { tag: '产品服务', title: '以旧换新活动开启', views: '19.8k', comments: '567' },
  ];

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>发现更多</Text>
      {feeds.map((feed, index) => (
        <FeedCard key={index} {...feed} />
      ))}
    </ScrollView>
  );
}

function FeedCard({ tag, title, views, comments }: any) {
  const isHot = tag === '热门话题';
  
  return (
    <View style={styles.feedCard}>
      <View style={styles.feedImage} />
      <View style={styles.feedContent}>
        <View style={[styles.feedTag, isHot ? styles.feedTagHot : styles.feedTagNormal]}>
          <Text style={[styles.feedTagText, isHot ? styles.feedTagTextHot : styles.feedTagTextNormal]}>
            {tag}
          </Text>
        </View>
        <Text style={styles.feedTitle}>{title}</Text>
        <View style={styles.feedMeta}>
          <Text style={styles.feedMetaText}>👁️ {views}</Text>
          <Text style={styles.feedMetaText}>💬 {comments}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
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
    color: '#fff',
    padding: 20,
  },
  
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: '#999',
  },
  tabLabelActive: {
    color: '#667eea',
  },
  
  // Hero
  hero: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
  },
  
  // Section
  section: {
    paddingVertical: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 12,
  },
  hotBadge: {
    backgroundColor: '#f5576c',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  hotBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  // Featured
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 280,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
  },
  featuredImage: {
    height: 160,
    backgroundColor: '#333',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagHot: {
    backgroundColor: '#667eea',
  },
  tagNew: {
    backgroundColor: '#f5576c',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  featuredSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 13,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  
  // Bikes
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  bikeCard: {
    width: (width - 48) / 2,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
  },
  bikeImage: {
    height: 120,
    backgroundColor: '#333',
  },
  bikeContent: {
    padding: 12,
  },
  bikeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  bikeDesc: {
    fontSize: 11,
    color: '#999',
    marginBottom: 8,
  },
  bikePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
  
  // Accessories
  accessoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },
  accessoryCard: {
    width: (width - 60) / 3,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 6,
    padding: 16,
    alignItems: 'center',
  },
  accessoryIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  accessoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  accessoryDesc: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
    textAlign: 'center',
  },
  accessoryPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
  },
  
  // Feed
  feedCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 16,
    marginTop: 0,
    padding: 16,
  },
  feedImage: {
    width: 90,
    height: 90,
    backgroundColor: '#333',
    borderRadius: 12,
    marginRight: 16,
  },
  feedContent: {
    flex: 1,
  },
  feedTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  feedTagNormal: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
  },
  feedTagHot: {
    backgroundColor: 'rgba(245, 87, 108, 0.2)',
  },
  feedTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  feedTagTextNormal: {
    color: '#667eea',
  },
  feedTagTextHot: {
    color: '#f5576c',
  },
  feedTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  feedMeta: {
    flexDirection: 'row',
  },
  feedMetaText: {
    fontSize: 11,
    color: '#666',
    marginRight: 16,
  },
});
