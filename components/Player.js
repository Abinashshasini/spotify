import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { currentTrackIdState, isPlayingState } from '../atom/SongAtom'
import { HeartIcon, VolumeUpIcon as VolumeDown } from '@heroicons/react/outline'
import {
  SwitchHorizontalIcon,
  FastForwardIcon,
  PlayIcon,
  VolumeUpIcon,
  ReplyIcon,
  RewindIcon,
  PauseIcon,
} from '@heroicons/react/solid'
function Player() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo()

  //Function to fetch users curent playing
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body.item.id)
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  //Function to play and pause
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base ">
      {/* Left */}
      <div className="flex items-center space-x-4 ">
        <img
          src={songInfo?.album.images?.[0]?.url}
          className="hidden h-10 w-10 md:inline"
          alt=""
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          //   onClick={() => spotifyApi.skipToPrevious()} API problem
        />
        {isPlaying ? (
          <PauseIcon className="button h-10 w-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button h-10 w-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon
          className="button"
          //   onClick={() => spotifyApi.skipToNext()} API problem
        />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div></div>
    </div>
  )
}

export default Player
