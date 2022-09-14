use tauri::{App, Manager};
use window_vibrancy::{self, NSVisualEffectMaterial};

/// setup
pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let win = app.get_window("main").unwrap();

    // debug 开发运行
    #[cfg(debug_assertions)]
    {
        win.open_devtools();
    }

    // 仅在 macOS 下执行
    #[cfg(target_os = "macos")]
    window_vibrancy::apply_vibrancy(&win, NSVisualEffectMaterial::FullScreenUI)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    window_vibrancy::apply_blur(&win, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    Ok(())
}
