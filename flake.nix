{
  description = "Description for 3up7upbot";

  inputs = {
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.treefmt-nix.flakeModule ];

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];
      perSystem =
        { pkgs, self', ... }:
        {
          treefmt = {
            projectRootFile = "flake.nix";
            programs = {
              biome.enable = true;
              nixfmt.enable = true;
              deadnix.enable = true;
              statix.enable = true;
            };
          };
          # Per-system attributes can be defined here. The self' and inputs'
          # module parameters provide easy access to attributes of the same
          # system.

          # Equivalent to  inputs'.nixpkgs.legacyPackages.hello;
          packages.bettere-sqlite3 = pkgs.callPackage ./nix/pkgs/better-sqlite3.nix { };
          packages.default = pkgs.callPackage ./package.nix { };
          packages.dockerImage = pkgs.dockerTools.buildLayeredImage {
            name = "3up7upbot";
            tag = "latest";
            contents = pkgs.lib.attrValues { inherit (pkgs) cacert nodejs; };
            config = {
              Cmd = [
                "${pkgs.nodejs}/bin/node"
                "${self'.packages.default}/dist/index.js"
              ];
              WorkingDir = "${self'.packages.default}";
              Env = [
                "DATA_DIR=/data"
                "SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt"
              ];
            };
          };
          devShells.default = pkgs.mkShell {
            buildInputs = pkgs.lib.attrValues {
              inherit (pkgs)
                nixfmt-rfc-style
                nodejs
                python3
                biome
                nil
                statix
                deadnix
                ;
              inherit (pkgs.nodePackages) pnpm;
            };
          };
        };
      flake = {
        # The usual flake attributes can be defined here, including system-
        # agnostic ones like nixosModule and system-enumerating ones, although
        # those are more easily expressed in perSystem.

      };
    };
}
