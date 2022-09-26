use tauri::{App, Manager};
use window_vibrancy::{apply_blur, apply_vibrancy, NSVisualEffectMaterial};
/// setup
pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    let login = app.get_window("login").unwrap();
    let main = app.get_window("main").unwrap();

    // debug
    #[cfg(debug_assertions)]
    {
        main.open_devtools();
        // login.open_devtools();
    }

    #[cfg(target_os = "macos")]
    apply_vibrancy(&main, NSVisualEffectMaterial::FullScreenUI, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
    #[cfg(target_os = "macos")]
    apply_vibrancy(&login, NSVisualEffectMaterial::FullScreenUI, None, None)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    #[cfg(target_os = "windows")]
    apply_blur(&main, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    #[cfg(target_os = "windows")]
    apply_blur(&login, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    Ok(())
}
