# Nodejs authentication server for google apis

---
### This is meant to have an endpoint that an app can ping to get a refesh token for google apis everytime we hit 
"http://localhost:4000/google"

with the redirect url 
"http://localhost:4000/creds" which google will send it;s respone to , if succesfullit returns access and refresh tokens

you'll first need to configure your google cloud console to create a project and allow apis watch:

[youtube video explaining how to set up google console (from 2:04 - 6:35)](https://www.youtube.com/watch?v=0KoZSVnTnkA)

, in this case we'll be using the gmail api to send a n email everytime we hit 
"http://localhost:4000/mail"

don't forget to run npm i 

then yarn start/npm run start then ping "http://localhost:4000/google"
