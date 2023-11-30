import './app.sass'
import { useCallback, useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { Leva, useControls } from 'leva'
import { Paper } from './components/paper'
import { Content } from './components/content'
import { copy2clipboard } from './utils/clipboard'
import {
  curveConfig,
  enterFromConfig,
  paperCssVars,
  randomConfig,
} from './context/global'
import { ImportConfig, getSharedConfigFromUrl } from './components/import-config'

const easing = 'spring(5, 100, 10, 0)'

function AnimateIn({
  id,
  segments,
  importConfig,
  onUpdate,
}: {
  id: number
  segments: number
  importConfig: any
  onUpdate: (args: { [k: number]: any }) => void
}) {
  const [paper, setPaper] = useControls(
    `Paper ${id}`,
    () => randomConfig({ ...curveConfig, ...enterFromConfig }),
    { collapsed: true },
  )

  const rotateX = paper.curve / segments

  useEffect(() => {
    anime({
      targets: '.segment[data-direction="up"]',
      rotateX: [-rotateX, 0],
      easing,
    })
    anime({
      targets: '.segment[data-direction="down"]',
      rotateX: [rotateX, 0],
      easing,
    })
  }, [])
  onUpdate({ [id]: paper })

  useEffect(() => {
    if (!importConfig)
      return
    const config = importConfig[id]
    if (!config)
      return
    setPaper(config)
  }, [importConfig])

  const variables = paperCssVars(paper)

  return (
    <div className="move-in absolute" style={variables}>
      <Paper
        segments={segments}
        centerIndex={Math.min(segments - 1, Math.max(0, paper.curveCenter))}
        content={<Content id={id} />}
      />
    </div>
  )
}

function App() {
  const configRef = useRef<Record<string, any>>({})
  const [key, setKey] = useState(0)
  const [importConfig, setImportConfig] = useState<any>(null)

  const { segments } = useControls({
    segments: {
      value: 8,
      min: 1,
      max: 20,
      step: 1,
    },
  })

  const replay = () => setKey(key + 1)
  const copy = useCallback(
    () => copy2clipboard(JSON.stringify(configRef.current)),
    [],
  )
  const share = useCallback(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('share', encodeURIComponent(JSON.stringify(configRef.current)))
    copy2clipboard(url.href)
  }, [])

  useEffect(() => {
    replay()
  }, [segments])

  useEffect(() => {
    const shared = getSharedConfigFromUrl()
    if (!shared)
      return
    setImportConfig(shared)
  }, [])

  const handleImport = useCallback((config: any) => {
    setImportConfig(config)
    replay()
  }, [replay, setImportConfig])

  return (
    <>
      <div className="leva z99">
        <Leva />
      </div>

      <div key={key}>
        {Array.from({ length: 5 }).map((_, i) => (
          <AnimateIn
            key={i}
            id={i}
            segments={segments}
            importConfig={importConfig}
            onUpdate={payload =>
              (configRef.current = { ...configRef.current, ...payload })}
          />
        ))}
      </div>

      <div className="operations z99 flex items-center gap2 fixed bottom-20px left-1/2 -translate-x-1/2">
        <button className="replay-btn btn" onClick={replay}>
          <span className="i-fa6-solid:arrow-rotate-left"></span>
          Replay
        </button>
        <button className="export-btn btn" onClick={copy}>
          <span className="i-fa6-solid:clipboard"></span>
          Copy Configuration
        </button>
        <button className="share btn" onClick={share}>
          <span className="i-fa6-solid:share"></span>
          Copy Share Link
        </button>
        <ImportConfig onImport={handleImport} />
      </div>
    </>
  )
}

export default App
