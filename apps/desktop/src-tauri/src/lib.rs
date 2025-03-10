use tauri::Manager;
#[cfg(not(any(target_os = "android", target_os = "ios")))]
use tray_icon::{
    menu::{Menu, MenuEvent, MenuItem},
    TrayIconBuilder,
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    #[cfg(not(any(target_os = "android", target_os = "ios")))]
    {
        builder = builder.setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            let tray_menu = Menu::new();
            tray_menu.append_items(&[
                &MenuItem::new("Get Info", true, None),
                &MenuItem::new("", false, None), // Separator
                &MenuItem::new("Quit", true, None),
            ]).unwrap();

            let _tray = TrayIconBuilder::new()
                .with_menu(Box::new(tray_menu))
                .with_tooltip("CapIQ")
                .build()
                .unwrap();

            let menu_channel = MenuEvent::receiver();
            std::thread::spawn(move || {
                while let Ok(event) = menu_channel.recv() {
                    match event.id.as_ref() {
                        "Quit" => {
                            std::process::exit(0);
                        }
                        "Get Info" => {
                            window.show().unwrap();
                            window.set_focus().unwrap();
                        }
                        _ => {}
                    }
                }
            });

            Ok(())
        });
    }

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 