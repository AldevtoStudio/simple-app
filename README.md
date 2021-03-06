# Meower

## Pages

- Home - Displays list of latest "meows". ✅
- Sign Up - Allows visitors to create an account. ✅
- Sign In - Allows existing users to sign in. ✅
- Create meow - Display form which allows user to submit new "meow". ✅
- Single meow - Allows to read single meow. Allows creator to delete or edit meow. ✅
- Edit meow - Allows meow creator to edit single meow. ✅
- Profile - Allows us to view single users meows. ✅
- Profile edit - Allows to edit our profile. ✅

## Route Handlers

Base ✅

- GET - '/' - Renders home page. ✅

Authentication ✅

- GET - '/authentication/sign-up' - Renders sign up page. ✅
- POST - '/authentication/sign-up' - Handles account registration. ✅
- GET - '/authentication/sign-in' - Renders sign in page. ✅
- POST - '/authentication/sign-in' - Handles existing user authentication. ✅
- POST - '/authentication/sign-out' - Handles user sign out. ✅

Meow (Publications) ✅

- GET - '/meow/create' - Renders meow creation page. ✅
- POST - '/meow/create' - Handles new meow creation. ✅
- GET - '/meow/:id' - Renders single meow page. ✅
- GET - '/meow/:id/edit' - Renders meow edit page. ✅
- POST - '/meow/:id/edit' - Handles edit form submission. ✅
- POST - '/meow/:id/delete' - Handles deletion. ✅

Profile ✅

- GET - '/profile/:id' - Loads user with params.id from collection, renders profile page. ✅
- GET - '/profile/edit' - Loads user and renders profile edit page. ✅
- POST - '/profile/edit' - Handles profile edit form submission. ✅

## Models

User ✅

- name: String, required. ✅
- email: String, required. ✅
- passwordHashAndSalt: String, required. ✅
- picture: String, default (default img url). ✅

Publication ✅

- message: String, required, maxlength 300. ✅
- picture: String. ✅
- creator: ObjectId of a document in the users collection, required. ✅
- createdAt: Date (add timestamps option to the publicationSchema). ✅
- updatedAt: Date (add timestamps option to the publicationSchema). ✅

## Wishlist

- Only creator can edit. ❌
- Add date formating helper to HBS. ✅
- Like "meows" (Like model). Most liked meows would be featured. ❌
- Sentiment analysis for "meows". If meow is negative, stop publication. ❌
- Share button. ❌
- Required users to confirm email before publishing. ❌
- Allow sign up/in with Google, Twitter, Facebook, etc. ❌
