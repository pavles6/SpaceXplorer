import React from 'react'
import Text from './Text/Text'

export default function Footer() {
  return (
    <footer className="mt-32 bg-white dark:bg-black flex w-full justify-center">
      <div className="w-full max-w-screen-lg flex flex-col items-center">
        <div className="w-full mt-6 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="theme"
            >
              Navigate
            </Text>
            <Text link href="/" variant="subtitle2" color="themeSecondary">
              Home
            </Text>
            <Text
              link
              href="/search"
              variant="subtitle2"
              color="themeSecondary"
            >
              Search
            </Text>
            <Text
              link
              href="https://github.com/pavles6/SpaceXplorer/tree/master#readme"
              variant="subtitle2"
              color="themeSecondary"
            >
              About
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="theme"
            >
              Project resources
            </Text>
            <Text
              link
              href="https://github.com/pavles6/SpaceXplorer"
              variant="subtitle2"
              color="themeSecondary"
            >
              GitHub Repository
            </Text>
            <Text
              link
              href="https://github.com/pavles6"
              variant="subtitle2"
              color="themeSecondary"
            >
              Author
            </Text>
            <Text
              target="_blank"
              link
              href="https://github.com/pavles6/SpaceXplorer/blob/master/LICENSE"
              variant="subtitle2"
              color="themeSecondary"
            >
              License
            </Text>
            <Text
              target="_blank"
              link
              href="https://github.com/r-spacex/SpaceX-API"
              variant="subtitle2"
              color="themeSecondary"
            >
              r/SpaceX API
            </Text>
          </div>
          <div className="flex flex-col justify-start items-start space-y-2 m-4">
            <Text
              variant="small1"
              classes="uppercase font-semibold"
              color="theme"
            >
              Tech stack
            </Text>
            <Text
              link
              href="https://nextjs.org/"
              variant="subtitle2"
              color="themeSecondary"
            >
              Next.js
            </Text>
            <Text
              link
              href="https://tailwindcss.com/"
              variant="subtitle2"
              color="themeSecondary"
            >
              TailwindCSS
            </Text>
            <Text
              link
              href="https://headlessui.dev/"
              variant="subtitle2"
              color="themeSecondary"
            >
              HeadlessUI
            </Text>
          </div>
        </div>

        <div className="w-11/12 border-t border-b border-dark/10 dark:border-light/20 mt-4 pb-4 pt-4 ">
          <Text
            color="theme"
            classes="mb-2 mx-4 text-sm md:text-base text-center md:text-justify"
          >
            This project and its author are not affiliated, associated,
            authorized, endorsed by, or in any way officially connected with
            Space Exploration Technologies Corp (SpaceX), or any of its
            subsidiaries or its affiliates. The names SpaceX as well as related
            names, marks, emblems and images are registered trademarks of their
            respective owners.
          </Text>
          <Text
            color="theme"
            weight="font-semibold"
            classes="mx-4 text-sm md:text-base text-center md:text-left md:text-justify"
          >
            This is a personal project, with the intention of showing my skills
            and knowledge of web development.
          </Text>
        </div>
        <div className="w-full flex justify-center items-center mt-2 py-6">
          <Text
            variant="subtitle2"
            link
            href="https://github.com/pavles6/SpaceXplorer/blob/master/LICENSE"
            color="info"
          >
            Licensed under GPLv3 License
          </Text>
          <div className={`p-0.5 mx-2  rounded-xl bg-black dark:bg-white`} />
          <Text variant="subtitle2" color="theme">
            {new Date().getFullYear()}
          </Text>
        </div>
      </div>
    </footer>
  )
}
