import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Show } from './show.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  host = environment.apiHost;
  title = 'angular-app';
  searchQuery: string = '';
  shows: Show[] = [];
  errorMessage: string = '';
  selectedShow: Show | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  getShows(query: string) {
    if (!query || !query.trim()) {
      this.errorMessage = 'Please enter the Show Name';
      this.shows = [];
      return;
    }
    this.errorMessage = '';
    this.loading = true;
    this.http.get<any[]>(`${this.host}/show?showName=${encodeURIComponent(query)}`)
      .subscribe({
        next: results => {
          this.shows = results
            .map(r => r.show as Show)
            .filter(show => show.image && show.image.medium)
            .filter(show => show.premiered);
          this.loading = false;
        },
        error: (err) => {
          console.error('API error:', err); // Log error details
          this.errorMessage = 'Failed to fetch shows.';
          this.shows = [];
          this.loading = false;
        }
      });
  }

  openShow(show: Show) {
    this.selectedShow = show;
  }

  closePopup() {
    this.selectedShow = null;
  }

  // Listen for ESC key to close popup
  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.selectedShow) {
      this.closePopup();
    }
  }
}
