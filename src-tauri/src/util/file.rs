use std::{fs::{self, OpenOptions}, io::{self, Write}};

pub fn create_record_dir(path: &str) -> std::io::Result<()> {
    fs::create_dir_all(path)?;
    Ok(())
}

pub fn write_record_file(path: &str, content: &str) -> Result<(), io::Error> {
    let mut file = OpenOptions::new().append(true).open(path)?;
    file.write_all(content.as_bytes())?;
    file.write_all("\n".as_bytes())?;
    Ok(())
}
