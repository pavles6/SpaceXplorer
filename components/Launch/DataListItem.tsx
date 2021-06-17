import { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { TextSize } from '../Text/ETextSize'
import Text from '../Text/Text'
import { State } from '../../lib/types/redux'

interface Props {
  spacing?: string
  title: string
  value: string
  link?: boolean
  href?: string
  Icon?: FunctionComponent<React.ComponentProps<'svg'>>
  classes?: string
}

export const DataRow = ({
  title,
  value,
  Icon,
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
        {/* {Icon ? (
          <Icon className={`w-6 h-6 transition ${theme.mainText}`}></Icon>
        ) : null} */}
        <Text variant="subtitle2" color={theme.text}>
          {title + ':'}
        </Text>
      </div>
      <Text
        classes={`flex-shrink ${link ? 'underline' : ''}`}
        link={link}
        href={href}
        variant="subtitle1"
        align="text-right"
        color={link ? theme.mainText : theme.textAccent}
      >{`${value}`}</Text>
    </div>
  )
}
