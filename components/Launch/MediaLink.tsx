import { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import Text from '../Text/Text'
import { State } from '../../lib/types/redux'
import ConditionalLink from '../../lib/utils/componentAsLink'

interface Props {
  link: IMediaLink
}

export interface IMediaLink {
  title: string
  url: string | null
  Icon: FunctionComponent<React.ComponentProps<'svg'>>
}

export const MediaLink = ({ link: { Icon, title, url } }: Props) => {
  const isLink = url !== null
  const theme = useSelector((state: State) => state.theme)
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
            ? `${hovered ? `bg-${theme.mainColor}` : 'bg-transparent'}`
            : 'cursor-not-allowed'
        } ${isLink ? 'flex' : 'hidden'} lg:flex`}
      >
        <Icon
          className={`w-7 h-7 transition mr-1 ${
            isLink
              ? hovered
                ? theme.textAccent
                : theme.mainText
              : theme.textSecondary
          }`}
        />
        <Text
          color={isLink ? (hovered ? 'textAccent' : 'text') : 'textSecondary'}
        >
          {title}
        </Text>
      </div>
    </ConditionalLink>
  )
}
