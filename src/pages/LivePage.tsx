import { useState, useEffect } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { BsChatText, BsShare } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";


interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
}

const LivePage = () => {
  // States for live stream functionality
  const [isLive, setIsLive] = useState<boolean>(true); // Placeholder: Should come from backend
  const [viewerCount, setViewerCount] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Placeholder: Stream details (should come from your backend/API)
  const streamDetails = {
    title: "Sunday Service",
    description: "Join us for our live Sunday service",
    startTime: new Date(),
    churchName: "Faith Church",
    preacher: "Pastor John Doe",
  };

  // Simulate real-time viewer count updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Placeholder: Should be WebSocket connection
      setViewerCount((prev) => Math.floor(Math.random() * 100) + prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle chat submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Placeholder: Should send to backend/WebSocket
    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "User", // Placeholder: Should be actual user name
      message: newMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  // Handle share functionality
  const handleShare = async () => {
    // Placeholder: Add your actual share URL
    const shareUrl = window.location.href;

    try {
      await navigator.share({
        title: streamDetails.title,
        text: streamDetails.description,
        url: shareUrl,
      });
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareUrl);
      // Placeholder: Should show a proper notification
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Stream Container */}
      <div className="container mx-auto px-4 py-6">
        {/* Live Stream Video */}
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
          {/* Placeholder: Replace with actual video player component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">Live Stream Player</h3>
              <p className="text-gray-400">
                Placeholder: Add your video player here
              </p>
            </div>
          </div>

          {/* Live Badge */}
          {isLive && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </div>
          )}

          {/* Stream Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h1 className="text-2xl font-bold mb-2">{streamDetails.title}</h1>
            <p className="text-gray-300">{streamDetails.churchName}</p>
          </div>
        </div>

        {/* Stream Stats and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <IoPersonSharp className="mr-2" />
              <span>{viewerCount.toLocaleString()} watching</span>
            </div>
            <button
              onClick={() => setLikes((prev) => prev + 1)}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              <AiOutlineLike />
              <span>{likes}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              <BsChatText />
              <span className="hidden sm:inline">Chat</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors"
            >
              <BsShare />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Stream Details and Chat */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stream Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">About this stream</h2>
              <p className="text-gray-300 mb-4">{streamDetails.description}</p>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-300">
                  <span className="font-semibold">Preacher:</span>{" "}
                  {streamDetails.preacher}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Started:</span>{" "}
                  {streamDetails.startTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Section */}
          {isChatOpen && (
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg h-[600px] flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        {msg.user[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{msg.user}</p>
                        <p className="text-gray-300">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-gray-700"
                >
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                      type="submit"
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePage;
