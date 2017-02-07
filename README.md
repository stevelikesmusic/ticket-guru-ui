#Ticket Guru UI

The app is very simple to setup. Simply run ```npm start``` to get webpack running.

Enter an artist name (The Shins, Death Cab, or Phantom of the Opera) or venue (9:30 or Kennedy Center) to
get a list of concerts.

You can purchase tickets on the order page. One caveat is getting the receipt page to render the way I wanted. The order
will process, but React won't render the receipt at the moment.

Some things to address:
* The API could support search better (ex. /artists)
* Autocomplete on the search form
* Unit tests
* A login page to get 'My Reservations'. This would allow a user to view reservations and confirm if needed.
* A venues page
* Show upcoming concerts on home page
