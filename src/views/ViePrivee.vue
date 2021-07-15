<template>
  <div>
    <Head/>
    <h2 class="bold">Désinscription</h2>
    <div class="max-w-screen-sm w-11/12	 text-center m-auto">
        
        <p>Nous utilisons Matomo, un outil libre, paramétré pour être en conformité avec la recommandation « Cookies » de la CNIL. Cela signifie que votre adresse IP, par exemple, est anonymisée avant d'être enregistrée. Il est donc impossible d'associer vos visites sur ce site à votre personne.</p>
        <p>Pour l'outil Matomo, vous pouvez décider de ne jamais être suivi, y compris anonymement : </p>
    </div>

    <div class="mb-1 mt-6 fr-search-bar justify-center">
        <iframe
        style="border: 0; height: 200px; width: 600px;"
        src="https://stats.data.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2d3d50&fontSize=1rem&fontFamily=Avenir"
        ></iframe>
    </div>

    <router-link :to="{ name: 'Home' }">
      Retour
    </router-link>

  </div>
</template>

<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'

export default {
  name: 'Home',
  components: {
    Head
  }
}
</script>
