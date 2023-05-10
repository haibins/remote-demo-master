<script setup lang="ts">
import Remote from "./components/Remote/index.vue";

import { shallowRef } from "vue";

// 卡片列表
const cards = shallowRef([
  {
    id: "1",
    componentType: "remote-chart",
    config: {
      version: "1.0.2",
      libName: "HelloWorld",
      package: "xcard-remote-vue-comps",
    },

    layout: {
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
  },
  {
    id: "2",
    componentType: "remote-chart",
    config: {
      version: "1.0.2",
      libName: "MyButton",
      package: "xcard-remote-vue-comps",
    },
    layout: {
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
  },
  {
    id: "3",
    componentType: "remote-chart",
    config: {
      // host: 'http://127.0.0.1:5501/',
      version: "1.0.2",
      libName: "RemoteLine",
      package: "xcard-remote-vue-comps",
    },
    layout: {
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
  },
  {
    id: "31",
    componentType: "remote-chart",
    config: {
      version: "1.0.7",
      libName: "MyButton",
      package: "remote-vue-project",
    },
    layout: {
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
  },
  {
    id: "4",
    componentType: "remote-chart",
    config: {
      // cusHost:'http://localhost:7006',
      version: "1.0.6",
      libName: "MyButton",
      package: "remote-vue-project",
    },
    layout: {
      x: 0,
      y: 0,
      w: 8,
      h: 12,
    },
  },
]);
</script>

<template>
  <div>
    <div v-for="t in cards" :key="t.id" class="item">
      <Remote :config="t.config" />
    </div>
  </div>
</template>

<style scoped>
.item {
  width: 400px;
  height: 400px;
  border: 1px solid #cdcdcd;
}
</style>
