<template>
  <div class="h-screen">
    <div :class="`bg-amber-800 h-1/6 ease-in-out duration-1000`">
      <Cooker class="h-full" />
    </div>
    <div class="bg-orange-400 h-5/6">
      <ShopingList class="h-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cooker from '@/components/Cooker.vue';
import ShopingList from '@/components/ShopingList.vue';

@Component({
  components: {
    Cooker,
    ShopingList,
  },
})
export default class Shop extends Vue {
}
</script>
