import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Person } from './person';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

let person = new Person('John', 'Doe', 30);
let person2 = new Person();
console.log(`Full Name: ${person.FullName}`);
person.FirstName = 'Jane';
person.LastName = 'Smith'; 
console.log(`Full Name: ${person.FullName}`); // Output: Full Name: Jane Smith
console.log(`Is Adult: ${person.isAdult()}`); // Output: Is Adult: true