import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SourceFirebaseKey } from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;

  allSources: SourceFirebaseKey[] = [];

  constructor(
    public auth: AuthService,
    private router: Router,
    private sources: SourcesService,
    private toastService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sources.get().subscribe({
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
}
