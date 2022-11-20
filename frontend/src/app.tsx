import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
})

export function rootContainer(container: any) {
  return <WagmiConfig client={client}>{container}</WagmiConfig>
}
