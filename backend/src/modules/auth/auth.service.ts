import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;
    const matched = await bcrypt.compare(pass, user.password);
    if (matched) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
      user,
    };
  }

  async register(payload: {
    email: string;
    password: string;
    fullName?: string;
  }) {
    const existing = await this.users.findByEmail(payload.email);
    if (existing) throw new Error("Email exists");
    const hash = await bcrypt.hash(payload.password, 10);
    const user = await this.users.create({
      email: payload.email,
      password: hash,
      fullName: payload.fullName,
    });
    const { password, ...rest } = user;
    return rest;
  }
}
