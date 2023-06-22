import axios from "axios";
import React from "react";
import { Controller } from "react-hook-form";
import { AsyncPaginate } from "react-select-async-paginate";
import axiosClient from "../../api/axiosClient";
import coursesApi from "../../api/coursesApi";
import { styles } from "./Select.component";

export default function SelectCategoriesAsync({
  control,
  required,
  field,
  onChange: onChangeProp,
  onChangeOption,
  isDisabled,
  placeholder,
  defaultOptions,
  isClearable,
  valueField = "id",
  labelField = "name",
  isMulti = false,
  api,
}) {
  const loadMoreOptions = async (search, loadedOptions, additional) => {
    // ?? là toán tử nullish coalescing
    const nextPage = (additional?.currentPage ?? -1) + 1;
    const res = await axiosClient.get(api, {
      params: {
        page: nextPage,
        key: search,
      },
    });

    return {
      options: res.data?.content?.map((item) => {
        return {
          value: item[valueField],
          label: item[labelField],
          ...item,
        };
      }),
      hasMore: res.data.totalElements > loadedOptions.length,
      additional: {
        currentPage: nextPage,
      },
    };
  };
  return (
    <Controller
      name={field}
      control={control}
      rules={{ required: required }}
      render={({ field: { value, onChange } }) => (
        <AsyncPaginate
          styles={styles}
          isMulti={isMulti}
          isClearable={isClearable}
          isDisabled={isDisabled}
          placeholder={placeholder}
          value={value}
          defaultOptions={defaultOptions || null}
          onChange={(e) => {
            console.log(e);
            onChangeOption?.(e.value);
            onChange(e);
            onChangeProp?.(e.value);
          }}
          cacheOptions
          loadOptions={loadMoreOptions}
          components
        />
      )}
    />
  );
}
