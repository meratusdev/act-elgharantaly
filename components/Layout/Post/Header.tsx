import { LinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  HStack,
  IconButton,
  Spacer,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import dateFormatter from "~/utils/dateFormatter";

interface Props {
  slug: string;
  date: string | null | undefined;
}

import { useAtom } from "jotai";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { bookmarkAtom } from "~/utils/bookmark";

export const PostHeader: React.FC<Props> = ({ slug, date }) => {
  const [bookmark, setBookmark] = useAtom(bookmarkAtom);

  const isSlugBookmarked = bookmark.includes(slug);

  const handleBookmark = () => {
    if (isSlugBookmarked) {
      setBookmark((prev) => prev.filter((item) => item !== slug));
    } else {
      setBookmark((prev) => [...prev, slug]);
    }
  };

  return (
    <HStack>
      <Avatar src="https://avatars.githubusercontent.com/u/1164541?v=4" />
      <Stack>
        <Text>Aan Candra Talib</Text>
        <Text>{dateFormatter(date, "d MMMM yyyy")}</Text>
      </Stack>
      <Spacer />

      <Tooltip label="Add to Bookmark">
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
      </Tooltip>
    </HStack>
  );
};
