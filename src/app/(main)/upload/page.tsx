"use client";
import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle, Video, Image as ImageIcon, Type, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchAPI } from "@/lib/api";

type PostType = "video" | "image" | "text";

export default function UploadPage() {
  const [postType, setPostType] = useState<PostType>("video");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

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
      const selectedFile = e.dataTransfer.files[0];
      if (postType === "video" && selectedFile.type.startsWith("video/")) {
        setFile(selectedFile);
        setError("");
      } else if (postType === "image" && selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError("");
      } else {
        setError(`Please upload a valid ${postType} file.`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (postType === "video" && selectedFile.type.startsWith("video/")) {
        setFile(selectedFile);
        setError("");
      } else if (postType === "image" && selectedFile.type.startsWith("image/")) {
        setFile(selectedFile);
        setError("");
      } else {
        setError(`Please select a valid ${postType} file.`);
      }
    }
  };

  const handleUpload = async () => {
    if (postType !== "text" && !file) {
      setError(`Please select an ${postType} file to upload.`);
      return;
    }
    if (postType === "text" && !textContent.trim()) {
      setError("Please write something for your status post.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("type", postType.toUpperCase()); // Important for backend polymorphic routing
      formData.append("caption", caption);
      formData.append("description", description);
      
      if (postType !== "text" && file) {
        formData.append("media", file);
      } else if (postType === "text") {
        formData.append("content", textContent);
      }

      await fetchAPI("/posts/upload", { // Generalised endpoint
        method: "POST",
        body: formData,
      });

      setSuccess(true);
    } catch (err: any) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2">Create Post</h1>
        <p className="text-gray-400 font-medium">Share your creativity with the world in multiple formats.</p>
      </div>

      {/* Post Type Selector */}
      <div className="flex bg-glass border border-glass-border p-1 rounded-2xl mb-8 w-full md:w-fit shadow-xl">
        {[
          { id: "video", label: "Video", icon: Video },
          { id: "image", label: "Image", icon: ImageIcon },
          { id: "text", label: "Status", icon: Type },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => { setPostType(type.id as PostType); setFile(null); setError(""); }}
            className={`flex-1 md:w-32 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              postType === type.id 
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100" 
                : "text-gray-400 hover:text-white hover:bg-white/5 scale-95"
            }`}
          >
            <type.icon className="w-4 h-4" /> {type.label}
          </button>
        ))}
      </div>

      {success ? (
        <div className="bg-glass border border-green-500/30 rounded-3xl p-12 text-center shadow-lg shadow-green-500/10">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Upload Successful!</h2>
          <p className="text-gray-400 mb-8">Your post is now live and processing on our servers.</p>
          <Button 
            className="bg-primary text-white font-bold px-8 pb-1 pt-0.5 rounded-xl uppercase tracking-widest text-xs h-12"
            onClick={() => { setSuccess(false); setFile(null); setCaption(""); setDescription(""); setTextContent(""); }}
          >
            Create Another Post
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Upload Area or Text Editor (Takes 2 cols on lg) */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-white mb-4">
              {postType === "text" ? "Post Content" : "Upload Media"}
            </h2>
            
            {postType === "text" ? (
              <div className="w-full h-[400px] bg-glass/40 border border-glass-border rounded-3xl p-4 focus-within:border-primary/50 transition-colors shadow-inner">
                <textarea
                  placeholder="What's on your mind? Type your status here..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full h-full bg-transparent border-none text-white placeholder-gray-500 outline-none resize-none font-medium custom-scrollbar text-lg"
                />
              </div>
            ) : (
              <div 
                className={`relative w-full h-[400px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 transition-all duration-300 ${
                  dragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-gray-700 bg-glass/40 hover:bg-glass hover:border-gray-600"
                } ${file ? "border-solid border-primary bg-black/60 shadow-lg" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={inputRef}
                  onChange={handleChange}
                  accept={postType === 'video' ? 'video/*' : 'image/*'}
                  className="hidden" 
                />
                
                {file ? (
                  <div className="text-center w-full relative h-full flex flex-col justify-center">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="absolute top-0 right-0 bg-red-500/10 p-2 rounded-full hover:bg-red-500/30 hover:text-red-400 text-gray-400 transition-colors z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <p className="text-white font-bold mb-2 truncate max-w-[200px] mx-auto text-lg">{file.name}</p>
                    <p className="text-gray-400 font-bold tracking-widest uppercase text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="text-center group cursor-pointer" onClick={() => inputRef.current?.click()}>
                    <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      <UploadCloud className="w-10 h-10 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <p className="text-white font-black mb-2 text-xl">
                      Select {postType} to upload
                    </p>
                    <p className="text-gray-500 text-sm font-bold">Or drag and drop a file</p>
                    <p className="text-gray-600 text-xs mt-6 uppercase tracking-widest font-bold">
                      {postType === "video" ? "MP4 / WEBM (UP TO 2GB)" : "JPG / PNG (UP TO 20MB)"}
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-start gap-3 shadow-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500 font-bold text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Metadata Form (Takes 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-6 bg-glass border border-glass-border p-6 md:p-8 rounded-3xl backdrop-blur-md shadow-2xl relative">
            <div className="space-y-3">
              <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Caption</label>
              <input 
                type="text"
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} 
                className="w-full h-14 bg-black/60 border border-gray-800 rounded-xl px-4 text-lg text-white placeholder-gray-600 focus:border-primary/80 focus:ring-1 focus:ring-primary/50 transition-all outline-none font-bold" 
                placeholder="Give your post a catchy title" 
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Description & Tags</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-36 rounded-xl border border-gray-800 bg-black/60 px-4 py-4 text-sm text-white placeholder-gray-600 focus:border-primary/80 focus:ring-1 focus:ring-primary/50 transition-all resize-none outline-none custom-scrollbar font-medium"
                placeholder="Add more details, links, or #hashtags to help your post reach more viewers"
              />
            </div>

            {postType === "video" && (
              <div className="space-y-3 hidden lg:block">
                <label className="text-xs font-black tracking-widest text-gray-500 uppercase">Cover Image</label>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  <div className="w-24 h-32 bg-glass border-2 border-primary rounded-xl flex-shrink-0 cursor-pointer relative overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
                     <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                     <span className="absolute bottom-2 right-2 bg-primary text-[10px] uppercase px-1.5 py-0.5 rounded shadow text-white font-black tracking-wider">Auto</span>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-24 h-32 bg-black/50 border border-gray-800 rounded-xl flex-shrink-0 cursor-pointer hover:border-gray-500 hover:scale-105 transition-all" />
                  ))}
                  <div className="w-24 h-32 bg-background border-2 border-dashed border-gray-700 rounded-xl flex-shrink-0 cursor-pointer hover:border-primary/70 hover:bg-glass transition-all flex flex-col items-center justify-center hover:scale-105">
                     <UploadCloud className="w-6 h-6 text-gray-500 mb-2" />
                     <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold text-center px-2">Custom</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="pt-8 mt-4 border-t border-glass-border flex justify-end gap-4">
              <Button variant="outline" className="px-8 font-bold tracking-widest uppercase text-xs h-12 border-gray-700 hover:bg-gray-800 rounded-xl">Discard</Button>
              <Button 
                 disabled={uploading}
                 onClick={handleUpload}
                 className="bg-gradient-to-r from-primary to-secondary text-white border-0 px-10 h-12 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none font-black tracking-widest uppercase text-sm rounded-xl"
              >
                {uploading ? "Uploading..." : `Post ${postType.charAt(0).toUpperCase() + postType.slice(1)}`}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
