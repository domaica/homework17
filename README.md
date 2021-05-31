# leaflet-challenge-DOMAICA

The requirements of this project asked for visualization of earthquakes using the APIs provided by USGS (United States Geological Survey). The data is updated regularly and is saved in GeoJSON format. They are freely accessible and available and do not require API keys.
There are different data that can be accessed. I have picked a dataset containing all earthquakes of any magnitude that have occurred in the last 7 days.

It was also required to access another dataset containing all locations in order to draw the tectonic plates in another layer. As we know, earthquakes happen due to the friction of plates in the earth's crust and therefore most and the strongest earthquakes occur at its edges.

## Main technologies used to deploy this project
- 'Javascript' programming language.
- 'leaflet.js' JavaScript library for interactive maps.

- 'HTML' standard markup language for creating Web pages
- 'CSS' (Cascading Style Sheets) specifies style—page layouts, colors and fonts.

- 'GeoJSON' open standard geospatial data interchange format that represents simple geographic features and their attributes. Based on JavaScript Object Notation (JSON)


## Main folder for solution is called: 'leaflet-challenge-DOMAICA'

Inside that root folder, we can find 3 files:

- 'index.html' with code for the webpage for the project.
- 'README.md' -> Markdown with project explanation.
- 'README.pptx' -> Powerpoint containing screenshots, explaining process and main images of the outcomes, of webpages and additional details.

And 2 additional folders:

- 'static'
- 'images'

### - Subfolder 'assets' contains:
   
- 'static/js' subfolder with 2 files:
    'app.js' (coding) file invoked from html containing the javascript code.
    'config.js' with API-KEY required to access mapbox, provider of online maps for websites.
  
- 'static/css' subfolder which contains a filled named 'style.css'. It is a .css Cascading Style Sheets used to adapt the presentation of webpage by modifying and enhancing colors, layouts, margin, fonts, etc.

### - Subfolder 'images' contains:

It contains some introduction images for the project.


### - Cross-origin resource sharing (CORS)

 CORS is a mechanism that restricts access to resources on a web page being requested from another domain outside the domain from which the first resource was served.
 
This project has been done by accessing the folder where "index.html" was located with command prompt, activate python and run the command 'python -m http.server'. This python command allows for separating Python code implementing an application’s logic from the HTML (or other) output that it produces. Therefore it lets us to work avoiding CORS security checks.

After running that command, you can access your webpage by browsing in 'localhost:8000' and see the results of your html and js development.


### - Webpage published in following link:

https://domaica.github.io/homework17/


