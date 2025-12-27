import { Injectable } from "@nestjs/common";
import * as qs from "qs";
import * as crypto from "crypto";

@Injectable()
export class VnpayService {
  createPaymentUrl({
    orderId,
    amount,
    ipAddr,
  }: {
    orderId: string;
    amount: number;
    ipAddr: string;
  }) {
    const tmnCode = process.env.VNP_TMNCODE!;
    const secretKey = process.env.VNP_HASH_SECRET!;
    const vnpUrl = process.env.VNP_URL!;
    const returnUrl = process.env.VNP_RETURN_URL!;

    const date = new Date();
    const createDate = date
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);

    const params: any = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toán đơn ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    const signData = qs.stringify(params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    params.vnp_SecureHash = hmac.update(signData).digest("hex");

    return `${vnpUrl}?${qs.stringify(params, { encode: false })}`;
  }
}
