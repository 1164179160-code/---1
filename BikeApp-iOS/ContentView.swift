import SwiftUI

struct ContentView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("首页")
                }
                .tag(0)
            
            BikesView()
                .tabItem {
                    Image(systemName: "bicycle")
                    Text("车型")
                }
                .tag(1)
            
            AccessoriesView()
                .tabItem {
                    Image(systemName: "bag.fill")
                    Text("配件")
                }
                .tag(2)
            
            FeedView()
                .tabItem {
                    Image(systemName: "square.grid.2x2.fill")
                    Text("发现")
                }
                .tag(3)
        }
        .accentColor(.purple)
    }
}

struct HomeView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // 英雄海报
                ZStack(alignment: .bottom) {
                    Image(systemName: "mountain.2.fill")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(height: 400)
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.purple, .blue],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                    
                    VStack(spacing: 16) {
                        Text("征服每一座山峰")
                            .font(.system(size: 36, weight: .bold))
                            .foregroundColor(.white)
                        
                        Text("专业级山地车，为极限而生")
                            .font(.system(size: 18))
                            .foregroundColor(.white.opacity(0.9))
                        
                        Button(action: {}) {
                            Text("立即探索")
                                .font(.system(size: 18, weight: .semibold))
                                .foregroundColor(.purple)
                                .padding(.horizontal, 40)
                                .padding(.vertical, 16)
                                .background(Color.white)
                                .cornerRadius(25)
                        }
                        .padding(.bottom, 40)
                    }
                }
                
                // 爆款推荐
                VStack(alignment: .leading, spacing: 20) {
                    HStack {
                        Text("爆款热销")
                            .font(.system(size: 28, weight: .bold))
                        
                        Text("HOT")
                            .font(.system(size: 12, weight: .bold))
                            .foregroundColor(.white)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 6)
                            .background(
                                LinearGradient(
                                    colors: [.pink, .red],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .cornerRadius(12)
                    }
                    .padding(.horizontal)
                    .padding(.top, 30)
                    
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 16) {
                            FeaturedBikeCard(
                                title: "Thunder Pro 碳纤维",
                                subtitle: "销量突破10000+台",
                                price: "¥18,999",
                                oldPrice: "¥24,999",
                                tag: "年度爆款"
                            )
                            
                            FeaturedBikeCard(
                                title: "Storm Elite 电助力",
                                subtitle: "智能电控系统",
                                price: "¥28,999",
                                oldPrice: nil,
                                tag: "新品上市"
                            )
                            
                            FeaturedBikeCard(
                                title: "Viper X1 速降车",
                                subtitle: "专业竞技级",
                                price: "¥42,999",
                                oldPrice: nil,
                                tag: "新品上市"
                            )
                        }
                        .padding(.horizontal)
                    }
                }
                .padding(.bottom, 30)
            }
        }
        .ignoresSafeArea(edges: .top)
    }
}

struct FeaturedBikeCard: View {
    let title: String
    let subtitle: String
    let price: String
    let oldPrice: String?
    let tag: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            ZStack(alignment: .topLeading) {
                RoundedRectangle(cornerRadius: 16)
                    .fill(Color.gray.opacity(0.2))
                    .frame(width: 280, height: 180)
                
                Text(tag)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.white)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(
                        LinearGradient(
                            colors: tag == "年度爆款" ? [.purple, .blue] : [.pink, .red],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .cornerRadius(12)
                    .padding(12)
            }
            
            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(.system(size: 18, weight: .semibold))
                
                Text(subtitle)
                    .font(.system(size: 14))
                    .foregroundColor(.gray)
                
                HStack(spacing: 8) {
                    Text(price)
                        .font(.system(size: 22, weight: .bold))
                        .foregroundColor(.purple)
                    
                    if let oldPrice = oldPrice {
                        Text(oldPrice)
                            .font(.system(size: 14))
                            .foregroundColor(.gray)
                            .strikethrough()
                    }
                }
            }
            .padding(.horizontal, 8)
        }
        .frame(width: 280)
        .padding(.vertical, 12)
        .background(Color(.systemBackground))
        .cornerRadius(20)
        .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 5)
    }
}

struct BikesView: View {
    let bikes = [
        ("XC竞速系列", "轻量化碳纤维车架", "¥15,999"),
        ("Trail全能系列", "150mm行程避震", "¥22,999"),
        ("Enduro极限系列", "180mm双避震系统", "¥35,999")
    ]
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(bikes, id: \.0) { bike in
                        BikeCard(name: bike.0, desc: bike.1, price: bike.2)
                    }
                }
                .padding()
            }
            .navigationTitle("精选车型")
        }
    }
}

struct BikeCard: View {
    let name: String
    let desc: String
    let price: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(0.2))
                .frame(height: 140)
            
            VStack(alignment: .leading, spacing: 6) {
                Text(name)
                    .font(.system(size: 16, weight: .semibold))
                
                Text(desc)
                    .font(.system(size: 12))
                    .foregroundColor(.gray)
                
                Text(price)
                    .font(.system(size: 18, weight: .bold))
                    .foregroundColor(.purple)
            }
            .padding(.horizontal, 8)
            .padding(.bottom, 8)
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
}

struct AccessoriesView: View {
    let accessories = [
        ("🧤", "专业手套", "防滑透气", "¥299"),
        ("⌚", "运动手表", "GPS定位", "¥1,299"),
        ("🕶️", "骑行眼镜", "防紫外线", "¥599"),
        ("🎽", "速干衣", "排汗快干", "¥399"),
        ("🪖", "安全头盔", "轻量防护", "¥899"),
        ("👟", "锁鞋", "专业锁踏", "¥799")
    ]
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 16) {
                    ForEach(accessories, id: \.1) { item in
                        AccessoryCard(icon: item.0, name: item.1, desc: item.2, price: item.3)
                    }
                }
                .padding()
            }
            .navigationTitle("骑行装备")
        }
    }
}

struct AccessoryCard: View {
    let icon: String
    let name: String
    let desc: String
    let price: String
    
    var body: some View {
        VStack(spacing: 12) {
            Text(icon)
                .font(.system(size: 48))
            
            Text(name)
                .font(.system(size: 14, weight: .semibold))
            
            Text(desc)
                .font(.system(size: 11))
                .foregroundColor(.gray)
            
            Text(price)
                .font(.system(size: 16, weight: .bold))
                .foregroundColor(.purple)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
}

struct FeedView: View {
    let feeds = [
        ("车型推荐", "2024年度最佳山地车TOP10", "12.5k", "328"),
        ("热门话题", "川藏线骑行攻略完整版", "28.3k", "892"),
        ("产品服务", "免费保养服务升级", "8.9k", "156"),
        ("车型推荐", "新手入门车型选购指南", "15.7k", "445"),
        ("热门话题", "骑行减肥30天挑战", "35.2k", "1.2k"),
        ("产品服务", "以旧换新活动开启", "19.8k", "567")
    ]
    
    var body: some View {
        NavigationView {
            ScrollView {
                LazyVStack(spacing: 16) {
                    ForEach(feeds, id: \.1) { feed in
                        FeedCard(tag: feed.0, title: feed.1, views: feed.2, comments: feed.3)
                    }
                }
                .padding()
            }
            .navigationTitle("发现更多")
        }
    }
}

struct FeedCard: View {
    let tag: String
    let title: String
    let views: String
    let comments: String
    
    var body: some View {
        HStack(spacing: 16) {
            RoundedRectangle(cornerRadius: 12)
                .fill(Color.gray.opacity(0.2))
                .frame(width: 100, height: 100)
            
            VStack(alignment: .leading, spacing: 8) {
                Text(tag)
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(tag == "热门话题" ? .red : .purple)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(tag == "热门话题" ? Color.red.opacity(0.1) : Color.purple.opacity(0.1))
                    .cornerRadius(8)
                
                Text(title)
                    .font(.system(size: 15, weight: .semibold))
                    .lineLimit(2)
                
                HStack(spacing: 16) {
                    Label(views, systemImage: "eye.fill")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                    
                    Label(comments, systemImage: "bubble.left.fill")
                        .font(.system(size: 12))
                        .foregroundColor(.gray)
                }
            }
            
            Spacer()
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: .black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
}

#Preview {
    ContentView()
}
