<template>
  <footer class="fr-footer border-0" role="contentinfo" id="footer">
    <div class="fr-container">
      <div class="fr-footer__bottom">
        <ul class="fr-footer__bottom-list">
          <li class="fr-footer__bottom-item">
            <a
              class="fr-footer__bottom-link"
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/etalab-ia/piaf_agent"
              >Code source</a
            >
          </li>
          <li class="fr-footer__bottom-item">
            <router-link class="fr-footer__bottom-link"  :to="{ name: 'ViePrivee' }">
              Vie privée &amp; cookies
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="https://etalab-ia.github.io/piaf_agent/installation/">FAQ</a>
          </li>
          <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="mailto:piaf@data.gouv.fr">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>