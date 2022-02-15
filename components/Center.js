import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atom/PlaylistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState(null)
  const palylistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)
  console.log('playlist: ', playlist)

  //Changing color on refresh and playlist change
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [palylistId])

  //Getting all playlist based upon the playlist id
  useEffect(() => {
    spotifyApi
      .getPlaylist(palylistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => console.log(err))
  }, [spotifyApi, palylistId])

  return (
    <div className="flex-grow ">
      <header className="absolute top-5 right-8">
        <div
          className="c ${color} flex cursor-pointer items-center space-x-3 
         rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
        >
          <img
            src={session?.user.image}
            alt="userimage"
            className="h-10 w-10 rounded-full"
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`spac-x-7 $ flex h-80 items-end bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="h-44 w-44 pr-5 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="xl:text5xl text-2xl font-bold md:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  )
}

export default Center
