<template>
  <ListTracks :items="localTracks"></ListTracks>
</template>

<script>
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'landing-page',
    components: {},

    computed: {
      ...mapState('Tracks', {
        localTracks: state => state.local,
      }),
    },

    methods: {
      ...mapActions('Tracks', [
        'setLocal',
      ]),
    },

    beforeMount() {
      this.$electron.ipcRenderer.send('GET_LOCAL_TRACKS');
      this.$electron.ipcRenderer.on('GOT_LOCAL_TRACKS', (e, tracks) => {
        this.setLocal(tracks);
      });
    },
  };
</script>

<style></style>
