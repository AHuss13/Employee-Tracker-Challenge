# Employee Tracker

## Description

This is a command-line application built with Node.js, Inquirer, and MySQL that allows business owners to view and manage departments, roles, and employees in their company. Users can:

- View all departments, roles, and employees
- Add departments, roles, and employees
- Update employee roles
- View employees by manager
- View employees by department

## Installation

1. Clone the repository
2. Install the required dependencies by running `npm install`
3. Create MySQL database using the schema.sql file
4. (Optional) Seed the database using seeds.sql file
5. Update database connection settings in index.js if needed

## Usage

1. Run `node index.js` to start the application
2. Use arrow keys to navigate through menu options
3. Follow prompts to view, add or update company data

Watch the demo video below to see the application in action:

![Demo Video](/Demo/Demo%20Video.webm)

## License

MIT License

Copyright (c) 2024 Adam Huss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
