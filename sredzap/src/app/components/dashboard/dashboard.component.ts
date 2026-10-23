import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ZapData, ZapService } from '../../services/zap.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  zapName = '';
  selectedTriggerApp = 'github';
  repoName = '';
  selectedActionApp = 'github';
  commentMessage = '';

  constructor(private zapService: ZapService) {}

  saveZap() {
    const newZap: ZapData = {
      name: this.zapName,
      isActive: true,
      trigger: { app: this.selectedTriggerApp, event: 'pull_request_opened', repoName: this.repoName },
      action: { app: this.selectedActionApp, type: 'create_comment', message: this.commentMessage }
    };

    this.zapService.createZap(newZap).subscribe(() => {
      alert('Zap creado exitosamente');
    });
  }
}
