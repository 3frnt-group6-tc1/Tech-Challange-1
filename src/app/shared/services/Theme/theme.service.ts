import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeClass = 'dark';
  private storageKey = 'darkMode';

  constructor() {
    this.loadTheme();
  }

  toggleDarkMode(): void {
    const isDark = this.isDarkMode();
    if (isDark) {
      this.disableDarkMode();
      localStorage.setItem(this.storageKey, '0');
    } else {
      this.enableDarkMode();
      localStorage.setItem(this.storageKey, '1');
    }
  }

  enableDarkMode(): void {
    document.documentElement.classList.add(this.darkModeClass);
    localStorage.setItem(this.storageKey, '1');
  }

  disableDarkMode(): void {
    document.documentElement.classList.remove(this.darkModeClass);
    localStorage.setItem(this.storageKey, '0');
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkModeClass);
  }

  loadTheme(): void {
    const stored = localStorage.getItem(this.storageKey);

    if (stored === '1') {
      this.enableDarkMode();
    } else if (stored === '0') {
      this.disableDarkMode();
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.enableDarkMode();
      } else {
        this.disableDarkMode();
      }
    }
  }
}
