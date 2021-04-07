import React, { ReactElement } from 'react'
import Navbar from '../components/Navbar/Navbar'

interface Props {}

export default function launches({}: Props): ReactElement {
  return (
    <div>
      <Navbar shadow={true}></Navbar>
    </div>
  )
}
