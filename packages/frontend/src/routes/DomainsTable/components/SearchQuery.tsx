import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import Box from "../../../components/Box";
import Form from "../../../components/Form";

interface Props {
  readonly onSearch: (query: string) => void;
}

const SearchQuery: React.FunctionComponent<Props> = ({ onSearch }): JSX.Element => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSearch(query);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex" }}>
        <TextField
          variant="outlined"
          label="Search"
          type="search"
          inputProps={{
            maxLength: 44,
          }}
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Box sx={{ marginLeft: 1 }} />
        <IconButton color="primary" aria-label="Search" type="submit">
          <SearchIcon />
        </IconButton>
      </Box>
    </Form>
  );
};

export default SearchQuery;
