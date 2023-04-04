import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

interface Props {
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export const SearchForm: React.FC<Props> = ({ setSearchValue }) => {
  const { register, watch } = useForm();

  const [value] = useDebounce(watch("search"), 700);
  setSearchValue(value);

  return (
    <FormControl>
      <InputGroup mt="4">
        <Input
          id="search"
          variant="filled"
          placeholder="Cari kata kunci"
          autoComplete="off"
          {...register("search")}
        />
        <InputRightElement>
          <SearchIcon />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
