class Hero {
    constructor({id,name,age,power}){
        this.id = Number(''+Date.now()+Math.floor(Math.random() * 100));
        this.name = name;
        this.age = age;
        this.power = power;
    }

    isValid() {
        const propertyNames = Object.getOwnPropertyNames(this);
        const amountInvalid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing`)
            .filter(item => !!item)
        return {
            valid: amountInvalid.length === 0,
            error: amountInvalid
        }
    }
}

module.exports = Hero

// const hero = new Hero({nome:'Chapolin',age:45,power:'SuperForce'})
// console.log(hero.isValid(),hero);