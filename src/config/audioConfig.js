// 音訊設定檔
// GitHub Release 音訊檔案基礎 URL
const GITHUB_USERNAME = 'creativeXYRA';
const REPO_NAME = 'ace-notary-exam-california';
const RELEASE_TAG = 'audio-v1.0';

export const AUDIO_BASE_URL = `https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/releases/download/${RELEASE_TAG}/`;

// 音訊檔案列表
export const AUDIO_FILES = {
  chapters13: 'chapters-1-3-podcast.wav',
  chapters45: 'chapters-4-5-podcast.wav'
};

// 獲取音訊 URL 的工具函數
export const getAudioUrl = (audioKey) => {
  const filename = AUDIO_FILES[audioKey];
  if (!filename) {
    console.warn(`找不到音訊檔案：${audioKey}`);
    return null;
  }
  return `${AUDIO_BASE_URL}${filename}`;
};

// 播放音訊的工具函數
export const playAudio = (audioKey, volume = 1.0) => {
  const url = getAudioUrl(audioKey);
  if (url) {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(error => {
      console.error(`播放音訊失敗 (${audioKey}):`, error);
    });
    return audio;
  }
  return null;
};
