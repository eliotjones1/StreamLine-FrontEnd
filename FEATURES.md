## Updates


## June 27:

- Login/logout/userdash nav whatever all works
- Cookies exist. Since u can hack u tell me if it does what we want, but should be good!
- Search Results functionality has been improved


## Needed
Stuff I've done that needs FE work. 

### Recommendations
Only accessible if someone has an account. I've kinda thought of it as an extension of the current list on the dashboard. When someone clicks the remove button, give them a popup:
Ask them to rate the movie or show (1-10 or a sliding scale between 1 and 10 or something), or alternatively they can have the option to click a "didn't watch" or something.
Once they've rated the movie, make a POST request to 'api/recommendations/saveRating/' where the first element is the user's ID (which should be stored in the session), the second element is the movie or show object, and the third element is the rating.

For the actual recommendations themselves, do it just like the watchlist. To grab the recommendations (of which there are 5 that are returned identically to the watchlist information),
make a GET to 'api/recommendations/getRecommendations/'. Should hopefully be pretty straightforward on your end, but this is largely untested so there might be some backend issues. Also,
to make the recs work I randomly generated a lot of fake accounts, so there's that lmfao. 

## TODO:
In order of priority:
### Hide pages that aren't ready for web hosting

### Web Hosting
Host V1 of site (Can be with/without recommendations). V2 should include the ability to force-include streaming services or specific movies/shows.
V3 should include recommendations and some form of subscription notification. 

### Imports / Letterboxd
Import lists from .txt or something idk it was Lila's idea 

### Recommendations 
### Subscription Cancellation / Startup
My proposed model is $1 to notify and recommend action each month, $5+ to do it for the user. The $1 model can be in V3, but $5 will likely be in V4.
Paypal will allow us to send/recieve payments, still need to workout how to do it ourselves. Will def need more security.
Is probably possible to link people's accounts and get info that way but it needs more testing. Def something to do together, not while we are gone. 

