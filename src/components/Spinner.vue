<template>
  <div>
    <div id="loading"></div>
  </div>
</template>

<style scoped>
#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(187, 234, 255,.3);
  border-radius: 50%;
  border-top-color: #47abd9;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
</style>
