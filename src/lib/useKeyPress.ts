import { useCallback, useEffect } from 'react'

export function useKeyPress(key: string, callback: () => void) {
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key)
      if (event.key !== key) return
      callback()
    },
    [key, callback],
  )

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp])
}
