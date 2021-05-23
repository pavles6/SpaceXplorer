import React, { ReactElement } from 'react'
import SkeletonComponent, { SkeletonTheme } from 'react-loading-skeleton'

interface Props {
  width: number
  height: number
  circle?: boolean
}

export default function Skeleton({
  height,
  width,
  circle = false,
}: Props): ReactElement {
  return (
    <SkeletonTheme color="#1F2937" highlightColor="#374151">
      <SkeletonComponent
        circle={circle}
        width={width * 16}
        height={height * 16}
      />
    </SkeletonTheme>
  )
}
