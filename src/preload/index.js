const { contextBridge } = require('electron');
const { electronAPI } = require('@electron-toolkit/preload');
import { test, run } from './printer';
const api = {
  printer: {
    test: () => {
      test()
    },
    print: (data) => {
      run(data)

    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
