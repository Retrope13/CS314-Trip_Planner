# Sprint 2 - *T21* - *Ctrl Alt Elite*

## Goal
### *Find places to go.*

## Sprint Leader: 
### *Ojaswi Sinha*

## Definition of Done

* The Increment release for `v2.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A.
* Minimize code smells and duplication.

### Test Driven Development
* Write the tests before the code.
* Unit tests are fully automated.

### Processes
* Main is never broken. 
* All pull request builds and tests for Main are successful.
* All dependencies managed using Maven, npm, and WebPack.
* GitHub etiquette is followed always.


## Planned Epics
**In Sprint 2 we are going to try and complete 5 epics which are then divided into 11 tasks to make a problem solving easier and provide a good user experience.**

- Epic 1: Find places: The idea here is to provide users with an option of entering keywords in a search bar and then adding the locations to their trip and simultaneously show any similar places related to the keyword.
- Epic 2: Interoperability: The user should not face any delays of information from the server, therefore, making sure that the client side can access the information from different servers on black-bottle without any connectivity issues.
- Epic 3: Where is?: This will make sure that if the user enters some coordinates the corresponding place will appear on the map after validating the format and providing details and options to add the location to the trip.
- Epic 4: Where am I?: Making sure that user gets their current location rather than the default CSU Oval location.
- Epic 5: Highlight Place: This will make sure that the selected place from the trip list is highlighted and is marked on the map.
- The first 2 tasks deal with Epic 1, this epic adds a search bar and makes sure we get the matching place along with some other details. The next 2 tasks deal with Epic 2, which checks that a different server can be used with the new features and checks that those features are available in the server.The next 4 tasks comes under Epic 3 where we validate and search coordinate location and then center it aound valid coordinates and then add it to the trip list. The 2 tasks that come after are under Epic 4 where the user can see their pinned geolocation on the map. The last task deals with Highlighting (epic 5) the marker on the map, this happens when a location is selected from the trip list.
- More tasks might be added in the future depending on the complexity of an Epic.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *5* |
| Tasks |  *11*   | *25* | 
| Story Points |  *20*  | *34* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *9/22/2021* | *Task#70-Highlight a specific point. | *Task85,Task 86* | *None* | 
| *9/24/2021* | *Task#85-Update the server to support find request,Task#86-Add find to the features. | *Task#73,Task#74,Task#90* | *None* | 
| *9/25/2021* | *Task#73-Change to different server and list available features,Task#74-Verify necessary features are available,Task#90-Create a new Searchbar,Task#76-Get geolocation,Task#77-make home buttonset a pin at geolocation. | *Task#79,Task#80,Task#81, ...* | *Figuring out how to connect the search bar to the database. |


## Review

### Epics completed
- The Team completed the first 5 epics  i.e: Find Place, Highlight Place, Where am I?, Where is? and Interoperability.

### Epics not completed
- None

## Retrospective

### Things that went well
- We were able to complete all our epics. Some where easy while some where little complicated and needed some more knowledge but with everyone's help everything went well.
### Things we need to improve
- Understand the complexity of the epic and divided into small tasks which don't take more than a day or two.
- Make sure we have daily scrum as much as possible and know the status of everyone so that we can help and guide each other in the right direction.

### One thing we will change next time
- Number of tasks for the epics will defininately be more to reduce the complexity.
