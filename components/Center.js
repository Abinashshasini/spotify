import { useSession, signOut } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../atom/PlaylistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from '../components/Songs'
import { millisToMinutesAndSecond, totalTime } from '../lib/time'

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
    <iv className="h-screen flex-grow overflow-y-scroll scrollbar-hide  ">
      <header className="absolute top-5 right-8">
        <div
          className=" ${color} flex cursor-pointer items-center space-x-3 
         rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80"
          onClick={() => signOut()}
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
          className="h-48 w-48 pr-5 shadow-2xl"
        />
        <div>
          <p className="pb-2 text-xs">PLAYLIST</p>
          <h1 className="xl:text6xl text-3xl font-bold md:text-6xl">
            {playlist?.name}
          </h1>
          <p className="pt-2 text-xs font-light text-gray-400 md:text-sm">
            {playlist?.description}
          </p>
          <p className="pt-2 text-xs font-light text-gray-400 md:text-sm">
            Made for{' '}
            <span className="font-bold text-white">{session?.user.name} .</span>{' '}
            {playlist?.tracks.items.length} songs
          </p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </iv>
  )
}

export default Center
