I created an [issue](https://github.com/electron-userland/electron-forge/issues/470)
on electron-forge repository.

---
I am using [Realm](https://github.com/realm/realm-js) in an Electron application, which is built with electron-forge. The packaging process gets stuck at "Preparing to Package Application for arch: x64" if `electron-forge start` is run before `electron-forge package`.  

I am developing on
* macOS `10.13.4`
* node js `8.10.0`
* npm `5.6.0`
* python `2.7.14`


Here is the example code to reproduce the never-end problem, [realm-in-electron](https://github.com/jacky-ttt/realm-in-electron).

The steps to successfully package the electron app:
1. clone the repository
2. `npm install`
3. `electron-forge package --platform=darwin --arch=x64`

Below is the log that the electron app is successfully packaged:
```
DEBUG=electron-packager electron-forge package
✔ Checking your system
⠋ Preparing to Package Application for arch: x64  electron-packager Electron Packager 11.1.0 +0ms
  electron-packager Node v8.10.0 +0ms
  electron-packager Host Operating system: darwin (x64) +0ms
  electron-packager Packager Options: {"asar":false,"overwrite":true,"packageManager":"npm","afterCopy":[null],"afterExtract":[null],"afterPrune":[null],"dir":"/Users/jackytsang/GithubRepos/realm_in_electron","arch":"x64","platform":"darwin","out":"/Users/jackytsang/GithubRepos/realm_in_electron/out","electronVersion":"1.8.4","quiet":true} +1ms
  electron-packager Target Platforms: darwin +0ms
  electron-packager Target Architectures: x64 +0ms
  electron-packager Inferring application name from productName in /Users/jackytsang/GithubRepos/realm_in_electron/package.json +0ms
  electron-packager Inferring appVersion from version in /Users/jackytsang/GithubRepos/realm_in_electron/package.json +0ms
  electron-packager Application name: realm_in_electron +10ms
  electron-packager Target Electron version: 1.8.4 +0ms
  electron-packager Ignored path regular expressions: [ '/node_modules/electron($|/)',
  '/node_modules/electron-prebuilt(-compile)?($|/)',
  '/node_modules/electron-packager($|/)',
  '/\\.git($|/)',
  '/node_modules/\\.bin($|/)',
  '\\.o(bj)?$' ] +0ms
⠹ Preparing to Package Application for arch: x64  electron-packager Downloading Electron with options {"platform":"darwin","arch":"x64","version":"1.8.4"} +0ms
⠧ Preparing to Package Application for arch: x64  electron-packager Creating /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template +7s
  electron-packager Extracting /Users/jackytsang/.electron/electron-v1.8.4-darwin-x64.zip to /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template +1ms
⠼ Preparing to Package Application for arch: x64  electron-packager Initializing app in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64 from /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template template +0ms
⠴ Preparing to Package Application for arch: x64  electron-packager Ignored paths based on the out param: [ '/Users/jackytsang/GithubRepos/realm_in_electron/out' ] +9s
✔ Preparing to Package Application for arch: x64
✔ Compiling Application
  electron-packager Pruning modules via: npm prune --production +0ms
✔ Preparing native dependencies: 1 / 1
⠋ Packaging Application  electron-packager Renaming Electron to realm_in_electron in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/MacOS +3m
  electron-packager Renaming Electron Helper to realm_in_electron Helper in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks/Electron Helper.app/Contents/MacOS +2ms
  electron-packager Renaming Electron Helper EH to realm_in_electron Helper EH in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks/Electron Helper EH.app/Contents/MacOS +0ms
  electron-packager Renaming Electron Helper NP to realm_in_electron Helper NP in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks/Electron Helper NP.app/Contents/MacOS +0ms
  electron-packager Renaming Electron Helper.app to realm_in_electron Helper.app in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks +1ms
  electron-packager Renaming Electron Helper EH.app to realm_in_electron Helper EH.app in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks +0ms
  electron-packager Renaming Electron Helper NP.app to realm_in_electron Helper NP.app in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64/Electron.app/Contents/Frameworks +0ms
  electron-packager Moving /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm_in_electron-darwin-x64 to /Users/jackytsang/GithubRepos/realm_in_electron/out/realm_in_electron-darwin-x64 +1ms
✔ Packaging Application
```

The steps to reproduce the "never-end" problem:
1. clone the repository
2. `npm install`
3. **`electron-forge start`**
4. `electron-forge package --platform=darwin --arch=x64`

Here is the log by runing `DEBUG=electron-packager electron-forge package --platform=darwin --arch=x64`
```
Jackys-MacBook-Pro:realm-in-electron jackytsang$ DEBUG=electron-packager electn-forge package --platform=darwin --arch=x64
✔ Checking your system
⠋ Preparing to Package Application for arch: x64  electron-packager Electron Packager 11.1.0 +0ms
  electron-packager Node v8.10.0 +0ms
  electron-packager Host Operating system: darwin (x64) +0ms
  electron-packager Packager Options: {"asar":false,"overwrite":true,"packageManager":"npm","afterCopy":[null],"afterExtract":[null],"afterPrune":[null],"dir":"/Users/jackytsang/GithubRepos/realm-in-electron","arch":"x64","platform":"darwin","out":"/Users/jackytsang/GithubRepos/realm-in-electron/out","electronVersion":"1.8.4","quiet":true} +0ms
  electron-packager Target Platforms: darwin +1ms
  electron-packager Target Architectures: x64 +0ms
  electron-packager Inferring application name from productName in /Users/jackytsang/GithubRepos/realm-in-electron/package.json +0ms
  electron-packager Inferring appVersion from version in /Users/jackytsang/GithubRepos/realm-in-electron/package.json +1ms
  electron-packager Application name: realm-in-electron +6ms
  electron-packager Target Electron version: 1.8.4 +0ms
  electron-packager Ignored path regular expressions: [ '/node_modules/electron($|/)',
  '/node_modules/electron-prebuilt(-compile)?($|/)',
  '/node_modules/electron-packager($|/)',
  '/\\.git($|/)',
  '/node_modules/\\.bin($|/)',
  '\\.o(bj)?$' ] +0ms
  electron-packager Downloading Electron with options {"platform":"darwin","arch":"x64","version":"1.8.4"} +0ms
⠸ Preparing to Package Application for arch: x64  electron-packager Removing /Users/jackytsang/GithubRepos/realm-in-electron/out/realm-in-electron-darwin-x64 due to setting overwrite: true +287ms
⠼ Preparing to Package Application for arch: x64  electron-packager Creating /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template +2s
  electron-packager Extracting /Users/jackytsang/.electron/electron-v1.8.4-darwin-x64.zip to /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template +1ms
⠧ Preparing to Package Application for arch: x64  electron-packager Initializing app in /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64/realm-in-electron-darwin-x64 from /var/folders/9y/7_hsjyyx7jx5dph83941r6tc0000gn/T/electron-packager/darwin-x64-template template +0ms
⠇ Preparing to Package Application for arch: x64  electron-packager Ignored paths based on the out param: [ '/Users/jackytsang/GithubRepos/realm-in-electron/out' ] +4s
⠧ Preparing to Package Application for arch: x64
```

config.forge in package.json:
```
"config": {
    "forge": {
      "make_targets": {
        "win32": [
          "squirrel"
        ],
        "darwin": [
          "zip"
        ],
        "linux": [
          "deb",
          "rpm"
        ]
      },
      "electronPackagerConfig": {
        "packageManager": "npm"
      },
      "electronWinstallerConfig": {
        "name": "realm_in_electron"
      },
      "electronInstallerDebian": {},
      "electronInstallerRedhat": {},
      "github_repository": {
        "owner": "",
        "name": ""
      },
      "windowsStoreConfig": {
        "packageName": "",
        "name": "realminelectron"
      }
    }
  }
```
