<template>
    <div class="about">
        <v-header />
        <v-sidebar />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from "../components/Header";
import vSidebar from "../components/Sidebar";
export default {
    components: {
        vHeader,
        vSidebar,
    },
    computed: {
        collapse() {
            return this.$store.state.collapse;
        }
    }
};
</script>
