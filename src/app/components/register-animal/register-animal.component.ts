import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryServicesService } from 'src/app/services/category-services.service';
import { ProductServicesService } from 'src/app/services/product-services.service';

@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']
})
export class RegisterAnimalComponent implements OnInit {

  imgSrc: string | ArrayBuffer | null = '';
  productData:any;
  cats:any;
  userFile:any;
  constructor(private catServ:CategoryServicesService,private router:Router,private prodServ:ProductServicesService) { }

  ngOnInit(): void {
    //getting the all available category from backend
    this.catServ.getAllCat().subscribe(res=>{
      this.cats=res;
     console.log(this.cats);
    },
    
    //if any erro comes while fetching the catefory details show the msg
    err=>{
      console.log("Error while fetching the categories : "+err);
      }
    )

  }

  //method for getting the selected image
  onSelectedFile(event:any){
    const file=event.target.files[0];
    this.userFile=file;
    console.log(this.userFile);


    //for showing the image on img tag when selected
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  //method for saving the product details in the backend
  submit(addNewProd){
    this.productData=addNewProd.value
       //setting the image name
    this.productData.img_name=this.userFile.name
    const formData=new FormData();
    formData.append("product",JSON.stringify(this.productData));
    formData.append("file",this.userFile);
  
    console.log("form data before submitting : ",formData);  
    
    //calling the service method
    this.prodServ.saveProduct(formData).subscribe(res=>{
      alert("New Product details saved successfully");
      console.log("product details saved ");
    },
    
    err=>{
      if(err.status==500)
      alert("Please select the image of size greater than 5 kb and less than 1 mb")
      console.log("Error while saving the products",err.status);
    }
    );
     }

}
