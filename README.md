# Gulp Setup for Frontend Development

## Usage
1. Clone/copy the starter setup into your local server (XAMPP/WebDemo)
2. Remove the .git hidden folder
3. Initialize git with `git init .` to start the project
4. Commit the existing code in an initial commit `git -c user.name="NAME" -c user.email="EMAIL" commit -m "Commit Message"`
5. Start coding the project and keep commiting on `git`

## Gulp Tasks
| Task | Description |
|---|---|
| `default` |  |
| `styles` | Compile SASS/SCSS styles |
| `scripts` | Compile and merge all JS files. |
| `images` | Optimize images and copy them to `dist` folder. |
| `iconfonts` | Converts SVG icons into a custom iconfont. Check `./dist/icons/index.html` for list of icons and codes. |
| `fonts` | Copy fonts to `dist` folder. |

## TODO
* [ ] Fix rendering of iconfonts in `./dist/icons/index.html`
* [x] ~~Fix `start` task~~ (_28 Sept 2018_)
* [x] ~~Complete BrowserSync functionality~~ (_28 Sept 2018_)
* [ ] Update *README.md* with complete documentation
* [x] ~~Update scripts in *gulpfile.js*~~ (_28 Sept 2018_)
* [ ] Code cleanup
* [ ] Sourcemap folder path is repeated (check in browser inspector)
* [ ] Create task to remove unused CSS ?

## References
* https://buddy.works/guides/how-create-webfont-from-svg-files
* https://github.com/stevesohcot/basic-sample-php-template-example
* https://medium.com/@felipebernardes/solving-browser-cache-hell-with-gulp-rev-6349a293abb9
