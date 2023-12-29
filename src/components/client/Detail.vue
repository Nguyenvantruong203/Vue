<template>
<div class="container mx-auto p-4">
  <div v-if="loading" class="text-center mt-4 text-gray-600">Loading...</div>
  <div v-else-if="error" class="text-center mt-4 text-red-600">{{ error }}</div>
  <div v-else class="bg-white shadow-lg rounded-lg overflow-hidden">
    <div class="p-4 flex">
      <div class="w-1/2 pr-4">
        <img v-if="product && product.image" class="w-full h-auto hover:grow hover:shadow-lg rounded-lg" :src="product.image" alt="Product Image" />
      </div>
      <div class="w-1/2">
        <h1 class="text-3xl font-bold mb-2">{{ product ? product.name : '' }}</h1>
        <p class="text-gray-700">{{ product ? product.description : '' }}</p>
        <div class="flex justify-between items-center mt-3">
          <h1 class="text-xl font-bold text-gray-800">{{ product ? '$' + product.price : '' }}</h1>
          <button class="px-4 py-2 bg-gray-800 text-white text-sm font-bold uppercase rounded hover:bg-gray-700" @click="addProduct()">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios";

export default {
  name: "Detail",
  data() {
    return {
      product: {},
      loading: false,
      error: null,
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.fetchProduct(productId);
  },
  methods: {
    fetchProduct(id) {
      this.loading = true; 
      axios
        .get(`http://127.0.0.1:8001/api/home/${id}`)
        .then((response) => {
          this.product = response.data.product;
          console.log(response);
          this.loading = false; 
        })
        .catch((error) => {
          console.error("Lỗi khi tải dữ liệu sản phẩm: " + error);
          this.error = "Lỗi khi tải dữ liệu sản phẩm"; 
          this.loading = false; 
        });
    },
    addProduct() {
      axios.post("http://127.0.0.1:8001/api/cart", this.product)
        .then((response) => {
          if (response.status === 200) {
            alert("Thêm sản phẩm vào giỏ hàng thành công!");
          }
        })
        .catch((error) => {
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng: " + error);
        });
    },
  },
};
</script>
