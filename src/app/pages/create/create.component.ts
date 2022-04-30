import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@beast/theme';
import { EncryptService } from 'src/app/services/encrypt/encrypt.service';
import { SourceDatabase } from 'src/app/services/sources/source.model';
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
    private sourcesService: SourcesService,
    private toastService: NbToastrService
  ) {}

  goBack() {
    this.router.navigate(['/home']);
  }

  async onSubmit() {
    this.savingSource = true;
    const credentials = this.form.get('credentials')?.value;
    const encrypt = await this.encryptService.encrypt(credentials);

    const formValue: SourceDatabase = {
      ...this.form.value,
      credentials: encrypt,
    };

    const { error } = await this.sourcesService.store(formValue);

    if (error) {
      this.toastService.danger(error.message, error.code);
      this.savingSource = false;
      return;
    }

    this.savingSource = false;
    this.toastService.success('Salvo com sucesso!', 'Salvo!');
    this.form.reset();
    this.goBack();
  }
}
