# 🔐 World Traditions API
> Information about different traditions and holidays in countries all over the world

[![GitHub](https://img.shields.io/github/issues/el634dev/world-tradition-api.svg?style=flat-square)](https://github.com/el634dev/world-tradition-api/issues)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)

## Installation

1. If you have fork this repository and clone your fork locally, run `npm install`.
1. Open the repository folder in your editor of choice, I used VSCode:

    ```bash
    $ cd world-tradition-api-main
    $ code .
    ```

1. Run `npm install` to install project dependencies into the activated environment if you have cloned or fork this repository.
2. Create a .env file with your MongoDB URI/URL link and a secret key, the port is optional.
3. Execute `npm start` to run the development server.

## Endpoints:

#### Traditions

| Route | Method | Description |
| ----------- | ----------- | ----------- |
|http://localhost:3000/traditions |GET | Gets all traditions |
|http://localhost:3000//traditions/{traditionId} |GET | Get one tradition by id|
|http://localhost:3000//traditions | POST | add a new tradition |
|http://localhost:3000//traditions/{traditionId}| PUT | update an exisiting tradition|
|http://localhost:3000//traditions/{traditionId} | DELETE | delete a tradition |

{traditionId} = Route parameter = `:traditionId`

## Deployment

### Heroku
Follow this [Node.js Deployment Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs) to deploy your application on Heroku. Be sure to complete all of the steps!

## Acknowledgements
> Shoutout all articles for providing information that was included for this api
