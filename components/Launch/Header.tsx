import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../lib/types/redux'
import { formatDate } from '../../lib/utils/date-functions'
import { TextSize } from '../Text/ETextSize'
import Text from '../Text/Text'

interface Props {
  landingImage: string
  name: string
  launchOutcome: string
  date_unix: number
}

export const HeaderSection = ({
  landingImage,
  name,
  date_unix,
  launchOutcome,
}: Props) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(31, 41, 55, 0.75) 110%), url('${landingImage}')`,
      }}
      className={`h-launchHeaderXs sm:h-launchHeaderSm md:h-launchHeaderMd lg:h-launchHeader w-full bg-cover bg-center flex justify-center `}
    >
      <div className="w-full h-full flex flex-col justify-end items-center">
        <Text
          classes="xl:text-6xl lg:text-5xl text-4xl"
          color={theme.mainText}
          weight="font-bold"
          align="text-center"
        >
          {name}
        </Text>
        <div className="flex flex-row items-center jusitfy-center space-x-4">
          <Text
            size={TextSize.h3}
            color={theme.textAccent}
            weight="font-semibold"
            classes="mt-2 mb-4 sm:mb-6 md:mb-8 lg:mb-12"
          >
            {`${formatDate(
              new Date(date_unix * 1000),
              'MMMM D, YYYY.'
            )} ${`• ${launchOutcome}`}`}
          </Text>
        </div>
      </div>
    </section>
  )
}
