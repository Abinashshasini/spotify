import {
  HomeIcon,
  ServerIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atom/PlaylistAtom'
import Link from 'next/link'

function Sidebar() {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlist, setPlaylist] = useState([])
  const [palylistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylist(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <Link href="/">
          <button className="item-center flex space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
        </Link>
        <Link href="/center/search">
          <button className="item-center flex space-x-2 hover:text-white">
            <ServerIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
        </Link>
        <button className="item-center flex space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="item-center flex space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create playlist</p>
        </button>
        <button className="item-center flex space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked songs</p>
        </button>
        <button className="item-center flex space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {/* Playlist */}
        {playlist.map((p) => (
          <p
            className="cursor-pointer hover:text-white"
            key={p.id}
            onClick={() => setPlaylistId(p.id)}
          >
            {p.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
