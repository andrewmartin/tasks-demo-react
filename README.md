# Tasks Demo App

- [Initial Requirements](#initial-requirements)
- [Quickstart](#quickstart)
- [Bonus](#bonus)
- [Roadmap](#roadmap)

This is a basic demo application to showcase the frontend development abilities of Andrew Martin. It was built using Create React App, and uses React, Redux, and several other small, popular libraries to manage application state. It also leverages `reactstrap` to simplify some of the UI components.

See the [Rails Backend Demo App](https://github.com/andrewmartin/tasks-demo-rails).

[Screen Recording](http://cloud.believelabs.com/cbac91e56848)

## Initial Requirements

Create a main content panel that will iterate through this list of users and display each of them in a table format with each attribute shown as a column. Create an additional column called "Action" that will contain a single button for each row called "Complete".

| Name  |    Task     | Role  |  Location   |    Action    |
| :---: | :---------: | :---: | :---------: | :----------: |
|  Bob  | trim hedges | Admin | Los Angeles | **Complete** |

The Complete button should remove the user from the content panel and update the UI accordingly based on the next requirements in the next paragraph. The removal should update the task in the backend as well.

To the left of the content panel, create a separate dropdown filter for each of the above attributes except for name (Role, Location, Task). This filter should generate separate checkboxes for each instance of an attribute based on the current list of users shown. For example, the "Role" filter will initially show 4 separate checkboxes for Admin, Marketing, Support and User, but the Marketing selection should be removed if there are no more users being shown with the Marketing role. Clicking the dropdown should display the list of checkboxes and allow selections to be made. Clicking the dropdown again should close the dropdown and display the current selections for that filter.

Clicking a checkbox on any of the filters will immediately affect the list in the content panel by changing the background color of the affected row's column (just the column, not the entire row). Use the following colors:

Role - red
Location - green
Task - blue

For example, clicking the "Los Angeles" checkbox in the Location filter will change the background color of every "Los Angeles" column to green. Multiple selections for each of the columns should be possible. For example, clicking on "Los Angeles", "Denver" and "Admin" will change the background color for each selected location to green and the selected role to red.

Think about code and styling reusability when creating each UI component and whether it would make sense from the perspective of code maintainability to create a class to manage the different UI interactions.

Bonus - add pagination that shows 10 users per page
Extra bonus - make the number of rows shown for each page of pagination configurable in the UI.

## Quickstart

1. `yarn`
2. `cp .env-example .env` (and configure to match the Rails server)
3. `yarn start`

## Bonus

- Dynamic pagination generated based on API response
- Configureable "per page" pagination

## Roadmap

- Add jest/enzyme tests
