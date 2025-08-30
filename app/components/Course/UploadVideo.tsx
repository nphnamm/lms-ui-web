import { FC, useState } from "react";
import axios from "axios";
type Props = {
  onUploadComplete:any
};


const VideoUpload: FC<Props> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Convert video file to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a video first.");
      return;
    }

    setUploading(true);
    setMessage("");
    onUploadComplete("https://res.cloudinary.com/dhupumlwt/video/upload/v1739967635/videos/dfyhsredggu1hz3gjfm8.mp4")

    // try {
    //   const base64Video = await convertToBase64(file);
      
    //   const response = await axios.post("http://localhost:8000/api/v1/upload-video", { video: base64Video });

    //   setMessage(response.data.message);
    //   setVideoUrl(response.data.videoUrl);
    //   console.log(response.data.videoUrl)

    // } catch (error) {
    //   setMessage("Upload failed. Please try again.");
    // } finally {
    //   setUploading(false);
    // }
  };
  console.log(videoUrl)
  

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Upload a Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
      {videoUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded Video:</h3>
          <video src={videoUrl} controls className="w-full max-w-lg"></video>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
