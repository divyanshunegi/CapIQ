use tauri_plugin_sql::{Migration, MigrationKind, Builder};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let _migrations = vec![
        Migration {
            version: 1,
            description: "create_projects_table",
            sql: "CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id TEXT UNIQUE NOT NULL,
                project_name TEXT NOT NULL,
                base_dir TEXT NOT NULL,
                status TEXT CHECK( status IN ('processing', 'success', 'fail') ) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_files_table",
            sql: "CREATE TABLE IF NOT EXISTS files (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                project_id TEXT NOT NULL,
                file_path TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE
            );",
            kind: MigrationKind::Up,
        },
    ];

    let builder = tauri::Builder::default()
        .plugin(
            Builder::default()
                .add_migrations("sqlite:capteriq.db", _migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init());

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
