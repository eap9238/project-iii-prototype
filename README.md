# project-iii-prototype
Documentation for Product/Service Site - React, Eleanor Post

This site allows users to make, store, and delete notes. Notes can 
be assigned colours, due dates, and contents. 
The colours allow for visual sorting of the notes, and due dates 
facilitate shcheduling via click and google calendar. 

This app is designed to allow for transition to a premium account, 
which would allow for a greater number of notes to be stored (note 
limits are not yet implemented.) The white space above and to the 
sides of elements is also set aside to allow for insertion of ads 
for free-class users, to extract income from them too. 

React is used to present each view, the login, signup, account 
information, note creation, and note viewing pages. It is also 
used to provide an up-to-date note count in the upper right corner, 
to display the individual notes, to display a copyright date 
matched to the current year in the bottom right, and to provide all of 
the information inside the account information page (loaded out 
from the mongo site)

MVC is integral in the organization of the site. While the maker 
and client pages are what the users interact with, all the business 
logic is carried out in the controllers, and the data is stored in 
the back end -- the Mongo database. 

Mongo stored the individual accounts, the relevant information to 
the accounts, the attatched notes, and the information stored on 
each note. The Account data stored includes the username, salt, 
password, date of creation, type of account, and class. The Notes 
store the title of each notecard, the body information, the owner 
(the attatched account), the date of creation, the due date for 
the card (if applicable, otherwise defaulting to the date of 
creation), and the colour of the notecard. 

My templating language was handlebars. I used it to maintain 
seperation between the logged in and logged out users, so that
they cannot access values that should not be available to them. 

I went above and beyond in my development of the note cards 
themselves, and in streamlining the site navigation system. 
The note cards are highly customizable, and display in special 
downwards rows that flex according to screen size, to maintain 
even rows, even when the notes can be of varying heights, and 
change in number over time. The site as a whole has been 
reformatted to be much more modern and attractive than it began.
The nav bar provides different options across the site pages 
depending on what screen is selected, to keep the available topics 
useful to the user at the time and declutter the nav bar. 
Also I made new icons for the project, so I hope that counts 
towards something. 

I was not in a group.
