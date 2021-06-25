import React from 'react'
import { useSelector } from 'react-redux'
import { State } from '../lib/types/redux'
import Text from './Text/Text'

export default function Footer() {
  const theme = useSelector((state: State) => state.theme)

  return (
    <div className={`${theme.surface} flex w-full py-4 mt-52 justify-center`}>
      <div className={`w-full max-w-screen-lg flex flex-col `}>
        <div className="w-full mt-6 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="textAccent"
            >
              Navigate
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              Home
            </Text>
            <Text link href="/launches" variant="subtitle2" color="text">
              Launches
            </Text>
            <Text link href="/rockets" variant="subtitle2" color="text">
              Rockets
            </Text>
            <Text link href="/capsules" variant="subtitle2" color="text">
              Capsules
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="textAccent"
            >
              Project
            </Text>
            <Text
              link
              href="https://github.com/pavles6/SpaceXplorer"
              variant="subtitle2"
              color="text"
            >
              GitHub Repository
            </Text>
            <Text
              link
              href="https://github.com/pavles6"
              variant="subtitle2"
              color="text"
            >
              Author
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              License
            </Text>
            <Text
              link
              href="https://github.com/r-spacex/SpaceX-API"
              variant="subtitle2"
              color="text"
            >
              r/SpaceX API
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="textAccent"
            >
              Tech stack
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              Next.js
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              TailwindCSS
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              Redux
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="textAccent"
            >
              More
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              Preferences
            </Text>
          </div>
        </div>

        <div className="w-full border-t border-white border-opacity-10 mt-4 pt-4">
          <Text
            color="text"
            classes="mb-2 mx-4 text-sm md:text-base text-left md:text-justify"
          >
            This project or its author is not affiliated, associated,
            authorized, endorsed by, or in any way officially connected with
            Space Exploration Technologies Corp (SpaceX), or any of its
            subsidiaries or its affiliates. The names SpaceX as well as related
            names, marks, emblems and images are registered trademarks of their
            respective owners.
          </Text>
          <Text
            color="textAccent"
            classes="mx-4 text-sm md:text-base text-left md:text-justify"
          >
            This is a personal project, aiming to showcase my skills and
            knowledge in web development.
          </Text>
        </div>
        <div className="w-full flex justify-center items-center mt-4 pt-8 border-t border-white border-opacity-10">
          <Text variant="subtitle2" align="text-center" color="text">
            Licensed under{' '}
            <Text link href="#" color="mainText">
              GPL v3.0 License
            </Text>
          </Text>
          <div className={`p-0.5 mx-2  rounded-xl bg-white`} />
          <Text variant="subtitle2" color="text">
            {new Date().getFullYear()}
          </Text>
        </div>
      </div>
    </div>
  )
}
