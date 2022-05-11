import { UploadFile } from "antd/lib/upload/interface";
import { useState } from "react";

export default function useUpload() {
 const [fileList, setFileList] = useState<UploadFile[]>([]);

 const onRemove = (file: UploadFile) => {
  const index = fileList.indexOf(file);
  const newFileList = fileList.slice();
  newFileList.splice(index, 1);
  return true;
 };
 const beforeUpload = (file: UploadFile) => {
  setFileList([...fileList, file]);
  return false;
 };

 const onChangeFileList = (f: any) => {
  setFileList(f.fileList);
 };
 return { onChangeFileList, fileList, beforeUpload, onRemove };
}
