import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'app-hello-user',
  templateUrl: './hello-user.component.html',
  styleUrls: ['./hello-user.component.scss'],
})
export class HelloUserComponent implements OnInit {
  userName: string | undefined = '';

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    const user = this.supabaseService.getUser();
    if (user && user.email) {
      this.userName = user?.email?.split('.')[0];
    }
  }
}
