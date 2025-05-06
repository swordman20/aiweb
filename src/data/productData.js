// 商品分类数据
export const productCategories = [
  {
    id: 1,
    name: 'AI智能产品',
    icon: 'fas fa-robot',
    description: '智能机器人、语音助手等AI产品',
    count: 12
  },
  {
    id: 2,
    name: '数据分析',
    icon: 'fas fa-chart-line',
    description: '数据分析工具、可视化平台',
    count: 8
  },
  {
    id: 3,
    name: '云计算服务',
    icon: 'fas fa-cloud',
    description: '云服务器、存储、数据库服务',
    count: 15
  },
  {
    id: 4,
    name: '安全防护',
    icon: 'fas fa-shield-alt',
    description: '网络安全、数据加密解决方案',
    count: 10
  }
]

// 商品列表数据
export const productList = [
  {
    id: 1,
    name: '智能语音助手',
    category: 'AI智能产品',
    description: '基于深度学习的智能语音助手，支持多语言交互和自然语言理解',
    price: '2999',
    image: '/images/good-voice.jpeg',
    features: ['语音识别', '自然语言处理', '多语言支持'],
    specifications: {
      '处理器': 'AI专用芯片',
      '内存': '4GB',
      '存储': '32GB',
      '续航': '8小时'
    }
  },
  {
    id: 2,
    name: '数据分析平台',
    category: '数据分析',
    description: '一站式数据分析平台，支持数据采集、清洗、分析和可视化',
    price: '5999',
    image: '/images/good-data.jpg',
    features: ['数据采集', '实时分析', '可视化报表'],
    specifications: {
      '处理能力': '每秒10万条数据',
      '存储容量': '无限扩展',
      '并发用户': '1000+'
    }
  },
  {
    id: 3,
    name: '云服务器',
    category: '云计算服务',
    description: '高性能云服务器，支持弹性扩展和按需付费',
    price: '199',
    image: '/images/good-server.jpeg',
    features: ['弹性扩展', '按需付费', '高可用性'],
    specifications: {
      'CPU': '4核',
      '内存': '8GB',
      '带宽': '100Mbps',
      '存储': '100GB SSD'
    }
  },
  {
    id: 4,
    name: '安全防火墙',
    category: '安全防护',
    description: '新一代智能防火墙，提供全方位的网络安全防护',
    price: '3999',
    image: '/images/good-firewall.png',
    features: ['入侵检测', 'DDoS防护', 'Web安全'],
    specifications: {
      '防护能力': '10Gbps',
      '并发连接': '100万',
      '规则库': '实时更新'
    }
  }
] 