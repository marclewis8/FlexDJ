# FlexDJ Backend

Web app for cross-platform playlist creation + more.

## Controllers

Each controller maps to a certain route. They handle requests based on different endpoints. For example, `app.controller.ts` is the route mapping to `/` aka the root of our app.

## main.ts

This is where the backend is created, the server starts running, and the app.module is passed in that sets up all the database keys & secret info.

The port is also defined in this file, which in this case is `3001`. After running this file, the backend can now wait and listen for requests from the frontend.

- `npm run start`: starts the backend app - go to localhost:3001 to see the result of `GET` is for the root of the site. It will log all your changes (you can also run this command in your terminal outside VSCode)
