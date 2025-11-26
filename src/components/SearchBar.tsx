import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function SearchBar({
  search,
  setSearch,
  handleSearch,
  handleCategoryChange,
}: any) {
  return (
    <div className="search-bar flex flex-col lg:flex-row gap-4 mt-8">
      <InputGroup>
        <InputGroupInput
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => handleSearch(search)}>
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Select onValueChange={(value: string) => handleCategoryChange(value)}>
        <SelectTrigger className="w-full lg:w-1/2">
          <SelectValue placeholder="Select Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Type</SelectItem>
          <SelectItem value="meeting-room">Meeting Room</SelectItem>
          <SelectItem value="private-office">Private Office</SelectItem>
          <SelectItem value="podcast-studio">Podcast Studio</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchBar;
