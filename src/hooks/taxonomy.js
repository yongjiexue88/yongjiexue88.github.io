/** Stable URL identifiers with localized display labels, including legacy Chinese tags. */
const labels = {
    all: ['All', '全部'], reflection: ['Reflection', '反思'], family: ['Family', '家庭'],
    money: ['Money', '金钱'], health: ['Health', '健康'], diary: ['Diary', '日记'],
    parenting: ['Parenting', '育儿'], life: ['Life', '生活'],
    'english-writing': ['English Writing', '英语写作'], vocabulary: ['Vocabulary', '词汇'],
    review: ['Review', '复习'], 'professional-english': ['Professional English', '职场英语'],
    speaking: ['Speaking', '口语'], 'class-notes': ['Class Notes', '课堂笔记'],
    'business-english': ['Business English', '商务英语'], newspaper: ['Newspaper', '报刊'],
    markets: ['Markets', '市场'], governance: ['Governance', '治理'], china: ['China', '中国'],
    economics: ['Economics', '经济学'], migration: ['Migration', '人口迁移'],
    'health-technology': ['Health Technology', '健康科技'], teamwork: ['Teamwork', '团队协作'],
    science: ['Science', '科学'], 'science-notes': ['Science Notes', '科学笔记'],
    technology: ['Technology', '技术'], 'consumer-products': ['Consumer Products', '消费品'],
    'study-book': ['Study Book', '学习手册'], 'finance-notes': ['Finance Notes', '理财笔记'],
    'personal-finance': ['Personal Finance', '个人理财'], 'debt-free': ['Debt Free', '无债生活'],
    budgeting: ['Budgeting', '预算规划'], 'wealth-building': ['Wealth Building', '财富积累'],
    pronunciation: ['Pronunciation', '发音'], grammar: ['Grammar', '语法'], idioms: ['Idioms', '习语'],
    'law-notes': ['Law Notes', '法律笔记'], 'legal-stories': ['Legal Stories', '法律故事'],
    'texas-law': ['Texas Law', '得克萨斯州法律'], 'criminal-defense': ['Criminal Defense', '刑事辩护'],
    'civil-rights': ['Civil Rights', '公民权利'], 'phrasal-verbs': ['Phrasal Verbs', '短语动词']
}

export function canonicalTag(value) {
    return Object.keys(labels).find(key => labels[key][1] === value) || value
}

export function taxonomyLabel(value, languageId = 'en') {
    return labels[canonicalTag(value)]?.[languageId === 'zh' ? 1 : 0] || value
}

export function translationNotice(post, languageId) {
    const contentLanguage = post.frontmatter.language || 'en'
    if(contentLanguage === languageId) return ''
    return languageId === 'zh' ? '本文暂无中文译文，显示英文原文。' : 'This entry is available in Chinese only.'
}
