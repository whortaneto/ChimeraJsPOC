What Is This?
-------------
(Work in progress)

This is a proof of concept of the javascript library chimera-js(https://github.com/whortaneto/chimera-js)


How To Install the development environment?
-------------------------------------------
To run this code locally you just will need a simple server that provides the static files located in the folder ./Publisher/TestEnviroment.

You can use python -m SimpleHTTPServer 8000 or just use the example available in the "Publisher" folder.

This folder just have a simple node server that provides the static files to the browser, the library was located in ./Publisher/TestEnviroment/chimera.

Obs: If you decided to not use the Publisher server example you do not need to follow the others steps.

1. Fist of all you need node.

4. Run "npm install" into your prompt.

5. Run "node app.js" in your prompt and your code will be available in the link "http://localhost:7000/"

The test application just jave a animated gif and buttons that executes methods in the back-end, you can se the impact of a long loop in the main thread and how that behave in the back-end files.

Also, you can access the published version of the test application in http://wneto.bitbucket.org/
