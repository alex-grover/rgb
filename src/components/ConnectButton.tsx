'use client'

import type { EnsDataResponse } from '@/lib/ens'
import { PersonIcon } from '@radix-ui/react-icons'
import { Avatar, Button, Flex } from '@radix-ui/themes'
import { ConnectKitButton } from 'connectkit'
import useSWRImmutable from 'swr/immutable'

export function ConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show} variant="outline" size="3">
            {isConnected ? (
              <Flex align="center" gap="2">
                <ConnectedAvatar address={address} />
                {ensName ?? truncatedAddress}
              </Flex>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

type ConnectedAvatarProps = {
  address?: string
}

function ConnectedAvatar({ address }: ConnectedAvatarProps) {
  const { data } = useSWRImmutable<EnsDataResponse>(
    address && `https://api.ensdata.net/${address}`,
    { shouldRetryOnError: false },
  )

  return (
    <Avatar
      src={data?.avatar_small}
      fallback={<PersonIcon />}
      size="1"
      radius="full"
    />
  )
}
