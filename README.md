# quasar-bookmarks-app

A basic web app where a user can add and access webpages to a bookmark list  

User can:   
 * add bookmarks to bookmark list. Book marks contain:  
   * title
   * url link
   * description
   * rating (1 - 5)
 * see list of bookmarks when app is first opened
   * All bookmarks in the list default to a 'condensed' view showing only title and rating
 * click on a bookmark to display the 'detailed' view
   * detailed view expandes to additionally display description and a 'visit site' link
 * remove bookmarks from bookmark list
 * select from a dropdown a 'minimum rating' to filter  
   the list by all bookmarks rated at or above the chosen selection
 * edit bookmark properties (ratings, description, title, url)
   
 In progress:

 * receive appropriate feedback when cannot submit bookmark
   * check all validations in the API documentation (e.g. 
     title and url field required)
 * make it p r e t t i e r
