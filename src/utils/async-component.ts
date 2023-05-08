import { defineAsyncComponent, type AsyncComponentLoader } from 'vue'
import AsyncLoading from '@/components/loading/src/async-loading.vue'

export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20
  })
