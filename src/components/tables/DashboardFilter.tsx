import React, { useCallback } from 'react';
import { ColumnFiltersState } from "@tanstack/react-table";
import { TextField, Box } from "@mui/material";

type TutorFilterProps = {
  filter: string;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

const TutorFilter: React.FC<TutorFilterProps> = React.memo(({ filter, columnFilters, setColumnFilters }) => {
  const updateTextFilter = useCallback((columnId: string, value: string) => {
    setColumnFilters((prev) => 
      prev.filter((f) => f.id !== columnId).concat({
        id: columnId,
        value: value,
      })
    );
  }, [setColumnFilters]);

  const filterValue = (columnFilters.find((f) => f.id === filter)?.value as string) || '';

  return (
    <Box display="flex" gap={2}>
      {filter && (
        <TextField 
          placeholder="Search Tutor" 
          value={filterValue}
          onChange={(e) => updateTextFilter(filter, e.target.value)}
        />
      )}
    </Box>
  );
});

TutorFilter.displayName = "TutorFilter";

export default TutorFilter;