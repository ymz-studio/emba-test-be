import { Controller, Get, Post, Res } from "@nestjs/common";
import { AppService } from "../app.service";
import { Response } from "express";
import xlsx from "xlsx";

@Controller("admin")
export class AdminController {
  constructor(private readonly appService: AppService) {}
  @Get("token")
  getToken() {
    return this.appService.token;
  }

  @Post("start")
  start() {
    this.appService.data = [];
    this.appService.token = Math.random()
      .toString(36)
      .slice(-8);
  }

  @Post("stop")
  stop() {
    this.appService.data = [];
    this.appService.token = "";
  }

  @Get("data")
  getData() {
    return this.appService.data;
  }

  @Get("data/sse")
  getDataSse(@Res() res: Response) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });
    res.write("retry: 20\n");
    res.write("event: connecttime\n");
    res.write("data: " + new Date() + "\n\n");
    this.appService.dataSubject.subscribe(() => {
      res.write("data: " + JSON.stringify(this.appService.data) + "\n\n");
    });
  }

  @Get("export")
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
