import type { PropsWithChildren } from 'react'
import { useCallback, useRef } from 'react'

export function FileButton({
  children,
  onSelected,
}: {
  onSelected: (file: File) => void
} & PropsWithChildren) {
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0)
        onSelected(e.target.files[0])
    },
    [],
  )

  const onClick = useCallback(() => {
    if (inputRef.current)
      inputRef.current.click()
  }, [])

  return (
    <>
      <button className="btn" onClick={onClick}>{children}</button>
      <input
        ref={inputRef}
        type="file"
        onChange={onChange}
        className="hidden"
      />
    </>
  )
}
