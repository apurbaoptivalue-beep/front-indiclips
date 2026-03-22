"use client";
import { useState } from "react";
import { UploadCloud, FileVideo, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchAPI } from "@/lib/api";

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.includes('video')) {
      setFile(selectedFile);
      setUploadProgress(100);
    } else {
      alert("Please upload a video file.");
    }
  };

  const clearFile = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("caption", caption);
      formData.append("description", description);

      await fetchAPI("/videos/upload", {
        method: "POST",
        body: formData,
      });

      alert("Video uploaded successfully!");
      window.location.href = "/";
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Upload Video</h1>
      <p className="text-gray-400 mb-8">Post a video to your account</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Area */}
        <div className="lg:col-span-1 space-y-4">
          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[420px] transition-all cursor-pointer
                ${dragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-glass-border bg-glass hover:bg-glass/80"}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <UploadCloud className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Select video to upload</h3>
              <p className="text-sm text-gray-400 mb-6">Or drag and drop a file</p>
              
              <div className="text-xs text-gray-500 mb-8 space-y-2 opacity-80">
                <p>MP4 or WebM</p>
                <p>720x1280 resolution or higher</p>
                <p>Up to 10 minutes</p>
                <p>Less than 2 GB</p>
              </div>
              
              <Button className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/20 hover:scale-105 transition-transform px-8" onClick={(e) => { e.stopPropagation(); document.getElementById('file-upload')?.click(); }}>
                Select file
              </Button>
              <input id="file-upload" type="file" accept="video/*" className="hidden" onChange={handleChange} />
            </div>
          ) : (
            <div className="border border-glass-border bg-glass rounded-2xl p-6 h-[420px] flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
              <button 
                onClick={clearFile}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full aspect-[9/16] bg-black rounded-lg mb-6 flex items-center justify-center overflow-hidden relative shadow-inner">
                <FileVideo className="w-16 h-16 text-primary/30" />
                {uploadProgress === 100 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
                    <CheckCircle2 className="w-20 h-20 text-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)] rounded-full animate-pulse" />
                  </div>
                )}
              </div>
              <p className="text-sm font-bold tracking-wide text-white truncate w-full text-center">{file.name}</p>
              <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </div>

        {/* Metadata Form */}
        <div className="lg:col-span-2 space-y-6 bg-glass/60 border border-glass-border p-8 rounded-2xl backdrop-blur-md shadow-2xl relative">
          <div className="space-y-2">
            <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Caption</label>
            <Input value={caption} onChange={(e) => setCaption(e.target.value)} className="h-14 bg-black/50 border-gray-800 text-lg placeholder-gray-600 focus:border-primary transition-colors" placeholder="What is this video about?" />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-36 rounded-xl border border-gray-800 bg-black/50 px-4 py-4 text-sm text-white placeholder-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 transition-all resize-none custom-scrollbar"
              placeholder="Add more details, links, or #hashtags to help your video reach more viewers"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black tracking-widest text-gray-400 uppercase">Cover Image</label>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              <div className="w-28 h-36 bg-glass border-2 border-primary rounded-xl flex-shrink-0 cursor-pointer relative overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:scale-105 transition-transform">
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                 <span className="absolute bottom-2 right-2 bg-primary text-[10px] uppercase px-1.5 py-0.5 rounded shadow text-white font-black tracking-wider">Selected</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-28 h-36 bg-black/60 border border-gray-800 rounded-xl flex-shrink-0 cursor-pointer hover:border-gray-500 hover:scale-105 transition-all" />
              ))}
              <div className="w-28 h-36 bg-glass/30 border-2 border-dashed border-gray-700 rounded-xl flex-shrink-0 cursor-pointer hover:border-primary/70 hover:bg-glass/60 transition-all flex flex-col items-center justify-center hover:scale-105">
                 <UploadCloud className="w-7 h-7 text-gray-500 mb-2" />
                 <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Upload Custom</span>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-4 border-t border-glass-border flex justify-end gap-4">
            <Button variant="outline" className="px-8 font-bold tracking-wide uppercase text-xs h-12 border-gray-700 hover:bg-gray-800">Discard</Button>
            <Button 
               disabled={!file || uploadProgress < 100 || loading}
               onClick={handleSubmit}
               className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-10 h-12 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.03] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none font-black tracking-widest uppercase text-sm"
            >
              {loading ? "Uploading..." : "Post Video"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
