<h1 align="center">JS Implementation of Rotations</h1>



# Table of Contents

- [Setting Up](#setting-up)
- [Styling](#styling)
- [Front-End Functionality](#front-end-functionality)
- [Using the API](#using-the-api)
    - [Performing a Rotation](#performing-a-rotation)
- [Running the Server](#running-the-server)
    - [NodeJS Server](#nodejs-server)


# Setting Up
I have to assume that you have npm and git installed and so in order to get started first copy the repository over to your local machine. Inside the root directory of the project as administrator run:
```js
npm install -g bower gulp
npm install gulp gulp-install
gulp
```
This will handle the installation of all node_modules, bower_components, and build the necessary gulp files.


# Styling
All styles associated to the website can be found inside the "/styles" folder. This site is mobile-friendly and to make it easier to read, there exist different files for different screen widths. 


# Front-End Functionality
All of the functionality associated to the actual website can be found inside the "/scripts/front-end" folder.


# Using the API
### Performing a Rotation
To use the API, there exist a single call:
```
localhost/:method/:angle/:axis/:vector
```
where "localhost" can remain if you are running a local build or replaced with the domain name and the rest are:
* method: Represents the method of rotation, can be either "quaternion" or "matrix"
* angle: Represents the angle of rotation given in degrees
* axis: Represents the axis of rotation in the format x-y-z
* vectir: Represents the vector of rotation in the format x-y-z

So for example if I wanted to rotate the vector (4,7,24) by 90 degrees around the axis (9,4,11) using the quaternion method, I would call on:
```
localhost/quaternion/90/9-4-11/4-7-24
```


# Running the Server
### NodeJS Server
At "/app.js":
```js
app.listen(80, () => {
  console.log("The server is now listening!");
});
```
change "80" to whichever port you wish to use. To start the server run:
```js
node app.js
```
at the root directory. If you see:
```
The server is now listening!
```
the server has officially been launched and is listening on the port you provided.