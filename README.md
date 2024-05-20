# Conferences challenge

Javascript function for formatting conferences information.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

Dependencies installation and configuration.

```bash
npm install --save-dev jest
```

## Usage

```npm
npm run dev
```
## Test

```npm
npm run test
```

## Decisions made in the design

We assume that:
- The function created will always receive a list of data and not a json.
- Another module or function will be in charge of converting the input json into a list of data.
- Only a single function must be created, and it cannot be encapsulated in several functions.

Technology used:

JavaScript and Jest. This choice is due to the use case, it has been assumed that it is a scripting task, functional programming and requires a certain processing speed, therefore JavaScript was the best candidate.
