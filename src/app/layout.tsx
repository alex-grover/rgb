import type { Metadata } from "next";
import { Web3Provider } from "@/lib/Web3Provider";
import { ConnectButton } from "@/components/ConnectButton";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "RGB Signatures",
  description: "RGB is an infinite canvas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <ConnectButton />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
