import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  ForbiddenException,
  Req,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "./user.entity";
import { Express } from "express";
import { diskStorage } from "multer";

@Controller("users")
export class UsersController {
  constructor(private svc: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Body("role") role: string) {
    if (role !== "admin") {
      throw new ForbiddenException(
        "Bạn không có quyền xem danh sách người dùng"
      );
    }
    return this.svc.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getOne(
    @Param("id") id: string,
    @Body("userId") userId: string,
    @Body("role") role: string
  ) {
    if (userId !== id && role !== "admin") {
      throw new ForbiddenException("Không thể xem thông tin người khác");
    }
    return this.svc.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() body: Partial<User>,
    @Req() req: any
  ) {
    const { sub: userId, role } = req.user;

    if (body.role && role !== "admin") {
      throw new ForbiddenException("Không thể thay đổi quyền");
    }

    if (userId !== id && role !== "admin") {
      throw new ForbiddenException("Không có quyền cập nhật");
    }

    return this.svc.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/password")
  changePassword(
    @Param("id") id: string,
    @Body() body: { oldPassword: string; newPassword: string },
    @Req() req: any
  ) {
    if (req.user.sub !== id) {
      throw new ForbiddenException("Không có quyền");
    }
    return this.svc.changePassword(id, body.oldPassword, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/avatar")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads/avatars",
        filename: (_, file, cb) => {
          const ext = file.originalname.split(".").pop();
          const name = `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}.${ext}`;
          cb(null, name);
        },
      }),
    })
  )
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param("id") id: string,
    @Req() req: any
  ) {
    if (req.user.sub !== id) {
      throw new ForbiddenException("Không có quyền");
    }

    return this.svc.update(id, {
      avatar: `/uploads/avatars/${file.filename}`,
    });
  }
}
