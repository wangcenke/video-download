#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::generate_handler;
use tauri_plugin_log::{LogTarget, LoggerBuilder};
mod util;
mod setup;
mod command;
use command::{write_record, record_init, path_exists_js};

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .plugin(
            LoggerBuilder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .invoke_handler(generate_handler![write_record, record_init, path_exists_js])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
