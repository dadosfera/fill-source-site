import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@beast/theme';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import { Credentials } from 'src/app/services/sources/source.model';

@Component({
  selector: 'app-credentials-view',
  templateUrl: './credentials-view.component.html',
  styleUrls: ['./credentials-view.component.scss'],
})
export class CredentialsViewComponent implements OnInit {
  @Input()
  credentials: string;

  loading = true;
  data: Credentials | null = null;
  entries: [string, any[]][] = [];

  constructor(
    private encryptService: EncryptService,
    private toastService: NbToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      if (this.credentials) {
        this.loading = true;
        const decrypted = await this.encryptService.decrypt(this.credentials);
        this.data = decrypted;
        this.entries = Object.entries(this.data || {});
      }
    } catch (error) {
      this.toastService.danger('Ocorreu um erro ao ler as credenciais', 'Ops!');
    } finally {
      this.loading = false;
    }
  }
}
