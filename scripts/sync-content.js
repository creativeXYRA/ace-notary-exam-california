// scripts/sync-content.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs').promises;
const path = require('path');

async function syncContentFromGoogleSheets() {
  try {
    console.log('🚀 Starting content sync from Google Sheets...');
    
    // 初始化 Google Sheets API
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log(`📊 Loaded sheet: ${doc.title}`);
    
    // 讀取各個工作表
    const flashcardsSheet = doc.sheetsByTitle['Flashcards'];
    const audioSheet = doc.sheetsByTitle['Audio'];
    const chaptersSheet = doc.sheetsByTitle['Chapters'];
    const settingsSheet = doc.sheetsByTitle['Settings'];
    
    // 同步 Flashcards
    console.log('📚 Syncing flashcards...');
    await flashcardsSheet.loadHeaderRow();
    const flashcards = await flashcardsSheet.getRows();
    
    const flashcardsData = flashcards.map(row => ({
      id: row.get('id'),
      question: row.get('question'),
      answer: row.get('answer'),
      explanation: row.get('explanation') || '',
      chapter: row.get('chapter'),
      difficulty: row.get('difficulty') || 'medium',
      tags: row.get('tags') ? row.get('tags').split(';').map(tag => tag.trim()) : []
    })).filter(card => card.id && card.question && card.answer);
    
    // 同步 Audio
    console.log('🎵 Syncing audio files...');
    await audioSheet.loadHeaderRow();
    const audioRows = await audioSheet.getRows();
    
    const audioData = audioRows.map(row => ({
      id: row.get('id'),
      title: row.get('title'),
      filename: row.get('filename'),
      duration: row.get('duration'),
      chapter: row.get('chapter'),
      type: row.get('type') || 'podcast',
      description: row.get('description') || ''
    })).filter(audio => audio.id && audio.filename);
    
    // 同步 Chapters
    console.log('📖 Syncing chapters...');
    await chaptersSheet.loadHeaderRow();
    const chapterRows = await chaptersSheet.getRows();
    
    const chaptersData = chapterRows.map(row => ({
      id: row.get('id'),
      title: row.get('title'),
      description: row.get('description') || '',
      order: parseInt(row.get('order')) || 1,
      color: row.get('color') || '#3B82F6',
      icon: row.get('icon') || '📚'
    })).filter(chapter => chapter.id && chapter.title)
      .sort((a, b) => a.order - b.order);
    
    // 同步 Settings
    console.log('⚙️ Syncing settings...');
    await settingsSheet.loadHeaderRow();
    const settingsRows = await settingsSheet.getRows();
    
    const settings = {};
    settingsRows.forEach(row => {
      const key = row.get('key');
      const value = row.get('value');
      if (key && value) {
        settings[key] = value;
      }
    });
    
    // 組合最終數據結構
    const finalData = {
      meta: {
        lastUpdated: new Date().toISOString(),
        version: settings.version || '1.0.0',
        totalFlashcards: flashcardsData.length,
        totalChapters: chaptersData.length,
        totalAudio: audioData.length
      },
      settings,
      chapters: chaptersData.map(chapter => ({
        ...chapter,
        flashcards: flashcardsData.filter(card => card.chapter === chapter.id),
        audio: audioData.filter(audio => audio.chapter === chapter.id)
      })),
      flashcards: flashcardsData,
      audio: audioData
    };
    
    // 確保目錄存在
    const dataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    // 寫入 JSON 文件
    await fs.writeFile(
      path.join(dataDir, 'content.json'),
      JSON.stringify(finalData, null, 2),
      'utf8'
    );
    
    // 為每個章節創建單獨的文件（優化載入）
    for (const chapter of finalData.chapters) {
      await fs.writeFile(
        path.join(dataDir, `chapter-${chapter.id}.json`),
        JSON.stringify(chapter, null, 2),
        'utf8'
      );
    }
    
    console.log('✅ Content sync completed successfully!');
    console.log(`📊 Synced: ${flashcardsData.length} flashcards, ${audioData.length} audio files, ${chaptersData.length} chapters`);
    
  } catch (error) {
    console.error('❌ Error syncing content:', error);
    process.exit(1);
  }
}

syncContentFromGoogleSheets();
