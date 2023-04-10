import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { isEmpty, lowerCase } from "lodash";
import { useEffect, useState } from "react";

import { PostCard } from "~/components/Pagination/PostCard";
import { SearchForm } from "~/components/Search/Form";
import { type OutputTypeTRPC } from "~/server/api/root";

type Props = {
  data: OutputTypeTRPC["posts"]["getAllPostSearch"];
};

const LIMIT_SHOW_RESULT = 10;

export const SearchLayout: React.FC<Props> = ({ data }) => {
  const [searchValue, setSearchValue] = useState("");
  const [limitShowResult, setLimitShowResult] = useState(LIMIT_SHOW_RESULT);

  useEffect(() => {
    setLimitShowResult(LIMIT_SHOW_RESULT);
  }, [searchValue]);

  const filteredData = data.filter((post) => {
    if (!isEmpty(searchValue)) {
      return lowerCase(post.fullText).includes(lowerCase(searchValue));
    }

    return undefined;
  });

  const isFound = filteredData.length > 0;

  const SearchResult = () => {
    if (!isEmpty(searchValue)) {
      if (isFound) {
        return (
          <>
            {/* CARD */}
            <Stack spacing="6" divider={<Divider h="0.5px" bg="gray.300" />}>
              {filteredData.slice(0, limitShowResult).map((post) => (
                <PostCard key={post.slug} highlight={searchValue} {...post} />
              ))}
            </Stack>

            {/* BUTTON: TAMPILKAN LEBIH BANYAK */}
            {filteredData.length > limitShowResult && (
              <Center mt="8">
                <Button
                  size={{
                    base: "sm",
                    md: "md",
                  }}
                  onClick={() =>
                    setLimitShowResult(limitShowResult + LIMIT_SHOW_RESULT)
                  }
                  rightIcon={<ArrowDownIcon />}
                >
                  Tampilkan lebih banyak
                </Button>
              </Center>
            )}
          </>
        );
      }

      return (
        <Text>Tulisan tidak ditemukan. Silahkan coba kata kunci lain.</Text>
      );
    }

    return <Text>Silahkan masukkan kata kunci.</Text>;
  };

  return (
    <Stack>
      <Heading
        size={{
          base: "md",
          md: "lg",
        }}
      >
        Pencarian
      </Heading>

      <SearchForm setSearchValue={setSearchValue} />

      <Box pt="5">
        <SearchResult />
      </Box>
    </Stack>
  );
};
