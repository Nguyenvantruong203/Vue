<template>
  <div class="about">
    <Header></Header>
    <Detail></Detail>
    <Connect></Connect>
    <Footer></Footer>
  </div>
</template>

  
<script>
import Header from '../components/client/Header.vue'
import Footer from '../components/client/Footer.vue'
import Detail from '../components/client/Detail.vue'


export default {
  name: "about",
  components: {
    Detail,
    Header,
    Footer
  },
  data() {
    return {};
  }
};
</script>
