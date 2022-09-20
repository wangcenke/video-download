import { Injectable } from "@angular/core";
import { homeDir } from "@tauri-apps/api/path";
import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { attachConsole, error, info } from "tauri-plugin-log-api";
import { invoke } from "@tauri-apps/api";
import { Msg } from "../types/msg";
import { TimeService } from "./time.service";
import { Userinfo } from "../types/auth";
import { StorageService } from "./storage.service";
// import _s from "lodash/_orderBy"
import { orderBy } from "lodash";

@Injectable({
  providedIn: "root"
})
export class RecordService {

  constructor(
    private timeService: TimeService,
    private storageService: StorageService
  ) {
    this.userinfo = this.storageService.get("userinfo");
  }

  userinfo: Userinfo | null;
  recordDirs: number[] = []; // 聊天记录目录
  suffix = ".log";
  basedir = "";
  file = "";

  // 初始化，新建目录和文件 文件规则 YYYY-MM-DD
  async init(filename: string): Promise<void> {
    try {
      const detach = await attachConsole();
      await info("logs init");

      const homeDirPath = await homeDir();
      const dirname = `hi/${this.timeService.getToday()}`;
      this.basedir = `${homeDirPath}${dirname}`;
      this.file = `${filename}${this.suffix}`;
      const logPath = `${homeDirPath}${dirname}`;

      await invoke("record_init", { logPath: logPath, filename: `${filename}${this.suffix}` });
      this.recordDirs = await this.getAllDirName(`${homeDirPath}hi`);
      detach();
    } catch (e: any) {
      await error(e.toString());
    }
  }

  // 写入聊天记录
  async writeRecord(content: string): Promise<void> {
    try {
      const detach = await attachConsole();
      await invoke("write_record", { path: `${this.basedir}/${this.file}`, content: content });
      detach();
    } catch (e: any) {
      await error(e.toString());
    }
  }


  // 读取 hi 目录下所有的聊天记录
  async readRecord(recordFileName = "all"): Promise<Msg[]> {
    const result: Msg[] = [];
    try {
      const detach = await attachConsole();
      const home = await homeDir();
      for (const item of this.recordDirs.reverse()) {
        const recordPath = `${home}hi/${item}/${recordFileName}${this.suffix}`;
        const record = await readTextFile(recordPath);
        record.trim().split("\n").map(msg => {
          let m: Msg = JSON.parse(msg);
          m.isSelf = m.user_id === this.userinfo?.id;
          result.push(m);
        });
      }
      detach();
    } catch (e: any) {
      await error(e.toString());
    }
    return orderBy(result, ["time"], ["asc"]);
  }

  // hi下所有的文件夹
  private async getAllDirName(path: string): Promise<number[]> {
    const result: number[] = [];
    const entries = await readDir(path, { recursive: false });
    entries.forEach(item => {
      if (!Object.is(Number(item.name), NaN)) {
        if (item.name != null) {
          result.push(+item.name);
        }
      }
    });
    return result;
  }
}

