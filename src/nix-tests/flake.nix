{
  description = "Environment for devguard documentation nix tests";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
  flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShellNoCC {
        packages = with pkgs; [
          git
          curl
          docker-compose
          trivy
          cosign
          openssl
          nodejs
          python3
          go
          maven
          php
          phpPackages.composer
          jq
          crane
        ];
      };
    });
}
