# QRLambda
Tracking QR scans without asking for GPS from users.

# The Situation

One of my hobbies is producing improv shows. Part of that includes putting up posters. Since this is a time intensive task (around five minutes per poster), determining which posters move the most tickets could be useful. QR code scans are probably the best option.

A QR code that links to a website that asks for your location is a non-starter. If I rent a U-Haul, I understand that my location is important for the service. Someone casually interested in tickets for an improv show shouldn't have to share their location, and the reasoning "so we know where to put up posters" only works if the person is motivated to help. Not a very good starting point.

Finally, because there are months where there are multiple shows, months where there aren't any shows, and months with only one show, using an out of the box monthly QR code service doesn't make sense.

# The Task

Create a way to have QR codes on a poster that can identify where the QR code was scanned.

Since the posters are being posted in a specific location, whoever puts the poster up can take a geotagged picture, or just take a note of where it was. Maybe this could be streamlined, I wonder if there's a way to obscure part of the QR code and get a different result.

If each poster has a different QR code, the QR code can include information (like an identifying number) in the address that gets processed by an API.

To make sure this is a marginal and not a monthly cost, a serverless technology such as AWS lambda should be used.