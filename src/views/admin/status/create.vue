<template>
    <form @submit.prevent="createUsers()">
        <a-card title="Tạo mới Trạng thái" class="w-full">
            <div class="flex justify-center gap-4">
                <div class="w-full">
                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span>Tên sản trạng thái:</span>
                                <!-- :class="{ 'text-red-500': errors.name }" -->
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Tên sản trạng thái" allow-clear v-model:value="name" />
                            <!-- :class="{ 'name-danger': errors.name }"  -->
                            <!-- <small v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</small> -->
                        </div>
                    </div>            
                </div>
            </div>

            <div class="">
                <div class="w-full flex justify-end">
                    <a-button class="">
                        <router-link to="/status">
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
        useMenu().onSelectedKeys("admin-status-create");

        const router = useRouter();
        const products = reactive({
            name: "",
        });

        const errors = ref({});

        const getUsersCreate = () => {
            axios.get("http://127.0.0.1:8001/api/status/create")
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
            axios.post("http://127.0.0.1:8001/api/status", products)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("Tạo mới thành công!")
                        router.push({ name: "user_status" })
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