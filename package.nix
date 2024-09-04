{
  nodejs,
  pnpm,
  lib,
  stdenv,
  ...
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "3up7upbot";
  inherit ((builtins.fromJSON (builtins.readFile ./package.json))) version;
  src = lib.cleanSource ./.;

  nativeBuildInputs = [
    nodejs
    pnpm.configHook
  ];

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    installFlags = "--production";
    hash = "sha256-eqpdCyCjrjXguhbiNxoeAs14ZLO2EqyZBWToTAZDYrA=";
  };
  buildPhase = ''
    runHook preBuild
    pnpm tsc
    runHook postBuild
  '';
  installPhase = ''
    runHook preInstall
    mkdir -p $out
    cp -r dist package.json node_modules $out
    runHook postInstall
  '';
})
