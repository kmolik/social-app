import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../authentication/services/token-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
