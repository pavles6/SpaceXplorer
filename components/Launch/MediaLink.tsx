import { FunctionComponent, useState } from 'react'
import Text from '../Text/Text'
import ConditionalLink from '../../lib/utils/componentAsLink'
import { usePalette } from '../../lib/palette/store'

interface Props {
  link: IMediaLink
}

export interface IMediaLink {
  title: string
  url: string | null
  Icon: FunctionComponent<React.ComponentProps<'svg'>>
}

export const LaunchMediaLink = ({ link: { Icon, title, url } }: Props) => {
  const isLink = url !== null
  const theme = usePalette()
  const [hovered, setHovered] = useState(false)

  return (
    <ConditionalLink url={url} link={isLink}>
      <div
        tabIndex={0}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
        className={`flex m-2 p-2 rounded-md transition ${
          isLink
            ? `${hovered ? `${theme.base.surfacePrimary}` : 'bg-transparent'}`
            : 'cursor-not-allowed'
        } ${isLink ? 'flex' : 'hidden'} lg:flex`}
      >
        <Icon
          className={`w-7 h-7 mr-1 ${
            isLink
              ? hovered
                ? theme.base['dark:iconAccent']
                : theme.base.iconPrimary
              : theme.base.textDisabled
          }`}
        />
        <Text
          color={isLink ? (hovered ? 'textAccent' : 'text') : 'textDisabled'}
        >
          {title}
        </Text>
      </div>
    </ConditionalLink>
  )
}
