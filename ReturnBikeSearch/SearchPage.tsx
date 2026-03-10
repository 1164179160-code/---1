import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

const LOCATIONS = [
  { id: '1', name: '哈罗总部大厦', distance: '距你800米' },
  { id: '2', name: '上海哈罗电普惠科技有限公司', distance: '距你800米' },
  { id: '3', name: '哈罗租车', distance: '距你800米' },
  { id: '4', name: '哈罗单车', distance: '距你800米' },
  { id: '5', name: '哈罗电动车（向荣路）', distance: '距你800米' },
  { id: '6', name: '哈罗电动车（贵都路）', distance: '距你800米' },
  { id: '7', name: '哈罗客户服务接待调解中心', distance: '距你800米' },
  { id: '8', name: '哈罗电动车（龙吴路店）', distance: '距你800米' },
];

export default function SearchPage() {
  const [searchText, setSearchText] = useState('ha');

  const renderItem = ({ item }: { item: typeof LOCATIONS[0] }) => (
    <TouchableOpacity style={styles.listItem} activeOpacity={0.6}>
      <View style={styles.listItemLeft}>
        <View style={styles.locationIcon}>
          <View style={styles.locationPin} />
          <View style={styles.locationDot} />
        </View>
        <Text style={styles.locationName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.locationDistance}>{item.distance}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 顶部导航栏 */}
      <View style={styles.header}>
        {/* 返回按钮 */}
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        {/* 搜索框 */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="搜索地点"
            placeholderTextColor="#BCC4CC"
            autoFocus
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
              <View style={styles.clearIcon}>
                <Text style={styles.clearIconText}>×</Text>
              </View>
            </TouchableOpacity>
          )}
          <View style={styles.searchDivider} />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>搜索</Text>
          </TouchableOpacity>
        </View>

        {/* 右侧微信小程序胶囊按钮 */}
        <View style={styles.capsuleButton}>
          <View style={styles.capsuleDots}>
            <View style={styles.capsuleDotSmall} />
            <View style={styles.capsuleDotLarge} />
          </View>
          <View style={styles.capsuleDivider} />
          <View style={styles.capsuleCircle}>
            <View style={styles.capsuleCircleInner} />
          </View>
        </View>
      </View>

      {/* 搜索结果列表 */}
      <FlatList
        data={LOCATIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: 28, color: '#333', marginTop: -2 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    marginHorizontal: 8,
  },
  searchIcon: { fontSize: 14, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 14, color: '#333', padding: 0 },
  clearButton: { padding: 4 },
  clearIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconText: { fontSize: 12, color: '#fff', marginTop: -1 },
  searchDivider: { width: 1, height: 16, backgroundColor: '#ddd', marginHorizontal: 8 },
  searchButton: { paddingHorizontal: 4 },
  searchButtonText: { fontSize: 14, color: '#333', fontWeight: '500' },
  capsuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  capsuleDots: { flexDirection: 'row', alignItems: 'center' },
  capsuleDotSmall: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#666', marginRight: 2 },
  capsuleDotLarge: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#666' },
  capsuleDivider: { width: 0.5, height: 12, backgroundColor: 'rgba(0,0,0,0.15)', marginHorizontal: 6 },
  capsuleCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capsuleCircleInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#666' },
  list: { flex: 1 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  listItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  locationIcon: { width: 20, alignItems: 'center', marginRight: 12 },
  locationPin: {
    width: 10,
    height: 14,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#999',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  locationDot: {
    width: 4,
    height: 4,
    backgroundColor: '#999',
    marginTop: -1,
  },
  locationName: { fontSize: 15, color: '#333', flex: 1, marginRight: 8 },
  locationDistance: { fontSize: 12, color: '#999' },
  chevron: { fontSize: 20, color: '#ccc' },
  separator: { height: 0.5, backgroundColor: '#f0f0f0', marginLeft: 48 },
});
