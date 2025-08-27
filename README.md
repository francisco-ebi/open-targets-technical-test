# Open Targets Technical Test

Made with Vite as build tool and Yarn to manage dependencies.

Libraries used:
React
Picocss as a minimal css framework
ApolloClient for GraphQL client
Nivo as charting library

## How to run

You will need Node.js and Yarn already installed.
After you clone this repository, navigate to the folder and run:
`yarn install`
to install all dependencies.
After that, you need to run:
`yarn dev`
and the app will be available in [http://localhost:5173/](http://localhost:5173/)

## List of changes I made

- I had to update the GraphQL query, and added approvedName inside target
- To build a link to the target profile page that didn't display a 404, I used the target id property
