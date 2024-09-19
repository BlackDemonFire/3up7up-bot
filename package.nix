{
  nodejs,
  node-gyp,
  pnpm,
  python3,
  removeReferencesTo,
  lib,
  srcOnly,
  stdenv,
  ...
}:

let
  nodeSources = srcOnly nodejs;
in
stdenv.mkDerivation (finalAttrs: {
  pname = "3up7upbot";
  inherit ((builtins.fromJSON (builtins.readFile ./package.json))) version;
  src = lib.cleanSource ./.;

  nativeBuildInputs = [
    nodejs
    python3
    node-gyp
    pnpm.configHook
  ];

  pnpmDeps = pnpm.fetchDeps {
    inherit (finalAttrs) pname version src;
    installFlags = "--production";
    hash = "sha256-XaqnWs6xpqmOapEGrKzKsSo5JTK8190tOfnBsK0Gdg4=";
  };
  preBuild = ''
    for f in $(find -path '*/node_modules/better-sqlite3' -type d); do
      (cd "$f" && (
      npm run build-release --offline --nodedir="${nodeSources}"
      find build -type f -exec \
        ${lib.getExe removeReferencesTo} \
        -t "${nodeSources}" {} \;
      ))
    done
  '';
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
