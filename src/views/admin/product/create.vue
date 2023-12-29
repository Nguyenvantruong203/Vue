<template>
    <form @submit.prevent="createUsers()">
        <a-card title="Tạo mới sản phẩm" class="w-full">
            <div class="flex justify-center gap-4">
                <div class="w-full">
                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span>Tên sản phẩm:</span>
                                <!-- :class="{ 'text-red-500': errors.name }" -->
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Tên sản phẩm" allow-clear v-model:value="name" />
                            <!-- :class="{ 'name-danger': errors.name }"  -->
                            <!-- <small v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</small> -->
                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span>price:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Price" allow-clear v-model:value="price" />
                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span>image:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Image" allow-clear v-model:value="image" />
                        </div>
                    </div>

                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span>Mô tả:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-textarea placeholder="Mô tả" allow-clear v-model:value="description" />
                        </div>
                    </div>
                    
                </div>

            </div>

            <div class="">
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
        </a-card>
    </form>
</template>
<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { Descriptions, message } from 'ant-design-vue';
import { useMenu } from "../../../stores/use-menu.js";

export default defineComponent({
    setup() {
        useMenu().onSelectedKeys("admin-product-create");

        const router = useRouter();
        const products = reactive({
            name: "",
            price: "",
            description: "",
            image: "",
        });

        const errors = ref({});

        const getUsersCreate = () => {
            axios.get("http://127.0.0.1:8001/api/products/create")
                .then((response) => {
                    products.value = response.data.products;
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const createUsers = () => {
            axios.post("http://127.0.0.1:8001/api/products", products)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Tạo mới thành công!")
                        router.push({ name: "product" })
                    }
                })
                .catch((error) => {
                    errors.value = error.response.data.errors;
                });
        };
        getUsersCreate();
        return {
            ...toRefs(products),
            errors,
            filterOption,
            createUsers,
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