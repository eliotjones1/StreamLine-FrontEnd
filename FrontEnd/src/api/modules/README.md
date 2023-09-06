# Overview

The modules are synonymous with the modules in the source folder. They represent different groups of pages and the context (api calls and state) that said grouping needs to be able to modify (state) or call (api). All toast error handling occurs as well.

## Modules

### Account

This modules handles fetching and modification of user account information. This can range from user list actions to subscription management actions.

### Auth

This modules handles user authentication and the authorization of said user. This is the only module which also handles/modifies a global shared state. This state includes user login status and authorization level. This is used to handle web app visuals as well as naviagtion possibilities across the site.

### Business

This module handles StreamLine business information fetching. This information is currently set via admin users manually on the back end. A seperate admin module which includes an admin dashboard and context is in the development plan and will allow all of these actions to take place on the site.

### Media

This module handles the fetching of media data.
