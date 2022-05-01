export interface IVoucher {
 _id?: string;
 voucher: string;
 percent: number;
 startDate: Date | string;
 endDate: Date | string;
 status: boolean;
}
