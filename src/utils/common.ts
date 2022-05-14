import { CartStatus } from "constants/models/cart.model";
import moment from "moment";

export const formatMoney = (T: number) =>
 T.toLocaleString("vi", { style: "currency", currency: "VND" });

export const formatDate = (T: Date | string) =>
 moment(T).format("DD/MM/yyyy");

export function removeAccents(str: string) {
 var AccentsMap = [
  "aàảãáạăằẳẵắặâầẩẫấậ",
  "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
  "dđ",
  "DĐ",
  "eèẻẽéẹêềểễếệ",
  "EÈẺẼÉẸÊỀỂỄẾỆ",
  "iìỉĩíị",
  "IÌỈĨÍỊ",
  "oòỏõóọôồổỗốộơờởỡớợ",
  "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
  "uùủũúụưừửữứự",
  "UÙỦŨÚỤƯỪỬỮỨỰ",
  "yỳỷỹýỵ",
  "YỲỶỸÝỴ",
 ];
 for (var i = 0; i < AccentsMap.length; i++) {
  var re = new RegExp("[" + AccentsMap[i].substring(1) + "]", "g");
  var char = AccentsMap[i][0];
  str = str.replace(re, char);
 }
 return str;
}

enum Status {
 wait = "wait",
 process = "process",
 finish = "finish",
 error = "error",
}

export const getStatus = (status: CartStatus) => {
 let step1 = Status.finish;
 let step2 = Status.process;
 let step3 = Status.wait;
 let step4 = Status.wait;
 let step5 = Status.wait;

 switch (status) {
  case CartStatus.CREATING:
   break;
  case CartStatus.CONFIRM:
   step2 = Status.finish;
   step3 = Status.process;
   break;
  case CartStatus.SHIPPING:
   step2 = Status.finish;
   step3 = Status.finish;
   step4 = Status.process;
   break;
  case CartStatus.DONE:
   step2 = Status.finish;
   step3 = Status.finish;
   step4 = Status.finish;
   step5 = Status.finish;
   break;
  case CartStatus.CANCLE:
   step1 = Status.wait;
   step2 = Status.wait;
   step3 = Status.wait;
   step4 = Status.wait;
   step5 = Status.error;
 }
 return { step1, step2, step3, step4, step5 };
};

export function generateUUID() {
 // Public Domain/MIT
 var d = new Date().getTime(); //Timestamp
 var d2 =
  (typeof performance !== "undefined" &&
   performance.now &&
   performance.now() * 1000) ||
  0; //Time in microseconds since page-load or 0 if unsupported
 return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  /[xy]/g,
  function (c) {
   var r = Math.random() * 16; //random number between 0 and 16
   if (d > 0) {
    //Use timestamp until depleted
    r = (d + r) % 16 | 0;
    d = Math.floor(d / 16);
   } else {
    //Use microseconds since page-load if supported
    r = (d2 + r) % 16 | 0;
    d2 = Math.floor(d2 / 16);
   }
   return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  }
 );
}
