import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import React, { useRef, useState } from "react";
import FixedHeaderStory from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { showConfirmDeleteDialog } from "../../utils/MyUtils";
import Loading from "../Loading/Loading.component";
export default function CustomDataTable({
  data,
  columns,
  onRowDoubleClicked,
  loading,
  paginate,
  setPaginate,
  count,
  setLoading,
  handleDeleteRowSelected,
  selectableRows = true,
  isFooter,
  nameApi,
  tableId,
  setTable,
}) {
  const { tokenUser } = useSelector((state) => state.user);

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };
  const conditionalRowStyles = [
    {
      when: (row) => data.indexOf(row) % 2 === 0,
      style: {
        backgroundColor: "#F9F9F9",
        color: "#000",
      },
    },
    {
      when: (row) => data.indexOf(row) % 2 !== 0,
      style: {
        backgroundColor: "#fff",
        color: "#000",
      },
    },
  ];

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPaginate({ ...paginate, page: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    setPaginate({ ...paginate, page: 1, limit: event.target.value });
  };

  const changeTimeoutRef = useRef(null);

  const width = Math.max(window.screen.width, window.innerWidth);

  return (
    <>
      {selectedRows && selectedRows.length > 0 ? (
        <button
          className="mb-2 btn-cancel btn__delete-rows"
          onClick={() => {
            showConfirmDeleteDialog(() => {
              handleDeleteRowSelected(selectedRows);
              setSelectedRows([]);
              setToggleCleared(!toggleCleared);
            });
          }}
        >
          Xóa {selectedRows.length} dòng đã chọn
          <BsTrash className="ms-1" />
        </button>
      ) : (
        ""
      )}
      <FixedHeaderStory
        fixedHeader
        fixedHeaderScrollHeight="500px"
        noDataComponent="Không có dữ liệu"
        persistTableHead
        data={data?.map((item) =>
          isFooter && isFooter(item) ? { ...item, footer: true } : item
        )}
        columns={columns?.map((col) => ({
          ...col,
          selector: (row) =>
            row.footer ? (
              <strong>{col.selector(row)}</strong>
            ) : (
              col.selector(row)
            ),
        }))}
        conditionalRowStyles={conditionalRowStyles}
        highlightOnHover
        selectableRows={selectableRows}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        paginationPerPage={paginate && paginate.limit}
        progressPending={loading}
        progressComponent={<Loading />}
        onRowDoubleClicked={onRowDoubleClicked}
        pointerOnHover
        responsive={true}
      />
      {paginate && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100, 200]}
          component="div"
          count={isNaN(count) ? 100 : count}
          page={paginate.page}
          onPageChange={handleChangePage}
          rowsPerPage={paginate.page}
          onRowsPerPageChange={handleChangeRowsPerPage}
          showFirstButton
          showLastButton
          labelRowsPerPage={width >= 768 ? "Số hàng trên trang:" : ""}
        />
      )}
    </>
  );
}
