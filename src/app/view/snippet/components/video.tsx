import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import * as Snippets from 'snippets'

export const Video: React.FunctionComponent<{
  image?: string;
  video: string;
}> = ({ image, video }) => {
  const [playing, setPlaying] = useState(false)
  const [count, setCount] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const toggleVideo = () => {
    setPlaying(prev => !prev)
    if (count > 1) {
      setCount(0)
    }
    if (autoplay) {
      setAutoplay(false)
    }
  }

  useEffect(() => {
    if (count === 1) {
      setAutoplay(true)
    }
    if (count > 1) {
      setAutoplay(false)
    }
  }, [count])

  useEffect(() => {
    if (autoplay && !playing) {
      setPlaying(true)
    }
  }, [autoplay, playing])

  return (
    <div className={'relative w-full h-full'}>
      <ReactPlayer
        url={video}
        playing={playing}
        controls={false}
        loop={false}
        volume={0}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setCount(prev => prev + 1)
          setPlaying(false)
        }}
        vimeoConfig={{
          playerOptions: {
            controls: false,
            playsinline: true,
          }
        }}
        width={'100%'}
        height={'100%'}
        className={`${playing ? 'z-30' : 'z-0'}`}
        style={{
          width: '100%',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        }}
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer ${playing ? 'opacity-0 z-30' : 'opacity-100 z-10'} hover:opacity-100 hover:z-10`}
        onClick={toggleVideo}
      >
        <div className={'text-white'}>
          <Snippets.Button
            title={'Watch Video'}
            colour={'blank'}
          >
          {playing ? (
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path d="M16 0v16H0V0z"/>
                <path d="M2 15h3V1H2v14zm9-14v14h3V1h-3z" fill="#000" fill-rule="nonzero"/>
              </g>
            </svg>
          ) : (
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                <path d="M16 0v16H0V0z"/>
                <path d="M2 15l11.65-7L2 1v14z" fill="#000" fill-rule="nonzero"/>
              </g>
            </svg>
          )}
          </Snippets.Button>
        </div>
      </div>
      {image && <Snippets.Image
        alt={'Video poster image'}
        className={`absolute inset-0 h-full w-full ${playing ? 'opacity-0' : 'opacity-100'}`}
        src={image}
        preventLazy
      />}
    </div>
  )
}