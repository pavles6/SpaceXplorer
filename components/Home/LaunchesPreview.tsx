import React from 'react'
import { Theme } from '../../constants/global/theme'

interface LaunchesPreviewProps {
  theme: Theme
}

export default function LaunchesPreview({ theme }: LaunchesPreviewProps) {
  return (
    <div
      className={`bg-launches-preview-bg w-previewCard min-h-previewCard rounded-md ${theme.surface} mt-10`}
    >
      &nbsp;
    </div>
  )
}
