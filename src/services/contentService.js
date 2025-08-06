// src/services/contentService.js
class ContentService {
  constructor() {
    this.content = null;
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://ace-notary-exam-california.vercel.app'
      : '';
  }

  // 載入主要內容數據
  async loadContent() {
    if (this.content) return this.content;
    
    try {
      const response = await fetch(`${this.baseUrl}/data/content.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.content = await response.json();
      console.log('📊 Content loaded:', this.content.meta);
      return this.content;
    } catch (error) {
      console.error('❌ Error loading content:', error);
      // 回退到舊的靜態數據
      return this.loadFallbackContent();
    }
  }

  // 獲取所有章節
  async getChapters() {
    const content = await this.loadContent();
    return content.chapters || [];
  }

  // 獲取特定章節
  async getChapter(chapterId) {
    const content = await this.loadContent();
    return content.chapters.find(chapter => chapter.id === chapterId);
  }

  // 獲取章節的 flashcards
  async getChapterFlashcards(chapterId) {
    const chapter = await this.getChapter(chapterId);
    return chapter?.flashcards || [];
  }

  // 獲取章節的音頻文件
  async getChapterAudio(chapterId) {
    const chapter = await this.getChapter(chapterId);
    return chapter?.audio || [];
  }

  // 獲取所有 flashcards
  async getAllFlashcards() {
    const content = await this.loadContent();
    return content.flashcards || [];
  }

  // 獲取應用設置
  async getSettings() {
    const content = await this.loadContent();
    return content.settings || {};
  }

  // 獲取音頻 URL
  async getAudioUrl(filename) {
    const settings = await this.getSettings();
    const baseUrl = settings.audio_base_url || '/audio/';
    return `${baseUrl}${filename}`;
  }

  // 搜索 flashcards
  async searchFlashcards(query, options = {}) {
    const allCards = await this.getAllFlashcards();
    const searchTerm = query.toLowerCase();
    
    return allCards.filter(card => {
      const matchesQuery = 
        card.question.toLowerCase().includes(searchTerm) ||
        card.answer.toLowerCase().includes(searchTerm) ||
        (card.explanation && card.explanation.toLowerCase().includes(searchTerm));
      
      const matchesChapter = !options.chapter || card.chapter === options.chapter;
      const matchesDifficulty = !options.difficulty || card.difficulty === options.difficulty;
      const matchesTags = !options.tags || 
        options.tags.some(tag => card.tags.includes(tag));
      
      return matchesQuery && matchesChapter && matchesDifficulty && matchesTags;
    });
  }

  // 按難度過濾
  async getFlashcardsByDifficulty(difficulty) {
    const allCards = await this.getAllFlashcards();
    return allCards.filter(card => card.difficulty === difficulty);
  }

  // 按標籤過濾
  async getFlashcardsByTag(tag) {
    const allCards = await this.getAllFlashcards();
    return allCards.filter(card => card.tags.includes(tag));
  }

  // 獲取隨機 flashcards
  async getRandomFlashcards(count = 10, chapterId = null) {
    let cards = chapterId 
      ? await this.getChapterFlashcards(chapterId)
      : await this.getAllFlashcards();
    
    // 洗牌算法
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // 獲取統計信息
  async getStats() {
    const content = await this.loadContent();
    return {
      totalFlashcards: content.meta.totalFlashcards,
      totalChapters: content.meta.totalChapters,
      totalAudio: content.meta.totalAudio,
      lastUpdated: content.meta.lastUpdated,
      version: content.meta.version
    };
  }

  // 回退到舊數據（如果新數據載入失敗）
  loadFallbackContent() {
    return {
      meta: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0-fallback',
        totalFlashcards: 0,
        totalChapters: 0,
        totalAudio: 0
      },
      settings: {
        app_name: 'ACE Notary Exam California',
        version: '1.0.0'
      },
      chapters: [],
      flashcards: [],
      audio: []
    };
  }

  // 載入特定章節的詳細數據（優化載入）
  async loadChapterDetails(chapterId) {
    try {
      const response = await fetch(`${this.baseUrl}/data/chapter-${chapterId}.json`);
      if (!response.ok) {
        // 如果沒有單獨的章節文件，從主文件獲取
        return await this.getChapter(chapterId);
      }
      return await response.json();
    } catch (error) {
      console.error(`❌ Error loading chapter ${chapterId}:`, error);
      return await this.getChapter(chapterId);
    }
  }
}

// 創建單例實例
const contentService = new ContentService();

export default contentService;