import { Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { AppService } from "../app.service";
import { Response } from "express";
import xlsx from "xlsx";
import { AuthGuard } from "../auth/auth.guard";

@Controller("admin")
export class AdminController {
  constructor(private readonly appService: AppService) {}
  @Get("token")
  @UseGuards(AuthGuard)
  getToken() {
    return this.appService.token;
  }

  @Post("start")
  @UseGuards(AuthGuard)
  start() {
    this.appService.data = [];
    this.appService.token = Math.random()
      .toString(36)
      .slice(-8);
  }

  @Post("stop")
  @UseGuards(AuthGuard)
  stop() {
    this.appService.data = [];
    this.appService.token = "";
  }

  @Get("data")
  @UseGuards(AuthGuard)
  getData() {
    return this.appService.data;
  }

  @Get("data/sse")
  @UseGuards(AuthGuard)
  getDataSse(@Res() res: Response) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });
    this.appService.dataSubject.subscribe(() => {
      res.write("data: " + JSON.stringify(this.appService.data) + "\n\n");
    });
  }

  @Get("export")
  @UseGuards(AuthGuard)
  getExportXlsx(@Res() res: Response) {
    const book = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
      book,
      xlsx.utils.json_to_sheet(this.appService.data)
    );
    const buffer = xlsx.write(book, {
      type: "buffer"
    });
    res.writeHead(200, {
      "Content-disposition":
        "attachment; filename=" +
        `export-${new Date().toLocaleDateString()}.xlsx`,
      "Content-Type": "text/plain"
    });
    res.end(buffer);
  }
}
