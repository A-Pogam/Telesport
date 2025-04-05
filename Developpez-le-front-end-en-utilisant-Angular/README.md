# Olympic Stats Application

This Angular application allows you to view data about the Olympic Games, including medals, the number of participating countries, and detailed statistics for each country.

## Main Features

- **Home Page:** Displays a pie chart showing the number of medals by country and some global statistics about the Olympic Games.
- **Country Details Page:** Displays detailed information for each country, including total medals, total athletes, and a line chart showing the number of medals by year.
- **Responsiveness:** The charts automatically adjust to the window size for an optimal experience on different devices.

## Prerequisites

Before starting, make sure you have Node.js and Angular CLI installed on your machine.

1. **Node.js**: [Download and install Node.js](https://nodejs.org/)
2. **Angular CLI**: Install Angular CLI via npm:
   ```bash
   npm install -g @angular/cli
   ```

## Installation

1. Clone the project repository:
   ```bash
   git clone <your-git-repository>
   cd <project-folder>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the application in development mode:
   ```bash
   ng serve
   ```

   This will start the application at `http://localhost:4200/`.

## Application Structure

### 1. **Main Components:**

- **HomeComponent:** The component for the homepage that displays a pie chart of medals by country and some global statistics.
- **OlympicsComponent:** The component for the country details page. It displays a line chart of medals by year and detailed statistics about the country's participation.
- **AppComponent:** The main component that loads the initial data and displays the homepage.

### 2. **Services:**

- **OlympicService:** A service that retrieves Olympic data from a JSON file and provides it to the components.

### 3. **Models:**

- **Olympic:** A model representing a country and its Olympic participations.

### 4. **Modules:**

- **NgxChartsModule:** Used for displaying interactive charts (pie chart and line chart) of Olympic data.
- **HttpClientModule:** Used for making HTTP requests to load the data.

## Chart Functionality

### 1. **Pie Chart:**

Displays the total number of medals for each country participating in the Olympic Games. When a user clicks on a country, they are redirected to a page showing detailed statistics for that country.

- **Properties:**
  - `view`: Defines the size of the chart based on screen size.
  - `results`: Contains data for each country and the total number of medals.

### 2. **Line Chart:**

Displays the number of medals obtained by a country over the years. This chart is visible when the user selects a country from the pie chart.

- **Properties:**
  - `view`: Defines the size of the chart.
  - `results`: Contains data for medals by year.

## Routes

- **`/`** : Home page with a pie chart of medals by country.
- **`/olympics`** : Displays general statistics about the Olympic Games.
- **`/olympics/:countryId`** : Displays detailed information about a selected country, including a line chart of medals by year.
- **`/not-found`** : Page displayed when a non-existent route is requested.

## Example Usage

### Example 1: Accessing a Specific Country's Page
1. The user clicks on a country in the pie chart.
2. They are redirected to the page `/olympics/:countryId`, where detailed information about that country's participation is displayed.

### Example 2: Dynamic Resizing
The chart automatically adjusts based on the window size to provide an optimal experience on different devices.

## Technologies Used

- **Angular**: The main framework for frontend development.
- **Ngx-Charts**: A library for interactive charts.
- **RxJS**: Used for managing asynchronous data streams.
- **HttpClient**: Used to retrieve data from the JSON file.