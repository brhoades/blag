let
  pkgs = import <nixpkgs> {};
in
  with pkgs; stdenv.mkDerivation {
    name = "blag";
    buildInputs = [
      nodejs_latest
      yarn
      ruby_2_6
    ];
  }

