import { Injectable } from "@angular/core";
import { homeDir } from "@tauri-apps/api/path";
// import { createDir, writeTextFile, readTextFile } from "@tauri-apps/api/fs";
import { info, error, attachConsole } from "tauri-plugin-log-api";
import { invoke } from "@tauri-apps/api";
import * as dayjs from "dayjs";

@Injectable({
  providedIn: "root"
})
export class LogService {

  constructor() {
  }
  // TODO 需要优化 rust返回错误
  suffix = ".log";
  basedir = "";
  file = "";

  // 初始化，新建目录和文件 文件规则 YYYY-MM-DD
  async init(filename: string): Promise<void> {
    try {
      const detach = await attachConsole();
      await info("logs init");

      const homeDirPath = await homeDir();
      const dirname = `hi/${dayjs().format("YYYYMMDD")}`;
      this.basedir = `${homeDirPath}${dirname}`;
      this.file = `${filename}${this.suffix}`;
      const logPath = `${homeDirPath}${dirname}`;

      await invoke("record_init", {logPath: logPath, filename: `${filename}${this.suffix}`});
      detach();
    } catch (e: any) {
      await error(e.toString());
    }
  }

  async writeRecord(content: string): Promise<void> {
    try {
      const detach = await attachConsole();
      await invoke("write_record", {path: `${this.basedir}/${this.file}`, content: content});
      detach();
    } catch (e: any) {
      await error(e.toString());
    }

  }
}
