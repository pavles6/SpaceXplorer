import React from 'react'
import Text from './Text/Text'

export default function Footer() {
  return (
    <footer className="mt-32 bg-surfacePrimary dark:bg-surfacePrimaryDark flex w-full justify-center">
      <div className="w-full max-w-screen-lg flex flex-col">
        <div className="w-full mt-6 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="text-textMain dark:text-textMainDark"
            >
              Navigate
            </Text>
            <Text link href="/" variant="subtitle2" color="text">
              Home
            </Text>
            <Text link href="/search" variant="subtitle2" color="text">
              Search
            </Text>
            <Text
              link
              href="https://github.com/pavles6/SpaceXplorer/tree/master#readme"
              variant="subtitle2"
              color="text"
            >
              About
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="text-textMain dark:text-textMainDark"
            >
              Project resources
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
            <Text
              target="_blank"
              link
              href="https://github.com/pavles6/SpaceXplorer/blob/master/LICENSE"
              variant="subtitle2"
              color="text"
            >
              License
            </Text>
            <Text
              target="_blank"
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
              color="text-textMain dark:text-textMainDark"
            >
              Tech stack
            </Text>
            <Text
              link
              href="https://nextjs.org/"
              variant="subtitle2"
              color="text"
            >
              Next.js
            </Text>
            <Text
              link
              href="https://tailwindcss.com/"
              variant="subtitle2"
              color="text"
            >
              TailwindCSS
            </Text>
            <Text
              link
              href="https://headlessui.dev/"
              variant="subtitle2"
              color="text"
            >
              HeadlessUI
            </Text>
          </div>
        </div>

        <div className="w-full border-t border-gray-400 dark:border-opacity-20 border-opacity-30 mt-4 pt-4">
          <Text
            color="text-textMain dark:text-textMainDark"
            classes="mb-2 mx-4 text-sm md:text-base sm:text-center md:text-left md:text-justify"
          >
            This project and its author are not affiliated, associated,
            authorized, endorsed by, or in any way officially connected with
            Space Exploration Technologies Corp (SpaceX), or any of its
            subsidiaries or its affiliates. The names SpaceX as well as related
            names, marks, emblems and images are registered trademarks of their
            respective owners.
          </Text>
          <Text
            color="textAccent"
            weight="font-semibold"
            classes="mx-4 text-sm md:text-base text-center md:text-left md:text-justify"
          >
            This is a personal project, with the intention of showing my skills
            and knowledge of web development.
          </Text>
        </div>
        <div className="w-full flex justify-center items-center mt-4 py-6 border-t border-gray-400 dark:border-opacity-20 border-opacity-30">
          <Text variant="subtitle2" align="text-center" color="text">
            Licensed under{' '}
            <Text
              link
              href="https://github.com/pavles6/SpaceXplorer/blob/master/LICENSE"
              color="text-primary"
            >
              GPLv3 License
            </Text>
          </Text>
          <div className={`p-0.5 mx-2  rounded-xl bg-black dark:bg-white`} />
          <Text variant="subtitle2" color="text">
            {new Date().getFullYear()}
          </Text>
        </div>
      </div>
    </footer>
  )
}
