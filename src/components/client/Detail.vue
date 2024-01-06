<template>
  <div class="max-w-screen-xl mx-auto p-4">
    <div v-if="loading" class="flex justify-center items-center h-64 text-gray-600">
      <span class="text-xl">Loading...</span>
    </div>
    <div v-else-if="error" class="flex justify-center items-center h-64 text-red-600">
      <span class="text-xl">{{ error }}</span>
    </div>
    <div class="bg-gray-100 text-gray-800 rounded-lg shadow-md p-6 relative">
      <!-- Màu nền xám nhạt, màu chữ xám đậm, viền bo tròn và đổ bóng -->
      <div class="p-4 flex">
        <div class="w-1/2 pr-4">
          <img v-if="product && product.image" class="w-full h-auto hover:grow hover:shadow-lg rounded-lg"
            :src="product.image" alt="Product Image" />
        </div>
        <div class="w-1/2">
          <h1 class="font-bold text-2xl py-4">{{ product ? product.name : '' }}</h1> <!-- Độ lớn và font chữ lớn hơn -->
          <p class="text-xs">
            Chi tiết sản phẩm
          </p>
          <p class="text-gray-700 w-[80%]">{{ product ? product.description : '' }}</p>

          <div class="text-xl text-gray-800 my-6">
            <span class="text-red-500">{{ product ? '$' + product.price : '' }}</span>
            <span class="text-sm text-gray-500">/ sản phẩm</span>
          </div>

          <label for="quantity" class="block mt-4">Quantity :</label> <!-- Khoảng cách giữa các thành phần -->
          <input v-model.number="selectedQuantity" type="number" id="quantity"
            class="text-lg px-3 py-2 mt-1 w-24 border rounded-md" min="1" max="100">
          <!-- Kích thước và bo tròn cho ô nhập liệu -->
          <label for="size" class="block mt-4">S I Z E:</label> <!-- Khoảng cách giữa các thành phần -->
          <select class="text-lg px-3 py-2 mt-1 w-24 border rounded-md" id="size">
            <!-- Kích thước và bo tròn cho dropdown -->
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <h1 class="text-3xl font-bold my-4"></h1>
          <p class="text-xs">
            Phí vận chuyển được tính tại bước thanh toán
          </p>

          <div class="flex justify-between items-center mt-3 my-6">
            <button
              class="px-4 py-2 bg-gray-800 text-white text-sm font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              @click="addToCart">Add to Cart</button>
          </div>
        </div>
        <span class="absolute top-2 right-2 bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full text-xs">Còn hàng</span>
        <!-- Chỉnh sửa lớp và kiểu chữ cho đẹp -->
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
      selectedSize: null, // Added selectedSize for the select dropdown
      selectedQuantity: 1, // Thêm trường selectedQuantity để lưu số lượng sản phẩm được chọn

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
    addToCart() {
      try {
        const { id, name, price, image } = this.product;
        const cartItem = {
          id,
          name,
          price,
          image,
          quantity: this.selectedQuantity, // Số lượng được chọn từ giao diện
        };

        this.addToCartAction(cartItem);
        document.getElementById('thongbao').classList.remove('d-none');
      } catch (error) {
        alert('Thêm sản phẩm vào giỏ hàng thành công!');
      }
    },
    addToCartAction(cartItem) {
      const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === cartItem.id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += cartItem.quantity;
      } else {
        cart.push(cartItem);
      }
      sessionStorage.setItem('cart', JSON.stringify(cart));
      // Hiển thị thông báo bằng jQuery
      $('#thongbao').removeClass('d-none').addClass('d-block');
    }
  },
};

</script>
