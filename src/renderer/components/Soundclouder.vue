<template>
  <audio-player :html5="true" :sources="audioSources"></audio-player>
</template>

<script>
  import AudioPlayer from './AudioPlayer.vue';

  export default {
    name: 'soundclouder',
    components: {
      AudioPlayer
    },
    beforeMount() {
      this.$http
        .post('https://soundpump.net/download', {
          uri: 'https://soundcloud.com/ahmed_abo_elmakarem/hq-cairokee-elnsheed',
        })
        .then(({ data: { downloadUrl: url } }) => {
          this.$electron.ipcRenderer.send('download', url);
        });

      this.$electron.ipcRenderer.on('data', console.log);
      this.$electron.ipcRenderer.on('downloaded', console.dir);
    },
    data() {
      return {
        audioSources: [
          'static/main.mp3',
        ],
      };
    },
  };
</script>

<style></style>
