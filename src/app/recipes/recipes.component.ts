import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes:Recipe[];
selectedRecipe:Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes=this.recipeService.getRecipes();
    this.recipeService.recipeSeleced.subscribe(
    (recipe:Recipe) => {this.selectedRecipe=recipe;}
    );
  }

}
