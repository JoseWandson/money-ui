import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    this.carregarToken();
  }

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    try {
      const response = await this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise();
      return this.armazenarToken(response.access_token);
    } catch (response) {
      if (response.status === 400 && response.error.error === 'invalid_grant') {
        return Promise.reject('Usuário ou senha inválida!');
      }
      return await Promise.reject(response);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  async obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = 'grant_type=refresh_token';

    try {
      const response = await this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise();
      this.armazenarToken(response.access_token);
      console.log('Novo access token criado!');
      return await Promise.resolve(null);
    } catch (response) {
      console.error('Erro ao renovar token,', response);
      return await Promise.resolve(null);
    }
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temQualquerPermissao(roles: string[]) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  async logout() {
    await this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
      .toPromise();
    return this.limparAccessToken();
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
