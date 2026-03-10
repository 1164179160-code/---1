import React, { useState, useRef, useEffect } from 'react';
import {
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

var { width } = Dimensions.get('window');
var CARD_W = 248;
var CARD_H = 325;
var NAV_TABS = ['精选', '门店探索', '最新赛事', '社区讨论'];

var BANNERS = [
  { id: '1', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=1200&q=80', title: '来吧·一起骑行！', sub: '城市Ebike-和她一起轻松出行' },
  { id: '2', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80', title: '山地越野挑战', sub: '征服每一座山峰' },
  { id: '3', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1200&q=80', title: '城市通勤新选择', sub: '轻松穿梭·绿色出行' },
  { id: '4', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', title: 'E-Bike新体验', sub: '电助力·骑行无限可能' },
];

var CATEGORIES = [
  { id: '1', label: '城市通勤', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&q=80' },
  { id: '2', label: '公路竞技', image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=400&q=80' },
  { id: '3', label: 'E-Bike', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&q=80' },
  { id: '4', label: '儿童专属', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&q=80' },
  { id: '5', label: '城市穿梭', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: '6', label: '公路竞速', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400&q=80' },
  { id: '7', label: 'EBike', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: '8', label: '山地越野', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=400&q=80' },
];

var BRAND_DATA = [
  {
    brand: 'TEEK', inactiveOpacity: 1,
    cards: [
      { id: 1, badge: '推荐榜NO.1', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80', name: 'TREK Domane AL 2', desc: '碳纤维材质，兼具超轻重量', price: '¥199/日起租', cardBg: '#1C3762' },
      { id: 2, badge: '销售榜NO.1', image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80', name: 'TREK Madone SLR', desc: '专业竞速，极致性能', price: '¥299/日起租', cardBg: '#1C3762' },
      { id: 3, badge: '口碑榜NO.1', image: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80', name: 'TREK Émonda', desc: '超轻爬坡利器', price: '¥259/日起租', cardBg: '#1C3762' },
    ],
  },
  {
    brand: 'Blueberry', inactiveOpacity: 0.9,
    cards: [
      { id: 4, badge: '推荐榜NO.1', image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600&q=80', name: 'Blueberry City', desc: '城市通勤，轻松骑行', price: '¥159/日起租', cardBg: '#2D1B4E' },
      { id: 5, badge: '新品推荐', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', name: 'Blueberry E-Go', desc: '电助力城市穿梭', price: '¥189/日起租', cardBg: '#2D1B4E' },
    ],
  },
  {
    brand: '小布', inactiveOpacity: 0.8,
    cards: [
      { id: 6, badge: '口碑榜NO.1', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80', name: 'Brompton C Line', desc: '折叠便携，随心出行', price: '¥129/日起租', cardBg: '#1B3A2F' },
      { id: 7, badge: '销售榜NO.1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', name: 'Brompton P Line', desc: '钛合金超轻折叠', price: '¥179/日起租', cardBg: '#1B3A2F' },
    ],
  },
  {
    brand: 'Specialized', inactiveOpacity: 0.9,
    cards: [
      { id: 8, badge: '新品推荐', image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&q=80', name: 'Turbo Vado SL', desc: '电助力，轻松骑行', price: '¥249/日起租', cardBg: '#3B2A1A' },
      { id: 9, badge: '推荐榜NO.1', image: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80', name: 'Tarmac SL8', desc: '顶级公路竞速', price: '¥349/日起租', cardBg: '#3B2A1A' },
    ],
  },
];

var ALL_CARDS = [];
var BRAND_START = [];
BRAND_DATA.forEach(function(b) {
  BRAND_START.push(ALL_CARDS.length);
  b.cards.forEach(function(c) { ALL_CARDS.push(c); });
});

function getBrandForCard(ci) {
  for (var i = BRAND_START.length - 1; i >= 0; i--) {
    if (ci >= BRAND_START[i]) return i;
  }
  return 0;
}

var FILTER_TABS = ['全部', 'Ebike', '公路车', '山地车', '折叠车', '宠物拖箱'];

var PRODUCTS = [
  { id: '1', image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80', name: 'Madone SLR 9 Gen 8', desc: '碳纤维车架 · 专业竞速', dayPrice: '199', hourPrice: '36', retailPrice: '¥20300起' },
  { id: '2', image: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=600&q=80', name: 'Domane AL 5 Disc', desc: '铝合金车架 · 舒适耐用', dayPrice: '149', hourPrice: '28', retailPrice: '¥15800起' },
  { id: '3', image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80', name: 'Brompton C Line', desc: '折叠便携 · 城市通勤', dayPrice: '129', hourPrice: '24', retailPrice: '¥12500起' },
  { id: '4', image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80', name: 'Canyon Spectral CF', desc: '全山地利器 · 德国工艺', dayPrice: '179', hourPrice: '32', retailPrice: '¥18600起' },
  { id: '5', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', name: 'Turbo Vado SL 5.0', desc: '电助力 · 城市穿梭', dayPrice: '219', hourPrice: '40', retailPrice: '¥23800起' },
];

// ==================== GradientSim: 用多层View模拟线性渐变 ====================
function GradientDown(props) {
  var h = props.height || 120;
  var c = props.color || '0,0,0';
  var startOp = props.startOpacity !== undefined ? props.startOpacity : 0.6;
  var endOp = props.endOpacity !== undefined ? props.endOpacity : 0;
  var layers = 6;
  var views = [];
  for (var i = 0; i < layers; i++) {
    var op = startOp + (endOp - startOp) * (i / (layers - 1));
    views.push(
      <View key={i} style={{
        position: 'absolute', left: 0, right: 0,
        top: (h / layers) * i,
        height: h / layers + 1,
        backgroundColor: 'rgba(' + c + ',' + op.toFixed(3) + ')',
      }} />
    );
  }
  return <View style={[{ position: 'absolute', left: 0, right: 0, height: h }, props.posStyle]}>{views}</View>;
}

function GradientUp(props) {
  var h = props.height || 120;
  var c = props.color || '0,0,0';
  var startOp = props.startOpacity !== undefined ? props.startOpacity : 0;
  var endOp = props.endOpacity !== undefined ? props.endOpacity : 0.7;
  var layers = 6;
  var views = [];
  for (var i = 0; i < layers; i++) {
    var op = startOp + (endOp - startOp) * (i / (layers - 1));
    views.push(
      <View key={i} style={{
        position: 'absolute', left: 0, right: 0,
        top: (h / layers) * i,
        height: h / layers + 1,
        backgroundColor: 'rgba(' + c + ',' + op.toFixed(3) + ')',
      }} />
    );
  }
  return <View style={[{ position: 'absolute', left: 0, right: 0, height: h }, props.posStyle]}>{views}</View>;
}

// ==================== 主组件 ====================
export default function App() {
  var st = useState(0);
  var activeTab = st[0], setActiveTab = st[1];
  var scrollY = useRef(new Animated.Value(0)).current;
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
function HomeScreen(props) {
  var scrollY = props.scrollY;
  var nt = useState(0), navTab = nt[0], setNavTab = nt[1];
  var ft = useState(0), filterTab = ft[0], setFilterTab = ft[1];
  var se = useState(true), scrollEnabled = se[0], setScrollEnabled = se[1];
  var bn = useState(0), bannerIdx = bn[0], setBannerIdx = bn[1];

  var bannerAnim = useRef(new Animated.Value(0)).current;
  var bannerTimer = useRef(null);
  var textFade = useRef(new Animated.Value(1)).current;

  useEffect(function() {
    bannerTimer.current = setInterval(function() {
      setBannerIdx(function(prev) {
        var next = (prev + 1) % BANNERS.length;
        Animated.timing(textFade, { toValue: 0, duration: 150, useNativeDriver: true }).start(function() {
          Animated.timing(bannerAnim, { toValue: -next * width, duration: 500, useNativeDriver: true }).start(function() {
            Animated.timing(textFade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
          });
        });
        return next;
      });
    }, 3500);
    return function() { clearInterval(bannerTimer.current); };
  }, []);

  return (
    <Animated.ScrollView
      style={{ flex: 1 }}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      scrollEventThrottle={16}
    >
      {/* ===== Hero Banner ===== */}
      <View style={s.hero}>
        <Animated.View style={[s.bannerStrip, { transform: [{ translateX: bannerAnim }] }]}>
          {BANNERS.map(function(b) {
            return (
              <View key={b.id} style={s.bannerSlide}>
                <ImageBackground source={{ uri: b.image }} style={s.heroBannerBg} />
              </View>
            );
          })}
        </Animated.View>
        {/* Figma: 顶部渐变 180deg black→transparent 89% */}
        <GradientDown height={260} color="0,0,0" startOpacity={0.55} endOpacity={0} posStyle={{ top: 0 }} />
        {/* Figma: 底部渐变 向上渐暗 */}
        <GradientUp height={220} color="0,0,0" startOpacity={0} endOpacity={0.5} posStyle={{ bottom: 0, top: undefined }} />

        <View style={s.heroInner}>
          <View style={s.statusBar}><Text style={s.statusTime}>9:41</Text></View>
          <View style={s.topRow}>
            <View style={s.logoRow}>
              <Image source={{ uri: 'https://img.icons8.com/color/96/blueberry.png' }} style={s.logoIcon} />
              <Text style={s.logoText}>蓝莓骑行</Text>
            </View>
            <View style={s.capsule}>
              <View style={s.capsuleDotGroup}>
                <View style={s.capsuleDot} />
                <View style={s.capsuleDotSm} />
                <View style={s.capsuleDotSm} />
              </View>
              <View style={s.capsuleLine} />
              <View style={s.capsuleCircle}><View style={s.capsuleCircleInner} /></View>
            </View>
          </View>
          {/* Figma: active 16px/600, inactive 14px/400 opacity 0.6 */}
          <View style={s.navRow}>
            {NAV_TABS.map(function(t, i) {
              return (
                <TouchableOpacity key={t} onPress={function() { setNavTab(i); }} style={s.navItem}>
                  <Text style={[s.navText, i === navTab && s.navTextActive]}>{t}</Text>
                  {i === navTab && <View style={s.navDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
          <Animated.View style={[s.heroTextArea, { opacity: textFade }]}>
            <Text style={s.heroTitle}>{BANNERS[bannerIdx].title}</Text>
            <Text style={s.heroSub}>{BANNERS[bannerIdx].sub}</Text>
          </Animated.View>
          <TouchableOpacity style={s.heroBtn} activeOpacity={0.85}>
            <Text style={s.heroBtnText}>探索更多</Text>
          </TouchableOpacity>
          <View style={s.heroDots}>
            {BANNERS.map(function(_, i) {
              return <View key={i} style={[s.dot, { width: i === bannerIdx ? 16 : 6, height: 6, borderRadius: 3 }, i === bannerIdx ? s.dotActive : s.dotInactive]} />;
            })}
          </View>
        </View>
      </View>

      {/* ===== 分类横滑 ===== */}
      <View style={s.catSection}>
        <FlatList data={CATEGORIES} horizontal showsHorizontalScrollIndicator={false}
          keyExtractor={function(item) { return item.id; }}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={function() { return <View style={{ width: 8 }} />; }}
          renderItem={function(info) {
            var item = info.item;
            return (
              <TouchableOpacity style={s.catCard} activeOpacity={0.8}>
                <ImageBackground source={{ uri: item.image }} style={s.catImg} imageStyle={{ borderRadius: 12 }}>
                  <View style={s.catOverlay}>
                    {/* Figma: 底部渐变从transparent到dark */}
                    <View style={s.catGrad1} />
                    <View style={s.catGrad2} />
                    <View style={s.catGrad3} />
                    <View style={s.catGrad4} />
                    <Text style={s.catLabel}>{item.label}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* ===== 周周上新 ===== */}
      <View style={s.weeklySection}>
        <View style={s.secHeader}>
          <Text style={s.secTitle}>周周上新</Text>
          <View style={s.secMoreRow}><Text style={s.secMore}>探索更多</Text><Text style={s.secMoreArrow}> ›</Text></View>
        </View>
        <WeeklyCards setParentScroll={setScrollEnabled} />
      </View>

      {/* ===== 更多好车 ===== */}
      <View style={s.moreSection}>
        <View style={s.secHeader}>
          <Text style={s.secTitle}>更多好车</Text>
          <View style={s.secMoreRow}><Text style={s.secMore}>探索更多</Text><Text style={s.secMoreArrow}> ›</Text></View>
        </View>
        {/* Figma: active white bg borderRadius 8, inactive transparent opacity 0.44, font 12px */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {FILTER_TABS.map(function(t, i) {
            return (
              <TouchableOpacity key={t} style={[s.filterChip, i === filterTab && s.filterChipActive]} onPress={function() { setFilterTab(i); }}>
                <Text style={[s.filterText, i === filterTab && s.filterTextActive]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {PRODUCTS.map(function(p) { return <FullProductCard key={p.id} item={p} />; })}
      </View>
      <View style={{ height: 100 }} />
    </Animated.ScrollView>
  );
}

// ==================== 周周上新卡片 ====================
function WeeklyCards(props) {
  var setParentScroll = props.setParentScroll;
  var cs = useState(0), curCard = cs[0], setCurCard = cs[1];
  var activeBrand = getBrandForCard(curCard);
  var anim = useRef(new Animated.Value(0)).current;
  var curRef = useRef(0);

  var goToCard = function(idx) {
    if (idx < 0) idx = 0;
    if (idx >= ALL_CARDS.length) idx = ALL_CARDS.length - 1;
    Animated.spring(anim, { toValue: idx, tension: 80, friction: 12, useNativeDriver: true }).start();
    curRef.current = idx;
    setCurCard(idx);
  };

  var pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: function() { return false; },
      onMoveShouldSetPanResponder: function(_, g) {
        if (Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy) * 1.2) {
          setParentScroll(false);
          return true;
        }
        return false;
      },
      onPanResponderGrant: function() { anim.stopAnimation(); },
      onPanResponderMove: function(_, g) { anim.setValue(curRef.current - g.dx / CARD_W); },
      onPanResponderRelease: function(_, g) {
        setParentScroll(true);
        var t = curRef.current;
        var d = g.dx / CARD_W;
        if (d < -0.2 && t < ALL_CARDS.length - 1) t += 1;
        else if (d > 0.2 && t > 0) t -= 1;
        Animated.spring(anim, { toValue: t, tension: 80, friction: 12, useNativeDriver: true }).start();
        curRef.current = t;
        setCurCard(t);
      },
      onPanResponderTerminate: function() { setParentScroll(true); },
    })
  ).current;

  return (
    <View style={s.wkWrapper}>
      {/* 左侧品牌Tab - Figma: TEEK+5, Blueberry+60, 小布+104, Specialized+148 */}
      <View style={s.brandCol}>
        {BRAND_DATA.map(function(b, i) {
          var isActive = i === activeBrand;
          // Figma Y offsets: 5, 60, 104, 148 relative to section top
          var OFFSETS = [5, 60, 104, 148];
          var mt = i === 0 ? OFFSETS[0] : OFFSETS[i] - OFFSETS[i - 1] - 30;
          return (
            <TouchableOpacity key={b.brand} onPress={function() { goToCard(BRAND_START[i]); }} activeOpacity={0.7}
              style={[s.brandItem, { marginTop: mt }, isActive && s.brandItemActive]}>
              <Text style={[
                s.brandText,
                { opacity: isActive ? 1 : b.inactiveOpacity },
                isActive && s.brandTextActive,
              ]}>{b.brand}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 右侧卡片 - 扇形堆叠 */}
      <View style={s.cardArea} {...pan.panHandlers}>
        {ALL_CARDS.map(function(card, idx) {
          var offset = Animated.subtract(new Animated.Value(idx), anim);
          var tx = offset.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [-30, -15, 0, 18, 36], extrapolate: 'clamp' });
          var ty = offset.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [16, 8, 0, 12, 24], extrapolate: 'clamp' });
          var sc = offset.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [0.82, 0.9, 1, 0.95, 0.88], extrapolate: 'clamp' });
          var op = offset.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: [0, 0.3, 1, 0.7, 0], extrapolate: 'clamp' });
          var rot = offset.interpolate({ inputRange: [-2, -1, 0, 1, 2], outputRange: ['-5deg', '-2.5deg', '0deg', '2.5deg', '5deg'], extrapolate: 'clamp' });
          var zIdx = ALL_CARDS.length - Math.abs(idx - curCard);
          var isFront = idx === curCard;
          return (
            <Animated.View key={card.id} style={[s.wkCard, {
              backgroundColor: card.cardBg,
              zIndex: zIdx,
              opacity: op,
              transform: [{ translateX: tx }, { translateY: ty }, { scale: sc }, { rotate: rot }],
            }]}>
              {/* Figma: badge bg #202229, borderRadius 6, stroke #1D1F24 0.5px */}
              <View style={s.wkBadge}>
                <Text style={s.wkBadgeText}>{card.badge}</Text>
              </View>
              {/* Figma: brand 22px/600, front=#000, behind=#333 */}
              <Text style={[s.wkBrand, !isFront && { color: '#333' }]}>{card.name}</Text>
              <Text style={s.wkDesc}>{card.desc}</Text>
              <View style={s.wkLinkRow}>
                <Text style={s.wkLink}>了解车型</Text>
                <Text style={s.wkLinkArrow}> ›</Text>
              </View>
              <Image source={{ uri: card.image }} style={s.wkImg} resizeMode="contain" />
              <View style={s.wkShadowEllipse} />
              {/* Figma: footer glass bg rgba(255,255,255,0.16), stroke rgba(255,255,255,0.52) 0.5px */}
              <View style={s.wkFooter}>
                <Text style={s.wkPrice}>{card.price}</Text>
                <View style={s.wkBuyBtn}><Text style={s.wkBuyText}>去选购</Text></View>
              </View>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

// ==================== 更多好车 - 全宽产品卡 ====================
function FullProductCard(props) {
  var item = props.item;
  return (
    <View style={s.fpCard}>
      <ImageBackground source={{ uri: item.image }} style={s.fpImg} imageStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
      <View style={s.fpBody}>
        {/* Figma: 20px/700, letterSpacing -2% */}
        <Text style={s.fpName}>{item.name}</Text>
        {/* Figma: 12px/400, color #666666 */}
        <Text style={s.fpDesc}>{item.desc}</Text>
      </View>
      {/* Figma: price bar bg #F7F7F7, borderRadius 0 0 16 16, height 60 */}
      <View style={s.fpPriceBar}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            {/* Figma: 17.95px/700 */}
            <Text style={s.fpDayPrice}>{item.dayPrice}</Text>
            <Text style={s.fpDayUnit}>元/天</Text>
            {/* Figma: 10.77px/400 */}
            <Text style={s.fpHourPrice}>  {item.hourPrice}元/小时</Text>
          </View>
          {/* Figma: 10px/400, color #879099 */}
          <Text style={s.fpRetail}>新车售价：{item.retailPrice}</Text>
        </View>
        {/* Figma: 89x36, borderRadius 18, bg #0A0519, font 14px/600 white */}
        <TouchableOpacity style={s.fpSelectBtn} activeOpacity={0.8}>
          <Text style={s.fpSelectText}>选TA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ==================== 底部TabBar ====================
function BottomBar(props) {
  var active = props.active, onPress = props.onPress;
  var tabs = [
    { icon: '⌂', label: '主页' },
    { icon: '⚙', label: '控车' },
    { icon: '☺', label: '我的' },
  ];
  return (
    <View style={s.btBar}>
      <View style={s.btInner}>
        {/* Figma: glass overlay rgba(255,255,255,0.1) */}
        <View style={s.btGlass} />
        {tabs.map(function(t, i) {
          return (
            <TouchableOpacity key={t.label} style={s.btItem} onPress={function() { onPress(i); }} activeOpacity={0.7}>
              {/* Figma: active circle 52x52, bg #0A0519 */}
              <View style={[s.btCircle, i === active && s.btCircleActive]}>
                <Text style={[s.btIconSymbol, i === active && s.btIconActive]}>{t.icon}</Text>
                <Text style={[s.btLabel, i === active && s.btLabelActive]}>{t.label}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Figma: home indicator 134x5, borderRadius 100, color #111 */}
      <View style={s.homeIndicator} />
    </View>
  );
}

function Empty(props) {
  return <View style={s.empty}><Text style={s.emptyText}>{props.label}</Text></View>;
}

// ==================== Figma-Exact 样式 ====================
var s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F2F8' },
  container: { flex: 1 },

  // ===== Hero Banner =====
  hero: { width: width, height: 458, position: 'relative', overflow: 'hidden' },
  bannerStrip: { flexDirection: 'row', position: 'absolute', top: 0, left: 0, height: 458 },
  bannerSlide: { width: width, height: 458 },
  heroBannerBg: { width: '100%', height: '100%' },
  heroInner: { flex: 1, paddingTop: 0, zIndex: 3 },
  statusBar: { height: 44, justifyContent: 'center', paddingLeft: 29 },
  statusTime: { fontSize: 17, fontWeight: '500', color: '#fff' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 22, height: 22, marginRight: 6, borderRadius: 4 },
  logoText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  capsule: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 100, paddingHorizontal: 10, height: 32 },
  capsuleDotGroup: { flexDirection: 'row', alignItems: 'center' },
  capsuleDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#000', marginRight: 4 },
  capsuleDotSm: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 4 },
  capsuleLine: { width: 0.5, height: 20, backgroundColor: 'rgba(0,0,0,0.2)', marginHorizontal: 6 },
  capsuleCircle: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#000', justifyContent: 'center', alignItems: 'center' },
  capsuleCircleInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#000' },

  // Figma: active 16px/600, inactive 14px/400 opacity 0.6
  navRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
  navItem: { marginRight: 24, alignItems: 'center' },
  navText: { fontSize: 14, fontWeight: '400', color: 'rgba(255,255,255,0.6)' },
  navTextActive: { fontSize: 16, color: '#fff', fontWeight: '600' },
  navDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#D9D9D9', marginTop: 4 },

  // Figma: hero title 24px/600 letterSpacing 2%, sub 15px/300 letterSpacing -2%
  heroTextArea: { paddingHorizontal: 20, marginTop: 20 },
  heroTitle: { fontSize: 24, fontWeight: '600', color: '#fff', letterSpacing: 0.48, marginBottom: 8 },
  heroSub: { fontSize: 15, fontWeight: '300', color: '#fff', letterSpacing: -0.3 },
  heroBtn: { marginHorizontal: 17, marginTop: 12, height: 36, borderRadius: 100, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  heroBtnText: { fontSize: 12, color: '#000' },
  heroDots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16, marginBottom: 12 },
  dot: { marginHorizontal: 3 },
  dotActive: { backgroundColor: '#fff' },
  dotInactive: { backgroundColor: 'rgba(255,255,255,0.3)' },

  // ===== 分类卡片 Figma: 94x120, borderRadius 12, gap 8 =====
  catSection: { marginTop: 16, marginBottom: 20 },
  catCard: { width: 94, height: 120 },
  catImg: { width: 94, height: 120 },
  catOverlay: { flex: 1, borderRadius: 12, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 12, overflow: 'hidden' },
  // 4层模拟底部渐变: transparent → dark
  catGrad1: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, backgroundColor: 'rgba(0,0,0,0.05)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  catGrad2: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 45, backgroundColor: 'rgba(0,0,0,0.12)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  catGrad3: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 30, backgroundColor: 'rgba(0,0,0,0.18)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  catGrad4: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, backgroundColor: 'rgba(0,0,0,0.22)', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  catLabel: { fontSize: 14, fontWeight: '600', color: '#fff', zIndex: 1 },

  // ===== Section Header =====
  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 14 },
  // Figma: 20px/600, letterSpacing 2%, color #0A0519
  secTitle: { fontSize: 20, fontWeight: '600', color: '#0A0519', letterSpacing: 0.4 },
  secMoreRow: { flexDirection: 'row', alignItems: 'center' },
  secMore: { fontSize: 14, color: '#999' },
  secMoreArrow: { fontSize: 16, color: '#999' },

  // ===== 周周上新 =====
  weeklySection: { marginBottom: 24 },
  wkWrapper: { flexDirection: 'row', paddingLeft: 12 },
  brandCol: { width: 90, paddingTop: 0 },
  // Figma: active = white pill, height 30, padding 4px 10px, borderRadius 100
  brandItem: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, height: 30, justifyContent: 'center', alignSelf: 'flex-start' },
  brandItemActive: { backgroundColor: '#FFFFFF' },
  // Figma: inactive 14px/400 color #333, active 14px/600 color #0A0519
  brandText: { fontSize: 14, fontWeight: '400', color: '#333' },
  brandTextActive: { fontSize: 14, fontWeight: '600', color: '#0A0519', opacity: 1 },

  cardArea: { flex: 1, height: CARD_H + 50, alignItems: 'center', position: 'relative' },
  // Figma: 248x325, borderRadius 12, shadow 0px 2px 8px rgba(17,17,17,0.04)
  wkCard: {
    position: 'absolute', width: CARD_W, height: CARD_H, borderRadius: 12, padding: 12, overflow: 'hidden',
    shadowColor: '#111', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 4,
  },
  // Figma: badge bg #202229, borderRadius 6, stroke #1D1F24 0.5px, font 10px/400
  wkBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 8, backgroundColor: '#202229', borderWidth: 0.5, borderColor: '#1D1F24' },
  wkBadgeText: { fontSize: 10, fontWeight: '400', color: '#fff' },
  // Figma: 22px/600, letterSpacing -2%
  wkBrand: { fontSize: 22, fontWeight: '600', color: '#000', letterSpacing: -0.44, marginBottom: 2 },
  // Figma: 12px/400, color #666666
  wkDesc: { fontSize: 12, fontWeight: '400', color: '#666666', letterSpacing: -0.24, marginBottom: 4 },
  // Figma: 12px/400, color #333, right-aligned with arrow
  wkLinkRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginBottom: 8 },
  wkLink: { fontSize: 12, fontWeight: '400', color: '#333' },
  wkLinkArrow: { fontSize: 14, color: '#333' },
  wkImg: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8, backgroundColor: 'rgba(255,255,255,0.1)' },
  wkShadowEllipse: { width: 160, height: 12, borderRadius: 80, backgroundColor: 'rgba(0,0,0,0.15)', alignSelf: 'center', marginBottom: 8 },
  // Figma: footer glass bg rgba(255,255,255,0.16), stroke rgba(255,255,255,0.52) 0.5px, blur(4px)
  wkFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.52)',
  },
  // Figma: 20px/400, color white
  wkPrice: { fontSize: 20, fontWeight: '400', color: '#fff' },
  // Figma: bg rgba(255,255,255,0.53), stroke #FFFFFF 0.5px, font 14px/500
  wkBuyBtn: { backgroundColor: 'rgba(255,255,255,0.53)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 0.5, borderColor: '#fff' },
  wkBuyText: { fontSize: 14, fontWeight: '500', color: '#fff' },

  // ===== 更多好车 =====
  moreSection: { marginBottom: 24 },
  // Figma: borderRadius 8, active深色高对比, inactive白底
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: '#fff', marginRight: 8 },
  filterChipActive: { backgroundColor: '#0A0519' },
  filterText: { fontSize: 12, fontWeight: '400', color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' },

  // Figma: card 361 wide, bg white, borderRadius 12
  fpCard: { marginHorizontal: 14, marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  // Figma: image 359x225, borderRadius 12 top
  fpImg: { width: '100%', height: 225 },
  fpBody: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
  // Figma: 20px/700, letterSpacing -2%
  fpName: { fontSize: 20, fontWeight: '700', color: '#0A0519', letterSpacing: -0.4, marginBottom: 4 },
  // Figma: 12px/400, color #666666
  fpDesc: { fontSize: 12, fontWeight: '400', color: '#666666', letterSpacing: -0.24 },
  // Figma: price bar bg #F7F7F7, borderRadius 0 0 16 16, height 60
  fpPriceBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#F7F7F7', paddingHorizontal: 14, height: 60,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
  },
  // Figma: 17.95px/700
  fpDayPrice: { fontSize: 18, fontWeight: '700', color: '#0A0519' },
  fpDayUnit: { fontSize: 11, fontWeight: '400', color: '#0A0519' },
  // Figma: 10.77px/400
  fpHourPrice: { fontSize: 11, fontWeight: '400', color: '#999' },
  // Figma: 10px/400, color #879099
  fpRetail: { fontSize: 10, fontWeight: '400', color: '#879099', marginTop: 2 },
  // Figma: 89x36, borderRadius 18, bg #0A0519, font 14px/600 white
  fpSelectBtn: { width: 89, height: 36, borderRadius: 18, backgroundColor: '#0A0519', justifyContent: 'center', alignItems: 'center' },
  fpSelectText: { fontSize: 14, fontWeight: '600', color: '#fff' },

  // ===== 底部TabBar =====
  // Figma: 366x64, borderRadius 34, bg #0F0F0F
  btBar: { position: 'absolute', bottom: 20, left: 12, right: 12, alignItems: 'center' },
  btInner: { flexDirection: 'row', width: 366, height: 64, borderRadius: 34, backgroundColor: '#0F0F0F', alignItems: 'center', justifyContent: 'space-evenly', overflow: 'hidden' },
  // Figma: glass overlay rgba(255,255,255,0.1)
  btGlass: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 34 },
  btItem: { alignItems: 'center', zIndex: 1 },
  // Figma: active circle 52x52, bg #0A0519
  btCircle: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  btCircleActive: { backgroundColor: '#0A0519' },
  btIconSymbol: { fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 1 },
  btIconActive: { color: '#fff' },
  btLabel: { fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: 0.2 },
  btLabelActive: { color: 'rgba(255,255,255,0.9)' },
  // Figma: home indicator 134x5, borderRadius 100, color #111
  homeIndicator: { width: 134, height: 5, borderRadius: 100, backgroundColor: '#111', marginTop: 8, alignSelf: 'center' },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
});
