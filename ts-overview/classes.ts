class Vehicle {
    // public drive(): void {
    //     console.log('chugga chugga')
    // }
    protected honk(): void {
        console.log('beep')
    }
}

//override drive method
class Car extends Vehicle {
    private drive(): void {
        console.log('vrom')
    }

    startDrivingProcess(): void {
        this.drive();
        this.honk();
    }
}

const car = new Car();
car.startDrivingProcess()
// car.honk()
