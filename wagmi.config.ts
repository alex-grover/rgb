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
          [baseSepolia.id]: '0xEb0Bd59F3B680A94187abD00fB6879db1f4f9Ca7',
        },
      },
    }),
    react(),
  ],
})
