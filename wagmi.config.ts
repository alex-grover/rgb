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
          [baseSepolia.id]: '0x000000009a7DaeF23020e1d25e0dd56Ac9e6bDD2',
        },
      },
    }),
    react(),
  ],
})
