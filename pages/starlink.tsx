import React, { ReactElement } from 'react'
import Navbar from '../components/Navbar/Navbar'

interface Props {}

export default function starlink({}: Props): ReactElement {
  return (
    <div>
      <Navbar shadow={true}></Navbar>
    </div>
  )
}
