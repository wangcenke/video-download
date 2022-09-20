use log::error;
use tauri::command;
use std::fs::File;
use crate::util::{path_exists, create_record_dir, write_record_file};

#[command]
pub fn write_record(path: &str, content: &str) {
  match write_record_file(path, content) {
    Ok(_) => {}
    Err(err) => {
        error!("{}", err.to_string())
    }
}
}

#[command]
pub fn record_init(log_path: String, filename: String) {
  let full_path = format!("{}/{}", &log_path, & filename);
  match create_record_dir(&log_path) {
    Ok(_) => {
      if path_exists(&full_path) == false {
        File::create(&full_path).expect("创建文件失败");
      }
    }
    Err(e) => {
      error!("{}", e.to_string())
    }
  };
}

#[command]
pub fn path_exists_js(path: &str) -> bool {
  path_exists(path)
}