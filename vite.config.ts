import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { federation } from '@module-federation/vite'

const moduleFederationConfig = federation({
  name: 'hades_boones_base',
  filename: 'remoteEntry.js',
  remotes: {},
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
