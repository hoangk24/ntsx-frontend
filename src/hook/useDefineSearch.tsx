import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { trim } from "lodash";
import React, { useState } from "react";
import Highlighter from "react-highlight-words";

export default function useDefineSearch() {
 const [searchText, setSearchText] = useState<React.Key>("");
 const [searchedColumn, setSearchedColumn] = useState("");
 const getColumnSearchProps = (dataIndex: any) => ({
  filterDropdown: ({
   setSelectedKeys,
   selectedKeys,
   confirm,
   clearFilters,
  }: FilterDropdownProps) => (
   <div style={{ padding: 8 }}>
    <Input
     placeholder={`Search ${dataIndex}`}
     value={selectedKeys[0]}
     onChange={(e) => {
      setSelectedKeys(e.target.value ? [e.target.value] : []);
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
      confirm({ closeDropdown: false });
     }}
     onPressEnter={() =>
      handleSearch(selectedKeys, confirm, dataIndex)
     }
     style={{ marginBottom: 8, display: "block" }}
    />
    <Space>
     <Button
      type="primary"
      onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
      icon={<SearchOutlined />}
      size="small"
      style={{ width: 90 }}>
      Search
     </Button>
     <Button
      onClick={() => handleReset(clearFilters, confirm)}
      size="small"
      style={{ width: 90 }}>
      Reset
     </Button>
    </Space>
   </div>
  ),
  filterIcon: (filtered: any) => (
   <SearchOutlined
    style={{ color: filtered ? "#1890ff" : undefined }}
   />
  ),
  onFilter: (value: any, record: any) =>
   record[dataIndex]
    ? record[dataIndex]
       .toString()
       .toLowerCase()
       .includes(value.toLowerCase())
    : "",
  onFilterDropdownVisibleChange: (visible: any) => {},
  render: (text: any) =>
   searchedColumn === dataIndex ? (
    <Highlighter
     highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
     searchWords={[searchText as string]}
     autoEscape
     textToHighlight={text ? text.toString() : ""}
    />
   ) : (
    text
   ),
 });

 const handleSearch = (
  selectedKeys: any,
  confirm: any,
  dataIndex: any
 ) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
 };

 const handleReset = (clearFilters: any, confirm: any) => {
  clearFilters();
  setSearchText("");
  confirm();
 };

 return { getColumnSearchProps };
}
