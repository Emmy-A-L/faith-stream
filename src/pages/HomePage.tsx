import { useEffect, useState } from "react";
import { fetchArchivedVideos, fetchLiveVideo } from "../services/YoutubeApi";
import type { YouTubeVideo } from "../types/Youtube";
import { GoDotFill, GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Helmet } from "@dr.pogodin/react-helmet";

interface LiveVideoInfo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
}

const Home = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [liveVideo, setLiveVideo] = useState<LiveVideoInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const [archived, live] = await Promise.all([
          fetchArchivedVideos(),
          fetchLiveVideo(),
        ]);
        setVideos(archived.slice(0, 3)); // limit to the first 3
        if (live) setLiveVideo(live);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <>
      <Helmet>
        <title>Welcome to Faith Streams | Faith Teachings </title>
        <meta
          name="description"
          content="Join Faith Streams for inspiring sermons, and uplifting worship rooted in faith and love."
        />
      </Helmet>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-50 text-gray-900 font-sans">
          
          {/* Hero Section */}
          <section className="relative bg-white overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6 border border-red-100">
                Welcome to Faith Streams
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-serif">
                Experience <span className="text-red-600">Life </span> <br className="hidden md:block" />
                <span className="text-red-600">Transforming</span> Messages
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join us to experience powerful teachings from Bishop David Oyedepo. 
                Watch live services or explore our library of timeless archived sermons.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/live"
                  className={`group flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl ${!liveVideo ? 'opacity-75 cursor-not-allowed' : ''}`}
                  aria-disabled={!liveVideo}
                  onClick={(e) => !liveVideo && e.preventDefault()}
                >
                  {liveVideo ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <span>Watch Live Now</span>
                    </>
                  ) : (
                    <span>No Live Stream</span>
                  )}
                </Link>
                <Link
                  to="/sermons"
                  className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <span>Browse Library</span>
                  <GoArrowRight className="text-lg" />
                </Link>
              </div>
            </div>
          </section>

          {/* Live Banner (Conditional) */}
          {liveVideo && (
            <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10 mb-16">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-gray-100 relative aspect-video md:aspect-auto">
                  <img 
                    src={liveVideo.thumbnail} 
                    alt={liveVideo.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                    Live
                  </div>
                </div>
                <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{liveVideo.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-2">{liveVideo.description}</p>
                  <div>
                    <Link
                      to="/live"
                      className="inline-flex items-center text-red-600 font-semibold hover:text-red-700"
                    >
                      Join the Stream <GoArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Latest Sermons */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Sermons</h2>
                  <p className="text-gray-500">Catch up on the most recent messages.</p>
                </div>
                <Link to="/sermons" className="hidden sm:flex items-center text-gray-600 hover:text-gray-900 font-medium">
                  View All <GoArrowRight className="ml-2" />
                </Link>
              </div>
              
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <div key={video.id} className="group cursor-pointer" onClick={() => (window.location.href = `/sermons`)}>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                      <img 
                        src={video.snippet.thumbnails.medium.url} 
                        alt={video.snippet.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                          <GoDotFill className="text-red-600 text-xl" />
                        </div>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                      {video.snippet.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{video.snippet.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 text-center sm:hidden">
                <Link to="/sermons" className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium">
                  View All Sermons <GoArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">About Bishop David Oyedepo</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Bishop David Oyedepo is the founder and presiding Bishop of Living Faith Church Worldwide. 
                His teachings focus on faith, prosperity, and kingdom advancement. This platform is designed 
                to help you stay spiritually connected to the messages that transform lives.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-12 px-4 text-center">
            <p className="text-gray-500 text-sm">
              &copy; 2025 - {new Date().getFullYear()} Faith Stream. All rights reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Home;
