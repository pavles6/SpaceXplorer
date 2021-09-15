import React, { createContext, useContext } from 'react'
import { Palette } from '../types/theme'
import palette from './palette-data'

const PaletteContext = createContext(null)

export const PaletteProvider = ({ children }) => {
  return (
    <PaletteContext.Provider value={palette}>
      {children}
    </PaletteContext.Provider>
  )
}

export function usePalette(): Palette {
  return useContext(PaletteContext)
}
