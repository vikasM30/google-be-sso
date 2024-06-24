# BE Google SSO

This tutorial includes Basic Google OAuth SSO with Passport.js and also Basic Youtube Data v3 API

# To start up with the application, we should first create our Google Cloud Credentials:

## Make generate OAuth Client ID (For Google SSO and Youtube post call) and API Key (For Youtube Get Calls)
    - https://console.cloud.google.com/apis/dashboard

## Add Youtube Data V3 API Library

## Please remember to add the required scopes for using Youtube API.

## Postgres is used as Database.

## Add and Populate the `.env` file in the project root and fill the keys as given in `sample.env` file in project root

## Available Scripts

In the project directory, you can run:

## `npm run start`

## Default `PORT` is `3000`

# `NOTE: ` -> If you change the PORT from `3000` to some other port, then change `REDIRECT_URI` also in `CREDENTIALS` section in Google Cloud Project.

## By default `auth.ejs` page opens at route `/`

## sign up with Google account

## `/api/logout` url will logout you from SESSION and hence delete all the sessions.

### Protected routes can only be accessed after login and once logout, you cannot access them.