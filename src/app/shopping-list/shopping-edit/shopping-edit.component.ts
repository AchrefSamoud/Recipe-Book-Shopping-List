import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;
//  @ViewChild('nameInput',{static:false}) nameInputRef: ElementRef;
//  @ViewChild('amountInput',{static:false}) amountInputRef: ElementRef;
  constructor(private slService:ShoppingListService) { }
  

  ngOnInit(): void {
    this.subscription=this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        }
        )

    });
  }
onSubmit(form:NgForm){
  // const ingName=this.nameInputRef.nativeElement.value;
  // const ingAmount=this.amountInputRef.nativeElement.value;
  const value=form.value;
  const newIngredient=new Ingredient(value.name,value.amount);
  if(this.editMode){
    this.slService.updateIngredient(this.editedItemIndex,newIngredient)
  }else{
    this.slService.addIngredient(newIngredient);

  }
  this.editMode=false;
  form.reset();

}
  ngOnDestroy(){
    this.subscription.unsubscribe; //to prevent memory leak
  }
  onClear(){
    this.slForm.reset()
    this.editMode=false;
  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }
}
