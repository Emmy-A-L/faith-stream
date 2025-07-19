

export interface YouTubeVideo {
  id: string; // we'll generate it from snippet.resourceId.videoId or fallback
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
    publishedAt: string;
    resourceId: {
      videoId: string;
    };
  };
}
