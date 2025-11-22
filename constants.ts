import { WordDatabase } from './types';

export const TEXTBOOK_OPTIONS = [
  { value: "sevens", label: "外研版·七年级上册" },
  { value: "sevenths", label: "外研版·七年级下册" },
  { value: "eights", label: "外研版·八年级上册" },
  { value: "eighth", label: "外研版·八年级下册" },
  { value: "nines", label: "外研版·九年级上册" },
  { value: "ninth", label: "外研版·九年级下册" },
];

export const STUDENT_POOL = [
  '林宇晴', '王梓轩', '陈思远', '刘思彤', '赵浩然',
  '胡明远', '周子涵', '吴雨桐', '郑博文', '孙艺涵',
  '张思睿', '李雨桐', '王梓豪', '陈雨欣', '刘浩然',
  '赵思彤', '孙宇轩', '周雨桐', '吴思远', '郑浩然'
];

export const WORD_DATABASE: WordDatabase = {
  sevens: {
    unit1: {
      title: "Module 1 My classmates",
      words: [
        { english: "greet", chinese: "问候；打招呼" },
        { english: "classmate", chinese: "同班同学" },
        { english: "name", chinese: "名字；命名" },
        { english: "meet", chinese: "遇见；会面" },
        { english: "too", chinese: "也；太" },
        { english: "from", chinese: "来自；从" },
        { english: "year", chinese: "年；岁" },
        { english: "China", chinese: "中国" },
        { english: "what", chinese: "什么" },
        { english: "call", chinese: "叫做；称呼" },
        { english: "Mr", chinese: "先生" },
        { english: "Ms", chinese: "女士" },
        { english: "Mrs", chinese: "夫人" },
        { english: "Miss", chinese: "小姐" },
        { english: "age", chinese: "年龄" },
        { english: "how old", chinese: "多大年纪" }
      ]
    },
    unit2: {
      title: "Module 2 My family",
      words: [
        { english: "family", chinese: "家庭；家人" },
        { english: "parent", chinese: "父亲；母亲" },
        { english: "father", chinese: "父亲" },
        { english: "mother", chinese: "母亲" },
        { english: "sister", chinese: "姐；妹" },
        { english: "brother", chinese: "兄；弟" },
        { english: "photo", chinese: "照片" },
        { english: "these", chinese: "这些" },
        { english: "those", chinese: "那些" },
        { english: "who", chinese: "谁" },
        { english: "grandparent", chinese: "祖父；祖母" },
        { english: "grandfather", chinese: "祖父；外祖父" },
        { english: "grandmother", chinese: "祖母；外祖母" },
        { english: "uncle", chinese: "叔叔；舅舅" },
        { english: "aunt", chinese: "阿姨；姑姑" },
        { english: "cousin", chinese: "堂兄(弟姐妹)；表兄(弟姐妹)" }
      ]
    },
    unit3: {
      title: "Module 3 My school",
      words: [
        { english: "school", chinese: "学校" },
        { english: "classroom", chinese: "教室" },
        { english: "teacher", chinese: "教师" },
        { english: "student", chinese: "学生" },
        { english: "book", chinese: "书" },
        { english: "pen", chinese: "钢笔" },
        { english: "pencil", chinese: "铅笔" },
        { english: "desk", chinese: "书桌" },
        { english: "chair", chinese: "椅子" },
        { english: "bag", chinese: "书包" },
        { english: "map", chinese: "地图" },
        { english: "computer", chinese: "计算机" },
        { english: "blackboard", chinese: "黑板" },
        { english: "where", chinese: "在哪里" },
        { english: "in", chinese: "在……里" },
        { english: "on", chinese: "在……上" },
        { english: "under", chinese: "在……下面" }
      ]
    },
    unit4: {
      title: "Module 4 Healthy food",
      words: [
        { english: "food", chinese: "食物" },
        { english: "drink", chinese: "饮料" },
        { english: "meat", chinese: "肉" },
        { english: "fish", chinese: "鱼" },
        { english: "rice", chinese: "米饭" },
        { english: "noodle", chinese: "面条" },
        { english: "egg", chinese: "鸡蛋" },
        { english: "milk", chinese: "牛奶" },
        { english: "water", chinese: "水" },
        { english: "vegetable", chinese: "蔬菜" },
        { english: "fruit", chinese: "水果" },
        { english: "apple", chinese: "苹果" },
        { english: "banana", chinese: "香蕉" },
        { english: "orange", chinese: "橙子" },
        { english: "tomato", chinese: "西红柿" },
        { english: "potato", chinese: "土豆" }
      ]
    },
    unit5: {
      title: "Module 5 My school day",
      words: [
        { english: "day", chinese: "天；日" },
        { english: "morning", chinese: "早上" },
        { english: "afternoon", chinese: "下午" },
        { english: "evening", chinese: "晚上" },
        { english: "o'clock", chinese: "……点钟" },
        { english: "half", chinese: "一半" },
        { english: "past", chinese: "过" },
        { english: "to", chinese: "差" },
        { english: "get up", chinese: "起床" },
        { english: "go to school", chinese: "去上学" },
        { english: "have breakfast", chinese: "吃早餐" },
        { english: "have lunch", chinese: "吃午餐" },
        { english: "have dinner", chinese: "吃晚餐" },
        { english: "go home", chinese: "回家" },
        { english: "watch TV", chinese: "看电视" },
        { english: "go to bed", chinese: "上床睡觉" }
      ]
    },
    unit6: {
      title: "Module 6 A trip to the zoo",
      words: [
        { english: "zoo", chinese: "动物园" },
        { english: "animal", chinese: "动物" },
        { english: "tiger", chinese: "老虎" },
        { english: "lion", chinese: "狮子" },
        { english: "elephant", chinese: "大象" },
        { english: "panda", chinese: "熊猫" },
        { english: "monkey", chinese: "猴子" },
        { english: "bear", chinese: "熊" },
        { english: "giraffe", chinese: "长颈鹿" },
        { english: "zebra", chinese: "斑马" },
        { english: "bird", chinese: "鸟" },
        { english: "snake", chinese: "蛇" },
        { english: "fish", chinese: "鱼" },
        { english: "tall", chinese: "高的" },
        { english: "short", chinese: "矮的" },
        { english: "long", chinese: "长的" },
        { english: "fat", chinese: "胖的" }
      ]
    }
  },
  sevenths: {
    unit1: {
      title: "Module 1 Can you play the guitar?",
      words: [
        { english: "guitar", chinese: "吉他" },
        { english: "sing", chinese: "唱歌" },
        { english: "swim", chinese: "游泳" },
        { english: "dance", chinese: "跳舞" },
        { english: "draw", chinese: "画画" },
        { english: "play chess", chinese: "下国际象棋" },
        { english: "speak English", chinese: "说英语" },
        { english: "join", chinese: "加入" },
        { english: "club", chinese: "俱乐部" },
        { english: "tell", chinese: "告诉" },
        { english: "story", chinese: "故事" },
        { english: "write", chinese: "写" },
        { english: "show", chinese: "展示" },
        { english: "or", chinese: "或者" },
        { english: "talk", chinese: "说话" }
      ]
    },
    unit2: {
      title: "Module 2 What time do you go to school?",
      words: [
        { english: "up", chinese: "向上" },
        { english: "get up", chinese: "起床" },
        { english: "dress", chinese: "穿衣服" },
        { english: "get dressed", chinese: "穿上衣服" },
        { english: "brush", chinese: "刷" },
        { english: "tooth", chinese: "牙齿" },
        { english: "teeth", chinese: "牙齿(复数)" },
        { english: "shower", chinese: "淋浴" },
        { english: "take a shower", chinese: "洗淋浴" },
        { english: "usually", chinese: "通常" },
        { english: "forty", chinese: "四十" },
        { english: "never", chinese: "从不" },
        { english: "early", chinese: "早的" },
        { english: "late", chinese: "晚的" },
        { english: "job", chinese: "工作" }
      ]
    },
    unit3: {
      title: "Module 3 How do you get to school?",
      words: [
        { english: "train", chinese: "火车" },
        { english: "bus", chinese: "公共汽车" },
        { english: "subway", chinese: "地铁" },
        { english: "bike", chinese: "自行车" },
        { english: "car", chinese: "小汽车" },
        { english: "take", chinese: "乘坐" },
        { english: "by", chinese: "乘坐" },
        { english: "ride", chinese: "骑" },
        { english: "walk", chinese: "步行" },
        { english: "far", chinese: "远的" },
        { english: "kilometer", chinese: "千米" },
        { english: "minute", chinese: "分钟" },
        { english: "hour", chinese: "小时" },
        { english: "stop", chinese: "车站" },
        { english: "think of", chinese: "认为" }
      ]
    },
    unit4: {
      title: "Module 4 Don't eat in class",
      words: [
        { english: "rule", chinese: "规则" },
        { english: "arrive", chinese: "到达" },
        { english: "late", chinese: "迟到" },
        { english: "hallway", chinese: "走廊" },
        { english: "hall", chinese: "大厅" },
        { english: "dining hall", chinese: "餐厅" },
        { english: "listen", chinese: "听" },
        { english: "fight", chinese: "打架" },
        { english: "sorry", chinese: "抱歉的" },
        { english: "outside", chinese: "外面的" },
        { english: "wear", chinese: "穿" },
        { english: "important", chinese: "重要的" },
        { english: "bring", chinese: "带来" },
        { english: "uniform", chinese: "校服" },
        { english: "quiet", chinese: "安静的" }
      ]
    },
    unit5: {
      title: "Module 5 Why do you like pandas?",
      words: [
        { english: "panda", chinese: "熊猫" },
        { english: "zoo", chinese: "动物园" },
        { english: "tiger", chinese: "老虎" },
        { english: "elephant", chinese: "大象" },
        { english: "koala", chinese: "树袋熊" },
        { english: "lion", chinese: "狮子" },
        { english: "giraffe", chinese: "长颈鹿" },
        { english: "animal", chinese: "动物" },
        { english: "cute", chinese: "可爱的" },
        { english: "lazy", chinese: "懒惰的" },
        { english: "smart", chinese: "聪明的" },
        { english: "beautiful", chinese: "美丽的" },
        { english: "scary", chinese: "吓人的" },
        { english: "kind", chinese: "种类" },
        { english: "Australia", chinese: "澳大利亚" }
      ]
    },
    unit6: {
      title: "Module 6 I'm watching TV",
      words: [
        { english: "newspaper", chinese: "报纸" },
        { english: "use", chinese: "使用" },
        { english: "Soup", chinese: "汤" },
        { english: "wash", chinese: "洗" },
        { english: "movie", chinese: "电影" },
        { english: "just", chinese: "只是" },
        { english: "eat out", chinese: "出去吃饭" },
        { english: "house", chinese: "房子" },
        { english: "drink", chinese: "喝" },
        { english: "tea", chinese: "茶" },
        { english: "tomorrow", chinese: "明天" },
        { english: "pool", chinese: "游泳池" },
        { english: "shop", chinese: "购物" },
        { english: "supermarket", chinese: "超市" },
        { english: "man", chinese: "男人" },
        { english: "race", chinese: "竞赛" }
      ]
    }
  },
  eights: {
    unit1: {
      title: "Module 1 How to learn English",
      words: [
        { english: "pair", chinese: "（相关的）两个人，一对" },
        { english: "correct", chinese: "改正；纠正" },
        { english: "spelling", chinese: "拼写" },
        { english: "word", chinese: "词；单词；字" },
        { english: "practise", chinese: "练习" },
        { english: "match", chinese: "找到与...相配之物，使相配；使成对" },
        { english: "meaning", chinese: "意义；意思" },
        { english: "sentence", chinese: "句子" },
        { english: "dictionary", chinese: "词典；字典" },
        { english: "grammar", chinese: "语法" },
        { english: "letter", chinese: "字母" },
        { english: "look up", chinese: "查；查找" },
        { english: "mistake", chinese: "错误；过错" },
        { english: "make a mistake", chinese: "犯错误" },
        { english: "understand", chinese: "理解；明白" },
        { english: "advice", chinese: "意见；建议" },
        { english: "should", chinese: "应该" }
      ]
    },
    unit2: {
      title: "Module 2 Experiences",
      words: [
        { english: "ever", chinese: "曾经" },
        { english: "earth", chinese: "地球" },
        { english: "moon", chinese: "月亮" },
        { english: "cough", chinese: "咳嗽" },
        { english: "cartoon", chinese: "漫画；动画片" },
        { english: "hero", chinese: "英雄" },
        { english: "humorous", chinese: "幽默的" },
        { english: "laugh", chinese: "笑" },
        { english: "win the heart of", chinese: "赢得……的心" },
        { english: "sound", chinese: "听起来" },
        { english: "film", chinese: "电影" },
        { english: "character", chinese: "角色" },
        { english: "cool", chinese: "酷的" },
        { english: "smart", chinese: "机灵的；聪明的" },
        { english: "sky", chinese: "天；天空" }
      ]
    },
    unit3: {
      title: "Module 3 Journey to space",
      words: [
        { english: "earth", chinese: "地球" },
        { english: "moon", chinese: "月亮" },
        { english: "news", chinese: "新闻；消息" },
        { english: "reach", chinese: "到达" },
        { english: "planet", chinese: "行星" },
        { english: "scientist", chinese: "科学家" },
        { english: "space", chinese: "太空" },
        { english: "travel", chinese: "旅行" },
        { english: "none", chinese: "没有一个" },
        { english: "environment", chinese: "环境" },
        { english: "that", chinese: "那；那个" },
        { english: "solar", chinese: "太阳的" },
        { english: "system", chinese: "系统" },
        { english: "solar system", chinese: "太阳系" },
        { english: "group", chinese: "群；组" }
      ]
    },
    unit4: {
      title: "Module 4 Education",
      words: [
        { english: "education", chinese: "教育" },
        { english: "university", chinese: "大学" },
        { english: "degree", chinese: "课程；学位" },
        { english: "whatever", chinese: "无论什么；不管什么" },
        { english: "give up", chinese: "放弃（努力）" },
        { english: "amazing", chinese: "惊人的；极好的" },
        { english: "will", chinese: "意志；决心" },
        { english: "victory", chinese: "成功；胜利" },
        { english: "simply", chinese: "实在；的确" },
        { english: "Canadian", chinese: "加拿大的；加拿大人的" },
        { english: "sick", chinese: "（感觉）不适的；生病的" },
        { english: "soldier", chinese: "军人；士兵" },
        { english: "treat", chinese: "医治；治疗" },
        { english: "war", chinese: "战争" }
      ]
    },
    unit5: {
      title: "Module 5 Western music",
      words: [
        { english: "classical", chinese: "古典的" },
        { english: "jazz", chinese: "爵士乐" },
        { english: "pop", chinese: "流行音乐" },
        { english: "rock", chinese: "摇滚乐" },
        { english: "techno", chinese: "电子音乐" },
        { english: "beautiful", chinese: "美的；美丽的" },
        { english: "fun", chinese: "有趣的" },
        { english: "lively", chinese: "活泼的；轻快的" },
        { english: "sad", chinese: "悲伤的" },
        { english: "serious", chinese: "严肃的；严重的" },
        { english: "slow", chinese: "慢的" },
        { english: "traditional", chinese: "传统的" },
        { english: "sure", chinese: "肯定的" },
        { english: "German", chinese: "德国的；德语的；德国人" },
        { english: "Austrian", chinese: "奥地利的；奥地利人" }
      ]
    },
    unit6: {
      title: "Module 6 Animals in danger",
      words: [
        { english: "snake", chinese: "蛇" },
        { english: "neck", chinese: "颈，脖子" },
        { english: "thin", chinese: "薄的；细长的" },
        { english: "danger", chinese: "危险；风险" },
        { english: "in danger", chinese: "处于危险中" },
        { english: "at last", chinese: "终于" },
        { english: "interested", chinese: "关心的；感兴趣的" },
        { english: "allow", chinese: "允许；答应" },
        { english: "think of", chinese: "想到；想出" },
        { english: "protect", chinese: "保护；保卫" },
        { english: "wild", chinese: "野生的" },
        { english: "grow", chinese: "（逐渐）变得；生长" },
        { english: "take away", chinese: "夺去；拿走" },
        { english: "enough", chinese: "足够的；充裕的" },
        { english: "peace", chinese: "和平；太平" }
      ]
    }
  },
  eighth: {
    unit1: {
      title: "Module 1 Feelings and impressions",
      words: [
        { english: "smell", chinese: "闻；有……气味" },
        { english: "soft", chinese: "软的；柔软的" },
        { english: "sour", chinese: "酸的；馊的" },
        { english: "cookie", chinese: "小甜饼；曲奇饼" },
        { english: "pizza", chinese: "比萨饼" },
        { english: "lovely", chinese: "令人愉快的；可爱的" },
        { english: "done", chinese: "完成的" },
        { english: "try", chinese: "尝试" },
        { english: "pie", chinese: "馅饼" },
        { english: "sound", chinese: "听起来" },
        { english: "salt", chinese: "盐" },
        { english: "jam", chinese: "果酱" },
        { english: "for", chinese: "用来" },
        { english: "favourite", chinese: "最喜欢的人或事" },
        { english: "ear", chinese: "耳朵" }
      ]
    },
    unit2: {
      title: "Module 2 Experiences",
      words: [
        { english: "ever", chinese: "曾经" },
        { english: "earth", chinese: "地球" },
        { english: "moon", chinese: "月亮" },
        { english: "cough", chinese: "咳嗽" },
        { english: "cartoon", chinese: "漫画；动画片" },
        { english: "hero", chinese: "英雄" },
        { english: "humorous", chinese: "幽默的" },
        { english: "laugh", chinese: "笑" },
        { english: "win the heart of", chinese: "赢得……的心" },
        { english: "sound", chinese: "听起来" },
        { english: "film", chinese: "电影" },
        { english: "character", chinese: "角色" },
        { english: "cool", chinese: "酷的" },
        { english: "smart", chinese: "机灵的；聪明的" },
        { english: "sky", chinese: "天；天空" }
      ]
    },
    unit3: {
      title: "Module 3 Journey to space",
      words: [
        { english: "earth", chinese: "地球" },
        { english: "moon", chinese: "月亮" },
        { english: "news", chinese: "新闻；消息" },
        { english: "reach", chinese: "到达" },
        { english: "planet", chinese: "行星" },
        { english: "scientist", chinese: "科学家" },
        { english: "space", chinese: "太空" },
        { english: "travel", chinese: "旅行" },
        { english: "none", chinese: "没有一个" },
        { english: "environment", chinese: "环境" },
        { english: "that", chinese: "那；那个" },
        { english: "solar", chinese: "太阳的" },
        { english: "system", chinese: "系统" },
        { english: "solar system", chinese: "太阳系" },
        { english: "group", chinese: "群；组" }
      ]
    },
    unit4: {
      title: "Module 4 Seeing the doctor",
      words: [
        { english: "fever", chinese: "发烧" },
        { english: "flu", chinese: "流行性感冒" },
        { english: "knee", chinese: "膝盖" },
        { english: "wound", chinese: "伤口" },
        { english: "miss", chinese: "不在" },
        { english: "trip", chinese: "绊倒" },
        { english: "improvement", chinese: "改善；改进" },
        { english: "oncoming", chinese: "迎面而来的" },
        { english: "couch", chinese: "长沙发" },
        { english: "expert", chinese: "专家" },
        { english: "require", chinese: "需要" },
        { english: "fit", chinese: "健康的" },
        { english: "amount", chinese: "数量" },
        { english: "weight", chinese: "重量" },
        { english: "effect", chinese: "影响" }
      ]
    },
    unit5: {
      title: "Module 5 Cartoons",
      words: [
        { english: "cartoon", chinese: "漫画；动画片" },
        { english: "hero", chinese: "英雄" },
        { english: "humorous", chinese: "幽默的" },
        { english: "laugh", chinese: "笑" },
        { english: "win the heart of", chinese: "赢得……的心" },
        { english: "sound", chinese: "听起来" },
        { english: "film", chinese: "电影" },
        { english: "character", chinese: "角色" },
        { english: "cool", chinese: "酷的" },
        { english: "smart", chinese: "机灵的；聪明的" },
        { english: "sky", chinese: "天；天空" },
        { english: "fight", chinese: "与……战斗；战斗" },
        { english: "can't help doing sth.", chinese: "忍不住做某事" },
        { english: "lesson", chinese: "经验；教训" },
        { english: "orange-and-white", chinese: "橙白相间的" }
      ]
    },
    unit6: {
      title: "Module 6 Hobbies",
      words: [
        { english: "hobby", chinese: "爱好" },
        { english: "collect", chinese: "收集" },
        { english: "sailing", chinese: "帆船运动" },
        { english: "creative", chinese: "有创造力的" },
        { english: "skill", chinese: "技能" },
        { english: "fan", chinese: "扇子" },
        { english: "stamp", chinese: "邮票" },
        { english: "tidy", chinese: "整理、收拾；整洁的" },
        { english: "tidy up", chinese: "使整齐；使整洁" },
        { english: "shelf", chinese: "隔板" },
        { english: "have a look", chinese: "看一看" },
        { english: "as", chinese: "作为；当" },
        { english: "coin", chinese: "硬币" },
        { english: "note", chinese: "纸币" },
        { english: "pound", chinese: "英镑" }
      ]
    }
  },
  nines: {
    unit1: {
      title: "Module 1 How can we become good learners?",
      words: [
        { english: "textbook", chinese: "教科书；课本" },
        { english: "pronunciation", chinese: "发音；读音" },
        { english: "grammar", chinese: "语法；语法知识" },
        { english: "discover", chinese: "发现；发觉" },
        { english: "repeat", chinese: "重复；重做" },
        { english: "note", chinese: "笔记；注意" },
        { english: "take notes", chinese: "记笔记" },
        { english: "look up", chinese: "查阅；抬头看" },
        { english: "memorize", chinese: "记忆；记住" },
        { english: "pattern", chinese: "模式；方式" },
        { english: "physics", chinese: "物理；物理学" },
        { english: "chemistry", chinese: "化学" },
        { english: "partner", chinese: "搭档；同伴" },
        { english: "pal", chinese: "朋友；伙伴" },
        { english: "discover", chinese: "发现；发觉" }
      ]
    },
    unit2: {
      title: "Module 2 I think that mooncakes are delicious!",
      words: [
        { english: "mooncake", chinese: "月饼" },
        { english: "lantern", chinese: "灯笼；提灯" },
        { english: "stranger", chinese: "陌生人；外地人" },
        { english: "relative", chinese: "亲属；相关的" },
        { english: "put on", chinese: "穿上；增加" },
        { english: "admire", chinese: "欣赏；钦佩" },
        { english: "tie", chinese: "系；领带" },
        { english: "haunted", chinese: "有鬼魂出没的；闹鬼的" },
        { english: "ghost", chinese: "鬼；鬼魂" },
        { english: "trick", chinese: "花招；把戏" },
        { english: "treat", chinese: "款待；招待" },
        { english: "spider", chinese: "蜘蛛" },
        { english: "Christmas", chinese: "圣诞节" },
        { english: "lie", chinese: "平躺；处于" },
        { english: "novel", chinese: "（长篇）小说" }
      ]
    },
    unit3: {
      title: "Module 3 Could you please tell me where the restrooms are?",
      words: [
        { english: "restroom", chinese: "洗手间；公共厕所" },
        { english: "stamp", chinese: "邮票；盖章" },
        { english: "bookstore", chinese: "书店" },
        { english: "museum", chinese: "博物馆" },
        { english: "ask", chinese: "请求；要求" },
        { english: "politely", chinese: "礼貌地；客气地" },
        { english: "request", chinese: "要求；请求" },
        { english: "direction", chinese: "方向；方位" },
        { english: "correct", chinese: "正确的；恰当的" },
        { english: "polite", chinese: "有礼貌的；客气的" },
        { english: "speaker", chinese: "讲（某种语言）的人；发言者" },
        { english: "whom", chinese: "谁；什么人" },
        { english: "impolite", chinese: "无礼的；粗鲁的" },
        { english: "address", chinese: "住址；地址；通讯处" },
        { english: "underground", chinese: "地下的；地铁" }
      ]
    },
    unit4: {
      title: "Module 4 I used to be afraid of the dark.",
      words: [
        { english: "humor", chinese: "幽默；幽默感" },
        { english: "silent", chinese: "不说话的；沉默的" },
        { english: "helpful", chinese: "有帮助的；有用的" },
        { english: "score", chinese: "得分；进球" },
        { english: "background", chinese: "背景" },
        { english: "interview", chinese: "采访；面试" },
        { english: "Asian", chinese: "亚洲的；亚洲人的" },
        { english: "deal with", chinese: "对付；应付" },
        { english: "dare", chinese: "敢于；胆敢" },
        { english: "private", chinese: "私人的；私密的" },
        { english: "guard", chinese: "警卫；看守" },
        { english: "require", chinese: "需要；要求" },
        { english: "European", chinese: "欧洲的；欧洲人的" },
        { english: "African", chinese: "非洲的；非洲人的" },
        { english: "British", chinese: "英国的；英国人的" }
      ]
    },
    unit5: {
      title: "Module 5 What are the shirts made of?",
      words: [
        { english: "material", chinese: "材料；原料" },
        { english: "chopstick", chinese: "筷子" },
        { english: "coin", chinese: "硬币" },
        { english: "fork", chinese: "餐叉；叉子" },
        { english: "blouse", chinese: "（女士）短上衣；衬衫" },
        { english: "silver", chinese: "银；银器" },
        { english: "glass", chinese: "玻璃" },
        { english: "cotton", chinese: "棉；棉花" },
        { english: "steel", chinese: "钢；钢铁" },
        { english: "grass", chinese: "草；草地" },
        { english: "leaf", chinese: "叶；叶子" },
        { english: "produce", chinese: "生产；制造；出产" },
        { english: "widely", chinese: "广泛地；普遍地" },
        { english: "process", chinese: "加工；处理" },
        { english: "pack", chinese: "包装；装箱" }
      ]
    },
    unit6: {
      title: "Module 6 When was it invented?",
      words: [
        { english: "invitation", chinese: "邀请；请柬" },
        { english: "calendar", chinese: "日历；历书" },
        { english: "balloon", chinese: "气球" },
        { english: "paint", chinese: "绘画" },
        { english: "heat", chinese: "使加热；给……加热" },
        { english: "heat up", chinese: "使变热；加热" },
        { english: "knife", chinese: "餐刀；刀具" },
        { english: "fork", chinese: "餐叉" },
        { english: "spoon", chinese: "勺子" },
        { english: "cheeseburger", chinese: "干酪汉堡包" },
        { english: "Italian", chinese: "意大利的；意大利语的" },
        { english: "Westerner", chinese: "西方人" },
        { english: "West", chinese: "西方；西部" },
        { english: "serve", chinese: "提供；端上" },
        { english: "similar", chinese: "相似的" }
      ]
    }
  },
  ninth: {
    unit1: {
      title: "Module 1 Travel",
      words: [
        { english: "flight", chinese: "航班，飞行" },
        { english: "because of", chinese: "因为，由于" },
        { english: "direct", chinese: "径直地，直接地" },
        { english: "pilot", chinese: "飞行员" },
        { english: "succeed", chinese: "成功，做成" },
        { english: "school-leaver", chinese: "毕业生" },
        { english: "exactly", chinese: "确切地，完全" },
        { english: "take care", chinese: "多保重（告别用语）" },
        { english: "sir", chinese: "先生，长官" },
        { english: "officer", chinese: "军官，官员，警察" },
        { english: "stupid", chinese: "笨的，糊涂的" },
        { english: "take off", chinese: "脱去" },
        { english: "jacket", chinese: "短上衣，夹克" },
        { english: "airplane", chinese: "飞机" },
        { english: "coach", chinese: "公共汽车" }
      ]
    },
    unit2: {
      title: "Module 2 Education",
      words: [
        { english: "ours", chinese: "我们的" },
        { english: "tie", chinese: "领带" },
        { english: "row", chinese: "一排，一行，一列" },
        { english: "pool", chinese: "水池，游泳池" },
        { english: "pass", chinese: "及格，通过（考试或检查）" },
        { english: "secondary", chinese: "中等的，次要的，间接的" },
        { english: "secondary school", chinese: "中学" },
        { english: "absent", chinese: "缺席的，不在的" },
        { english: "bell", chinese: "钟，铃" },
        { english: "math", chinese: "数学" },
        { english: "geography", chinese: "地理" },
        { english: "history", chinese: "历史" },
        { english: "physics", chinese: "物理" },
        { english: "chemistry", chinese: "化学" },
        { english: "biology", chinese: "生物" }
      ]
    },
    unit3: {
      title: "Module 3 Now and then",
      words: [
        { english: "wealthy", chinese: "富有的，富裕的" },
        { english: "fear", chinese: "担心，害怕" },
        { english: "used to", chinese: "过去常常" },
        { english: "wealth", chinese: "财富，财产" },
        { english: "double", chinese: "使加倍，把……增加一倍" },
        { english: "seldom", chinese: "很少地，不常" },
        { english: "spare", chinese: "空闲的，备用的" },
        { english: "spare time", chinese: "业余时间，闲暇" },
        { english: "speak up", chinese: "大点声说" },
        { english: "deaf", chinese: "聋的" },
        { english: "tiny", chinese: "微小的，极小的" },
        { english: "electric", chinese: "用电的，电动的" },
        { english: "light", chinese: "电灯" },
        { english: "candle", chinese: "蜡烛" },
        { english: "postman", chinese: "邮递员" }
      ]
    },
    unit4: {
      title: "Module 4 Rules and suggestions",
      words: [
        { english: "set off", chinese: "出发，动身" },
        { english: "sock", chinese: "短袜" },
        { english: "whenever", chinese: "每当，无论什么时候" },
        { english: "proper", chinese: "合适的，恰当的" },
        { english: "edge", chinese: "边，边缘" },
        { english: "yourself", chinese: "你自己" },
        { english: "starve", chinese: "挨饿，饿死" },
        { english: "go", chinese: "尝试，努力" },
        { english: "rock", chinese: "岩石" },
        { english: "rock climbing", chinese: "攀岩" },
        { english: "stone", chinese: "石头" },
        { english: "fairly", chinese: "相当，还算" },
        { english: "smooth", chinese: "无困难的，顺利的" },
        { english: "straight", chinese: "直的，笔直的" },
        { english: "tent", chinese: "帐篷" }
      ]
    },
    unit5: {
      title: "Module 5 Look after yourself",
      words: [
        { english: "catch up", chinese: "赶上" },
        { english: "agreement", chinese: "协议，协定" },
        { english: "blind", chinese: "失明的" },
        { english: "call off", chinese: "取消，决定终止" },
        { english: "thanks to", chinese: "多亏，由于" },
        { english: "health care", chinese: "医疗保健（服务）" },
        { english: "expect", chinese: "预料，预计" },
        { english: "require", chinese: "需要" },
        { english: "physical", chinese: "身体的，体力的" },
        { english: "effort", chinese: "力气，精力" },
        { english: "once in a while", chinese: "偶尔，有时" },
        { english: "harm", chinese: "损害，伤害" },
        { english: "avoid", chinese: "避免" },
        { english: "awful", chinese: "极讨厌的" },
        { english: "exercise", chinese: "锻炼，运动" }
      ]
    },
    unit6: {
      title: "Module 6 Eating together",
      words: [
        { english: "invitation", chinese: "邀请，请柬" },
        { english: "calendar", chinese: "日历，历书" },
        { english: "balloon", chinese: "气球" },
        { english: "paint", chinese: "绘画" },
        { english: "heat", chinese: "使加热，给……加热" },
        { english: "heat up", chinese: "使变热，加热" },
        { english: "knife", chinese: "餐刀，刀具" },
        { english: "fork", chinese: "餐叉" },
        { english: "spoon", chinese: "勺子" },
        { english: "cheeseburger", chinese: "干酪汉堡包" },
        { english: "Italian", chinese: "意大利的，意大利语的" },
        { english: "Westerner", chinese: "西方人" },
        { english: "West", chinese: "西方；西部" },
        { english: "serve", chinese: "提供；端上" },
        { english: "similar", chinese: "相似的" }
      ]
    }
  }
};