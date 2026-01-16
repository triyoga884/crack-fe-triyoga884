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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

function SearchBar({
  initialSearch,
  type,
  setFilters,
}: {
  initialSearch: string;
  type: string;
  setFilters: (value: Partial<{ search: string; type: string }>) => void;
}) {
  const [localSearch, setLocalSearch] = useState(initialSearch);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setFilters({ search: localSearch });
    }
  };

  return (
    <div className="search-bar flex flex-col lg:flex-row gap-4 mt-8">
      <InputGroup>
        <InputGroupInput
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search..."
          onKeyDown={handleKeyDown}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={() => setFilters({ search: localSearch })}>
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <Select
        value={type}
        onValueChange={(value) => setFilters({ type: value })}
      >
        <SelectTrigger className="w-full lg:w-1/2">
          <SelectValue placeholder="Select Room Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem defaultChecked={true} value="ALL">
            All Type
          </SelectItem>
          <SelectItem value="MEETING_ROOM">Meeting Room</SelectItem>
          <SelectItem value="PRIVATE_OFFICE">Private Office</SelectItem>
          <SelectItem value="PODCAST_STUDIO">Podcast Studio</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SearchBar;
