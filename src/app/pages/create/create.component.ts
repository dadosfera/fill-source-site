import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import { SourceFirebase } from 'src/app/services/sources/source.model';
import { SourcesService } from 'src/app/services/sources/sources.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  savingSource = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    plugin: new FormControl('mysql', [Validators.required]),
    credentials: new FormGroup({
      database: new FormControl('', [Validators.required]),
      endpoint: new FormControl('', [Validators.required]),
      port: new FormControl(null, [Validators.required, Validators.min(0)]),
      jdbc_user: new FormControl('', [Validators.required]),
      jdbc_password: new FormControl(''),
      schema: new FormControl('', [Validators.required]),
    }),
  });

  constructor(
    private router: Router,
    private encryptService: EncryptService,
    private auth: AuthService,
    private sourcesService: SourcesService,
    private toastService: NbToastrService
  ) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  async onSubmit() {
    try {
      this.savingSource = true;
      const credentials = this.form.get('credentials')?.value;
      const encrypt = this.encryptService.encrypt(credentials);

      const formValue: SourceFirebase = {
        ...this.form.value,
        credentials: encrypt,
        favorited: false,
        uid: this.auth.user?.uid,
      };

      await this.sourcesService.store(formValue);

      this.toastService.success('Salvo com sucesso!', 'Salvo!');
      this.form.reset();
      this.goBack();
    } catch (error) {
      this.toastService.danger('Ocorreu um erro ao salvar o dado!', 'Ops!');
    } finally {
      this.savingSource = false;
    }
  }
}
