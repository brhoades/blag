{
  description = "blag shell and devenv";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { nixpkgs, flake-utils, ... }: let
    pkgsFor = system: import nixpkgs {
      inherit system;
    }; in (flake-utils.lib.eachDefaultSystem (system: {
      inherit nixpkgs;

      # envrc
      devShells.default = with (pkgsFor system); mkShell {
        buildInputs = [
          nodejs_latest
          pandoc
          inotify-tools
        ] ++ (with nodePackages; [
          yarn
          sass
        ]);
      };
    }));
}

