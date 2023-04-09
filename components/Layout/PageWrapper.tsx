import { NextSeo } from "next-seo";
import * as React from "react";

import {
  ContainerWrapper,
  ContentWrapper,
} from "~/components/Layout/Container";
import { Navbar } from "~/components/Layout/Navbar";

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  children,
  ogImage,
}) => {
  const image = ogImage
    ? [
        {
          url: `${getBaseUrl()}/${ogImage}`,
          height: 400,
          width: 700,
        },
      ]
    : [];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        openGraph={{
          title,
          images: image,
        }}
        twitter={{
          cardType: "summary",
        }}
      />
      <Navbar />
      <ContainerWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </ContainerWrapper>
    </>
  );
};

export default PageWrapper;

interface PageWrapperProps {
  title: string;
  author?: string;
  description?: string;
  children: React.ReactNode;
  ogImage?: string;
}
