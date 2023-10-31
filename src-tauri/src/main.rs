// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

use std::fs::OpenOptions;
use std::io::{Read, Write};

#[tauri::command]
fn read_file() -> String {
    let mut file = std::fs::File::open("C:\\Users\\Log\\Desktop\\hosts").expect("open file error");
    let mut df = String::new();
    file.read_to_string(&mut df)
        .expect("read file to String error");
    df
}

#[tauri::command]
fn write_file(str: String) {
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .open("C:\\Users\\Log\\Desktop\\hosts")
        .expect("open file error");
    file.write_all(str.as_bytes()).expect("write file error");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_file, write_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
