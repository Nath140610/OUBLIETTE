# OUBLIETTE

Un site pour créer ses propres escape games et y enfermer ses potes.

Le site : https://nath140610.github.io/OUBLIETTE/

## C'est quoi

Tu fabriques ta partie salle par salle. Dans chaque salle, tu écris une énigme, tu mets un indice si tu veux, et tu choisis la réponse qui ouvre la porte.

Tu peux aussi décorer la pièce en 3D avec des objets à fouiller : une lettre posée sur une table, un coffre fermé avec un code, une vieille horloge, un tableau... C'est là que tu caches tes indices.

Quand ta partie est prête, elle reçoit un code à 4 chiffres. Tes amis le tapent sur la page d'accueil et c'est parti.

## Comment ça marche

Pour créer une partie, tu cliques sur « Créer un escape game ». Tu donnes un nom, un petit texte d'intro et un temps limite. Ensuite tu ajoutes tes salles.

Dans la pièce 3D, tu ajoutes des objets puis tu cliques sur le sol pour les placer. Pour chaque objet, tu peux changer la couleur, le tourner, le monter (pour le poser sur une table), écrire ce qu'on trouve dessus, et le fermer avec un code.

Pour jouer, tu tournes autour de la pièce avec la souris, tu zoomes avec la molette et tu cliques sur les objets pour les fouiller. Si un objet est fermé, il faut trouver le code. Quand tu as la réponse de la salle, tu passes à la suivante. Attention au chrono.

## Avec quoi c'est fait

Du HTML, du CSS et du JavaScript tout simple. La 3D est faite avec Three.js, et tous les objets sont construits directement dans le code. Les parties sont enregistrées dans le navigateur, et le site est hébergé sur GitHub Pages.

## Les fichiers

```
index.html    l'accueil
creer.html    l'éditeur
creer.js
jouer.html    la liste de mes parties
partie.html   le jeu
partie.js
scene3d.js    la pièce en 3D et les objets
commun.js     l'enregistrement des parties
style.css
```

## Ce qui ne marche pas encore

Pour l'instant, une partie reste dans le navigateur où elle a été créée. Si tu donnes ton code à quelqu'un sur un autre ordi ou un téléphone, il ne la trouvera pas. Il faudra une base de données en ligne pour régler ça.

## Ce que j'aimerais ajouter

Pouvoir partager les parties pour de vrai, avoir plus d'objets, pouvoir ramasser des objets et les garder sur soi, et mettre un peu de son pour l'ambiance.

Projet fait pour PHANTOM de Hack Club.
