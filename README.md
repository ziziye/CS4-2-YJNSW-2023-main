# CS4-2 Youth Justice NSW Career Pathways Tool

## About

This project aims to design an interactive tool which allows the front end user to see career progression options within
Youth Justice.

## Key Requirements

- A small group of staff will need:
  - Special access
  - The ability to modify, add and delete information, and create new links as roles are created/deleted
- Users will be able to:
  - Move between roles to find information about other roles and the types of experience they need to get to the role
  - See information about their current role including:
    - descriptions
    - capabilities
    - development examples
    - goal library for their development plans
  - Compare their current role to the next role in their career path and see:
    - Difference between the capabilities of the current role and next role
    - Activities they can do in their current role to prepare them for the next role
    - Development examples
    - Development required which can’t be obtained in current role including qualifications
    - Goal library

## Prerequisites

1. [Docker](https://docs.docker.com/engine/install/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [GNU Make](https://www.gnu.org/software/make/)

## Initial Setup

1. Clone this repo
2. Set up environment variables for Strapi
   - `cp apps/cms/.env.example apps/cms/.env`
3. Start the local stack. This will take a while the first time you run it
   - `make start`
4. Wait for it to start. You can watch the logs and wait for `strapi` to tell you it's ready
   - `make logs`
5. Connect to strapi on [http://localhost:1337/admin](http://localhost:1337/admin)
6. Create an admin user, log in, and create two API tokens by going to Settings > API Tokens. One should be read-only
   and the other full-access. Copy the tokens.
7. Set up environment variables for the webapp
   - `cp apps/web/.env.example apps/web/.env`
   - Update `REACT_APP_STRAPI_BEARER_TOKEN` with the read-only API token
8. Set up environment variables for the bootstrap script
   - `cp apps/bootstrap/.env.example apps/bootstrap/.env`
   - Update `STRAPI_BEARER_TOKEN` with the full-access API token
9. Restart the stack
   - `make restart`
10. Run bootstrap
    - `make bootstrap`
11. Connect to the webapp on [http://localhost:3000](http://localhost:3000)
12. When you're done, shut it down
    - `make stop`
13. See all available make commands
    - `make help`

## Git Process

1. Check out main and get the latest changes
   - `git checkout main`
   - `git pull`
2. Create a branch for your story
   - `git checkout -b my-branch`
3. Make your changes and commits
   - `make commit`
4. Push your branch
   - `git push`
5. Then in GitHub, raise a Pull Request
6. Once approved, merge it

Notes:

- Keep the PRs small and merge them frequently to avoid pain and misery.
- Commit messages must follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard which
  is based on the [Angular Commits Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit)
- A [linear commit history](https://www.bitsnbites.eu/a-tidy-linear-git-history) is enforced to keep it simple to see
  who did what, in what order

## Integration Tests

End to End (e2e) integration tests are done using [cypress](https://docs.cypress.io/). They can be run in two ways:
inside docker or directly on your local.

### Local setup

- Additional prerequisites
  - Install `node` - recommended v16.14.2
- Start the application stack
  - `make start`
- Open the test runner. This will install cypress the first time you run it
  - `make e2e-local`
- Alternatively, just run the tests
  - `make e2e-local-run`

### Run in docker

- Start the application stack
  - `make start`
- Run the tests
  - `make e2e`

## Group 1 Stubs

- We stub the API responses we are expected from group 1 using [stubby](https://github.com/mrak/stubby4node)
- To add a new stub:
  - Update `apps/stubs/src/stubs.yml` with the request pattern to match
  - If the response is more than one line, create a JSON file with the response body in `apps/stubs/src/responses`
  - The response sub-folder names should match the API path in an intuitive way (e.g. `/roles` API goes
    in `responses/roles`)

## Design Patterns

- React
  - [Atomic Design](https://benjaminwfox.com/blog/tech/atomic-design-for-developers)
  - [Container and Presentational Components](https://medium.com/@dan_abramov/smart-and-dumb-components)
    - Use container components for non-trivial business logic
  - [Reducer pattern](https://www.thisdot.co/blog/creating-a-global-state-with-react-hooks) for "global" application
    state using React hooks
    - Structured using [Redux recommendations](https://redux.js.org/usage/structuring-reducers/structuring-reducers)
- CSS
  - The NSW Digital CSS assets use the [Bootstrap grid system](https://getbootstrap.com/docs/4.1/layout/grid/)
- Project
  - [Three Musketeers](https://3musketeers.io/)

## Links

- [Team Sharepoint Site](https://unisydneyedu.sharepoint.com/sites/COMP5052CS4-22022S1)
