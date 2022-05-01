import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbToastrService } from '@beast/theme';
import { fillSources } from 'src/app/helpers/fillSources';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import {
  Credentials,
  SourceDatabaseKey,
} from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';

@Component({
  selector: 'app-source-list-item',
  templateUrl: './source-list-item.component.html',
  styleUrls: ['./source-list-item.component.scss'],
})
export class SourceListItemComponent {
  @Input()
  item: SourceDatabaseKey;

  expanded: boolean = false;
  deleting: boolean = false;

  @Output()
  sourceDeleted = new EventEmitter<number>();

  constructor(
    private sourcesServices: SourcesService,
    private toastService: NbToastrService,
    private encryptService: EncryptService
  ) {}

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  async deleteSource() {
    this.deleting = true;
    const { error } = await this.sourcesServices.delete(this.item.id);

    if (error) {
      this.toastService.danger(error.message, error.code);
      this.deleting = false;
      return;
    }

    this.sourceDeleted.emit(this.item.id);
    this.deleting = false;
  }

  async sendMessage() {
    const decrypted: Credentials = await this.encryptService.decrypt(
      this.item.credentials
    );

    if (decrypted) {
      chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
        if (id) {
          this.toastService.info(
            'Inputs encontrados serão preenchidos',
            'Processando...',
            {
              duration: 3000,
            }
          );
        }
        fillSources(id as number, decrypted);
      });
    }
  }
}
