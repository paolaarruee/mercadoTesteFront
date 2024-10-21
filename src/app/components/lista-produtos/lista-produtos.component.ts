import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/core/services/login.service';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { Produtos } from 'src/app/shared/interfaces/produtos';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss'],
})
export class ListaProdutosComponent {
  pautasAtivas: Produtos[] = [];
  dataSource = new MatTableDataSource<Produtos>();
  editingProductId: number | null = null;
  originalProduct: Produtos | null = null;
  displayedColumns: string[] = [
    'id',
    'type',
    'name',
    'currency',
    'estoque',
    'actions',
  ];

  constructor(private produtoService: ProdutosService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.produtoService.getProdutos().subscribe(
      (data) => {
        this.dataSource.data = data.content;
      },
      (error) => {
        console.error('Erro ao buscar produtos', error);
      }
    );
  }

  startEdit(productId: number) {
    const productToEdit = this.dataSource.data.find((p) => p.id === productId);
    if (productToEdit) {
      this.originalProduct = { ...productToEdit };
    }
    this.editingProductId = productId;
  }

  saveEdit(produto: Produtos) {
    if (
      !produto.tipo ||
      !produto.nome ||
      produto.valor == null ||
      produto.estoque == null
    ) {
      alert(
        'Por favor, preencha todos os campos obrigatórios: Tipo, Nome, Valor e Estoque.'
      );
      return;
    }

    this.produtoService.updateProduto(produto).subscribe(
      () => {
        this.getProdutos();
      },
      (error) => {
        console.error('Erro ao atualizar produto', error);
        alert('Erro ao atualizar o produto. Tente novamente.');
      }
    );
  }
  cancelEdit() {
    this.getProdutos();
    this.editingProductId = null;
  }

  deleteProduct(produto: Produtos) {
    if (confirm(`Tem certeza que deseja excluir o produto ${produto.nome}?`)) {
      this.produtoService.deleteProduto(produto.id).subscribe(() => {
        this.getProdutos();
      });
    }
  }

  public get isAuthenticated(): boolean {
    return this.loginService.isAuthenticated;
  }
}
