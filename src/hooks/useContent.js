// src/hooks/useContent.js
import { useState, useEffect } from 'react';
import contentService from '../services/contentService';

// 使用章節數據
export function useChapters() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadChapters() {
      try {
        setLoading(true);
        const chaptersData = await contentService.getChapters();
        setChapters(chaptersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadChapters();
  }, []);

  return { chapters, loading, error };
}

// 使用特定章節數據
export function useChapter(chapterId) {
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chapterId) return;
    
    async function loadChapter() {
      try {
        setLoading(true);
        const chapterData = await contentService.loadChapterDetails(chapterId);
        setChapter(chapterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadChapter();
  }, [chapterId]);

  return { chapter, loading, error };
}

// 使用 flashcards
export function useFlashcards(options = {}) {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadFlashcards() {
      try {
        setLoading(true);
        let cards;
        
        if (options.chapterId) {
          cards = await contentService.getChapterFlashcards(options.chapterId);
        } else if (options.random) {
          cards = await contentService.getRandomFlashcards(options.count || 10);
        } else if (options.difficulty) {
          cards = await contentService.getFlashcardsByDifficulty(options.difficulty);
        } else {
          cards = await contentService.getAllFlashcards();
        }
        
        setFlashcards(cards);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadFlashcards();
  }, [options.chapterId, options.random, options.count, options.difficulty]);

  return { flashcards, loading, error };
}

// 使用搜索功能
export function useSearch(query, options = {}) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    async function search() {
      try {
        setLoading(true);
        const searchResults = await contentService.searchFlashcards(query, options);
        setResults(searchResults);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // 防抖：延遲搜索
    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, options.chapter, options.difficulty]);

  return { results, loading, error };
}

// 使用音頻數據
export function useAudio(chapterId) {
  const [audioFiles, setAudioFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chapterId) return;

    async function loadAudio() {
      try {
        setLoading(true);
        const audio = await contentService.getChapterAudio(chapterId);
        setAudioFiles(audio);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAudio();
  }, [chapterId]);

  return { audioFiles, loading, error };
}

// 使用統計數據
export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const statsData = await contentService.getStats();
        setStats(statsData);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return { stats, loading };
}

// 使用設置
export function useSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const settingsData = await contentService.getSettings();
        setSettings(settingsData);
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return { settings, loading };
}