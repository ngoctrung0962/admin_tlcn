import { TablePagination } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select";

export const styles = {
  // Fixes the overlapping problem of the component
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  container: (base) => ({
    ...base,
    padding: "0px",
    minHeight: "29.6px",
  }),
  control: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: isDisabled ? "#eee" : "#fff",
    fontSize: 11,
    minHeight: "29.6px",
    border: " 1px solid #bdbdbd",
    borderRadius: "3px",
    color: "red",
    fontWeight: "500",
  }),
  singleValue: (styles, isDisabled) => ({
    ...styles,
    color: isDisabled ? "#4f4f4f" : "#000",
  }),
  option: (styles) => ({
    ...styles,
    fontSize: 11,
    fontFamily: "Montserrat",
    fontWeight: "500",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: "0px 6px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    padding: "0px 6px",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (styles) => ({
    ...styles,
    alignItems: "center",
  }),
  groupHeading: (styles) => ({
    ...styles,
    fontSize: 11,
    fontWeight: "700",
    color: "#000000",
  }),
  placeholder: (styles, isDisabled) => ({
    ...styles,
    color: isDisabled ? "#4f4f4f" : "#000",
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0px 10px",
  }),
  searchInput: (styles) => ({
    ...styles,
    fontSize: 11,
    color: "#fff",
  }),
};
export default function CustomSelect(props) {
  const [paginate, setPaginate] = useState({
    page: 1,
    limit: 5,
  });

  const [searchText, setSearchText] = useState("");

  const { count, handleAction } = props;

  const handleChangePage = (event, newPage) => {
    setPaginate({ ...paginate, page: newPage + 1 });
  };

  useEffect(() => {
    if (handleAction) {
      handleAction(paginate, searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginate, searchText]);

  const { handleAdd } = props;

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        {handleAdd && (
          <button
            className="btn-add"
            onClick={(e) => {
              e.preventDefault();
              handleAdd();
            }}
          >
            Thêm mới
          </button>
        )}
        {/* <TablePagination
					component="div"
					page={paginate.page - 1}
					rowsPerPage={paginate.limit}
					onPageChange={handleChangePage}
					rowsPerPageOptions={[paginate.limit]}
					count={count}
					labelRowsPerPage=""
					showFirstButton
					showLastButton
				/> */}
      </components.MenuList>
    );
  };

  const typingRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (inputValue) => {
    setIsLoading(true);
    if (typingRef.current) clearTimeout(typingRef.current);

    typingRef.current = setTimeout(() => {
      setSearchText(inputValue);
      setIsLoading(false);
      setPaginate({ ...paginate, page: 1 });
    }, 800);
  };

  return (
    JSON.stringify(props.defaultOption) !== "{}" && (
      <Select
        inputProps={{
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "off",
        }}
        defaultValue={props.defaultOption}
        {...props}
        value={props.options.find((item) => item.value === props.value) || null}
        isLoading={isLoading}
        paginateOption={() => true}
        styles={styles}
        components={{ MenuList: SelectMenuButton }}
        onInputChange={handleInputChange}
        noOptionsMessage={() => "Không có dữ liệu"}
      />
    )
  );
}
