import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeService {
        recipesChanged=new Subject<Recipe[]>();
    recipeSeleced=new EventEmitter<Recipe>();
    // private recipes:Recipe[]=[
    //     new Recipe('A Test Recipe',
    //     'This is a simple test',
    //     'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
    //     [
    //         new Ingredient('Meat',1),
    //         new Ingredient('Fries',10)
    //     ]),
    //     new Recipe('Second Test Recipe'
    //     ,'dummy text here!',
    //     'https://www.acouplecooks.com/wp-content/uploads/2019/11/Recipes-Header-1-800x400.jpg',
    //     [
    //         new Ingredient('Buns',2),
    //         new Ingredient('Meat',1)
    //     ])
    //   ];
    private recipes:Recipe[]=[];
      constructor(private slService:ShoppingListService){}

getRecipes(){
    return this.recipes.slice(); //slice return a new array (copy)

}

setRecipe(recipes: Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());

}

getRecipe(index:number){
return this.recipes.slice()[index];
}
addIngredientsToShoppingList(ingredients: Ingredient[]){
            this.slService.addIngredients(ingredients);

}
addRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.recipesChanged.next(this.recipes.slice())
}
updateRecipe(index: number, newRecipe:Recipe){
this.recipes[index]=newRecipe;
this.recipesChanged.next(this.recipes.slice())
}
deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
}
}