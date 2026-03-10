import React, { useState, useRef, useCallback } from 'react';
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
  Image,
  FlatList,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_W = 248;
const CARD_H = 325;

const NAV_TABS = ['精选', '门店探索', '最新赛事', '社区讨论'];

const CATEGORIES = [
  { id: '1', label: '城市通勤', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80' },
  { id: '2', label: '公路竞技', image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80' },
  { id: '3', label: 'E-Bike', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80' },
  { id: '4', label: '儿童专属', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80' },
  { id: '5', label: '城市穿梭', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: '6', label: '公路竞速', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80' },
  { id: '7', label: 'EBike', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: '8', label: '山地越野', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&q=80' },
];

const BRAND_TABS = ['TEEK', 'Blueberry', '小布', 'Specialized'];

const WEEKLY_CARDS = [
  {
    id: 1, badge: '推荐榜NO.1', badgeBg: '#202229',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80',
    brand: 'TREK Domane AL 2', desc: '碳纤维材质，兼具超轻重量',
    price: '¥199/日起租', cardBg: '#1C3762',
  },
  {
    id: 2, badge: '销售榜NO.1', badgeBg: '#202229',
    image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600&q=80',
    brand: 'Blueberry', desc: '城市通勤，轻松骑行',
    price: '¥159/日起租', cardBg: '#2D1B4E',
  },
  {
    id: 3, badge: '口碑榜NO.1', badgeBg: '#202229',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80',
    brand: 'Brompton C Line', desc: '折叠便携，随心出行',
    price: '¥129/日起租', cardBg: '#1B3A2F',
  },
  {
    id: 4, badge: '新品推荐', badgeBg: '#202229',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80',
    brand: 'Turbo Vado SL', desc: '电助力，轻松骑行',
    price: '¥249/日起租', cardBg: '#3B2A1A',
  },
];

const FILTER_TABS = ['全部', 'Ebike', '公路车', '山地车', '折叠车', '宠物拖箱'];

const PRODUCTS = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80',
    name: 'Madone SLR 9 Gen 8', desc: '碳纤维车架 · 专业竞速',
    dayPrice: '199元/天', hourPrice: '36元/小时', retailPrice: '新车售价：¥20300起',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80',
    name: 'Domane AL 5 Disc', desc: '铝合金车架 · 舒适耐用',
    dayPrice: '149元/天', hourPrice: '28元/小时', retailPrice: '新车售价：¥15800起',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80',
    name: 'Brompton C Line', desc: '折叠便携 · 城市通勤',
    dayPrice: '129元/天', hourPrice: '24元/小时', retailPrice: '新车售价：¥12500起',
  },
];


// ==================== 主组件 ====================
export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={s.root}>
      <View style={s.container}>
        {activeTab === 0 && <HomeScreen scrollY={scrollY} />}
        {activeTab === 1 && <Empty label="控车" />}
        {activeTab === 2 && <Empty label="我的" />}
      </View>
      <BottomBar active={activeTab} onPress={setActiveTab} />
    </View>
  );
}

// ==================== 首页 ====================
function HomeScreen({ scrollY }) {
  const [navTab, setNavTab] = useState(0);
  const [filterTab, setFilterTab] = useState(0);

  return (
    <Animated.ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
    >
      {/* ===== Hero Banner ===== */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80' }}
        style={s.hero}
      >
        {/* 上方渐变遮罩 */}
        <View style={s.heroGradientTop} />
        {/* 下方渐变遮罩 */}
        <View style={s.heroGradientBottom} />

        <View style={s.heroInner}>
          {/* 状态栏 */}
          <View style={s.statusBar}>
            <Text style={s.statusTime}>9:41</Text>
          </View>

          {/* Logo + 微信胶囊 */}
          <View style={s.topRow}>
            <View style={s.logoRow}>
              <Text style={s.logoEmoji}>🫐</Text>
              <Text style={s.logoText}>蓝莓骑行</Text>
            </View>
            <View style={s.capsule}>
              <View style={s.capsuleDotGroup}>
                <View style={s.capsuleDot} />
                <View style={s.capsuleDotSm} />
                <View style={s.capsuleDotSm} />
              </View>
              <View style={s.capsuleLine} />
              <View style={s.capsuleCircle}>
                <View style={s.capsuleCircleInner} />
              </View>
            </View>
          </View>

          {/* 导航Tab */}
          <View style={s.navRow}>
            {NAV_TABS.map((t, i) => (
              <TouchableOpacity key={t} onPress={() => setNavTab(i)} style={s.navItem}>
                <Text style={[s.navText, i === navTab && s.navTextActive]}>{t}</Text>
                {i === navTab && <View style={s.navDot} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* 文案 */}
          <View style={s.heroTextArea}>
            <Text style={s.heroTitle}>来吧·一起骑行！</Text>
            <Text style={s.heroSub}>城市Ebike-和她一起轻松出行</Text>
          </View>

          {/* 探索更多按钮 - 全宽 */}
          <TouchableOpacity style={s.heroBtn} activeOpacity={0.85}>
            <Text style={s.heroBtnText}>探索更多</Text>
          </TouchableOpacity>

          {/* 轮播点 */}
          <View style={s.heroDots}>
            {[6,6,6,6,6,4,4].map((size, i) => (
              <View key={i} style={[
                s.dot,
                { width: size, height: size, borderRadius: size/2 },
                i === 0 ? s.dotActive : s.dotInactive,
              ]} />
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* ===== 分类横滑 ===== */}
      <View style={s.catSection}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={s.catCard} activeOpacity={0.8}>
              <ImageBackground source={{ uri: item.image }} style={s.catImg} imageStyle={{ borderRadius: 12 }}>
                <View style={s.catOverlay}>
                  <Text style={s.catLabel}>{item.label}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ===== 周周上新 ===== */}
      <View style={s.weeklySection}>
        <View style={s.secHeader}>
          <Text style={s.secTitle}>周周上新</Text>
          <View style={s.secMoreRow}>
            <Text style={s.secMore}>探索更多</Text>
            <Text style={s.secMoreArrow}> ›</Text>
          </View>
        </View>
        <WeeklyCards />
      </View>

      {/* ===== 更多好车 ===== */}
      <View style={s.moreSection}>
        <View style={s.secHeader}>
          <Text style={s.secTitle}>更多好车</Text>
          <View style={s.secMoreRow}>
            <Text style={s.secMore}>探索更多</Text>
            <Text style={s.secMoreArrow}> ›</Text>
          </View>
        </View>

        {/* 筛选Tab */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {FILTER_TABS.map((t, i) => (
            <TouchableOpacity key={t} style={[s.filterChip, i === filterTab && s.filterChipActive]} onPress={() => setFilterTab(i)}>
              <Text style={[s.filterText, i === filterTab && s.filterTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 全宽产品卡 */}
        {PRODUCTS.map((p) => (
          <FullProductCard key={p.id} item={p} />
        ))}
      </View>

      <View style={{ height: 100 }} />
    </Animated.ScrollView>
  );
}


// ==================== 周周上新卡片 ====================
function WeeklyCards() {
  const [cur, setCur] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;
  const curRef = useRef(0);

  const goTo = useCallback((idx) => {
    Animated.spring(anim, { toValue: idx, tension: 80, friction: 12, useNativeDriver: true }).start();
    curRef.current = idx;
    setCur(idx);
  }, [anim]);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8,
      onPanResponderGrant: () => anim.stopAnimation(),
      onPanResponderMove: (_, g) => anim.setValue(curRef.current - g.dx / CARD_W),
      onPanResponderRelease: (_, g) => {
        let t = curRef.current;
        const d = g.dx / CARD_W;
        if (d < -0.25 && t < WEEKLY_CARDS.length - 1) t += 1;
        else if (d > 0.25 && t > 0) t -= 1;
        Animated.spring(anim, { toValue: t, tension: 80, friction: 12, useNativeDriver: true }).start();
        curRef.current = t;
        setCur(t);
      },
    })
  ).current;

  return (
    <View style={s.wkWrapper}>
      {/* 左侧品牌Tab */}
      <View style={s.brandCol}>
        {BRAND_TABS.map((t, i) => (
          <TouchableOpacity key={t} onPress={() => goTo(i)} activeOpacity={0.7}
            style={[s.brandItem, i === cur && s.brandItemActive]}>
            <Text style={[s.brandText, i === cur && s.brandTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 右侧卡片 */}
      <View style={s.cardArea} {...pan.panHandlers}>
        {WEEKLY_CARDS.map((card, idx) => {
          const offset = Animated.subtract(new Animated.Value(idx), anim);
          const tx = offset.interpolate({ inputRange: [-2,-1,0,1,2], outputRange: [-60,-30,0,30,60], extrapolate: 'clamp' });
          const ty = offset.interpolate({ inputRange: [-2,-1,0,1,2], outputRange: [16,8,0,8,16], extrapolate: 'clamp' });
          const sc = offset.interpolate({ inputRange: [-2,-1,0,1,2], outputRange: [0.78,0.88,1,0.88,0.78], extrapolate: 'clamp' });
          const op = offset.interpolate({ inputRange: [-2,-1,0,1,2], outputRange: [0.15,0.5,1,0.5,0.15], extrapolate: 'clamp' });
          const rot = offset.interpolate({ inputRange: [-2,-1,0,1,2], outputRange: ['-5deg','-2.5deg','0deg','2.5deg','5deg'], extrapolate: 'clamp' });

          return (
            <Animated.View key={card.id} style={[s.wkCard, { backgroundColor: card.cardBg,
              zIndex: WEEKLY_CARDS.length - Math.abs(idx - cur),
              opacity: op, transform: [{ translateX: tx },{ translateY: ty },{ scale: sc },{ rotate: rot }],
            }]}>
              {/* 徽章 */}
              <View style={[s.wkBadge, { backgroundColor: card.badgeBg }]}>
                <Text style={s.wkBadgeText}>{card.badge}</Text>
              </View>
              {/* 品牌名 */}
              <Text style={s.wkBrand}>{card.brand}</Text>
              {/* 描述 */}
              <Text style={s.wkDesc}>{card.desc}</Text>
              {/* 了解车型 */}
              <View style={s.wkLinkRow}>
                <Text style={s.wkLink}>了解车型</Text>
                <Text style={s.wkLinkArrow}> ›</Text>
              </View>
              {/* 车图 */}
              <Image source={{ uri: card.image }} style={s.wkImg} resizeMode="contain" />
              {/* 底部毛玻璃条 */}
              <View style={s.wkFooter}>
                <Text style={s.wkPrice}>{card.price}</Text>
                <View style={s.wkBuyBtn}>
                  <Text style={s.wkBuyText}>去选购</Text>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}


// ==================== 全宽产品卡 ====================
function FullProductCard({ item }) {
  return (
    <View style={s.fpCard}>
      {/* 图片区 */}
      <ImageBackground source={{ uri: item.image }} style={s.fpImg}
        imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
      </ImageBackground>
      {/* 信息区 */}
      <View style={s.fpBody}>
        <Text style={s.fpName}>{item.name}</Text>
        <Text style={s.fpDesc}>{item.desc}</Text>
      </View>
      {/* 底部价格栏 */}
      <View style={s.fpPriceBar}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={s.fpDayPrice}>{item.dayPrice}</Text>
            <Text style={s.fpHourPrice}>  {item.hourPrice}</Text>
          </View>
          <Text style={s.fpRetail}>{item.retailPrice}</Text>
        </View>
        <TouchableOpacity style={s.fpSelectBtn} activeOpacity={0.8}>
          <Text style={s.fpSelectText}>选TA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==================== 底部Tab ====================
function BottomBar({ active, onPress }) {
  const tabs = [
    { icon: '🏠', label: '主页' },
    { icon: '🚲', label: '控车' },
    { icon: '👤', label: '我的' },
  ];
  return (
    <View style={s.btBar}>
      <View style={s.btInner}>
        {tabs.map((t, i) => (
          <TouchableOpacity key={t.label} style={s.btItem} onPress={() => onPress(i)} activeOpacity={0.7}>
            <View style={[s.btCircle, i === active && s.btCircleActive]}>
              <Text style={s.btIcon}>{t.icon}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Empty({ label }) {
  return <View style={s.empty}><Text style={s.emptyText}>{label}</Text></View>;
}


// ==================== 样式 ====================
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F2F8' },
  container: { flex: 1 },

  // Hero
  hero: { width, height: 458 },
  heroGradientTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 236,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  heroGradientBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 205,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  heroInner: { flex: 1, paddingTop: 0 },
  statusBar: {
    height: 44, justifyContent: 'center', paddingLeft: 29,
  },
  statusTime: { fontSize: 17, fontWeight: '500', color: '#fff' },
  topRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 12,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoEmoji: { fontSize: 18, marginRight: 4 },
  logoText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  capsule: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 100, paddingHorizontal: 10, height: 32,
  },
  capsuleDotGroup: { flexDirection: 'row', alignItems: 'center' },
  capsuleDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#000', marginRight: 4 },
  capsuleDotSm: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 4 },
  capsuleLine: { width: 0.5, height: 20, backgroundColor: 'rgba(0,0,0,0.2)', marginHorizontal: 6 },
  capsuleCircle: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#000',
    justifyContent: 'center', alignItems: 'center',
  },
  capsuleCircleInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#000' },

  // Nav
  navRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  navItem: { marginRight: 24, alignItems: 'center' },
  navText: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
  navTextActive: { color: '#fff', fontWeight: '600' },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D9D9D9', marginTop: 4 },

  // Hero text
  heroTextArea: { paddingHorizontal: 20, marginTop: 20 },
  heroTitle: { fontSize: 24, fontWeight: '600', color: '#fff', letterSpacing: 0.48, marginBottom: 8 },
  heroSub: { fontSize: 15, fontWeight: '300', color: '#fff', letterSpacing: -0.3 },
  heroBtn: {
    marginHorizontal: 17, marginTop: 12, height: 36, borderRadius: 100,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  heroBtnText: { fontSize: 12, color: '#000' },
  heroDots: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    marginTop: 16, marginBottom: 12,
  },
  dot: { marginHorizontal: 3 },
  dotActive: { backgroundColor: '#fff' },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.3)' },

  // Categories
  catSection: { marginTop: 16, marginBottom: 20 },
  catCard: { width: 94, height: 120 },
  catImg: { width: 94, height: 120 },
  catOverlay: {
    flex: 1, borderRadius: 12, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 12,
    backgroundColor: 'rgba(10,5,25,0)',
  },
  catLabel: { fontSize: 14, fontWeight: '600', color: '#fff' },

  // Section header
  secHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginBottom: 14,
  },
  secTitle: { fontSize: 20, fontWeight: '600', color: '#0A0519', letterSpacing: 0.4 },
  secMoreRow: { flexDirection: 'row', alignItems: 'center' },
  secMore: { fontSize: 14, color: '#999' },
  secMoreArrow: { fontSize: 16, color: '#999' },

  // Weekly
  weeklySection: { marginBottom: 24 },
  wkWrapper: { flexDirection: 'row', paddingLeft: 12 },
  brandCol: { width: 90, paddingTop: 5 },
  brandItem: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, marginBottom: 24,
  },
  brandItemActive: { backgroundColor: '#0A0519' },
  brandText: { fontSize: 14, color: '#333', opacity: 0.8, letterSpacing: 0.28 },
  brandTextActive: { fontSize: 14, fontWeight: '600', color: '#fff', opacity: 1 },
  cardArea: {
    flex: 1, height: CARD_H + 50, alignItems: 'center', position: 'relative',
  },
  wkCard: {
    position: 'absolute', width: CARD_W, height: CARD_H,
    borderRadius: 12, padding: 12, overflow: 'hidden',
    shadowColor: '#111', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8,
    elevation: 4,
  },
  wkBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8,
  },
  wkBadgeText: { fontSize: 10, color: '#fff' },
  wkBrand: { fontSize: 22, fontWeight: '600', color: '#000', letterSpacing: -0.44, marginBottom: 2 },
  wkDesc: { fontSize: 12, color: '#666', letterSpacing: -0.24, marginBottom: 4 },
  wkLinkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  wkLink: { fontSize: 12, color: '#333' },
  wkLinkArrow: { fontSize: 14, color: '#333' },
  wkImg: {
    width: '100%', height: 120, borderRadius: 8, marginBottom: 8, backgroundColor: 'rgba(255,255,255,0.1)',
  },
  wkFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  wkPrice: { fontSize: 20, color: '#fff' },
  wkBuyBtn: {
    backgroundColor: 'rgba(255,255,255,0.53)', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6, borderWidth: 0.5, borderColor: '#fff',
  },
  wkBuyText: { fontSize: 14, fontWeight: '500', color: '#fff' },

  // More section
  moreSection: { marginBottom: 24 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100,
    backgroundColor: '#fff', marginRight: 8,
  },
  filterChipActive: { backgroundColor: '#0A0519' },
  filterText: { fontSize: 13, color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' },

  // Full product card
  fpCard: {
    marginHorizontal: 12, marginBottom: 12, backgroundColor: '#fff', borderRadius: 12,
    overflow: 'hidden',
  },
  fpImg: { width: '100%', height: 225 },
  fpBody: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
  fpName: { fontSize: 16, fontWeight: '600', color: '#0A0519', marginBottom: 4 },
  fpDesc: { fontSize: 12, color: '#666', letterSpacing: -0.24 },
  fpPriceBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F7F7F7', paddingHorizontal: 14, paddingVertical: 12,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
  },
  fpDayPrice: { fontSize: 18, fontWeight: '700', color: '#0A0519' },
  fpHourPrice: { fontSize: 12, color: '#999' },
  fpRetail: { fontSize: 11, color: '#bbb', marginTop: 2 },
  fpSelectBtn: {
    backgroundColor: '#0A0519', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100,
  },
  fpSelectText: { fontSize: 13, fontWeight: '600', color: '#fff' },

  // Bottom bar
  btBar: {
    position: 'absolute', bottom: 20, left: 12, right: 12, alignItems: 'center',
  },
  btInner: {
    flexDirection: 'row', width: 366, height: 64, borderRadius: 34,
    backgroundColor: '#0F0F0F', alignItems: 'center', justifyContent: 'space-evenly',
  },
  btItem: { alignItems: 'center' },
  btCircle: {
    width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center',
  },
  btCircleActive: { backgroundColor: '#0A0519' },
  btIcon: { fontSize: 20, color: '#fff' },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});
