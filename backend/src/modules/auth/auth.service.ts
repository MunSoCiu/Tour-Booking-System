import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  /* =====================================================
                        VALIDATE USER
     ===================================================== */
  async validateUser(email: string, pass: string) {
    const user = await this.users.findByEmail(email);
    if (!user) return null;

    const matched = await bcrypt.compare(pass, user.password);
    if (!matched) return null;

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      token: this.jwt.sign(payload),
      user,
    };
  }

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

    const { password, ...safeUser } = user;

    // Auto login
    const token = this.jwt.sign({
      sub: safeUser.id,
      email: safeUser.email,
      role: safeUser.role,
    });

    return { token, user: safeUser };
  }

  /* =====================================================
                  TẠO ADMIN MẶC ĐỊNH (OPTIONAL)
     ===================================================== */
  async ensureAdminExists() {
    const admin = await this.users.findByEmail("admin@gotour.test");
    if (!admin) {
      const hash = await bcrypt.hash("admin123", 10);

      await this.users.create({
        email: "admin@gotour.test",
        password: hash,
        fullName: "Super Admin",
        role: "admin",
      });

      console.log("✔ Admin mặc định đã được tạo!");
    }
  }
}
