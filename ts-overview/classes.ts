class Vehicle {
    drive(): void {
        console.log('chugga chugga')
    }
    honk(): void {
        console.log('beep')
    }
}

//override drive method
class Car extends Vehicle {
    drive(): void {
        console.log('vrom')
    }
}

const car = new Car();
car.drive()
car.honk()