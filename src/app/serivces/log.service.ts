import { Injectable } from "@angular/core";
import { BaseDirectory, homeDir } from "@tauri-apps/api/path";
import { createDir, writeTextFile, readTextFile } from "@tauri-apps/api/fs";

@Injectable({
  providedIn: "root"
})
export class LogService {

  constructor() {
  }

  // TODO 聊天记录 rust后端做 追加写入
  async getHomeDir(): Promise<void> {
    try {
      const cacheDirPath = await homeDir();
      console.log(cacheDirPath);
      console.log(BaseDirectory.Home);
      await createDir("hi", { dir: BaseDirectory.Home, recursive: true });
      const filePath = cacheDirPath + "/hi" + "/ck.log";
      const content = await readTextFile(filePath);
      console.log(content);
      // await writeTextFile(filePath, "123456");
    } catch (e) {
      console.log(e);
    }

  }
}
