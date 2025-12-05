import { Controller, Post, Body } from "@nestjs/common";
import { ContactService } from "./contact.service";

@Controller("api/contact")
export class ContactController {
  constructor(private svc: ContactService) {}

  @Post()
  send(@Body() body: any) {
    return this.svc.sendMessage(body);
  }
}
