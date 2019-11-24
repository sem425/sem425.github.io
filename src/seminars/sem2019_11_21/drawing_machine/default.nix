with import <nixpkgs> {};
let python_env = python3.withPackages (ps: with ps;
      [
      imageio
      jupyter
      matplotlib
      numpy
      pillow
      scikitimage
      scipy
      tqdm
      sympy
      ]);

    link = "python-env";
    shellHook = ''
         nix-store --add-root python-env --indirect -r ${python_env}
    '';

in python_env.env.overrideAttrs (x: { shellHook = shellHook; })
