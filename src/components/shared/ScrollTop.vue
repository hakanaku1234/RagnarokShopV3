<template lang="pug">
  div
    a#clickTop(href="#" title="TOP" )
      font-awesome-icon(:icon="['fas', 'arrow-circle-up']" size="3x")
</template>

<script>
/* global $ */
export default {
  data() {
    return {
    };
  },
  mounted() {
    $(() => {
      $(window).scroll(() => {
        if ($(window).scrollTop() >= 50) {
          $('#clickTop').fadeIn();
        } else {
          $('#clickTop').fadeOut();
        }
      });
    });
    $('#clickTop').click((event) => {
      event.preventDefault();
      $('html,body').animate({ scrollTop: 0 }, 500);
    });
  },
};
</script>

<style lang="scss">
#clickTop {
  position: fixed;
  bottom: 5%;
  right: 2%;
  display: none;
  z-index: 2;
}
</style>
