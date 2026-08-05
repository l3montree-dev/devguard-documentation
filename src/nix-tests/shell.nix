let
  pkgs = import <nixpkgs> { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
  packages = with pkgs; [
    git
    curl
    docker-compose
    trivy
    cosign
    openssl
  ];
}