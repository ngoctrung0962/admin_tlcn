import React from "react";
import { Controller } from "react-hook-form";
import CustomSelect from "./Select.component";

export default function SimpleSelect({
  control,
  required,
  field,
  onChange: onChangeProp,
  isDisabled,
  defaultOption,
  onChangeOption,
  placeholder,
  options,
}) {
  return (
    <Controller
      control={control}
      name={field}
      rules={{ required: required }}
      render={({ field: { value, onChange } }) => (
        <CustomSelect
          isDisabled={isDisabled}
          placeholder={placeholder}
          value={value}
          defaultOption={defaultOption || null}
          onChange={(option) => {
            onChangeOption?.(option);
            onChange(option.value);
            onChangeProp?.(option.value);
          }}
          options={options}
          count={options.length}
        />
      )}
    />
  );
}
