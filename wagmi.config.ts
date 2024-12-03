import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import { base, baseSepolia } from 'viem/chains'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    foundry({
      project: './contracts',
      include: ['*/RGBSignatures.json'],
      deployments: {
        RGBSignatures: {
          [base.id]: '0x0000000000000000000000000000000000000000',
          [baseSepolia.id]: '0x91A42B219c1eee3e760B745A8640454f86a8C593',
        },
      },
    }),
    react(),
  ],
})
