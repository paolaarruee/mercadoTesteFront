import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProdutosComponent } from './components/lista-produtos/lista-produtos.component';
import { CadastrarProdutosComponent } from './components/cadastrar-produtos/cadastrar-produtos.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'lista', component: ListaProdutosComponent },
  {
    path: 'cadastrar',
    component: CadastrarProdutosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
