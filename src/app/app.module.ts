import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/main/main.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { HeaderComponent } from './components/common/header/header.component';
import { OrderComponent } from './components/pages/order/order.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { CardComponent } from './components/pages/card/card.component';
import { ProductService } from './services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaxSymbolsPipe } from './pipes/max-symbols.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CatalogComponent,
    HeaderComponent,
    OrderComponent,
    FooterComponent,
    CardComponent,
    MaxSymbolsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
