<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="user">
            <router-link to="/user">
                <span>
                    <i class="fa-solid fa-user mr-3"></i><span>Tài khoản</span>
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="user_status">
            <router-link to="/user_status">
                <span>
                    <i class="fa-solid fa-tag mr-3"></i><span>Status</span>
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="department">
            <router-link to="/department">
                <span>
                    <i class="fa-solid fa-gear mr-3"></i><span>Department</span>
                </span>
            </router-link>
        </a-menu-item>

        <a-menu-item key="product">
            <router-link to="/product">
                <span>
                    <i class="fa-solid fa-gear mr-3"></i><span>Sản phẩm</span>
                </span>
            </router-link>
        </a-menu-item>
    </a-menu>
</template>
  
<script>
import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { useMenu } from '../../stores/use-menu.js'
import { RouterLink } from 'vue-router';
export default defineComponent({
    components: {
        
    },
    setup() {
        const store = useMenu();
        return {
            ...storeToRefs(store),
        };
    },
    components: { RouterLink }
});
</script>
  