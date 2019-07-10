import { Ingredient } from './Ingredient.model';

export class Recipe {
    public name : string;
    public description : string;
    public imagePath : string;
    public author : string;
    public ingredients : Ingredient[];

    constructor(name : string, description : string, image : string, author: string, ingredients : Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = image;
        this.author = author;
        this.ingredients = ingredients;
    }
}