# FlexDJ Backend and API Documentation

Web app for cross-platform playlist creation + more.

## Endpoints

### POST /sign-in

Purpose: Allows a user with an existing account to sign in to the app.
	
Request Params: 
~~~
{
username - The user's username
password - The user's password
}
~~~

Returns:
~~~
{
sessionId - The user’s session ID, saved as a cookie
userEmail - The registered user’s email
userId - The registered user’s ID
}
~~~

### GET /user/{id}

Purpose: Get information about a particular user.

Returns:
~~~
{
id - The user’s ID
oktaId - The user’s ID on Okta
firstName - The user’s first name
lastName - The user’s last name
email - The user’s email
birthdate - The user’s birthdate
username - The user’s username
playlists - List of user’s playlists
}
~~~

### GET /user/{id}/playlists

Purpose: Get a list all of the user’s added playlists.

Returns:
~~~
[
{
id - The playlist’s ID
name - The playlist’s name
genre - The playlist’s genre
icon - The playlist’s icon
user - The user assigned to the playlist
songs - List of songs in the playlist
}
]
~~~

### POST /user/add-user

Purpose: Add a new user to the app (used in sign-up).

Request Params:
~~~
{
email - Email that hasn’t been used before
password - Desired password for the account
firstName - The user’s first name
lastName - The user’s last name
birthday - The user’s birthdate
username - The user’s username
}
~~~

Returns:
~~~
{
id - The user’s ID
oktaId - The user’s ID on Okta
firstName - The user’s first name
lastName - The user’s last name
email - The user’s email
birthdate - The user’s birthdate
username - The user’s username
playlists - List of user’s playlists
}
~~~

### POST /playlist/add

Purpose: Add a new playlist

Request Params:
~~~
{
name - The desired name of the new playlist
genre - The desired genre of the new playlist
icon - The desired icon of the new playlist
userId - The user’s ID adding the new playlist
}
~~~

Returns:
~~~
{
id - The playlist’s ID
name - The playlist’s name
genre - The playlist’s genre
icon - The playlist’s icon
user - The user assigned to the playlist
songs - List of songs in the playlist
}
~~~

### POST /playlist/remove/{playlistId}

Purpose: Deletes a user’s playlist (need the ID).

### POST /playlist/{playlistId}/remove/{songId}

Purpose: Deletes a song from a user’s playlist (need the song ID).

### GET /playlist/{playlistId}

Purpose: Get information about a playlist.

Returns:
~~~
{
id - The playlist’s ID
name - The playlist’s name
genre - The playlist’s genre
icon - The playlist’s icon
user - The user assigned to the playlist
songs - List of songs in the playlist
}
~~~

### GET playlist/{playlistId}/songs

Purpose: Get the list of songs from a playlist.

Returns:
~~~
[
{
id - The song’s ID
name - The song’s name
externalId - The song’s ID on the platform’s API
artist - The artist of the song
icon - The icon of the platform from which the song was added from.
url - The URL linking to the full song on the platform site
image - The image of the song’s album
preview - If the platform is Spotify or Deezer, then this is the 30 second audio preview
playlists - The list of playlists the song exists in for the user
}
]
~~~

### POST /song/add

Purpose: Add a song to one of your playlists.

Request Params:
~~~
{
name - The song’s name
url - The link to the song’s full audio
artist - The artist of the song
playlistId - The playlistId onto which the song is being added
icon - The icon of the song’s original platform
image - The image of the song’s album
preview - If the platform is Spotify or Deezer, then this is the 30 second audio preview
externalId - The song’s ID on the platform’s API
}
~~~

Return:
~~~
{
id - The song’s ID
name - The song’s name
externalId - The song’s ID on the platform’s API
artist - The artist of the song
icon - The icon of the platform from which the song was added from.
url - The URL linking to the full song on the platform site
image - The image of the song’s album
preview - If the platform is Spotify or Deezer, then this is the 30 second audio preview
playlists - The list of playlists the song exists in for the user
}
~~~

### POST /song/remove/{id}

Purpose: Remove a song from all playlists (need the song ID)

### GET /song/{id}

Purpose: Get information about a song in the user’s playlists

Return:
~~~
{
id - The song’s ID
name - The song’s name
externalId - The song’s ID on the platform’s API
artist - The artist of the song
icon - The icon of the platform from which the song was added from.
url - The URL linking to the full song on the platform site
image - The image of the song’s album
preview - If the platform is Spotify or Deezer, then this is the 30 second audio preview
playlists - The list of playlists the song exists in for the user
}
~~~


## Controllers

Each controller maps to a certain route. They handle requests based on different endpoints. For example, `app.controller.ts` is the route mapping to `/` aka the root of our app.

## main.ts

This is where the backend is created, the server starts running, and the app.module is passed in that sets up all the database keys & secret info.

The port is also defined in this file, which in this case is `3001`. After running this file, the backend can now wait and listen for requests from the frontend.

- `npm run dev`: starts the backend app - go to localhost:3001 to see the result of `GET` is for the root of the site. It will log all your changes (you can also run this command in your terminal outside VSCode)

## To Start Entire Local Dev

- cd into backend: `cd backend`
- run `npm install` & `npm run dev` - this starts the backend server at localhost:3001
- run `npm run migrations` - this will update your database if anyone made changes
- open new terminal
- cd into frontend: `../frontend`
- run `npm run dev`

## Make changes to database?

- run `npm run typeorm:migrate <insert name of new changes>` (ex: `typeorm:migrate AddUserTable`)
- commit these changes to github so we can all update our databases with your changes!

## Want to undo changes you made after generating a migration?

- run `npm run revert` - this will undo the last changes to the database you ran!
