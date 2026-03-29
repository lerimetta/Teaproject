import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  private observebal: Observable<string>;
  images: string[] = ['assets/images/banner1.png', 'assets/images/banner2.png', 'assets/images/banner3.png'];
  constructor(private modalService: NgbModal, private router: Router,) {
    this.observebal = new Observable((observer) => {
      const timeout = setTimeout(() => {
        observer.next();
        this.modalService.open(this.popup, {});
      }, 10000);
      return {
        unsubscribe() {
          clearTimeout(timeout);
        },
      }
    })
  }
  @ViewChild('popup')
  popup!: TemplateRef<ElementRef>;

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.observebal.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  checkPage() {
    const modalRef = this.modalService.open(this.popup);
    modalRef.close();
    this.router.navigate(['/catalog']);
  }

}
