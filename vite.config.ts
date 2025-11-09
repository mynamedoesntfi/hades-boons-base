import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

const boonInfoRemoteUrl = process.env.BOON_INFO_REMOTE_URL ?? 'http://localhost:5174/remoteEntry.js'

const moduleFederationConfig = federation({
  name: 'hades_boones_base',
  filename: 'remoteEntry.js',
  remotes: {
    boon_info: `boon_info@${boonInfoRemoteUrl}`,
  },
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^19.1.1',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: '^19.1.1',
    },
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), moduleFederationConfig],
})
