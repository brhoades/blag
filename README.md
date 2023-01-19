# Blag
My humble blag sorce code.

## Setup
Dependencies:
 * nix
 * direnv

Setup steps:
  1. `direnv allow` in the repository
  2. `bundle update --bundler`
  3. `yarn install`

## Development
`make serve` and then access the URL provided.

## Deployment
Commit all changes to main. Run `make publish`.
