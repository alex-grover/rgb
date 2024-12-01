import type { Metadata } from "next";
import { Web3Provider } from "@/lib/Web3Provider";
import { PropsWithChildren } from "react";
import { Flex, Theme } from "@radix-ui/themes";
import { Header } from "@/components/Header";
import "@radix-ui/themes/styles.css";
import "./global.css"

export const metadata: Metadata = {
  title: "RGB Signatures",
  description: "RGB is an infinite canvas",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="gray" grayColor="gray" radius="none">
          <Web3Provider>
            <Flex direction="column" minHeight="100dvh">
              <Header />
              {children}
            </Flex>
          </Web3Provider>
        </Theme>
      </body>
    </html>
  );
}
