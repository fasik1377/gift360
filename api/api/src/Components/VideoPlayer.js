import React, {useRef, useEffect} from 'react'

const VideoPlayer = ({videoId}) => {
    const videoRef = useRef(null)

    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.pause()
            videoRef.current.removeAttribute('src')
            videoRef.current.load()
        }
    })
  return (
    <video width="400" height="240" controls autoPlay>
      <source src="/texttovideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoPlayer