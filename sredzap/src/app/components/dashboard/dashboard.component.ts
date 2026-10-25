import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ZapData, ZapService } from '../../services/zap.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  zapName = '';
  selectedTriggerApp = 'github';
  repoName = '';
  selectedActionApp = 'github';
  commentMessage = '';
  zaps:ZapData[] = [];

  constructor(private zapService: ZapService) {}
  
  ngOnInit(): void {
    this.zapService.getZaps().subscribe({
      next: (data: ZapData[]) => {
        this.zaps = data;
      },
      error: (error) => {
        console.error('Error loading Zaps:', error);
        alert('There was a problem loading your list of Zaps.');
      }
    });
  }

  saveZap() {
    const newZap: ZapData = {
      name: this.zapName,
      isActive: true,
      trigger: { app: this.selectedTriggerApp, event: 'pull_request_opened', repoName: this.repoName },
      action: { app: this.selectedActionApp, type: 'create_comment', message: this.commentMessage }
    };

    this.zapService.createZap(newZap).subscribe(() => {
      alert('Zap successfully created');
      this.zapService.getZaps().subscribe({
        next: (data: ZapData[]) => {
          this.zaps = data;
        },
        error: (error) => {
          console.error('Error loading Zaps:', error);
          alert('There was a problem loading your list of Zaps.');
        }
      });
    });
  }
}
