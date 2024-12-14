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
          [baseSepolia.id]: '0x000000009cBe1fB4f7d7e945311234a436BD80e2',
        },
      },
    }),
    react(),
  ],
})
