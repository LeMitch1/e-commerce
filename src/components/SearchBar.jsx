import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

export default function SearchBar({ query, onSetQuery, product }) {
  function handleChange(e) {
    const results = product.filter((p) => {
      if (e.target.value === "") return product;
      return p.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    onSetQuery({
      search: e.target.value,
      results: results,
    });
  }

  return (
    <InputGroup size="sm">
      <InputLeftElement>
        <Search2Icon color="gray.600" />
      </InputLeftElement>
      <Input
        type="search"
        value={query.search}
        onChange={handleChange}
        placeholder="Search..."
        size="sm"
        width="25vw"
      />
    </InputGroup>
  );
}
