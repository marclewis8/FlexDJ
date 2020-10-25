# FlexDJ Backend

Web app for cross-platform playlist creation + more.

## Controllers

Each controller maps to a certain route. They handle requests based on different endpoints. For example, `app.controller.ts` is the route mapping to `/` aka the root of our app.

## main.ts

This is where the backend is created, the server starts running, and the app.module is passed in that sets up all the database keys & secret info.

The port is also defined in this file, which in this case is `3001`. After running this file, the backend can now wait and listen for requests from the frontend.

- `npm run dev`: starts the backend app - go to localhost:3001 to see the result of `GET` is for the root of the site. It will log all your changes (you can also run this command in your terminal outside VSCode)

## To Start Entire Local Dev

- cd into backend: `cd backend`
- run `npm run dev` - this starts the backend server at localhost:3001
- run `npm run typeorm:run` - this will update your database if anyone made changes
- open new terminal
- cd into frontend: `../frontend`
- run `npm run dev`

## Make changes to database?

- run `npm run typeorm:migrate <insert name of new changes>` (ex: `typeorm:migrate AddUserTable`)
- commit these changes to github so we can all update our databases with your changes!

## Want to undo changes you made after generating a migration?

- run `npm run typeorm:revert` - this will undo the last changes to the database you ran!
