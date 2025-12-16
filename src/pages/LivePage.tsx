import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { fetchLiveVideo } from "../services/YoutubeApi";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const LivePage = () => {
  const [liveVideo, setLiveVideo] = useState<null | {
    videoId: string;
    title: string;
    description: string;
    thumbnail: string;
  }>(null);
  const [loading, setLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(true)

  useEffect(() => {
    const getLive = async () => {
      try {
        const video = await fetchLiveVideo();
        setLiveVideo(video);
      } catch (error) {
        console.error("Failed to fetch live video", error);
      } finally {
        setLoading(false);
        setIsClicked(false)
      }
    };
    getLive();
  }, []);

  

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans flex flex-col">
      {/* Header / Nav */}
      <header className="p-6 flex items-center">
        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <GoArrowLeft className="text-xl" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-12">
        {liveVideo ? (
          <div className="w-full max-w-6xl mx-auto animate-fade-in">
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-8">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${liveVideo.videoId}?autoplay=1`}
                title="YouTube Live Sermon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {liveVideo.title}
                </h1>
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider animate-pulse">
                  Live
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap">
                {liveVideo.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="w-24 h-24 ">
              <div className="w-3 h-3 "></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              No Live Service Currently
            </h2>
            <p className="text-gray-400 mb-4 text-lg">
              We are not streaming right now. Check back during our <span className="text-blue-500 cursor-pointer" onClick={()=>setIsClicked(!isClicked)}> scheduled service times</span> or browse our archive.
            </p>
            <div className={`${isClicked ? "" : "hidden"} w-full p-3 border mb-8`}>
              <h1 className="text-2xl bold uppercase mb-3">Service Schedule</h1>
              <table cellSpacing={2} className="" border={1}>
                <th>Days</th>
                <th>Time</th>
                <th>Service Title</th>

                <tr>
                  <td>Wednesdays</td>
                  <td>6:00pm - 8:00pm</td>
                  <td>Midweek Service</td>
                </tr>
                <tr>
                  <td>Sundays</td>
                  <td>6:00am | 8:10am | 10:20am</td>
                  <td>Sunday Service</td>
                </tr>
                <tr>
                  <td>Saturdays</td>
                  <td>7:00am</td>
                  <td>Leadership Empowerment Summit</td>
                </tr>
                <tr>
                  <td>Mondays to Saturday</td>
                  <td>5:30am - 6:30am</td>
                  <td>Covenant Hour Of Prayer</td>
                </tr>
              </table>
            </div>
            <Link 
              to="/sermons" 
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Archived Sermons
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default LivePage;
