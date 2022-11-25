import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import viLocale from "date-fns/locale/vi";
import React from "react";
import { Controller } from "react-hook-form";

export default function CustomDatePicker({
  control,
  field,
  minDate,
  maxDate,
  required,
  validate,
  readOnly,
}) {
  const rangeDate = {};
  if (minDate) rangeDate.minDate = parseISO(new Date(minDate).toISOString());
  if (maxDate) rangeDate.maxDate = parseISO(new Date(maxDate).toISOString());

  return (
    <Controller
      name={field}
      control={control}
      rules={{
        required: required,
        validate: validate,
      }}
      render={({ field }) => (
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={viLocale}
        >
          <DatePicker
            dayOfWeekFormatter={(day) => day.toUpperCase()}
            readOnly={readOnly}
            {...rangeDate}
            inputFormat="dd/MM/yyyy"
            renderInput={(params) => (
              <TextField
                className="w-100"
                fullWidth
                {...params}
                style={
                  readOnly
                    ? {
                        backgroundColor: "#eee",
                        padding: "0px",
                      }
                    : {
                        backgroundColor: "#fff",
                        padding: "0px",
                      }
                }
              />
            )}
            {...field}
            value={field.value ? field.value : null}
            onOpen={() => {
              if (!field.value) field.onChange(rangeDate.maxDate);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}
