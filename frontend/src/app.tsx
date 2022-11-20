import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

import { chain, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [alchemyProvider({ apiKey: 'SbD3UgjEHxD85PtwBTk-sBiAtcDremYc' })],
)

const client = createClient({
  autoConnect: true,
  provider,
})

export function rootContainer(container: any) {
  return <WagmiConfig client={client}>{container}</WagmiConfig>
}
