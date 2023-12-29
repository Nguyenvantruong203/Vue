<template>
    <form @submit.prevent="updateUsers()">
        <a-card title="Cập nhập sản phẩm" class="w-full">
            <div class="flex justify-center gap-4">

                <div class="w-[100%]">

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span :class="{ 'text-red-500': errors.name }">Tên sản phẩm:</span>

                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Tên sản phẩm" allow-clear v-model:value="name"
                                :class="{ 'name-danger': errors.name }" />
                            <small v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</small>

                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span :class="{ 'text-red-500': errors.name }">Image:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Image" allow-clear v-model:value="image"
                                :class="{ 'name-danger': errors.image }" />
                            <small v-if="errors.name" class="text-red-500">{{ errors.image[0] }}</small>
                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span :class="{ 'text-red-500': errors.price }">Price:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Price" allow-clear v-model:value="price"
                                :class="{ 'name-danger': errors.price }" />
                            <small v-if="errors.name" class="text-red-500">{{ errors.price[0] }}</small>
                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span :class="{ 'text-red-500': errors.description }">Description:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-textarea placeholder="Description" allow-clear v-model:value="description"
                                :class="{ 'name-danger': errors.description }" />
                            <small v-if="errors.name" class="text-red-500">{{ errors.description[0] }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="w-full flex justify-end">
                    <div class="w-full flex justify-end">
                        <a-button class="">
                            <router-link to="/product">
                                <span>Hủy</span>
                            </router-link>
                        </a-button>
                        <a-button type="primary" class="bg-blue-500 ml-2" html-type="submit">
                            <span>Lưu</span>
                        </a-button>
                    </div>
                </div>
            </div>
        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { message } from 'ant-design-vue';
import { useMenu } from "../../../stores/use-menu.js";


export default defineComponent({
    setup() {
        useMenu().onSelectedKeys("admin-product-edit");

        const router = useRouter();
        const route = useRoute();
        const products = reactive({
            name: "",
            price: "",
            description: "",
            image: "",
        });

        const errors = ref({});

        const getUserEdit = () => {
            axios.get(`http://127.0.0.1:8001/api/products/${route.params.id}/edit`)
                .then((response) => {
                    products.name = response.data.products.name;
                    products.price = response.data.products.price;
                    products.description = response.data.products.description;
                    products.image = response.data.products.image;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const updateUsers = () => {
            axios.put(`http://127.0.0.1:8001/api/products/${route.params.id}`, products)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("cập nhập thành công!")
                        router.push({ name: "product" })
                    }
                })
                .catch((error) => {
                    errors.value = error.response.data.errors;
                })
        }

        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        getUserEdit();
        return {
            ...toRefs(products),
            errors,
            filterOption,
            updateUsers
        };
    },
});
</script>

<style>
.select-danger {
    border: 1px solid red;
    border-radius: 6px;
}

.name-danger {
    border: 1px solid red;
    border-radius: 6px;
}
</style>