---
title: Demo
layout: page
permalink: /demo/
intro_image_absolute: true
intro_image_hide_on_mobile: false
---

Vous vous demandez certainement à quoi peut ressembler Piaf en pratique ? Nous vous proposons trois cas d'usage.

Le travail effectué pour chacun de ces cas d'usage est le suivant : nous avons récupéré toute la donnée textuelle, nous l'avons mise en forme puis injectée dans notre moteur de recherche Piaf. Nous avons ensuite créé une API pour chacun, et créé l'application frontend qui se branche sur l'API afin que vous puissiez intéragir avec l'API.

Note: nous hébergeons ces démonstrateurs sur nos serveurs, ils ne sont en aucun cas définis pour une mise en production en l'état. Nous contacter pour plus d'informaiton.

- ## Service-public

Voici le lien : [Piaf x Service-public.fr](http://search.piaf.etalab.studio/dila)

- ## La Commission Nationale de l'Informatique et des Libertés

Voici le lien : [Piaf x CNIL](http://search.piaf.etalab.studio/cnil)

- ## le Code des relation entre le public et les adminstrations

Voici le lien : [Piaf x CRPA](http://search.piaf.etalab.studio/crpa)


<br/>
#### Documentation technique
Pour plus d'information quand à la documentation technique, vous pouvez lire [ceci](https://etalab-ia.github.io/knowledge-base/piaf/index.html).

#### Performances
Pour toutes questions relatives aux performances de notre moteur de recherche, vous pouvez lire [ceci](https://etalab-ia.github.io/knowledge-base/piaf/howtos/performances.html). 

Nous avons comparé les performances de Piaf à celles de Google et du moteur de recherche interne de service-public.fr quand aux questions en langage naturel. Nous avons pour cela posé des questions et regardé si la bonne page de service-public faisait parti des trois premiers liens. Le résultat est sans appel : 
- Le moteur de recherche de Service-public est incapable aujourd’hui de traiter les questions en langague naturel (10% de bons résultats)
- Piaf (93%) est légèrement plus performant que Google (91%)