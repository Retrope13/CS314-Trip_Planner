# Sprint 3 - *21* - *Ctrl Alt Elite*
## Goal
### *For this sprint our goal is to implement several new features that will increase user satisfaction by adding distances, a save button, a load button, and a random locations button.*
## Sprint Leader: 
### *Sam McKay*
## Definition of Done
* The Increment release for `v3.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.
## Policies
### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).
### Clean Code
* Code Climate technical debt ratio less than 3.
* Minimize code smells and duplication.
### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.
* Code coverage is 70%
### Processes
* Incremental development.  No big bangs.
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.
## Planned Epics
**In Sprint 3 we are going to try and complete the 6 chosen epics which are currently divided into 44 tasks.**

	- Epic 1: Distances: The end goal is to have the distance of each leg of the trip provided to the user through the user interface.
	- Epic 2: Save Trip: We would like to give the user the ability to save the contents of their Itinerary to their device so they can load the same trip in other applications.
	- Epic 3: Random Places: If the user wants to explore the kinds of trips that our application supports we are going to provide a button that generates and appends random locations to the itinerary giving them places they might like to visit and showing that we support intercontinental travel.
	- Epic 4: Load Trip: When the user has previously planned a trip from another software, or from a previously saved session in our own application we want them to be able to load the contents of that trip, appending them to the itinerary and placing markers on the map at each of the locations
	- Epic 5: Trip Name: When the user wishes to change the title of their trip they can do so by clicking on an icon to the left of the trip title and typing in the preferred title.
	- Epic 6: Units: If the user wants to add a unit other than imperial or metric they can input the earth's radius in terms of their preferred unit. This will change the distances labels throughout the software to their unit.
## Metrics
| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *6* | *5* |
| Tasks |  *44*   | *42* | 
| Story Points |  *112*  | *110* | 
## Scrums
| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/4/21* | *#132, Choose file button* | *#133, Load file input menu* |  |
| *10/4/21* | *#133, Load file input menu* | *#136, Save button* |  |
| *10/6/21* | *#247, Distances return* | *#226, "To Start:" Distances column fix* |  |
| *10/6/21* | *#226, "To Start:" Distances column fix* | *#229, Change Unit selection* |  |
| *10/6/21* | *#229, Change Unit selection* | *#230, Add more units for shorter trips* |  |
| *10/6/21* | *#230, Add more units for shorter trips* | *#225, Distances return value* |  |
| *10/6/21* | *#225, Distances return value* | *#227, Resize table row for place* |  |
| *10/6/21* | *#136, Save button* | *#137, Save format menu* |  |
| *10/8/21* | *#137, Save format menu* | *#165, Create file download function* |  |
| *10/8/21* | *#165, Create file download function* | *#257, Planner tests* | *There were some issues with making the file a csv* |
| *10/8/21* | *#134, Read input* | *#135, Create trip from .json* |  |
| *10/8/21* | *#135, Create trip from .json* | *#185, Create transformers for load function* |  |
| *10/8/21* | *#185, Create transformers for load function* | *#184, Fix hover console error* |  |
| *10/8/21* | *#128, Create a random button* | *#141, Random button connection* |  |
| *10/8/21* | *#141, Random button connection* | *#183, Multiple selection* |  |
| *10/10/21* | *#227, Resize table row for place* | *#217, Distances request test java* |  |
| *10/10/21* | *#217, Distances request test java* | *#205, Distances append* |  |
| *10/10/21* | *#205, Distances append* | *#206, Update distances after remove all and remove at index* |  |
| *10/10/21* | *#184, Fix hover console error* | *#142, Update our features with distances* |  |
| *10/10/21* | *#142, Update our features with distances* | *#139, Make results close on add to trip* |  |
| *10/10/21* | *#139, Make results close on add to trip* | *#152, Fix results list placement with new button* |  |
| *10/10/21* | *#152, Fix results list placement with new button* | *#190, Validate loaded trip against tripFile schema* |  |
| *10/10/21* | *#190, Validate loaded trip against tripFile schema* | *#188, Create trip from .csv* | *Some issues with formatting* |
| *10/12/21* | *#159, Create a total distances label* | *#160, Create a distance title for every row in my trip table* |  |
| *10/12/21* | *#160, Create a distance title for every row in my trip table* | *#250, Add an Icon to trip name that's clickable* |  |
| *10/12/21* | *#206, Update distances after remove all and remove at index* | *#162, Connect distances label in rows to server side* |  |
| *10/12/21* | *#162, Connect distances label in rows to server side* | *#161, Connect total distances label to server side* |  |
| *10/12/21* | *#161, Connect total distances label to server side* | *#202, Format distance response* | |
| *10/12/21* | *#202, Format distance response* | *#195, Client distances request function* |  |
| *10/12/21* | *#195, Client distances request function* | *#181, Use local storage for user inputted data* |  |
| *10/12/21* | *#181, Use local storage for user inputted data* | *#180, Select what unit to use* |  |
| *10/16/21* | *#180, Select what unit to use* | *#179, Function to add/use new user created unit* |  |
| *10/16/21* | *#179, Function to add/use new user created unit* | *#178, Add variables for currently used unit and all available units* |  |
| *10/16/21* | *#178, Add variables for currently used unit and all variable units* | *#177, Add nautical miles and kilometers to list of default units* |  |
| *10/16/21* | *#177, Add nautical miles and kilometers* | *#143, Create state variable trip name with default "my trip"* |  |
| *10/16/21* | *#143, Create state variable trip name with default "my trip"* | *#144, Use tripName for title instead of "My Trip"* |  |
|  *10/16/21* | *#233, Load distances from file* | *#237, Load same file multiple times* |  |
|  *10/16/21* | *#237, Load same file multiple times* | *#238, Test findrequest.java* |  |
|  *10/18/21* | *#238, Test findrequest.java* | *#239, Test inputters.js* |  |
|  *10/18/21* | *#239, Test inputters.js* | *#240, Add csv load support* | *Figuring out mock response was a little tough* |
| *10/18/21* | *#240, Add csv load support* | *#259, Actions tests* |  |
| *10/18/21* | *#250, Add an icon to trip name that's clickable* |  |  |
| *10/18/21* | *#144, Use tripName for title instead of "My Trip"* | *#145, Make trip name editable* |  |
| *10/18/21* | *#145, Make trip name editable* |  |  |
| *10/18/21* | *#257, Planner tests* |  | *There were a lot of different kinds of functions to test* |
|*10/21/21*| *#183, Multiple Selection* | *#253, Search bar* | *There was some confusion on the best way to implement this* |
| *10/21/21* | *#253, Search bar* |  |  |
| *10/21/21* | *#259, Actions tests* | *#262, Return 400 bad request for type/where* |  |
| *10/21/21* | *#262, Return 400 bad request for type/where* | *#277, Return correct places from findRequest* |  |
| *10/21/21* | *#277, Return correct places from findRequest* |  |  |

## Review
### Epics completed
- Distances
- Save Trip
- Load Trip
- Trip Name
- Units
- Random Places

### Epics not completed 
-None

## Retrospective
### Things that went well
- Many of us felt very confident in the code we had to write and were familiar enough with the termonology to research the topics further.
### Things we need to improve
- Considering the number of failed pull requests we had this sprint we need to be much more mindful of what pull requests we accept and what pull requests we make.
### One thing we will change next time
- We will be changing the workload that we place on ourselves.
