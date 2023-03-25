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
}) => {
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
}
