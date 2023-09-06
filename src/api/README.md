# Overview

The StreamLine WebApp primarily relies upon two API's for its operation and data. The TMDB API is used soley for Movie and TV show information, and while incomplete and crowdsourceed, it is the best free and publically avalaible option. (In the furture StreamLine may look to internalize all of this information in order to have a more accurate database.) StreamLine has aquired its own TMDB API key for use. For user management, user information and admin capablities StreamLine has it's own internally managed API.

## WebApp State

The only state used across the entire StreamLine web application is the user loggin state and authorization level. This is managed inside the auth context file.

## StreamLine API

The StreamLine API is divided up into multiple subsections

<img 
  src="/Users/ryandunn/Desktop/Personal/StreamLine/FrontEnd/src/assets/images/StreamLine_Transparent_Logo.png" 
  alt=""
  style="height: 150px; width: 150px;"
/>

## TMDB API

For reference of the TMDB api please refer to their internal documentation located at: [TMDB API Documentation](https://developer.themoviedb.org/reference/intro/getting-started). Currently, StreamLine currently supports media content (aka TV Shows and Movies) but is not incorporating people. This is something which may be added in the forseeable future. Some calls to this are made internally in the StreamLine api and not accessed directly by the front end code (although we are attempting to phase this out).

<img 
  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
  alt=""
  style="height: 150px; width: 208px;"
/>
