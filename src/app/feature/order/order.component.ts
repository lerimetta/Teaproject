import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
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

  isValid: boolean = false;
  messageError: boolean = false;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.orderForm.patchValue({
          product: params['product']
        })
      }
    })
  }

  private subscriptionOrder: Subscription | null = null;
  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }
  createOrder(): void {
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
