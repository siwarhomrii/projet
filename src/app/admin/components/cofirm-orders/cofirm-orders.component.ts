import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cofirm-orders',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './cofirm-orders.component.html',
  styleUrl: './cofirm-orders.component.css'
})
export class CofirmOrdersComponent implements OnInit {
  orders!: Order[];
  private readonly orderService: OrderService = inject(OrderService);
  ngOnInit(): void {
      this.orderService.getOrders().subscribe(
        data=>{
          this.orders=data
        }
      )
  }
}
