# Sprint 5 - T21 Ctrl Alt Elite

## Goal
### *Release!*

## Sprint Leader: 
### *Max Scalf*

## Definition of Done

* The Increment release for `v5.x` created as a GitHub Release and deployed on black-bottle under SPRINT.
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
- Maps - The user will be able to select different backgrounds for the map through a new pop-up modal with a range of options. The set background will remain chosen through multiple sessions through local storage.
- Markers - The user will be able to select different markers for the map through the same pop-up modal with a range of options. The set marker will remain chosen through multiple sessions through local storage.
- Lines - The user will be able to select different line styles and colors for the map through the same pop-up modal with a range of options. The line style will remain chosen through multiple sessions through local storage.
- Filter Trip - The user will be able to slim down the itinerary of places to only show stops matching a chosen filter word. The filter will be done through a search bar in a new modal where the user can input any string (i.e. 'ranch'). The filter will need to compare against more than just the name, similar to the search bar find request.
- Easter Eggs - Undecided on specifics, but should we finish the other epics, we plan on adding secrets when user enters certain place names/latitude and longitude/etc.

## Metrics

| Statistic | # Planned | # Completed |
| --- | ---: | ---: |
| Epics | *5* | *3* |
| Tasks |  *41*   | *41* | 
| Story Points |  *62*  | *62* | 


## Scrums

| Date | Tasks closed  | Tasks in progress | Impediments |
| :--- | :--- | :--- | :--- |
| *11/15* | *#412 Create Modal for settings menu* | *#418 Fix double click on country search* |  |
|*11/19* |  |  *#418 Fix double click on country search, #413 Maps, #415 lines*| |
| *11/29* |  *#418 Fix double click on country search, #434 various tests* | *#413 Maps, #415 lines* | |
| *12/1* | *Inspection, User experience*| *#421 Better saving for type/country filter*| |
| *12/3* | *#432 Render selected map, #432 Create layersControl button, #433 Create Map Layers Array* | *#419 Smaller list for country search, #415 lines*| |
|*12/6* | | *#419 Smaller list for country search, #415 lines, #436 Maps local storage*|  *Issues figuring out localstorage for map layers* |
|*12/8* | | *#419 Smaller list for country search, #415 lines, #436 Maps local storage* | *Issues figuring out localstorage for map layers* |



## Review

### Epics completed  
*Maps, Lines, Filter Trip*

### Epics not completed 
*Filter Trip, Easter Eggs*

## Retrospective

### Things that went well
Not to say this sprint was a total disaster or anything, but it seems like not much went very well this time around. I would say the amount of work done was more evenly split around in this sprint, but the overall amount that we did was much less than done previously.
### Things we need to improve
Communication suffered in this sprint, especially with the fall break and semester nearing an end. Overall, I think everyone was focused on other things during this sprint for the most part, and we failed to complete as much as we could because we had already finished most of the significant epics in previous sprints. We could have done a much better job at planning how our features were going to be laid out and how to do things to patch up previous things we have made and improving the user interface/experience.

### One thing we will change next time
There will be no next time, but if there were we would plan more user interface changes to make it more mobile friendly.
