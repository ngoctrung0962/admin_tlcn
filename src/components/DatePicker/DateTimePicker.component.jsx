import { TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import React from 'react';
import { Controller } from 'react-hook-form';

export default function CustomDateTimePicker({
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
                    <DateTimePicker
                        dayOfWeekFormatter={(day) => day.toUpperCase()}
                        readOnly={readOnly}
                        {...rangeDate}
                        inputFormat="dd/MM/yyyy | HH:mm"
                        renderInput={(params) => (
                            <TextField
                                fullWidth
                                style={
                                    readOnly
                                        ? {
                                              backgroundColor: '#eee',
                                          }
                                        : {
                                              backgroundColor: '#fff',
                                          }
                                }
                                {...params}
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
