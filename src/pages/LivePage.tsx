import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchLiveVideo } from "../services/YoutubeApi";
import { Link } from "react-router-dom";

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
      <h1 className="text-2xl font-bold text-center mb-4">{liveVideo.title}</h1>
      <div className="w-full max-w-4xl aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
          title="YouTube Live Sermon"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-gray-600 mt-4 max-w-2xl text-center">{liveVideo.description}</p>
    </div>
    ) : (
      <div className="h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">No Live Service Right Now</h2>
        <p className="text-gray-400">Please check back later for the next live broadcast.</p>
        </div>
        <div>
          checkout our archived sermons <Link to="/sermons" className="text-blue-500 underline">here</Link>.
        </div>
      </div>
    )}
    </>
  );
};

export default LivePage;
