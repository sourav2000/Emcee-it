import { createContext, useContext, useState, type ReactNode } from 'react'

interface InfoPopoverContextValue {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

const InfoPopoverContext = createContext<InfoPopoverContextValue | null>(null)

export function InfoPopoverProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <InfoPopoverContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </InfoPopoverContext.Provider>
  )
}

export function useInfoPopoverState(id: string) {
  const context = useContext(InfoPopoverContext)

  if (!context) {
    throw new Error('useInfoPopoverState must be used within InfoPopoverProvider')
  }

  const isOpen = context.activeId === id

  const open = () => {
    context.setActiveId(id)
  }

  const close = () => {
    if (context.activeId === id) {
      context.setActiveId(null)
    }
  }

  const toggle = () => {
    context.setActiveId(isOpen ? null : id)
  }

  return { isOpen, open, close, toggle }
}
