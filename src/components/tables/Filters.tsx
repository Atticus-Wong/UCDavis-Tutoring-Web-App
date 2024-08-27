import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

type HelperType = {
  id: string;
  displayName: string;
};

type ColumnFilter = { id: string; value: any };

type FiltersProps = {
  filter1: string,
  filter2: string,
  filter3: string,
  filter4?: string,
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
};

const Filters: React.FC<FiltersProps> = ({ filter1, filter2, filter3, filter4, columnFilters, setColumnFilters }) => {
  const helperFilter = columnFilters.find((f) => f.id === filter3)?.value as HelperType | undefined;
  const helperName = helperFilter?.displayName || '';
  const helpStartDate = columnFilters.find((f) => f.id === filter1)?.value;
  const helpEndDate = columnFilters.find((f) => f.id === filter2)?.value;
  const queueFilter = columnFilters.find((f) => f.id === filter4)?.value;

  const updateDateFilter = (columnId: string, value: Dayjs | null) => {
    setColumnFilters(prev => {
      const existing = prev.find(f => f.id === columnId);
      if (existing) {
        return prev.map(f => f.id === columnId ? { ...f, value: value ? value.valueOf() : undefined } : f);
      } else {
        return [...prev, { id: columnId, value: value ? value.valueOf() : undefined }];
      }
    });
  };

  const updateTextFilter = (columnId: string, value: string) => {
    setColumnFilters(prev => {
      const existing = prev.find(f => f.id === columnId);
      if (existing) {
        return prev.map(f => f.id === columnId ? { ...f, value } : f);
      } else {
        return [...prev, { id: columnId, value }];
      }
    });
  };

  return (
    <Box display="flex" gap={2}>
      <DatePicker 
        label="Help Start Date"
        value={helpStartDate ? dayjs(helpStartDate) : null}
        onChange={(newValue) => updateDateFilter(filter1, newValue)}
      />
      <DatePicker 
        label="Help End Date"
        value={helpEndDate ? dayjs(helpEndDate) : null}
        onChange={(newValue) => updateDateFilter(filter2, newValue)}
      />
      <TextField 
        placeholder="Search Helper"
        value={helperName}
        onChange={(e) => {
          setColumnFilters(prev => {
            const helperFilter = prev.find(f => f.id === filter3);
            const newValue = { id: helperFilter?.value?.id || '', displayName: e.target.value };
            if (helperFilter) {
              return prev.map(f => f.id === filter3 ? { ...f, value: newValue } : f);
            } else {
              return [...prev, { id: filter3, value: newValue }];
            }
          });
        }}
      />
      {filter4 &&
        <TextField 
          placeholder="Search Queue" 
          value={queueFilter || ''}
          onChange={(e) => updateTextFilter(filter4, e.target.value)}
        />
      }
    </Box>
  );
};

export default Filters;