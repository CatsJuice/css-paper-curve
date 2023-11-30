import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'

export function ImportConfig({
  onImport,
}: {
  onImport: (config: any) => void
}) {
  const [show, setShow] = useState(false)
  const [codes, setCodes] = useState('')
  const [error, setError] = useState('')

  const updateCodes: any = useCallback((e: InputEvent) => {
    const target = e.target as HTMLInputElement

    const rawText = target.value || ''
    try {
      const content = rawText.trim().replace(/“|”/g, '"')
      const obj = JSON.parse(content)
      if (typeof obj !== 'object' || obj === null)
        throw new Error('Invalid JSON format')
      const formatted = JSON.stringify(obj, null, 2)
      setCodes(formatted)
      setError('')
    }
    catch (error) {
      setCodes(rawText)
      setError('Invalid JSON format')
    }
  }, [])

  const confirm = useCallback(() => {
    if (error)
      return
    if (!codes)
      return

    const obj = JSON.parse(codes)
    onImport(obj)
    setShow(false)
  }, [codes, error])

  return (
    <>
      <button className="btn relative" onClick={() => setShow(true)}>
        <span className="i-fa6-solid:file-import"></span>
        Import
      </button>
      {
        show
          ? createPortal(
            <div className="fixed inset-0 bg-dark/20 backdrop-blur-10px flex-center" onClick={() => setShow(false)}>
              <div
                onClick={e => e.stopPropagation()}
                className="w-4/5 max-w-500px h-400px bg-card-bg shadow-md rounded-4 flex flex-col p5 gap3"
              >
                <h2>Paste configuration here</h2>

                <textarea
                  className="h-0 flex-1 w-full rounded-2 overflow-y-auto p2"
                  style={{ background: `rgba(125, 125, 125, 0.1)` }}
                  onInput={updateCodes}
                  value={codes}
                  rows={10}
                >
                </textarea>

                <footer className="flex justify-end items-center gap2">
                  <button className="btn-outline" onClick={() => setShow(false)}>
                    Cancel
                  </button>
                  <button className="btn" disabled={!!error} onClick={confirm}>
                    {error
                      ? (
                        <>
                          <span className="i-fa6-solid:circle-exclamation text-amber"></span>
                          <span>{error}</span>
                        </>
                        )
                      : 'Confirm'}
                  </button>
                </footer>
              </div>
            </div>,
            document.body,
          )
          : null
      }
    </>
  )
}

export function getSharedConfigFromUrl(key = 'share') {
  const raw = new URLSearchParams(window.location.search).get(key)
  const decoded = raw ? decodeURIComponent(raw) : null
  if (!decoded)
    return null
  return JSON.parse(decoded)
}
