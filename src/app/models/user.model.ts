export class User {
    constructor(public email, public id : string, private _token : string, private expDateToken : Date) {

    }

    get token(){
        if(this.expDateToken < new Date()){
            return null;
        }
        return this._token;
    }
}