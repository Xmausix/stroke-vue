import { useEventListener } from '@vueuse/core'
import { useDrawingStore } from '../stores/drawingStore'

export function useKeyboardShortcuts() {
  const store = useDrawingStore()

  useEventListener('keydown', (e: KeyboardEvent) => {
    // Undo: Alt + Z
    if (e.altKey && e.key.toLowerCase() === 'z' && !e.shiftKey && !e.ctrlKey) {
      e.preventDefault()
      store.undo()
    }
  })
}