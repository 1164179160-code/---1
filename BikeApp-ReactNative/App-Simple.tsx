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
  Image,
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
      id: '1',
      title: 'Thunder Pro 碳纤维',
      subtitle: '销量突破10000+台',
      price: '¥18,999',
      oldPrice: '¥24,999',
      tag: '年度爆款',
      isHot: true,
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
    },
    {
      id: '2',
      title: 'Storm Elite 电助力',
      subtitle: '智能电控系统',
      price: '¥28,999',
      tag: '新品上市',
      isHot: false,
      image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&q=80',
    },
    {
      id: '3',
      title: 'Viper X1 速降车',
      subtitle: '专业竞技级',
      price: '¥42,999',
      tag: '新品上市',
      isHot: false,
      image: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800&q=80',
    },
  ];

  const bikeModels = [
    {
      id: '1',
      name: 'XC竞速系列',
      desc: '轻量化碳纤维车架',
      price: '¥15,999',
      image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80',
    },
    {
      id: '2',
      name: 'Trail全能系列',
      desc: '150mm行程避震',
      price: '¥22,999',
      image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600&q=80',
    },
    {
      id: '3',
      name: 'Enduro极限系列',
      desc: '180mm双避震系统',
      price: '¥35,999',
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80',
    },
  ];

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* 英雄海报 */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>征服每一座山峰</Text>
          <Text style={styles.heroSubtitle}>专业级山地车，为极限而生</Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>立即探索</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* 车型入口 - 视差效果 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>精选车型</Text>
        <View style={styles.bikeModelsGrid}>
          {bikeModels.map((bike, index) => (
            <TouchableOpacity 
              key={bike.id} 
              style={[styles.bikeModelCard, { marginTop: index * 20 }]}
              activeOpacity={0.9}
            >
              <ImageBackground
                source={{ uri: bike.image }}
                style={styles.bikeModelImage}
                imageStyle={{ borderRadius: 20 }}
              >
                <View style={styles.bikeModelOverlay}>
                  <Text style={styles.bikeModelName}>{bike.name}</Text>
                  <Text style={styles.bikeModelDesc}>{bike.desc}</Text>
                  <Text style={styles.bikeModelPrice}>{bike.price}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 爆款推荐 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>爆款热销</Text>
          <View style={styles.hotBadge}>
            <Text style={styles.hotBadgeText}>HOT 🔥</Text>
          </View>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredBikes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.featuredList}
          renderItem={({ item }) => <FeaturedBikeCard {...item} />}
        />
      </View>

      {/* 配套商品 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>骑行装备</Text>
        <AccessoriesGrid />
      </View>

      {/* Feed流 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>发现更多</Text>
        <FeedList />
      </View>
    </ScrollView>
  );
}

function FeaturedBikeCard({ title, subtitle, price, oldPrice, tag, isHot, image }: any) {
  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.featuredImage}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View style={[styles.tag, isHot ? styles.tagHot : styles.tagNew]}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </ImageBackground>
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
    </TouchableOpacity>
  );
}

function BikesScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>全部车型 🚴</Text>
      <Text style={styles.comingSoon}>更多车型即将上线...</Text>
    </ScrollView>
  );
}

function AccessoriesScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>全部装备 �️</Text>
      <Text style={styles.comingSoon}>更多装备即将上线...</Text>
    </ScrollView>
  );
}

function FeedScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.screenTitle}>全部内容 ✨</Text>
      <Text style={styles.comingSoon}>更多内容即将上线...</Text>
    </ScrollView>
  );
}

function AccessoriesGrid() {
  const accessories = [
    { icon: '🧤', name: '专业手套', desc: '防滑透气', price: '¥299', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&q=80' },
    { icon: '⌚', name: '运动手表', desc: 'GPS定位', price: '¥1,299', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
    { icon: '🕶️', name: '骑行眼镜', desc: '防紫外线', price: '¥599', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80' },
    { icon: '🎽', name: '速干衣', desc: '排汗快干', price: '¥399', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80' },
    { icon: '🪖', name: '安全头盔', desc: '轻量防护', price: '¥899', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
    { icon: '👟', name: '锁鞋', desc: '专业锁踏', price: '¥799', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  ];

  return (
    <View style={styles.accessoriesGrid}>
      {accessories.map((item, index) => (
        <TouchableOpacity key={index} style={styles.accessoryCard} activeOpacity={0.9}>
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.accessoryImage}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.accessoryOverlay} />
          </ImageBackground>
          <Text style={styles.accessoryName}>{item.name}</Text>
          <Text style={styles.accessoryDesc}>{item.desc}</Text>
          <Text style={styles.accessoryPrice}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function FeedList() {
  const feeds = [
    { 
      tag: '车型推荐', 
      title: '2024年度最佳山地车TOP10', 
      views: '12.5k', 
      comments: '328',
      image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80',
      layout: 'large'
    },
    { 
      tag: '热门话题', 
      title: '川藏线骑行攻略完整版', 
      views: '28.3k', 
      comments: '892',
      image: 'https://images.unsplash.com/photo-1559564484-e48c1b4d6e8d?w=600&q=80',
      layout: 'normal'
    },
    { 
      tag: '产品服务', 
      title: '免费保养服务升级', 
      views: '8.9k', 
      comments: '156',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      layout: 'normal'
    },
    { 
      tag: '车型推荐', 
      title: '新手入门车型选购指南', 
      views: '15.7k', 
      comments: '445',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80',
      layout: 'wide'
    },
    { 
      tag: '热门话题', 
      title: '骑行减肥30天挑战', 
      views: '35.2k', 
      comments: '1.2k',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80',
      layout: 'normal'
    },
    { 
      tag: '产品服务', 
      title: '以旧换新活动开启', 
      views: '19.8k', 
      comments: '567',
      image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600&q=80',
      layout: 'normal'
    },
  ];

  return (
    <View>
      {feeds.map((feed, index) => {
        if (feed.layout === 'large') {
          return <FeedCardLarge key={index} {...feed} />;
        } else if (feed.layout === 'wide') {
          return <FeedCardWide key={index} {...feed} />;
        }
        return <FeedCard key={index} {...feed} />;
      })}
    </View>
  );
}

function FeedCard({ tag, title, views, comments, image }: any) {
  const isHot = tag === '热门话题';
  
  return (
    <TouchableOpacity style={styles.feedCard} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.feedImage}
        imageStyle={{ borderRadius: 12 }}
      />
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
    </TouchableOpacity>
  );
}

function FeedCardLarge({ tag, title, views, comments, image }: any) {
  return (
    <TouchableOpacity style={styles.feedCardLarge} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.feedImageLarge}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.feedOverlay}>
          <View style={styles.feedTag}>
            <Text style={styles.feedTagText}>{tag}</Text>
          </View>
          <Text style={styles.feedTitleLarge}>{title}</Text>
          <View style={styles.feedMeta}>
            <Text style={styles.feedMetaTextWhite}>👁️ {views}</Text>
            <Text style={styles.feedMetaTextWhite}>💬 {comments}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

function FeedCardWide({ tag, title, views, comments, image }: any) {
  return (
    <TouchableOpacity style={styles.feedCardWide} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: image }}
        style={styles.feedImageWide}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.feedOverlayWide}>
          <View style={styles.feedTag}>
            <Text style={styles.feedTagText}>{tag}</Text>
          </View>
          <Text style={styles.feedTitleWide}>{title}</Text>
          <View style={styles.feedMeta}>
            <Text style={styles.feedMetaTextWhite}>👁️ {views}</Text>
            <Text style={styles.feedMetaTextWhite}>💬 {comments}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
  comingSoon: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
  },
  
  // Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: 10,
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
    fontWeight: '600',
  },
  
  // Hero
  hero: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 48,
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#667eea',
  },
  
  // Bike Models
  bikeModelsGrid: {
    paddingHorizontal: 20,
  },
  bikeModelCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  bikeModelImage: {
    height: 200,
    justifyContent: 'flex-end',
  },
  bikeModelOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  bikeModelName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bikeModelDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  bikeModelPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    width: 300,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredImage: {
    height: 200,
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
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  tagNew: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikeEmoji: {
    fontSize: 48,
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
    paddingHorizontal: 12,
  },
  accessoryCard: {
    width: (width - 60) / 3,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    margin: 6,
    overflow: 'hidden',
  },
  accessoryImage: {
    height: 100,
    justifyContent: 'flex-end',
  },
  accessoryOverlay: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
  },
  accessoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  accessoryDesc: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  accessoryPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center',
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
    width: 100,
    height: 100,
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

  // Feed Large
  feedCardLarge: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  feedImageLarge: {
    height: 300,
    justifyContent: 'flex-end',
  },
  feedOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  feedTitleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  
  // Feed Wide
  feedCardWide: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  feedImageWide: {
    height: 180,
    justifyContent: 'flex-end',
  },
  feedOverlayWide: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
  },
  feedTitleWide: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  feedMetaTextWhite: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginRight: 16,
  },
