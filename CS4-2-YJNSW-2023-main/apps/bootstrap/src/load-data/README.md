# initial-data-load

These scripts have two purposes:

1. Load test data for local development and testing
2. Help set up strapi for the first time

Since the latter is a one-off activity, they are optimised for the former.

## How is data related?

If a type of content is used in a relation, it must have an `id` field. For example, `job-roles` are referenced in
the `role-progression` content type, so `job-roles` must have a unique `id` attribute.

## One-time Strapi setup

CSV files are populated with the initial content. These must then be converted to JSON files, copied into the respective
folders here and then run the `bootstrap` script. It is recommended to keep the test data as small as possible to
minimise maintenance costs.
