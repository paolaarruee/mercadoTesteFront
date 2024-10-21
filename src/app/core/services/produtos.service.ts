import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Produtos } from 'src/app/shared/interfaces/produtos';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<ProdutosResponse> {
    return this.http.get<ProdutosResponse>(`${this.baseUrl}produtos/listar`);
  }

  createProduto(produtoData: Produtos): Observable<Produtos> {
    return this.http.post<Produtos>(
      `${this.baseUrl}produtos/cadastrar`,
      produtoData
    );
  }

  updateProduto(
    dados: Produtos
  ): Observable<Produtos> {
    return this.http.put<Produtos>(
      `${this.baseUrl}produtos/atualizar`,
      dados
    );
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}produtos/excluir/${id}`);
  }
}

export interface ProdutosResponse {
  content: Produtos[];
  totalElements: number;
}
