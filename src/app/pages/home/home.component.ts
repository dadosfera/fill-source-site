import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SourceFirebaseKey } from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = true;

  allSources: SourceFirebaseKey[] = [];

  sourcesSubscription: Subscription;

  expanded: string[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private sources: SourcesService,
    private toastService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sourcesSubscription = this.sources.get().subscribe({
      next: (values) => {
        this.allSources = values.map((val) => {
          const obj = {
            ...val.payload.val(),
            key: val.key,
          } as SourceFirebaseKey;
          return obj;
        });
        this.loading = false;
      },
      error: () => {
        this.toastService.danger('Ocorreu um erro ao carregar', 'Ops!');
        this.loading = false;
      },
    });
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  toggleExpanded(key: string) {
    if (this.expanded.includes(key)) {
      this.expanded = this.expanded.filter((e) => e !== key);
      return;
    }

    this.expanded.push(key);
  }

  deleteSource(key: string) {
    this.sources.delete(key);
  }

  ngOnDestroy(): void {
    if (this.sourcesSubscription) {
      this.sourcesSubscription.unsubscribe();
    }
  }
}
