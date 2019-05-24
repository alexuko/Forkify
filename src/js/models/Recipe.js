import axios from 'axios';
import {key} from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;            
            // console.log(res);

        } catch(e) {
            console.log(e);
            alert(`something went wrong :(`);

        }
    }

    calCookingTime(){
        // We assume that it takes 15min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitLong = ['tablespoons', 'tablespoon','ounce','ounces','teaspoons','teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp','oz','oz','tsp','tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1.- Uniform Units 
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2.- remove parenthesis
            ingredient = ingredient.replace(/(\[.*?\])/g, '');

            // 3.- Parse ingredients into count, unit and ingredient 
            return ingredient;


        });
        this.ingredients = newIngredients;
    }

} 