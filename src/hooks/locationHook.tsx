import { LocationContext } from '@/providers/locationContext'
import { LocationContextProps } from '@/utils/utils'
import { useContext } from 'react'

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext)
  if (!context)
    throw new Error('useLocationContext must be used within a LocationProvider')

  return context
}