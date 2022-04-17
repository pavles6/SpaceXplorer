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

  return (
    <ConditionalLink url={url} link={isLink}>
      <div
        tabIndex={0}
        className={`group flex m-2 p-2 rounded-md transition ${
          isLink
            ? 'hover:bg-main dark:hover:bg-main bg-transparent dark:bg-transparent'
            : 'cursor-not-allowed'
        } ${isLink ? 'flex' : 'hidden'} lg:flex`}
      >
        <Icon
          className={`w-7 h-7 mr-1 ${
            isLink
              ? 'group-hover:text-light group-hover:dark:text-light text-main dark:text-main'
              : 'text-dark/50 dark:text-light/50'
          }`}
        />
        <Text
          classes={
            isLink
              ? 'group-hover:text-light text-dark dark:text-light'
              : 'text-dark/50 dark:text-light/50'
          }
        >
          {title}
        </Text>
      </div>
    </ConditionalLink>
  )
}
