# car-configurator

A three-step form to configure a car: who you are, the vehicle type, its
colour and wheel size; then four ratings that must add up to fifty and two
or three options from the list of that type; then the summary. Every step
is checked before the next one opens, the errors show all at once on
submit and clear one by one as they are fixed, and what you entered
follows you from page to page.

HTML, Bootstrap 5 and plain JavaScript, no framework, no build step, named
functions only.

## Screenshots

Coming with the first release.

## How it works

Described with the first release.

## Running it

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

## Résumé

Un formulaire en trois pages pour configurer une voiture : identité, type
de véhicule, couleur et grosseur des roues ; puis quatre caractéristiques
dont la somme doit faire 50 et deux ou trois options propres au type ; puis
le résumé. Chaque page est validée avant de passer à la suivante : toutes
les erreurs apparaissent à la soumission, en rouge, et chacune disparaît
dès qu'elle est corrigée, avec un encadré vert. Les couleurs dépendent du
type, les options sont créées dynamiquement selon le type, les données
passent d'une page à l'autre par `sessionStorage`. HTML, Bootstrap 5 et
JavaScript natif, fonctions nommées uniquement.

## Licence

MIT. See [LICENSE](LICENSE). The banner is a public photo on
[Unsplash](https://unsplash.com/license), linked by URL.
