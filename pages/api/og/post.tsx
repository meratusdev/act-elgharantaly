/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";
export const config = {
  runtime: "edge",
  experiments: {
    towLevelAwait: true,
  },
};

const interSemiBold = fetch(
  new URL(`~/assets/fonts/Inter-SemiBold.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const interExtraBold = fetch(
  new URL(`~/assets/fonts/Inter-ExtraBold.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const handler = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const interSemiBoldFont = await interSemiBold;
  const interExtraBoldFont = await interExtraBold;

  const hasTitle = searchParams.has("title");

  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "My default title";

  return new ImageResponse(
    (
      <div tw="bg-gray-50 flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="flex flex-col pl-10 pr-12 w-full">
          <div tw="flex w-full mb-6">
            <img
              src="https://act-elgharantaly.vercel.app/avatar.jpg"
              tw="rounded-full h-28 m-0"
            />
            <div tw="flex flex-col pl-6 justify-center">
              <p tw="text-3xl font-semibold mb-1 mt-0">Aan Candra Talib</p>
              <p tw="text-xl font-semibold mb-0 mt-1">@act_elgharantaly</p>
            </div>
          </div>
          <div tw="flex w-full">
            <div tw="font-extrabold text-5xl leading-snug">{title}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 700,
      height: 400,
      fonts: [
        {
          name: "Inter",
          data: interSemiBoldFont,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: interExtraBoldFont,
          style: "normal",
          weight: 800,
        },
      ],
    },
  );
};

export default handler;
