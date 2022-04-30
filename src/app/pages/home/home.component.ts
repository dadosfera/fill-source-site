import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { startWith } from 'rxjs';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import {
  Credentials,
  SourceDatabaseKey,
} from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  deleting = false;

  allSources: SourceDatabaseKey[] = [];
  filteredSources: SourceDatabaseKey[] = [];

  expanded: number[] = [];

  searchControl = new FormControl('');

  constructor(
    public supabaseService: SupabaseService,
    private router: Router,
    private sources: SourcesService,
    private encryptService: EncryptService,
    private toastService: NbToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const { error, data } = await this.sources.get();

    if (error) {
      this.toastService.danger(error.message, error.code);
      this.loading = false;
      return;
    }

    this.allSources = [...data];

    if (this.searchControl.value) {
      this.filteredSources = this.filter(this.searchControl.value);
    } else {
      this.filteredSources = [...data];
    }

    this.loading = false;

    this.searchControl.valueChanges.pipe(startWith('')).subscribe((value) => {
      this.filteredSources = this.filter(value);
    });
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  toggleExpanded(id: number) {
    if (this.expanded.includes(id)) {
      this.expanded = this.expanded.filter((e) => e !== id);
      return;
    }

    this.expanded.push(id);
  }

  async deleteSource(id: number) {
    this.deleting = true;
    const { error } = await this.sources.delete(id);

    if (error) {
      this.toastService.danger(error.message, error.code);
      this.deleting = false;
      return;
    }

    this.allSources = this.allSources.filter((source) => source.id !== id);
    this.filteredSources = this.filteredSources.filter(
      (source) => source.id !== id
    );
    this.deleting = false;
    this.toastService.success('Foi deletado com sucesso!', 'Source removido!');
  }

  async sendMessage(credentials: string) {
    const decrypted: Credentials = await this.encryptService.decrypt(
      credentials
    );

    chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
      if (id) {
        this.toastService.info(
          'Os inputs encontrados serão preenchidos',
          'Processando...',
          {
            duration: 3000,
          }
        );
      }
      this.fillSources(id as number, decrypted);
    });
  }

  fillSources(tabId: number, fillCredentials: any) {
    return chrome.scripting.executeScript({
      target: { tabId },
      func: (credentials) => {
        if (credentials) {
          const KEY_TO_ID = {
            jdbc_user: 'jdbc-user-fill',
            jdbc_password: 'jdbc-password-fill',
            database: 'database-fill',
            schema: 'schema-fill',
            endpoint: 'endpoint-fill',
            port: 'port-fill',
          } as any;

          Object.entries(credentials).forEach(([key, value]) => {
            if (KEY_TO_ID[key]) {
              const input = document.getElementById(
                KEY_TO_ID[key]
              ) as HTMLInputElement;
              if (input) {
                const backgroundColor = input.style.backgroundColor;
                const transition = input.style.transition;
                input.style.backgroundColor = '#7CFC0040';
                input.value = value as string;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.style.transition = 'all 1s';
                setTimeout(() => {
                  input.style.backgroundColor = backgroundColor;
                  input.style.transition = transition;
                }, 400);
              }
            }
          });
        }
      },
      args: [fillCredentials],
    });
  }

  private filter(value: string): SourceDatabaseKey[] {
    return this.allSources.filter(
      (source) =>
        source.name.toLowerCase().includes(value.toLowerCase()) ||
        source.plugin.includes(value.toLowerCase())
    );
  }
}
