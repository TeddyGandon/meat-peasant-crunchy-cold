<template>
  <div class="h-screen">
    <div :class="`${getColorFromTimeLeft()} h-1/6 ease-in-out duration-1000`">
      <Cooker class="h-full" />
    </div>
    <div class="bg-orange-900 h-5/6">
      <Kitchen class="h-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cooker from '@/components/Cooker.vue';
import Kitchen from '@/components/Kitchen.vue';

@Component({
  components: {
    Cooker,
    Kitchen,
  },
})
export default class Home extends Vue {

  public getColorFromTimeLeft(): string {
    if (this.$store.state.time.timeLeft <= 0) {
      return 'bg-amber-600';
    }
    const strengths = [
      'bg-amber-400',
      'bg-amber-300',
      'bg-amber-200',
      'bg-amber-100',
      'bg-amber-50',
    ];
    return strengths[Math.floor((this.$store.state.time.timeLeft - 1) / this.$store.state.time.timeTotal * strengths.length)];
  }

}
</script>
