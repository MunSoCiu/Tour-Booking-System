import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import axios from "axios";

@Injectable()
export class MomoService {
  async createPayment({
    orderId,
    amount,
    orderInfo,
  }: {
    orderId: string;
    amount: number;
    orderInfo: string;
  }) {
    const partnerCode = process.env.MOMO_PARTNER_CODE!;
    const accessKey = process.env.MOMO_ACCESS_KEY!;
    const secretKey = process.env.MOMO_SECRET_KEY!;
    const requestId = orderId;
    const orderIdMomo = orderId;
    const redirectUrl = process.env.MOMO_REDIRECT_URL!;
    const ipnUrl = process.env.MOMO_IPN_URL!;
    const requestType = "captureWallet";

    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderIdMomo}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const res = await axios.post(process.env.MOMO_ENDPOINT!, {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId: orderIdMomo,
      orderInfo,
      redirectUrl,
      ipnUrl,
      requestType,
      extraData: "",
      signature,
      lang: "vi",
    });

    return res.data; // payUrl
  }
}
