import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { LoginComponent } from './user/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ListaProdutosComponent,
    CadastrarProdutosComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  exports: [ListaProdutosComponent, CadastrarProdutosComponent, LoginComponent],
})
export class ComponentsModule {}
