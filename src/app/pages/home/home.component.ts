import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { startWith } from 'rxjs';
import { SourceDatabaseKey } from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;

  allSources: SourceDatabaseKey[] = [];
  filteredSources: SourceDatabaseKey[] = [];

  searchControl = new FormControl('');

  constructor(
    public supabaseService: SupabaseService,
    private router: Router,
    private sources: SourcesService,
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

  onDeletedSource(id: number) {
    this.allSources = this.allSources.filter((source) => source.id !== id);
    this.filteredSources = this.filteredSources.filter(
      (source) => source.id !== id
    );

    this.toastService.success('Foi removido com sucesso!', 'Item removido!');
  }

  private filter(value: string): SourceDatabaseKey[] {
    return this.allSources.filter(
      (source) =>
        source.name.toLowerCase().includes(value.toLowerCase()) ||
        source.plugin.includes(value.toLowerCase())
    );
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }
}
