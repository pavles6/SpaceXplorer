import React, { ReactElement, useEffect, useState } from 'react'
import { CrewMember } from '../../lib/types/api'
import Text from '../Text/Text'
import Image from 'next/image'

interface Props extends CrewMember {
  key: React.Key
}

export default function CrewMemberCard({
  name,
  wikipedia,
  launches,
  agency,
  image,
}: Props): ReactElement {
  return (
    <div className="flex flex-col m-4 bg-lightSecondary dark:bg-darkSecondary rounded-xl">
      <Image
        layout="fixed"
        width={256}
        height={256}
        objectFit="cover"
        src={image}
        alt={`${name}, ${agency}`}
        className="w-full h-full rounded-xl"
      />
      <div className="flex flex-col justify-start p-4">
        <Text variant="h4" border classes="mb-4" weight="font-semibold">
          {name}
        </Text>
        <Text variant="subtitle2" color="themeSecondary">
          <span>Agency: </span>
          <span className="text-dark dark:text-light">{agency}</span>
        </Text>
        <Text variant="subtitle2" color="themeSecondary">
          <span>No. of missions: </span>
          <span className="text-dark dark:text-light">{launches.length}</span>
        </Text>
        {wikipedia ? (
          <Text
            target="_blank"
            variant="subtitle2"
            decoration="underline"
            weight="font-semibold"
            link
            color="info"
            href={wikipedia}
          >
            Wikipedia page
          </Text>
        ) : null}
      </div>
    </div>
  )
}
