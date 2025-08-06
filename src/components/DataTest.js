// src/components/DataTest.js
import React from 'react';
import { useChapters, useStats, useSettings } from '../hooks/useContent';

function DataTest() {
  const { chapters, loading: chaptersLoading, error: chaptersError } = useChapters();
  const { stats, loading: statsLoading } = useStats();
  const { settings, loading: settingsLoading } = useSettings();

  if (chaptersLoading || statsLoading || settingsLoading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-blue-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-blue-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-blue-200 rounded w-1/3"></div>
        </div>
        <p className="text-blue-600 mt-4">📊 Loading Google Sheets data...</p>
      </div>
    );
  }

  if (chaptersError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">❌ Error Loading Data</h3>
        <p className="text-red-600">{chaptersError}</p>
        <p className="text-sm text-red-500 mt-2">
          Please check if the data files are properly synced from Google Sheets.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          ✅ Google Sheets Data Successfully Loaded!
        </h2>
        
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.totalFlashcards}</div>
              <div className="text-sm text-gray-600">Flashcards</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-purple-600">{stats.totalChapters}</div>
              <div className="text-sm text-gray-600">Chapters</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-orange-600">{stats.totalAudio}</div>
              <div className="text-sm text-gray-600">Audio Files</div>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <div className="text-2xl font-bold text-green-600">v{stats.version}</div>
              <div className="text-sm text-gray-600">Version</div>
            </div>
          </div>
        )}

        {/* Settings */}
        {settings && (
          <div className="text-sm text-green-700">
            <p><strong>App:</strong> {settings.app_name}</p>
            <p><strong>Last Updated:</strong> {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Unknown'}</p>
          </div>
        )}
      </div>

      {/* Chapters */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Available Chapters</h3>
        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{chapter.icon}</span>
                    <h4 className="font-semibold text-lg" style={{ color: chapter.color }}>
                      {chapter.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-3">{chapter.description}</p>
                  
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>📝 {chapter.flashcards?.length || 0} flashcards</span>
                    <span>🎵 {chapter.audio?.length || 0} audio files</span>
                    <span>📊 Order: {chapter.order}</span>
                  </div>
                </div>
              </div>

              {/* Preview flashcards */}
              {chapter.flashcards && chapter.flashcards.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-sm text-gray-700 mb-2">Sample Questions:</h5>
                  <div className="space-y-2">
                    {chapter.flashcards.slice(0, 2).map((card) => (
                      <div key={card.id} className="bg-gray-50 p-3 rounded text-sm">
                        <p className="font-medium text-gray-800">{card.question}</p>
                        <p className="text-gray-600 mt-1">{card.answer}</p>
                        <div className="flex gap-2 mt-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            card.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                            card.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {card.difficulty}
                          </span>
                          {card.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Debug Info */}
      <details className="bg-gray-50 p-4 rounded">
        <summary className="cursor-pointer font-medium text-gray-700">🔧 Debug Information</summary>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify({ stats, settings, chaptersCount: chapters.length }, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default DataTest;