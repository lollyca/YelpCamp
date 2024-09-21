# YelpCamp

A yelp-like website for searching and reviewing campgrounds.

Demo available at:

> [https://my-yelp-camp.something.io](https://yelpcamp-production-0134.up.railway.app/)

## Built with

- [Express](https://expressjs.com/)
- [MongoDb]()
- [Mongoose]()
- [Bootstrap]()
- [ejs]()
- [joi]()
- [starability.css](https://github.com/LunarLogic/starability)

## Installation

1. Configure a `.env` file with these values populated

```
NODE_ENV=
DB_URL=
SECRET=
PORT=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
MAPBOX_TOKEN=
```

2. Install packages

```shell
npm i
```

> Note: The `next` dependency in `devDependencies` is not necessary for this project, only for deployment in vercel due to some issue with `sanitize-html`

## How to run

```shell
npm start
```
