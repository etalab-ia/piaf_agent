---
title: Contact
layout: contact
bodyClass: page-contact
---

Ecrivez-nous, nous serons enchantés de répondre à vos questions !

<br/>
# L'équipe
L'équipe de Piaf fait partie d'Etalab. Si vous souhaitez en apprendre plus sur Etalab, vous pouvez vous renseigner sur notre [blog](https://www.etalab.gouv.fr/equipe).

Les principaux artisans du projet Piaf sont listés ici :

<div class="container pt-1 pb-6">
    <div class="row pt-0 pb-6">
        {% assign teams = site.team | where: "promoted", empty | sort: "weight" %}
        {% for team in teams %}
        <div class="col-12 col-md-4 mb-3">
            <div class="team team-summary">
                {% if team.image %}
                <div class="team-image">
                    <img alt="{{ team.title }}" class="img-fluid m-0" src="{{ team.image | relative_url }}" />
                </div>
                {% endif %}
                <div class="team-meta">
                    <h2 class="team-name"><a href="{{ team.linkedinurl | relative_url }}">{{ team.title }}</a></h2>
                    <p class="team-description">{{ team.jobtitle }}</p>
                    <a class="team-content" href="mailto:{{team.email}}">email</a>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>