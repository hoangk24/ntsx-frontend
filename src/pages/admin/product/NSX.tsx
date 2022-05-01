import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Modal, Table, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import { RootState } from "app/store";
import { ISubCategory } from "constants/models/category.model";
import { IImage } from "constants/models/common.model";
import { useResetFormOnCloseModal } from "hook/useResetFormModal";
import AddSubcategory from "pages/admin/product/AddSubcategory";
import useNSX from "pages/admin/product/useNSX";
import React, { useState } from "react";
import { useSelector } from "react-redux";
type Props = {
 visible: boolean;
 setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function NSX({ visible, setVisible }: Props) {
 const { categories, deleteNSX, addSubcategory } = useNSX();
 const [openAddSubCatge, setOpenAddSubCatge] = useState(false);
 const [category, setCategory] = useState<ISubCategory | null>(null);
 //  const [form] = useForm();
 const column = [
  {
   title: "Tên danh mục",
   dataIndex: "name",
   key: "name",
  },
  {
   title: "Logo",
   dataIndex: "logos",
   key: "logos",
   render: (logos: IImage) => {
    return (
     <Image
      src={
       //  logos.url ||
       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      }
      width={100}
     />
    );
   },
  },

  {
   title: "NSX",
   dataIndex: "nsx",
   key: "nsx",
   render: (text: string, record: any, idx: number) => {
    return record.subCategory.map((it: ISubCategory) => (
     <Tag
      closable
      color={"green"}
      onClose={() => deleteNSX(record._id)}>
      {it.name}
     </Tag>
    ));
   },
  },
  {
   title: "Thao tác",
   render: (text: string, record: any, idx: number) => (
    <Button
     icon={<PlusOutlined />}
     onClick={() => {
      setCategory(record);
      setOpenAddSubCatge(true);
     }}
    />
   ),
  },
 ];
 return (
  <Modal
   visible={visible}
   onCancel={() => setVisible(false)}
   width={900}>
   <h1>Danh sách danh mục</h1>
   <Table
    dataSource={categories}
    columns={column}
    rowKey={(record) => Math.random()}
   />
   {category && (
    <AddSubcategory
     category={category}
     visible={openAddSubCatge}
     onHide={setOpenAddSubCatge}
     onAddSubCate={addSubcategory}
    />
   )}
  </Modal>
 );
}
