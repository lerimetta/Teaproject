import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { OrderType } from 'src/app/types/order.type';


@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orderForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яА-Я]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^\\+?\\d{11}$')]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: ['',],
    address: ['', Validators.pattern('^[0-9а-яА-Я\\s\\/-]+$')],
    comment: [''],

  })

  get name() {
    return this.orderForm.get('name');
  }
  get lastName() {
    return this.orderForm.get('last_name');
  }
  get phone() {
    return this.orderForm.get('phone');
  }
  get country() {
    return this.orderForm.get('country');
  }
  get zip() {
    return this.orderForm.get('zip');
  }
  get address() {
    return this.orderForm.get('address');
  }

  isValid = false;
  messageError = false;
  good = this.cartService.product;

  constructor(private productService: ProductService, private cartService: CartService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.orderForm.patchValue({
      product: this.cartService.product
    })
    console.log(this.cartService.product);
    console.log(this.good);
  }

  private subscriptionOrder: Subscription | null = null;
  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }
  createOrder() {
    this.subscriptionOrder = this.productService.createOrder(this.orderForm.value as OrderType)
      .subscribe(response => {
        if (response.success && !response.message) {
          this.isValid = true;
        } else {
          this.messageError = true;
          console.log(response.message);
        }
      })
    // this.orderForm.reset();
  }
}
