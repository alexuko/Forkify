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
        const unitLong = ['tablespoons', 'tablespoon','ounces','ounce','teaspoons','teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp','oz','oz','tsp','tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg','g'];

        const newIngredients = this.ingredients.map(el => {
            // 1.- Uniform Units 
            let ingredient = el.toLowerCase();
            unitLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2.- remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3.- Parse ingredients into count, unit and ingredient 
            const arrIngr = ingredient.split(' ');// e.g. ['1/4', 'cup', 'olive', 'oil']
            const unitIdx = arrIngr.findIndex(el2 => units.includes(el2));// this will return the index position if any of the elements of 'unitShort' is in 'arrIngr' and return the indexPosition
            let objIngr;
            if(unitIdx > -1){
                //there is a unit 
                // e.g-1. 2 1/2 cups, arrCount = ['2', '1/2'] --> eval("2+1/2") --> 2.5
                // e.g-2. 2 cups, arrCount = ['2']
                const arrCount = arrIngr.slice(0, unitIdx);

                let count;
                if(arrCount.length === 1){
                    count = eval(arrIngr[0].replace('-','+'));
                }else{
                    count = eval(arrIngr.slice(0, unitIdx).join('+'));
                };

                objIngr = {
                    count,
                    unit: arrIngr[unitIdx],
                    ingredient: arrIngr.slice(unitIdx + 1).join(' ')
                }
             
            }else if(parseInt(arrIngr[0], 10)){
                //There is NO unit, but the first element is a number 
                objIngr = {
                    count: parseInt(arrIngr[0], 10),
                    unit: '',
                    ingredient: arrIngr.slice(1).join(' ')
                }
            } else if(unitIdx === -1){
                //there is NO unit
                objIngr = {
                    count: 1,
                    unit:'',
                    ingredient
                }
            }


            return objIngr;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //servings
        const newServings = type === 'dec' ? this.servings - 1 :  this.servings + 1;
        //ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        })
        this.servings = newServings;
    }

} 