import axios from 'axios';
import {key} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }
   
   
    async getResults(){
        // food to fork API 2a64b1b3f273749e77d01f4bdd38628c
        // https://www.food2fork.com/api/search
        try{       
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}/`);
            // console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
        }catch (error){
            alert(error);       
        }    
    }
}