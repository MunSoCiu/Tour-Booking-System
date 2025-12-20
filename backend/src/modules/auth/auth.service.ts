import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  // =========================
  // VALIDATE USER (ONLY CHECK)
  // =========================
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.users.findByEmail(email);
    if (!user) return null;

    const matched = await bcrypt.compare(pass, user.password);
    if (!matched) return null;

    return user; // ⚠️ TRẢ ENTITY ĐẦY ĐỦ (CÓ PASSWORD)
  }

  // =========================
  // LOGIN (SIGN TOKEN)
  // =========================
  async login(user: User) {
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const { password, ...safeUser } = user;

    return {
      token: this.jwt.sign(payload),
      user: safeUser,
    };
  }

  // =========================
  // REGISTER
  // =========================
  async register(payload: {
    email: string;
    password: string;
    fullName?: string;
  }) {
    const existing = await this.users.findByEmail(payload.email);
    if (existing) throw new Error("Email already exists");

    const hash = await bcrypt.hash(payload.password, 10);

    const user = await this.users.create({
      email: payload.email,
      password: hash,
      fullName: payload.fullName,
      role: "user",
    });

    const payloadJwt = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      token: this.jwt.sign(payloadJwt),
      user,
    };
  }
}
