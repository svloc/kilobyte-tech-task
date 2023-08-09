import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: any = '';
  ngOnInit(): void {
    this.viewAll();
  }
  constructor(private clientService: ClientService) {}
  viewAll(): void {
    this.clientService.viewAll().subscribe(
      (res) => {
        this.clients = res.records;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
