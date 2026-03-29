import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductType } from 'src/app/types/product.type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  product: ProductType;
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: ''
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productService.getProduct(+params['id'])
        .subscribe({
          next: (data) => {
            this.product = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
        )
    })
  }

  addToCart(title: string): void {
    this.router.navigate(['/order'], { queryParams: { product: title } });
  }
}
