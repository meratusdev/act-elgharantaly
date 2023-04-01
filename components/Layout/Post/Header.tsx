import { LinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import Balancer from "~/utils/balancer";
import { bookmarkAtom } from "~/utils/bookmark";
import dateFormatter from "~/utils/dateFormatter";
import { getImageUrl } from "~/utils/image";

interface Props {
  slug: string;
  date: string | null | undefined;
  title: string;
  image: string | null;
}

export const PostHeader: React.FC<Props> = ({ slug, date, title, image }) => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);

  const isSlugBookmarked = bookmark.includes(slug);

  const handleBookmark = () => {
    if (isSlugBookmarked) {
      setBookmark((prev) => prev.filter((item) => item !== slug));
    } else {
      setBookmark((prev) => [...prev, slug]);
    }
  };

  const imageUrl = getImageUrl({
    slug,
    filename: image,
    collection: "posts",
  });

  return (
    <Stack borderBottom="1px" pb="8" borderColor="gray.300">
      {/* {imageUrl && (
        <Center>
          <Image
            src={imageUrl}
            alt={title}
            rounded="md"
            maxH={{
              md: "md",
            }}
          />
        </Center>
      )} */}

      <Heading
        size={{
          base: "2xl",
          md: "2xl",
        }}
        textAlign="center"
        lineHeight="taller"
      >
        <Balancer>{title}</Balancer>
      </Heading>

      <Box pt="2">
        <Text
          fontSize={{
            base: "md",
            md: "lg",
          }}
          textAlign="center"
          color="blackAlpha.700"
        >
          {dateFormatter(date, "d MMMM yyyy")}
        </Text>
      </Box>

      <Center>
        <HStack pt="6">
          <Avatar
            src="https://avatars.githubusercontent.com/u/1164541?v=4"
            size="md"
          />
          <Stack spacing="0" pl="2" alignItems="justify">
            <Text fontWeight="semibold">Aan Candra Talib</Text>

            <Text
              as="a"
              href="https://instagram.com/act_elgharantaly"
              color="blue.500"
              fontSize="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              @act_elgharantaly
            </Text>
          </Stack>

          {/* <Tooltip label="Add to Bookmark">
            <IconButton
              variant="ghost"
              aria-label="Add to Bookmark"
              icon={isSlugBookmarked ? <HiHeart /> : <HiOutlineHeart />}
              onClick={handleBookmark}
            />
          </Tooltip>

          <Tooltip label="Copy Link">
            <IconButton
              variant="ghost"
              aria-label="Copy Link"
              icon={<LinkIcon />}
            />
          </Tooltip> */}
        </HStack>
      </Center>
    </Stack>
  );
};
