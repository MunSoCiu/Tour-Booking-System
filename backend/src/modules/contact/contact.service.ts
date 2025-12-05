import { Injectable } from "@nestjs/common";

@Injectable()
export class ContactService {
  sendMessage(payload: any) {
    // In production: persist to DB or forward to mail service
    console.log("Contact message:", payload);
    return { ok: true };
  }
}
