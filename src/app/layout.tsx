import type { Metadata } from "next";
import { Web3Provider } from "@/lib/Web3Provider";
import { ConnectButton } from "@/components/ConnectButton";
import { PropsWithChildren } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RGB Signatures",
  description: "RGB is an infinite canvas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <header>
            <Link href="/about">Logo</Link>
            <nav>
              <Link href="/about">About</Link>
              <Link href="/collections">Collections</Link>
              <Link href="/faq">FAQ</Link>
            </nav>
            <ConnectButton />
          </header>
          {children}
          <footer>
            <div>Copyright</div>
            <div>Social links</div>
          </footer>
        </Web3Provider>
      </body>
    </html>
  );
}
