import { FunctionComponent, useState } from 'react'
import Text from '../Text/Text'
import ConditionalLink from '../../lib/utils/componentAsLink'

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
            ? `${hovered ? 'bg-primary' : 'bg-transparent'}`
            : 'cursor-not-allowed'
        } ${isLink ? 'flex' : 'hidden'} lg:flex`}
      >
        <Icon
          className={`w-7 h-7 mr-1 ${
            isLink
              ? hovered
                ? 'text-iconAccentDark'
                : 'text-primary'
              : 'text-disabled dark:text-disabledDark'
          }`}
        />
        <Text
          color={
            isLink
              ? hovered
                ? 'text-textAccentDark'
                : 'text-Accent dark:text-textAccentDark'
              : 'text-disabled dark:text-disabledDark'
          }
        >
          {title}
        </Text>
      </div>
    </ConditionalLink>
  )
}
