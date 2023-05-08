<template>
  <div class="component-container">
    <RemoteCom :config="props.config" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import * as Vue from 'vue'
import * as echartsCharts from 'echarts/charts'
import * as echartsComponents from 'echarts/components'
import * as echartsCore from 'echarts/core'
import * as echartsRenderers from 'echarts/renderers'
import * as vueEcharts from 'vue-echarts'

import { preFetchLib, bindVueRuntime, bindExternals, type IPreFetchLibOptions } from 'hel-micro'

const esModuleMark = '__esModule'

// Object.defineProperty(echartsCharts, esModuleMark, { value: true })
bindVueRuntime({ Vue })
function fixDefaults(o: Record<string, any>) {
  for (const key of Object.keys(o)) {
    const m = o[key]
    if (!m[esModuleMark] && m[Symbol.toStringTag] === 'Module') {
      o[key] = {
        ...m,
        [esModuleMark]: true
      }
    }
  }
  return o
}
bindExternals(
  fixDefaults({
    'echarts/charts': echartsCharts,
    'echarts/components': echartsComponents,
    'echarts/core': echartsCore,
    'echarts/renderers': echartsRenderers,
    'vue-echarts': vueEcharts
  })
)

type ConfigProps = Record<string, any> & {
  /**
   * 自定义远程包meta.json 路径
   */
  host?: string
  /**
   * 远程包版本
   */
  version?: string
  /**
   * 远程包名称
   */
  package?: string
  /**
   * 组件名称
   */
  libName: string
  /**
   * 本地组件联调路径
   */
  cusHost?: string
}

interface Props {
  config: ConfigProps
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils/async-component'

const props = withDefaults(defineProps<Props>(), {
  config: () => {
    return {
      libName: ''
    }
  }
})

const config = computed(() => {
  return Object.assign(
    {
      version: '1.0.0',
      package: 'xcard-remote-vue-comps'
    },
    props.config
  )
})

const error = Vue.defineComponent({
  setup() {},
  render() {
    return Vue.h('span', 'loaded error')
  }
})

const RemoteCom = loadAsyncComponent(
  () =>
    new Promise((res) => {
      const preFetchLibParam: IPreFetchLibOptions = {
        versionId: config.value.version
      }
      async function getSubAppAndItsVersionFn() {
        const res = await fetch(`${config.value.host}/hel_dist/hel-meta.json`)
        const meta = await res.json()
        return meta
      }

      if (config.value.host) {
        //指定host
        preFetchLibParam.apiPrefix = `${config.value.host}/hel_dist`
        preFetchLibParam.getSubAppAndItsVersionFn = getSubAppAndItsVersionFn
      }
      // 调试本地开发中的远程组件
      const enableCustom = !!window.location.port
      if (config.value.cusHost) {
        preFetchLibParam.custom = {
          host: 'http://localhost:7001', // 基于 web-dev-server 开发中生成产物联调
          enable: enableCustom
        }
      }

      console.log(preFetchLibParam,config.value)
      preFetchLib(config.value.package, preFetchLibParam)
        .then((libs) => {
          console.log('请求远程组件成功', libs)
          res(libs?.[config.value.libName] ?? error)
        })
        .catch((err) => {
          console.log('请求远程组件失败', err)
        })
    })
)
</script>

<style scoped>
.component-container {
  width: 100%;
  height: 100%;
}
</style>
