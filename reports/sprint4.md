# Sprint 4 - *t21* - *Ctrl Alt Elite*

## Goal
### *Shorter tours!*

## Sprint Leader: 
### *Ernest Duckworth*

## Definition of Done

* The Increment release for `v4.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
* The design document (`design.md`) is updated.
* The sprint document (`sprint.md`) is updated with scrums, completed metrics, review, and retrospective.

## Policies

### Mobile First Design
* Design for mobile, tablet, laptop, desktop in that order.
* Use ReactStrap for a consistent user experience (no HTML, CSS, style, etc.).

### Clean Code
* Code Climate maintainability of A (technical debt ratio==0).
* Minimize code smells and duplication.
* Use Single Responsibility Principle.

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
**For Sprint 4 we are going to try and Complete the following epics**
1. *Shorter Distances*
    - In this epic our goal is to provide the user with the shortest trip possible for their planned trip. The user should be able to preview their trip on the map. After previewing their new optimized map they should be able to choose if they want to use that trip or the one they had previously created. This is going to be done through TourRequest.java 
2. *User Experience*
    - In this epic our goal is to update our user interface based off of customer input. We each will be having someone examine our websites and give us feedback. Based on their feedbac we are going to modify the layout/design of our website to best match the user feedback. We are going to space out the people that we test on so that they each don't get to experience the same code. 
3. *Modify Trip*
    - In this epic our goal is to allow the users to be able to reorganize their trip. We want the user to be able to drag and drop their places to anywhere in the list. The ability to reorganize the list should be clear and obvious we want to have a graphic design of the elements actually moving with the cursor across the screen as they are dragged. 
4. *Types*
    - In this epic our goal is to allow the users to be able to search for places by type(airport, heliport, etc). Tied with the *Country* epic we are going to make a menu for the user that will refine the find results. If Types is enabled it will only return matches with that type. If Country is also enabled it should only return places within that Country and of that type. 
5. *Country*
    - In this epic our goal is to allow the users to be able to search for places by country. Tied with the *type* epic we are going to make a menu for the user that will refine the find results. If country is enabled it will only return matches with that Country. If type is also enabled it should only return places within that Country and of that type. 




## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *5* |
| Tasks |  *66*   | *66* | 
| Story Points |  *110*  | *110* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *10/27/2021* | *#308, Create Button in each table row that calls removeAtIndex()* | *#295, Create SortableList of TableRows* |  | 
| *10/27/2021* | *#304-307, 319, Create Save abilities for .svg and .kml* | *#299 , Create client component to call reverse order* |  | 
| *10/27/2021* | *#295-298, Create Sortable of TableRows, Create on SortEnd swap function, Make List auto-scroll on drag, Enforce delay on press to initiate dragging* | *#314, Create client component to select new starting place* |  | 
| *10/27/2021* | *#317, add type back to find schemas* | *#327, move load/save functions to new file* |  | 
| *10/29/2021* | *#299 314, add reverse trip options* | *#303, confirm button* |  | 
| *11/03/2021* | *#301, 302, 309, 311, 310, 312, 339, 340, 342, set up tour request for nearest neighbor trip* | *#313, two opt* |  | 
| *11/03/2021* | *#335, create confirm button* | *#291 Clean UI* |  | 
| *11/03/2021* | *331, Shorten trip button* | *#333, re-render map with shorter trip* |  | 
| *11/05/2021* | *#313 370 nearest neighbor with 2opt, reorder trip* | *#372, tour test bones* |  | 
| *11/05/2021* | *#334, cancel shorten trip* | *#382, hover messages* |  | 
| *11/08/2021* | *#372, 373, java tests for TourRequest.java* | *#385, delete user units* |  | 
| *11/10/2021* | *#332, non-shortened trip storage* | ** |  | 
| *11/10/2021* | *#333, re-render map with shortened trip* | ** |  | 
| *11/10/2021* | *#385, Delete user units* | ** |  | 

## Review

### Epics completed 

1. Shorten Trip
2. Modify Trip
3. User Experience
4. Types
5. Country

### Epics not completed 

## Retrospective

### Things that went well
- Having multiple people working on the same epic allowed for us to work better with each other and work through problems as one person relied on the other for previous/next steps of the functions
    - Also helped when someone was sick or unable to come to class for scrum meetings
- Having a much clearer vision of how our website should look 
    - All of us thought of ways to simplify the UI 
- Writing clean code
    - Working so tightly with one and other our code was written to read not just work

### Things we need to improve
- Communication of what is currently being worked on
- Time management with tasks and epics

### One thing we will change next time