class Vehicle {
    // color: string;
    constructor(public color: string){
        // this.color = color;
    }
    protected honk(): void {
        console.log('beep')
    }
}


const vehicle = new Vehicle('orange');
console.log(vehicle.color);


// //override drive method
// class Car extends Vehicle {
//     private drive(): void {
//         console.log('vrom')
//     }

//     startDrivingProcess(): void {
//         this.drive();
//         this.honk();
//     }
// }

// const car = new Car();
// car.startDrivingProcess()

