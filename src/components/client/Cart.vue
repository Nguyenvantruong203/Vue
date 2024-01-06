<template>
  <div class="p-4 mx-auto mt-10">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="flex items-center justify-between px-4 py-3 bg-gray-200">
        <h1 class="text-lg font-bold">Shopping Cart</h1>
        <span class="text-gray-600">({{ cartItems.length }} items)</span>
      </div>
      <div v-if="cartItems.length === 0" class="p-4 text-center">
        <p>Your cart is empty.</p>
      </div>
      <div v-else class="p-4">
        <div class="flex items-center mb-4 gap-8 text-gray-700 font-bold">
          <div class="w-1/12 pl-14">No.</div>
          <div class="w-2/12">Image</div>
          <div class="w-3/12">Product Name</div>
          <div class="w-2/12">Price</div>
          <div class="w-2/12">Quantity</div>
          <div class="w-2/12 pl-20">Total</div>
          <div class="w-1/12">Action</div>
        </div>
        <div v-for="(item, index) in cartItems" :key="index" class="flex items-center mb-4 gap-4">
          <div class="w-1/12 text-center">{{ index + 1 }}</div>
          <img class="w-16 h-16 object-contain rounded-lg text-center" :src="item.image" alt="Product">
          <div class="w-3/12 text-center">{{ item.name }}</div>
          <div class="w-2/12 text-center">${{ item.price }}</div>
          <div class="w-2/12 text-center">{{ item.quantity }}</div>
          <div class="w-2/12 text-center">${{ item.quantity * item.price }}</div>
          <button class="w-1/12 btn btn-danger text-center" @click="removeFromCart(index)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
        <div class="px-4 py-3 bg-gray-200">
          <div class="flex justify-between items-center">
            <span class="font-bold text-lg">Total:</span>
            <span class="font-bold text-lg">${{ totalAmount }}</span>
          </div>
          <button class="block w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" @click="checkout()">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const cartItems = ref(JSON.parse(sessionStorage.getItem('cart')) || []);

    const addToCart = (product) => {
      const cart = cartItems.value;
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.price = product.price * existingProduct.quantity;
      } else {
        cart.push(product);
      }
      sessionStorage.setItem('cart', JSON.stringify(cart));
    };

    const removeFromCart = (index) => {
      cartItems.value.splice(index, 1);
      sessionStorage.setItem('cart', JSON.stringify(cartItems.value));
    };

    const clearCart = () => {
      cartItems.value = [];
      sessionStorage.removeItem('cart');
    };

    const checkout = () => {
      alert('Đơn hàng đã được thanh toán thành công!');
      clearCart();
    };

    // Sử dụng computed để tính tổng số tiền
    const totalAmount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity * item.price, 0);
    });

    return {
      cartItems,
      totalAmount,
      addToCart,
      removeFromCart,
      clearCart,
      checkout
    };
  },
};
</script>