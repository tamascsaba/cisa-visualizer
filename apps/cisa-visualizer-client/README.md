Problem Statement:

Develop a Single Page Application which visualises data about actively exploited vulnerabilities from CISA [https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json]


UI need to display following information

Charts:

-   Pie Chart for Top 10 vendorProject (based on number of vulnerabilities)
-   Bar chart to show total Number of vulnerabilities added each month (based on dateAdded)

Table:

Client side paginated table showing list of all CVEs provided by source with following columns

-   CVE ID
-   vendorProject
-   Product
-   dateAdded
-   shortDescription

Make sure the application is modular, because during the interview we will be asking you to make small changes to the application to get additional fields or charts based on the returned data.

Notes:

-   Use Angular for front end & Node.js/Express for backend.

-   Would be great if you can try to match the look and feel of our  CovertSwarm  platform [https://www.covertswarm.com/attack-surface-management-platform]
-   If you can take into account build, unit test, deployment, documentation aspect for the app you developed that would be a plus
