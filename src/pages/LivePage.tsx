import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchLiveVideo } from "../services/YoutubeApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LivePage = () => {
  const [liveVideo, setLiveVideo] = useState<null | {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLive = async () => {
      const video = await fetchLiveVideo();
      setLiveVideo(video);
      setLoading(false);
    };
    getLive();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {liveVideo ? (
        <div className="min-h-screen flex flex-col items-center justify-start py-6 px-4">
          <h1 className="text-2xl font-bold text-center mb-4">
            {liveVideo.title}
          </h1>
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
              title="YouTube Live Sermon"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl text-center">
            {liveVideo.description}
          </p>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
          <div className="w-full max-w-3xl m-4 flex flex-col items-center justify-center px-4 py-2 border border-gray-500 backdrop-filter backdrop-blur-lg bg-gray-800 bg-opacity-30 rounded-2xl gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-200 mb-2">
                No Live Service Right Now
              </h2>
              <p className="text-gray-400">
                Please check back later for the next live broadcast.
              </p>
            </div>
            <div>
              checkout our archived sermons{" "}
              <Link to="/sermons" className="text-blue-500 underline">
                here
              </Link>
              .
            </div>
          </div>

          {/* animated designs */}
          <div className="absolute inset-0 overflow-hidden -z-20">
            {/* Floating Orbs */}
            <motion.div
              className="absolute w-72 h-72 bg-red-500/20 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: "10%",
                top: "20%",
              }}
            />
            <motion.div
              className="absolute w-96 h-96 bg-red-300/20 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 120, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                right: "10%",
                bottom: "20%",
              }}
            />

            {/* Geometric Shapes */}
            <motion.div
              className="absolute w-4 h-4 bg-yellow-400 rotate-45"
              animate={{
                rotate: [45, 225, 45],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: "15%",
                top: "60%",
              }}
            />
            <motion.div
              className="absolute w-6 h-6 border-2 border-pink-400 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                right: "20%",
                top: "40%",
              }}
            />
          </div>
        </div>
      )}

      <img
        src="/winners-logo.png"
        alt="Winners Logo"
        className="absolute top-1/2 left-1/2 transform -translate-1/2 -z-10 w-72 opacity-20"
      />
    </>
  );
};

export default LivePage;
