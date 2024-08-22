import React from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Dayjs} from "dayjs";
import dayjs from "dayjs";

type HelperType = {
  id: string;
  displayName: string;
};

type ColumnFilter = { id: string; value: any };

type FiltersProps = {
  columnFilters: ColumnFilter[];
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFilter[]>>;
};

const Filters: React.FC<FiltersProps> = ({ columnFilters, setColumnFilters }) => {
  const helperFilter = columnFilters.find((f) => f.id === 'helper')?.value as HelperType | undefined;
  const helperName = helperFilter?.displayName || '';
  const helpStartDate = columnFilters.find((f) => f.id === 'helpStartUnixMs')?.value;
  const helpEndDate = columnFilters.find((f) => f.id === 'helpEndUnixMs')?.value;

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

  return (
    <Box display="flex" gap={2}>
      <DatePicker 
        label="Help Start Date"
        value={helpStartDate ? dayjs(helpStartDate) : null}
        onChange={(newValue) => updateDateFilter('helpStartUnixMs', newValue)}
      />
      <DatePicker 
        label="Help End Date"
        value={helpEndDate ? dayjs(helpEndDate) : null}
        onChange={(newValue) => updateDateFilter('helpEndUnixMs', newValue)}
      />
      <TextField 
        placeholder="Search Helper"
        value={helperName}
        onChange={(e) => {
          setColumnFilters(prev => {
            const helperFilter = prev.find(f => f.id === 'helper');
            const newValue = { id: helperFilter?.value?.id || '', displayName: e.target.value };
            if (helperFilter) {
              return prev.map(f => f.id === 'helper' ? { ...f, value: newValue } : f);
            } else {
              return [...prev, { id: 'helper', value: newValue }];
            }
          });
        }}
      />
    </Box>
  );
};

export default Filters;