import moment from "moment";
import {CartStatus} from "../constants/models/cart.model";

export const formatMoney = (T: number) =>
    T.toLocaleString("vi", {style: "currency", currency: "VND"});

export const formatDate = (T: Date | string) => moment(T).format("DD/MM/yyyy");

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
    wait = 'wait',
    process = 'process',
    finish = 'finish',
    error = 'error'
}

export const getStatus = (status: CartStatus) => {
    let step1 = Status.finish
    let step2 = Status.process
    let step3 = Status.wait
    let step4 = Status.wait
    let step5 = Status.wait

    switch (status) {
        case CartStatus.CREATING:
        case CartStatus.PAIDED:
            break
        case CartStatus.CONFIRM:
            step2 = Status.finish
            step3 = Status.process
            break
        case CartStatus.SHIPPING:
            step2 = Status.finish
            step3 = Status.finish
            step4 = Status.process
            break
        case CartStatus.DONE:
            step2 = Status.finish
            step3 = Status.finish
            step4 = Status.finish
            step5 = Status.finish
            break
        case CartStatus.CANCLE:
            step1 = Status.wait
            step2 = Status.wait
            step3 = Status.wait
            step4 = Status.wait
            step5 = Status.error
    }
    return {step1, step2, step3, step4, step5}
}