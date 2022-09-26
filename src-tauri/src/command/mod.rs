use crate::util::{create_record_dir, path_exists, write_record_file};
use log::error;
use std::fs::File;
use tauri::{command, AppHandle};

#[command]
pub fn open_main_window(handle: AppHandle) {
    tauri::WindowBuilder::new(&handle, "chat", tauri::WindowUrl::App("/chat".into()))
        .inner_size(800.0, 600.0)
        .title("video download")
        .center()
        .build()
        .unwrap();
}

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
    let full_path = format!("{}/{}", &log_path, &filename);
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
