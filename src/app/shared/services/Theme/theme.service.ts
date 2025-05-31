import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private darkModeClass = 'dark';

  toggleDarkMode(): void {
    document.documentElement.classList.toggle(this.darkModeClass);
  }

  enableDarkMode(): void {
    document.documentElement.classList.add(this.darkModeClass);
  }

  disableDarkMode(): void {
    document.documentElement.classList.remove(this.darkModeClass);
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkModeClass);
  }
}