class Vehicle {
    constructor(public color: string){}
    protected honk(): void {
        console.log('beep')
    }
}


const vehicle = new Vehicle('orange');
console.log(vehicle.color);


class Car extends Vehicle {
    //Note* adding "public" before color will localize the color variable 
    constructor(public wheels: number, color:string){
        //initializes the variable in the parent class
        super(color);
    }
    private drive(): void {
        console.log('vrom')
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const car = new Car(4,'red');
car.startDrivingProcess()

