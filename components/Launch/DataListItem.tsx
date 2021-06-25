import { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import Text from '../Text/Text'
import { State } from '../../lib/types/redux'

interface Props {
  spacing?: string
  title: string
  value: string
  link?: boolean
  href?: string
  classes?: string
}

export const DataRow = ({
  title,
  value,
  classes,
  spacing,
  link,
  href,
}: Props) => {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div
      className={`flex ${classes || ''} justify-between lg:justify-start ${
        spacing || 'space-x-2'
      }`}
    >
      <div className="flex flex-shrink-0">
        <Text variant="subtitle2" color="text">
          {title + ':'}
        </Text>
      </div>
      <Text
        classes={`flex-shrink ${link ? 'underline' : ''}`}
        link={link}
        href={href}
        variant="subtitle1"
        align="text-right"
        color={link ? 'mainText' : 'textAccent'}
      >{`${value}`}</Text>
    </div>
  )
}
