<template>
    <div class="about">
      <Header></Header>
        <Cart></Cart>
      <Footer></Footer>
    </div>
  </template>
  
  <script>
  import Header from '../components/client/Header.vue'
  import Footer from '../components/client/Footer.vue'
  import Cart from '../components/client/Cart.vue'
  
  export default {
    name: "cart",
    components: {
      Cart,
      Header,
      Footer
    },
    data() {
      return {};
    }
  };
  </script>
  
  <style></style>
  