import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from './product';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {

  myForm: FormGroup;
  proName: AbstractControl;
  id: AbstractControl;
  products$: Observable<Product>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentPro: Product;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'proName': [''],
      'id': ['']
    });

    this.proName = this.myForm.controls['proName'];
    this.id = this.myForm.controls['id'];
  }

  ngOnInit(): void {
    this.products$ = <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
  }

  search() {
    if (this.id.value) {
      this.products$ =
        <Observable<Product>>this.httpClient.get(this.baseUrl + 'products/' +
          this.id.value);
    } else {
      this.products$ =
        <Observable<Product>>this.httpClient.get(this.baseUrl + 'products');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'product',
      this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            this.ngOnInit();
            alert('添加成功!');
          }
        }
      );
  }

  select(p:Product){
    this.currentPro = p;
    this.myForm.setValue(this.currentPro);
  }

  delete() {
    if (!this.currentPro) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'Product/' +
        this.currentPro.id).subscribe(
          (val: any) => {
            if (val.succ) {
              this.ngOnInit();
              alert('删除成功!');
            }
          }
        )
    }
  }

  update() {
    if (!this.currentPro) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'Product',
        this.myForm.value).subscribe(
          (val: any) => {
            if (val.succ) {
              this.ngOnInit();
              alert('修改成功!');
            }
          }
        )
    }
  }
}