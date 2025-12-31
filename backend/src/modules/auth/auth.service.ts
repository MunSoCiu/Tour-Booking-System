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
<<<<<<< HEAD
    const user = await this.users.findEntityByEmail(email);
=======
    const user = await this.users.findByEmail(email);
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    if (!user) return null;

    const matched = await bcrypt.compare(pass, user.password);
    if (!matched) return null;

<<<<<<< HEAD
    return user; // entity đầy đủ
=======
    return user; // ⚠️ TRẢ ENTITY ĐẦY ĐỦ (CÓ PASSWORD)
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }

  // =========================
  // LOGIN (SIGN TOKEN)
  // =========================
  async login(user: User) {
<<<<<<< HEAD
=======
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
<<<<<<< HEAD
      avatar: user.avatar,
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
    };

    const { password, ...safeUser } = user;

    return {
<<<<<<< HEAD
      access_token: this.jwt.sign(payload),
=======
      token: this.jwt.sign(payload),
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
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
<<<<<<< HEAD
    phone?: string;
    address?: string;
    birthDate?: string;
=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }) {
    const existing = await this.users.findByEmail(payload.email);
    if (existing) throw new Error("Email already exists");

    const hash = await bcrypt.hash(payload.password, 10);

<<<<<<< HEAD
    const user = await this.users.createEntity({
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      phone: payload.phone,
      address: payload.address,
      birthDate: payload.birthDate ? new Date(payload.birthDate) : null,
      role: "user",
      avatar: "/avatars/default.jpg",
    });

    const { password, ...safeUser } = user;

    return {
      access_token: this.jwt.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      }),
      user: safeUser,
    };
  }
  async getProfile(userId: string) {
    return this.users.findById(userId);
  }
=======
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
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
}
