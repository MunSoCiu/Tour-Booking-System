import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(
    @Body() body: { email: string; password: string; fullName?: string }
  ) {
    try {
      return await this.authService.register(body);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) throw new BadRequestException("Invalid credentials");

    return this.authService.login(user);
  }
}
