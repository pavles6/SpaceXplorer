import React from 'react'
import { useSelector } from 'react-redux'
import { Theme } from '../../constants/global/theme'
import Button from '../Button/Button'
import Text from '../Text/Text'
import PreviewHeader from './PreviewHeader'
import { ArrowNarrowRightIcon } from '@heroicons/react/outline'
import { TextSize } from '../Text/ETextSize'

export default function RocketsPreview() {
  const theme = useSelector((state: { theme: Theme }) => state.theme)
  return (
    <div
      className={`w-full min-h-landingTile  ${theme.surfaceBackground} flex flex-col justify-center`}
    >
      <div className="flex flex-col justify-center items-center">
        {/*... */}
        <PreviewHeader
          title="Rockets"
          subtitle="Every SpaceX rocket and it's achievements"
          action={
            <Button
              variant="link"
              href="/launches"
              size={TextSize.Xl2}
              Icon={ArrowNarrowRightIcon}
              click={() => {}}
            >
              More about rockets
            </Button>
          }
        ></PreviewHeader>
      </div>
      <div className={`flex-1`}></div>
    </div>
  )
}
