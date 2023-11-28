import type { CSSProperties, ReactNode } from 'react'
import { createContext } from 'react'

export const curveConfig = {
  curveCenter: {
    value: 3,
    min: 0,
    max: 19,
    step: 1,
  },
  curve: {
    value: 360,
    min: 0,
    max: 1800,
    step: 1,
  },
}
export const enterFromConfig = {
  delay: {
    value: 0,
    min: 0,
    max: 2000,
    step: 100,
  },
  fromZ: {
    value: 4000,
    min: 0,
    max: 100000,
    step: 100,
  },
  fromX: {
    value: -100,
    min: -100,
    max: 100,
    step: 1,
  },
  fromY: {
    value: 50,
    min: -100,
    max: 100,
    step: 1,
  },
  fromRotateX: {
    value: 20,
    min: -360,
    max: 360,
    step: 1,
  },
  fromRotateY: {
    value: -40,
    min: -360,
    max: 360,
    step: 1,
  },
  fromRotateZ: {
    value: -80,
    min: -360,
    max: 360,
    step: 1,
  },

  toZ: {
    value: 0,
    min: -1000,
    max: 1000,
    step: 10,
  },
  toX: {
    value: 0,
    min: -30,
    max: 30,
    step: 1,
  },
  toY: {
    value: 30,
    min: -30,
    max: 30,
    step: 1,
  },
  // toRotateX: {
  //   value: 20,
  //   min: -360,
  //   max: 360,
  //   step: 1,
  // },
  // toRotateY: {
  //   value: -40,
  //   min: -360,
  //   max: 360,
  //   step: 1,
  // },
  toRotateZ: {
    value: 0,
    min: -30,
    max: 30,
    step: 1,
  },
}

export function randomPaper(id: number, overrideCfg: Partial<IPaper> = {}) {
  const radom = (obj: any) =>
    Object.keys(obj).reduce((acc, key) => {
      const { min, max } = obj[key]
      return {
        ...acc,
        [key]: Math.floor(Math.random() * (max - min + 1) + min),
      }
    }, {})

  return {
    id,
    ...radom(curveConfig),
    ...radom(enterFromConfig),
    ...overrideCfg,
  } as IPaper
}
export function randomConfig<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj).reduce((acc, key) => {
    const { min, max } = obj[key]
    return {
      ...acc,
      [key]: {
        ...obj[key],
        value: Math.floor(Math.random() * (max - min + 1) + min),
      },
    }
  }, {}) as typeof obj
}

export function paperCssVars(paper: Omit<IPaper, 'id' | 'segments'>) {
  return {
    '--delay': `${paper.delay}ms`,
    '--fromX': `${paper.fromX}vw`,
    '--fromY': `${paper.fromY}vh`,
    '--fromZ': `${paper.fromZ}px`,
    '--toX': `${paper.toX}vw`,
    '--toY': `${paper.toY}vh`,
    '--toZ': `${paper.toZ}px`,
    '--fromRotateX': `${paper.fromRotateX}deg`,
    '--fromRotateY': `${paper.fromRotateY}deg`,
    '--fromRotateZ': `${paper.fromRotateZ}deg`,
    // "--toRotateX": `${paper.toRotateX}deg`,
    // "--toRotateY": `${paper.toRotateY}deg`,
    '--toRotateZ': `${paper.toRotateZ}deg`,
  } as CSSProperties
}

export interface IPaper {
  id: number

  segments: number
  curveCenter: number
  curve: number

  delay: number

  fromX: number
  fromY: number
  fromZ: number
  fromRotateX: number
  fromRotateY: number
  fromRotateZ: number

  toX: number
  toY: number
  toZ: number
  // toRotateX: number;
  // toRotateY: number;
  toRotateZ: number
}

export interface GlobalContext {
  content?: ReactNode
  centerIndex: number
  segments: number
}

export const Context = createContext<GlobalContext>({
  segments: 8,
  centerIndex: 4,
})
