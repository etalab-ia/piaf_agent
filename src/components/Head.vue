<template>
  <div class="home">
    <router-link :to="{ name: 'Home' }">
      <header role="banner" class="fr-header">
        <div class="fr-header__body">
            <div class="fr-container">
                <div class="fr-header__body-row">
                    <div class="fr-header__brand fr-enlarge-link">
                        <div class="fr-header__brand-top">
                            <div class="fr-header__logo">
                                <p class="fr-logo">
                                    République
                                    <br>Française
                                </p>
                            </div>
                        </div>
                        <div class="fr-header__service">
                            <p class="fr-header__service-title">{{clientName}}</p>
                          <!-- <p class="fr-header__service-tagline">subtitle</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </header>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Head',
  data: () => ({
    clientName: global.piafAgentConfig.DISPLAY_NAME
  }),
});
</script>
