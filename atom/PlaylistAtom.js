import { atom } from 'recoil'

export const playlistIdState = atom({
  key: 'playlistIdState', // unique ID (with respect to other atoms/selectors)
  default: '37i9dQZF1E4mpZNWXJZZYZ', // default value (aka initial value)
})

export const playlistState = atom({
  key: 'playlistState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})
