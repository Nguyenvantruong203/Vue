<template>
    <form @submit.prevent="updateUsers()">
        <a-card title="Cập nhập trạng thái" class="w-full">
            <div class="flex justify-center gap-4">
                <div class="w-[100%]">
                    <div class="w-full flex mb-3">
                        <div class="w-1/4 flex items-center justify-end sm:text-end mr-3">
                            <label>
                                <span class="text-red-500 mr-1">*</span>
                                <span :class="{ 'text-red-500': errors.name }">Tên sản trạng thái:</span>
                            </label>
                        </div>
                        <div class="w-2/4">
                            <a-input placeholder="Tên sản trạng thái" allow-clear v-model:value="name"
                                :class="{ 'name-danger': errors.name }" />
                            <small v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <div class="w-full flex justify-end">
                    <div class="w-full flex justify-end">
                        <a-button class="">
                            <router-link to="/user_status">
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
        useMenu().onSelectedKeys("admin-status-edit");

        const router = useRouter();
        const route = useRoute();
        const products = reactive({
            name: "",
        });

        const errors = ref({});

        const getUserEdit = () => {
            axios.get(`http://127.0.0.1:8001/api/status/${route.params.id}/edit`)
                .then((response) => {
                    products.name = response.data.products.name;
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        const updateUsers = () => {
            axios.put(`http://127.0.0.1:8001/api/status/${route.params.id}`, products)
                .then((response) => {
                    if (response.status == 200) {
                        message.success("cập nhập thành công!")
                        router.push({ name: "user_status" })
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