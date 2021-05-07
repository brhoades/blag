let
  pkgs = import <nixpkgs> {};
in with pkgs; stdenv.mkDerivation {
    name = "vredditor";
    buildInputs = [
      ruby_2_6
      nodejs_latest
      yarn
    ];
  }

