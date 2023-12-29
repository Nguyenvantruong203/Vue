<template>
  <a-card title="Cart" style="width: 100%" class="ms:w-full text-center">
    <div class="w-full">
      <a-table :dataSource="products" :columns="columns" :scroll="{ x: 586 }">
        <template #bodyCell="{ column, index, record }">
          <template v-if="column.key === 'index'">
            <span>{{ index + 1 }}</span>
          </template>

          <template v-if="column.key === 'image'">
            <div class="product-image">
              <img :src="record.image" alt="Hình ảnh" />
            </div>
          </template>

          <template v-if="column.key === 'action'">
            <div class="product-action">
              <a-button type="primary" class="bg-red-600" @click="deleteProduct(record.id)">
                <i class="fa-solid fa-trash-can"></i>
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
      <p class="total-amount">Total Price: {{ total }}</p>
    </div>
  </a-card>
</template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    setup() {
      const products = ref([]);
    const total = ref([]);;
      const columns = [
        {
          title: 'No',
          key: 'index',
        },
        {
          title: 'Tên sản phẩm',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Giá',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'image',
          key: 'image',
        },
        {
          title: 'Hành động',
          key: 'action',
          fixed: 'right',
        },
      ];
  
      const getUser = () => {
        axios.get('http://127.0.0.1:8001/api/cart')
          .then((response) => {
            products.value = response.data.products;
            total.value = response.data.total_price;
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      const deleteProduct = async (productId) => {
        try {
          const response = await axios.delete(`http://127.0.0.1:8001/api/cart/${productId}`);
          console.log(response.data.message);
          products.value = products.value.filter((product) => product.id !== productId);
        } catch (error) {
          console.error(error.response.data.message);
        }
      };
  
      getUser();
  
      return {
        products,
        columns,
        deleteProduct,
        total

      };
    },
  });
  </script>
  
  <style scoped>

.product-image {
  width: 80px; 
  height: 80px;
}
.product-action {
  display: flex;
  gap: 10px; 
}

.total-amount {
  font-weight: bold; 
  margin-top: 20px;
}
</style>