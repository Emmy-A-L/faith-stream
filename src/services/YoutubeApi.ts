// src/services/youtube.ts
import axios from 'axios';
import type { YouTubeVideo } from '../types/Youtube';

const YOUTUBE_API = import.meta.env.VITE_YOUTUBE_API;
const PLAYLIST_ID = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID;
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_LFCWW_CHANNEL_ID;

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



export const fetchLiveVideo = async () => {
  try {
    const res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: CHANNEL_ID,
        eventType: 'live',
        type: 'video',
        key: API_KEY,
      },
    });

    if (res.data.items && res.data.items.length > 0) {
      const liveVideo = res.data.items[0];
      return {
        videoId: liveVideo.id.videoId,
        title: liveVideo.snippet.title,
        thumbnail: liveVideo.snippet.thumbnails.medium.url,
        description: liveVideo.snippet.description,
      };
    } else {
      return null; // No live video
    }
  } catch (error) {
    console.error('Error fetching live video:', error);
    return null;
  }
};
