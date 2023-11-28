import { useContext } from 'react'
import { Context } from '../context/global'
import { Segment } from './segment'

export interface SegmentProps {
  level?: number
  direction?: 'up' | 'down'
  index: number
  root?: boolean
}

export function Segments({ level, direction, root, index }: SegmentProps) {
  if (!level)
    return null

  const { centerIndex, segments } = useContext(Context)
  if (root) {
    const up = centerIndex
    const down = segments - up - 1
    const vars = {
      '--segments': segments,
      '--segments-up': up,
      '--segments-down': down,
    }
    return (
      <Segment data-root={true} style={vars} index={up}>
        <Segments index={up - 1} level={up} direction="up" />
        <Segments index={up + 1} level={down} direction="down" />
      </Segment>
    )
  }

  const children
    = level === 1
      ? null
      : (
        <Segments
          direction={direction}
          index={direction === 'up' ? index - 1 : index + 1}
          level={level - 1}
        />
        )
  return (
    <Segment direction={direction} index={index}>
      {children}
    </Segment>
  )
}
