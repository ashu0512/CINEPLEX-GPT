const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-36 px-4 md:px-16 lg:px-24 absolute top-0 left-0 flex flex-col justify-center bg-gradient-to-r from-black/80">
      <h1 className="font-bold text-6xl text-white">{title}</h1>
      <p className="mt-4 text-lg w-1/2 text-white">{overview}</p>
      <div className="my-2 z-10">
        <button className="bg-white text-black py-2 rounded px-12 text-xl hover:bg-opacity-50 cursor-pointer">▶️Play</button>
        <button className="bg-gray-300 text-black px-12 py-2 rounded mx-2 text-xl hover:bg-gray-400 cursor-pointer">ℹ️More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;
