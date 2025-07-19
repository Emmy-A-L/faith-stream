import { useEffect, useState } from "react";
import { fetchArchivedVideos, fetchLiveVideo } from "../services/YoutubeApi";
import type { YouTubeVideo } from "../types/Youtube";
import VideoCard from "../components/VideoCard";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

// import { useMediaQuery } from '../hooks/useMediaQueries';

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
  // const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const [archived, live] = await Promise.all([
          fetchArchivedVideos(),
          fetchLiveVideo(),
        ]);
        setVideos(archived);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white text-gray-800">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-yellow-100 via-white to-red-100 py-12 text-center px-4">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Faith Streams
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              Join us to experience life-transforming messages from Bishop David
              Oyedepo. Watch Live or explore timeless archived sermons.
            </p>
            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <Link
                to="/live"
                className={`flex items-center justify-center gap-2 vertical bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition`}
                aria-disabled={liveVideo ? false : true}
              >
                <span>
                  <GoDotFill className="text-2xl" />
                </span>{" "}
                <span>Watch Live</span>
              </Link>
              <Link
                to="/sermons"
                className="border border-red-600 text-red-600 px-6 py-2 rounded-full hover:bg-red-100"
              >
                📼 View Sermons
              </Link>
            </div>
          </section>

          {/* Live Banner */}
          <section className="text-center py-4 bg-yellow-50 border-t border-b border-yellow-200">
            {liveVideo ? (
              <div className="bg-red-600 text-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    🎥 Live Now: {liveVideo.title}
                  </h2>
                  <p className="text-sm text-red-100 truncate w-[90%]">
                    {liveVideo.description}
                  </p>
                </div>
                <Link
                  to="/live"
                  className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-100 transition"
                >
                  Watch Now
                </Link>
              </div>
            ) : (
              <p className="text-lg text-gray-500 font-black">No Live Stream</p>
            )}
          </section>

          {/* Archived Sermons Preview */}
          <section className="py-10 px-4 sm:px-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              📼 Latest Sermons
            </h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => (window.location.href = `/sermons`)}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="/sermons"
                className="text-blue-600 hover:underline text-lg font-medium"
              >
                View All Sermons →
              </a>
            </div>
          </section>

          {/* About Section */}
          <section className="bg-gray-100 py-12 px-4 sm:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                About Bishop David Oyedepo
              </h2>
              <p className="text-md text-gray-700 leading-relaxed">
                Bishop David Oyedepo is the founder and presiding Bishop of
                Living Faith Church Worldwide. His teachings focus on faith,
                prosperity, and kingdom advancement. This platform is designed
                to help you stay spiritually connected to the messages that
                transform lives.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#242424] text-white text-sm py-6 text-center mb-18">
            <p>
              &copy; {new Date().getFullYear()} Sermon Streaming App. All rights
              reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Home;
