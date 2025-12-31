<<<<<<< HEAD
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
=======
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
      secretOrKey: process.env.JWT_SECRET || "supersecret",
    });
  }

  async validate(payload: any) {
<<<<<<< HEAD
    console.log("🔥 JWT PAYLOAD:", payload);
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      avatar: payload.avatar,
    };
=======
    const user: any = await this.users.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException("Token không hợp lệ hoặc user đã bị xoá");
    }

    // Xoá password nếu tồn tại
    if ("password" in user) delete user.password;

    return user;
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }
}
