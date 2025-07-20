// data-storage.js - 纯JavaScript数据存储模块

// 使用立即执行函数表达式创建私有作用域
const DataStorage = (function() {
  // 私有数据 - 外部无法直接访问
  const list = [
    { name: "梦华录文字游戏", description: "一个普通的文字游戏而已" },
    { name: "开心消消乐", description: "一个有彩蛋的消消乐游戏而已" },
    { name: "萌萌写真集", description: "这是一套绝美的写真" },
    { name: "萌萌写真集V2", description: "这是一套绝美的写真第二版本" }
  ];

  // 公共方法 - 返回数据副本，保护原始数据
  return {
    // 获取完整列表
    getMenuList: function() {
      return [...list]; // 返回数组副本，防止直接修改原始数据
    },
    
    // 根据ID获取单项
    // getItemById: function(id) {
    //   return list.find(item => item.id === id);
    // },
    
    // 添加新项（可选方法）
    addItem: function(item) {
      const newItem = { ...item, id: Date.now() }; // 添加唯一ID
      list.push(newItem);
      return newItem;
    },
    
    // 获取分类列表（可选方法）
    getCategories: function() {
      return [...new Set(list.map(item => item.category))];
    },

    getPasswordConfig:function(){
      const config = {
            password: "01151102", // 默认密码，实际使用时请修改
            maxAttempts: 3,     // 最大尝试次数
            lockoutTime: 10     // 锁定时间（秒）
        };
      return config;
    }
  };
})();

// 导出模块（在浏览器中通过全局变量访问，在Node.js中通过module.exports）
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = DataStorage; // 支持Node.js
} else {
  window.PUB_FUNC = DataStorage; // 支持浏览器全局访问
}    