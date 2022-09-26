#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::generate_handler;
use tauri_plugin_log::{LogTarget, LoggerBuilder};
mod command;
mod setup;
mod util;
use command::{open_main_window, path_exists_js, record_init, write_record};

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .plugin(
            LoggerBuilder::default()
                .targets([LogTarget::LogDir, LogTarget::Stdout, LogTarget::Webview])
                .build(),
        )
        .invoke_handler(generate_handler![
            write_record,
            record_init,
            path_exists_js,
            open_main_window
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
