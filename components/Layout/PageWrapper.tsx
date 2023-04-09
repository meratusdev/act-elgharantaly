import { NextSeo } from "next-seo";
import * as React from "react";

import {
  ContainerWrapper,
  ContentWrapper,
} from "~/components/Layout/Container";
import { Navbar } from "~/components/Layout/Navbar";

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  description,
  children,
  ogImage,
}) => {
  const image = ogImage
    ? [
        {
          url: ogImage,
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
