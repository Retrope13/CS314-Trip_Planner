# Inspection Checklist for t21

The goal of an Inspection is to file defects.
This checklist is our guide to help us look for defects.
The checklist will be updated as we identify new faults in our code that we wish to prevent in future inspections.


### Data faults
* Are all program variables initialized before their values are used?
* Have all constants been named?
* Should the upper bound of arrays be equal to the size of the array or size-1?
* If character strings are used, is a delimiter explicitly assigned?
* Is there any possibility of a buffer overflow?
* Are any returned variables undefined?
* Are there any unnecessary imports?
* Are there any other terms that a user might use in the search bar?
* Are there multiple selection option for the user?

### Control faults
* For each conditional statement, is the condition correct?
* Is each loop certain to terminate?
* Are compound statements correctly bracketed?
* In case statements, are all possible cases accounted for?
* If a break is required after each case in case statements, has it been included?

### Parameter faults
* Are all input variables used?
* Are values assigned to all output variables before they are output?
* Can unexpected inputs cause corruption?

### Interface faults
* Do all functions and methods have the correct number of parameters?
* Do formal and actual parameter types match?
* Are the parameters in the right order?
* Do all components use a consistent model for shared memory structure?
* Are all the buttons working as intended?

### Storage faults
* If a linked structure is modified, have all links been correctly diagnosed?
* If dynamic storage is used, has space been allocated correctly?
* Is space explicitly deallocated after it is no longer required?

### Exception faults
* Have all possible error conditions been considered?
* Are there any functions using null as an argument?
* Does the code compile without warnings?

### Maintainability faults
* Code written should be self-explanatory.
* New code is in sync with existing code patterns/technologies.
* Is the DRY principle followed? The same code should not be repeated more than twice.
* Is code written with future use-cases in mind?
* Is the code testable?
* Is the code thoroughly tested, including edge cases?
* Could a function be broken into smaller pieces?

