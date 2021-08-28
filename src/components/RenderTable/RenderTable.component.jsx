import React from "react";
import { Table } from "antd";
import Spinner from "../Spinner/Spinner.component";

const RenderTable = ({
  isLoading,
  pageSize,
  count,
  handlePageChange,
  data,
  columns,
  isValidation,
}) => {
  return isLoading ? (
    <Spinner size="large" />
  ) : isValidation ? (
    <Table
      columns={columns}
      style={{
        justifySelf: "center",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        maxWidth: "100%",
      }}
      tableLayout="fixed"
      dataSource={data}
    />
  ) : (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ scrollToFirstRowOnChange: true }}
      style={{
        justifySelf: "center",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        width: "80%",
        overflowX: "scroll",
        marginTop: "50px",
      }}
      pagination={
        count
          ? {
              pageSize: pageSize,
              total: count,
              onChange: handlePageChange,
            }
          : {}
      }
    />
  );
};
export default RenderTable;
