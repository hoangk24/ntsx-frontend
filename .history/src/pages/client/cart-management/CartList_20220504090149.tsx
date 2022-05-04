import React from "react";
import {
 Avatar,
 Button,
 Card,
 Descriptions,
 Form,
 Steps,
 Table,
 Tag,
 Typography,
} from "antd";
import { ColumnType } from "antd/lib/table";
import {
 CartStatus,
 ICart,
 ICartItem,
} from "constants/models/cart.model";
import { formatDate, formatMoney, getStatus } from "utils/common";
import {
 CheckOutlined,
 CloseOutlined,
 DeliveredProcedureOutlined,
 EditOutlined,
 SolutionOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

function CartList({ mycart }: { mycart: ICart }) {
 const { Step } = Steps;
 const { step2, step3, step4, step1, step5 } = getStatus(
  mycart.status
 );
 const columns: ColumnsType<ICartItem>[] = [
  {
   title: "Hình ảnh",
   render: (text: string, record: any) => (
    <Avatar src={record.idProduct?.posters?.[0].url} size="large" />
   ),
  },
  {
   title: "Tên sản phẩm",
   dataIndex: "name",
   key: "name",
   render: (text: string, record: any) => (
    <div>{record.idProduct.name}</div>
   ),
  },
  {
   title: "Size",
   dataIndex: "size",
   key: "size",
  },
  {
   title: "Đơn giá",
   dataIndex: "idProduct",
   key: "price",
   render: (_, record) => (
    <Tag color={"green"}>
     {formatMoney(record.idProduct.price as any)}
    </Tag>
   ),
  },
  {
   title: "Số lượng",
   dataIndex: "quantity",
   key: "quantity",
  },
 ];
 return (
  <Card className={"my-5"} bordered>
   <Form labelCol={{ span: 2 }} wrapperCol={{ span: 20, offset: 1 }}>
    <h1 className={"text-center"}>#Mã đơn hàng: {mycart._id}</h1>
    <Form.Item label={"Trạng thái"}>
     <Steps>
      <Step status={step5} title="Huỷ" icon={<CloseOutlined />} />
      <Step status={step1} title="Tạo" icon={<EditOutlined />} />
      <Step
       status={step2}
       title="Xác nhận"
       icon={<SolutionOutlined />}
      />
      <Step
       status={step3}
       title="Vận chuyển"
       icon={<DeliveredProcedureOutlined />}
      />
      <Step
       status={step4}
       title="Thành công"
       icon={<CheckOutlined />}
      />
     </Steps>
    </Form.Item>
    <Form.Item label={"Thông tin"}>
     <Descriptions bordered layout={"vertical"} size={"small"}>
      <Descriptions.Item label={"Ngày đặt"}>
       <Typography>{formatDate(mycart.createdAt)}</Typography>
      </Descriptions.Item>
      <Descriptions.Item label={"Số điện thoại"}>
       <Typography>{mycart.phoneNumber}</Typography>
      </Descriptions.Item>
      <Descriptions.Item label={"Địa chỉ"}>
       <Typography>{mycart.address}</Typography>
      </Descriptions.Item>
      <Descriptions.Item label={"Ghi chú"}>
       <Typography>{"Giao tận cửa không thì boom"}</Typography>
      </Descriptions.Item>
     </Descriptions>
    </Form.Item>
    <Form.Item label={"Danh sách sản phẩm"}>
     <Table
      size={"small"}
      bordered
      columns={columns}
      dataSource={mycart.list as ICartItem[]}
      pagination={false}
      rowKey={(record) => Math.random()}
     />
    </Form.Item>
    <Form.Item>
     <Form labelCol={{ span: 20 }}>
      <Form.Item label={"Giảm"}>
       <Typography>
        {formatMoney(mycart.discount || 0)}
        {!mycart.discount && " (Không áp dụng)"}
       </Typography>
      </Form.Item>
      <Form.Item label={"Tổng đơn"}>
       <Typography>{formatMoney(mycart.totalCost || 0)}</Typography>
      </Form.Item>
      <Form.Item label={"Phải Thanh toán"}>
       <Typography>{formatMoney(mycart.finalCost || 0)}</Typography>
      </Form.Item>
      <Form.Item label={"Trạng thái"}>
       <Tag>
        {mycart.status === CartStatus.PAIDED
         ? "Đã thanh toán"
         : "Chưa thanh toán"}
       </Tag>
      </Form.Item>
      <Form.Item label={"Thao tác"}>
       <Button>Huỷ</Button>
      </Form.Item>
     </Form>
    </Form.Item>
   </Form>
  </Card>
 );
}

export default CartList;
