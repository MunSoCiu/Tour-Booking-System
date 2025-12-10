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
      secretOrKey: process.env.JWT_SECRET || "supersecret",
    });
  }

  async validate(payload: any) {
    const user: any = await this.users.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException("Token không hợp lệ hoặc user đã bị xoá");
    }

    // Xoá password nếu tồn tại
    if ("password" in user) delete user.password;

    return user;
  }
}
