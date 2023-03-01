import React, { useEffect, useState } from "react"
import ReactPlayer from 'react-player'
import * as Snippets from 'snippets'

export const ProductVideo = ({ video }) => {
  const [playing, setPlaying] = useState(false)

  const toggleVideo = () => {
    setPlaying(prev => !prev)
  }

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url={video}
        playing={playing}
        controls={false}
        loop={false}
        volume={0}
        onEnded={() => {
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
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity cursor-pointer ${playing ? 'opacity-0 z-30' : 'opacity-100 z-10'}`}
        onClick={toggleVideo}
      >
        <div className={'text-white'}>
          <Snippets.Button
            title={'Watch Video'}
            colour={'blank'}
          >
            <Snippets.Icon
              width={80}
              height={80}
              name={'play'}
            />
          </Snippets.Button>
        </div>
      </div>
    </div>
  )
}