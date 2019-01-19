#RESTful Routing

##Introduction
* Define REST and exaplain WHY its matters
* List all 7 RESTful routes
* Show example of RESTful routing in practise

REST - a mapping between HTTP routes and CRUD

Name        Path            HTTP Verb       Purpose
============================================================
Index       /dogs           GET             List all dogs
New         /dogs/new       GET             Show new dog form
Create      /dogs           POST            Create a new dog, then redirect
Show        /dogs/:id       GET             Show info about one specific dog
Edit        /dogs/:id/edit  GET             Show edit form for one dog
Update      /dogs/:id       PUT             Update a paticular dog, then redirect
Destroy     /dogs/:id       DELETE          Delete a particular dog, then redirect


#BLOG Index
* Setup the Blog App
* Create the Blog model
* Add INDEX route and template
* Add Simple Nav Bar

#Basic Layout
* Add Header and Footer Partials
* Include Semantic UI
* Add Simple Nav

#SHOWtime
* Add Show route, template
* Add links to show page
* Style show template

#Edit/Update
* Add Edit Route/Form
* Add Update Route/Form
* Add Method-Override

#DESTOYYY
* Add Destroy Route
* Add Edit and Destroy Links

##Final Updates
* Sanitize blog body
* Style Index
* Update REST Table