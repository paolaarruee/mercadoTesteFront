import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { LoginService } from 'src/app/core/services/login.service';
import { ProdutosService } from 'src/app/core/services/produtos.service';
import { ToastService } from 'src/app/core/services/toast.service';
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
  totalItems: number = 0;

  constructor(
    private produtoService: ProdutosService,
    private loginService: LoginService,
    private toastService: ToastService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(page: number = 0): void {
    this.produtoService.getProdutos(page).subscribe(
      (data) => {
        this.dataSource.data = data.content;
        this.totalItems = data.totalElements;
      },
      (error) => {
        this.toastService.showMessage('Erro ao buscar produtos', error);
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
      this.toastService.showMessage(
        'Por favor, preencha todos os campos obrigatórios: Tipo, Nome, Valor e Estoque.'
      );
      return;
    }

    this.produtoService.updateProduto(produto).subscribe(
      () => {
        this.toastService.showMessage('Produto atualizado com sucesso!');
        this.getProdutos();
      },
      (error) => {
        this.toastService.showMessage('Erro ao atualizar produto', error);
      }
    );
  }

  cancelEdit() {
    this.getProdutos();
    this.editingProductId = null;
  }

  deleteProduct(produto: Produtos) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: `Tem certeza que deseja excluir o produto ${produto.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.produtoService.deleteProduto(produto.id).subscribe(() => {
          this.getProdutos();
          this.toastService.showMessage('Produto excluído com sucesso!');
        });
      }
    });
  }

  public get isAuthenticated(): boolean {
    return this.loginService.isAuthenticated;
  }

  onPageChange(event: PageEvent): void {
    this.getProdutos(event.pageIndex);
  }
}
