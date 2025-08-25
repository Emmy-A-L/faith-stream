import { useEffect, useState } from "react";
import { fetchArchivedVideos, fetchLiveVideo } from "../services/YoutubeApi";
import type { YouTubeVideo } from "../types/Youtube";
import VideoCard from "../components/VideoCard";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { Helmet } from "@dr.pogodin/react-helmet";

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
        <meta
          name="keywords"
          content="church near me, worship services, online sermons, Christian fellowship, Bible study, Sunday service, gospel messages"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Welcome to Faith Streams" />
        <meta
          property="og:description"
          content="Experience uplifting worship and inspiring sermons at Faith Streams."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://faith-streams-ruddy.vercel.app"
        />
        <meta
          property="og:image"
          content="https://faith-streams-ruddy.vercel.app/assets/home-preview.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Welcome to Faith Streams" />
        <meta
          name="twitter:description"
          content="Join us for worship, sermons, and a loving community."
        />
        <meta
          name="twitter:image"
          content="https://faith-streams-ruddy.vercel.app/assets/home-preview.jpg"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3138057547675144"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white text-gray-800 mt-18 md:mt-18 mb-14 md:mb-0">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-yellow-100 via-white to-red-100 py-12 text-center px-4">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 font-serif">
              Faith Streams
            </h1>
            <p className="text-md sm:text-xl max-w-2xl mx-auto">
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
                View Sermons
              </Link>
            </div>
          </section>

          {/* Live Banner */}
          <section className="w-full flex items-center justify-center text-center py-4 bg-yellow-50 border-t border-b border-yellow-200">
            {liveVideo ? (
              <div className="w-9/10 bg-red-500 text-white p-4 rounded-md shadow-md my-6 flex flex-col gap-4 justify-between items-center">
                <div className="flex flex-col items-center gap-3 w-full">
                  <h2 className="w-[90%] text-lg font-semibold">
                    Live Now: {liveVideo.title}
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
              Latest Sermons
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
          <footer className="flex flex-col gap-4 bg-[#242424] text-white text-sm py-10 text-center">
            <p>
              &copy; {new Date().getFullYear()} Faith Stream. All rights
              reserved.
            </p>
          </footer>
        </div>
      )}
    </>
  );
};

export default Home;
