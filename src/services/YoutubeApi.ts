// src/services/youtube.ts
import axios from 'axios';
import type { YouTubeVideo } from '../types/Youtube';

const YOUTUBE_API = import.meta.env.VITE_YOUTUBE_API;
const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

if (!YOUTUBE_API || !PLAYLIST_ID || !API_KEY) {
  throw new Error('One or more environment variables are not defined.');
}

export const fetchArchivedVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    const res = await axios.get(YOUTUBE_API, {
      params: {
        part: 'snippet',
        maxResults: 10,
        playlistId: PLAYLIST_ID,
        key: API_KEY,
      },
    });

    if (!res.data || !res.data.items) {
      throw new Error('Invalid response from YouTube API');
    }

    return res.data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      snippet: item.snippet,
    }));
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error('Failed to fetch archived videos');
  }
};
