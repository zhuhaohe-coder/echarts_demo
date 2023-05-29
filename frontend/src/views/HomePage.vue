<template>
  <div>
    <header>
      <h1>大数据可视化--vue3+echarts5</h1>
    </header>
    <section class="container">
      <section class="itemLeft">
        <ItemPage>
          <Chart
            v-if="barData"
            :title="'销售总量图表'"
            :size="{ height: '4.5rem', width: '100%' }"
            :chartData="barData"
            :type="'bar'"
          ></Chart>
        </ItemPage>
        <ItemPage>
          <Chart
            :title="'产品月销'"
            v-if="lineData"
            :size="{ height: '4.5rem', width: '100%' }"
            :chartData="lineData"
            :type="'line'"
          ></Chart>
        </ItemPage>
      </section>
      <section class="itemCenter">
        <Chart
          v-if="mapData"
          :size="{ height: '10rem', width: '100%' }"
          :chartData="mapData"
          :type="'map'"
        ></Chart>
      </section>
      <section class="itemRight">
        <ItemPage>
          <Chart
            :title="'库存统计'"
            v-if="pieData"
            :size="{ height: '4.5rem', width: '100%' }"
            :chartData="pieData"
            :type="'pie'"
          ></Chart>
        </ItemPage>
        <ItemPage>
          <Chart
            :title="'产品类别'"
            v-if="stackData"
            :size="{ height: '4.5rem', width: '100%' }"
            :chartData="stackData"
            :type="'stack'"
          ></Chart>
        </ItemPage>
      </section>
    </section>
  </div>
</template>

<script setup>
import ItemPage from "@/components/ItemPage.vue";
import Chart from "@/components/Chart.vue";
import axios from "axios";
import { ref } from "vue";
const barData = ref(null);
const mapData = ref(null);
const lineData = ref(null);
const pieData = ref(null);
const stackData = ref(null);
axios.defaults.baseURL = "http://127.0.0.1:8888";
const getData = async () => {
  const barResult = await axios.get("/one/data");
  barData.value = barResult.data.chartData;
  const mapResult = await axios.get("/china/data");
  mapData.value = mapResult.data;
  const lineResult = await axios.get("/two/data");
  lineData.value = lineResult.data.chartData;
  const pieResult = await axios.get("/three/data");
  pieData.value = pieResult.data.chartData;
  const stackResult = await axios.get("/four/data");
  stackData.value = stackResult.data.chartData;
  console.log(stackData.value);
};
getData();
</script>

<style lang="scss" scoped>
header {
  height: 1rem;
  width: 100%;
  background: rgba(0, 0, 255, 0.2);
  h1 {
    font-size: 0.5rem;
    color: #fff;
    line-height: 1rem;
    text-align: center;
  }
}
.container {
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;

  display: flex;
  .itemLeft,
  .itemRight {
    flex: 3;
  }
  .itemCenter {
    flex: 5;
    height: 10.5rem;
    border: 1px solid blue;
    // 内边距10px
    padding: 0.125rem;
    // 外边距20px
    margin: 0.25rem;
  }
}
</style>
