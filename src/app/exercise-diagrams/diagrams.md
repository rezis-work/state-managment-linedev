# entitiy relationship diagram

- Destination

  - id

- Homes

- id
- destinationId

- User
- Name
- Id

# Sequence diagram

UI -> AirBnB search service: Find search results for this query (where, checkin in, checkout, and # of guests)
Airbnb search service -> UI: Results
UI -> UI: Select home
UI -> AirBnB API: Booking
AirBnb API -> UI: Payment infromation
UI -> Payment processor

# state diagram

Start with destination
when the destination si inpit, put in the check in date
then put in the checkout data
then add the number of guests
and then when user presses search, it'll take us to a search result page
the search results will be loading, and eventualy show up
the user can click on one of the home and be taken to the details page
they can go back from details page and back to search page
