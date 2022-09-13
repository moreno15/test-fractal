import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    SettingComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [ ],
  providers: [  ]
})
export class SharedModule { }

