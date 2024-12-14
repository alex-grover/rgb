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
          [baseSepolia.id]: '0x00000000E90a40C60B36A88c0e220572DC8be4E1',
        },
      },
    }),
    react(),
  ],
})
