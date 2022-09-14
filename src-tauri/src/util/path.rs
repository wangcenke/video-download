use std::path::Path;

pub fn path_exists(path: &str) -> bool {
    Path::new(path).exists()
}
