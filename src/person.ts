export class Person {
  constructor(
    private firstName: string = '',
    private lastName: string = '',
    private age: number = 0
  ) {}

  get FullName(): string {
    return this.firstName.concat(' ', this.lastName);
  }

  set FirstName(firstName: string) {
    this.firstName = firstName;
  }

  set LastName(lastName: string) {
    this.lastName = lastName;
  }

  get FirstName(): string{
    return this.firstName;
  }
  
  set Age(age: number) {
    this.age = age;
  }

  isAdult(): boolean {
    return this.age >= 18;
  }
}
