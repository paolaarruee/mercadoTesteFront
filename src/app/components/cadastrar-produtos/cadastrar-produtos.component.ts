import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Produtos } from 'src/app/shared/interfaces/produtos';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.scss'],
})
export class CadastrarProdutosComponent {
  produtoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutosService,
    private toastService: ToastService
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.produtoForm.valid) {
      const produtoData: Produtos = this.produtoForm.value;
      this.produtoService.createProduto(produtoData).subscribe(
        (response) => {
          console.log(
            this.toastService.showMessage('Produto criado com sucesso:'),
            response
          );
        },
        (error) => {
          console.error(
            this.toastService.showMessage('Erro ao criar produto:'),
            error
          );
        }
      );
    } else {
      console.error(this.toastService.showMessage('Formulário inválido'));
    }
  }
}
