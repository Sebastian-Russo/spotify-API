to run app

# $ npm start

What I've learned and what's challenged me:
What's different about the Spotify app I've built with their API from my other API projects?
There was much more documentation, but a lot more to decipher through.
Also having more API calls then any previous app, 4 calls to be exact.
The initial call for authorization to grab an auth token, which was another new thing for me learn.
Then the immediate second call to grab music genre categories.
After user selects a genre, another call is made drilling further down to playlists.  
After user selects a playlist, clicks search, the fourth api call is made, drilling further down into an array of individual tracks.
