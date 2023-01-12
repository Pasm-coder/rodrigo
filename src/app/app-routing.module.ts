import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories.component';
import { HomeComponent } from './home/home.component';
import { ManComponent } from './man/man.component';
import { ShoesComponent } from './shoes/shoes.component';
import { WomenComponent } from './women/women.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'mujer', component: WomenComponent},
  { path: 'hombre', component: ManComponent},
  { path: 'zapatos', component: ShoesComponent},
  { path: 'accesorios', component: AccessoriesComponent},
  { path: 'shopping', component: ShoppingComponent},
  { path: '', redirectTo: '/women', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
