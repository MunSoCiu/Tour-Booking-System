<<<<<<< HEAD
import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
  Req,
  Get,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt.guard";
=======
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

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
<<<<<<< HEAD
    if (!user) throw new BadRequestException("Invalid credentials");
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user.sub);
  }
=======

    if (!user) throw new BadRequestException("Invalid credentials");

    return this.authService.login(user);
  }
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
}
