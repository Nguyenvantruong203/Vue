<template>
    <a-card title="Department" style="width: 100%" class="ms:w-full">
        <div class="w-full flex justify-end mb-5">
            <a-button type="primary" class="bg-blue-600 ">
                <router-link :to="{ name: 'admin-status-create' }">
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

                    <template v-if="column.key === 'action'">
                        <div class="flex gap-2">
                            <div class="">
                                <router-link :to="{ name: 'admin-status-edit', params: { id: record.id } }">
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
        useMenu().onSelectedKeys('status')

        const products = ref([])

        const columns = [
            {
                title: 'No',
                key: 'index',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Hành động',
                key: 'action',
                fixed: 'right'
            },
        ]
        const getUser = () => {
            axios.get('http://127.0.0.1:8001/api/status')
                .then((response) => {
                    products.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        const deleteProduct = async (productId) => {
            try {
                const response = await axios.delete(`http://127.0.0.1:8001/api/status/${productId}`);
                console.log(response.data.message);

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