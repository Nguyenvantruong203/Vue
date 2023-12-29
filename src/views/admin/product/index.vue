<template>
    <a-card title="Product" style="width: 100%" class="ms:w-full">
        <div class="w-full flex justify-end mb-5">
            <a-button type="primary" class="bg-blue-600 ">
                <router-link :to="{ name: 'admin-product-create' }">
                    <i class="fa-solid fa-plus"></i>
                </router-link>
            </a-button>
        </div>
        <div class="w-full">
            <a-table :dataSource="products" :columns="columns" :scroll="{ x: 586 }">
                <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'index'">
                        <span>
                            {{ index + 1 }}
                        </span>
                    </template>

                    <template v-if="column.key === 'image'">
                        <div>
                            <img :src="record.image" alt="Hình ảnh" />
                        </div>
                    </template>

                    <template v-if="column.key === 'action'">
                        <div class="flex gap-2">
                            <div class="">
                                <router-link :to="{ name: 'admin-product-edit', params: { id: record.id } }">
                                    <a-button type="primary" class="bg-blue-600">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a-button>
                                </router-link>
                            </div>
                            <div>
                                <a-button type="primary" class="bg-red-600" @click="deleteProduct(record.id)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </a-button>
                            </div>
                        </div>
                    </template>


                </template>
            </a-table>
        </div>
    </a-card>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useMenu } from '../../../stores/use-menu.js';

export default defineComponent({

    setup() {
        useMenu().onSelectedKeys('products')

        const products = ref([])

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
                title: 'Mô tả sản phẩm',
                dataIndex: 'description',
                key: 'description',
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
                fixed: 'right'
            },
        ]

        const getUser = () => {
            axios.get('http://127.0.0.1:8001/api/products')
                .then((response) => {
                    products.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        const deleteProduct = async (productId) => {
            try {
                const response = await axios.delete(`http://127.0.0.1:8001/api/products/${productId}`);
                console.log(response.data.message);

                // Update products list after deletion
                products.value = products.value.filter(product => product.id !== productId);
            } catch (error) {
                console.error(error.response.data.message);
            }
        };
        getUser();
        return {
            products, columns, deleteProduct
        }

    },

})
</script>