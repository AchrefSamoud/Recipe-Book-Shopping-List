import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http:HttpClient, private recipeService: RecipeService){}

    StoreDate(){

        const recipes=this.recipeService.getRecipes();
        this.http.put('https://example-a5e70.firebaseio.com/recipes.json',recipes).subscribe(
            response => {
                console.log(response);
            }
        );


    }


    FetchData(){
        this.http.get<Recipe[]>('https://example-a5e70.firebaseio.com/recipes.json').subscribe(
             recipes=> {this.recipeService.setRecipe(recipes);}
            
        )
    }


}