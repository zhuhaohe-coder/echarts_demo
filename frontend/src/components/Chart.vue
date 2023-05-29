<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <div
      class="container"
      ref="container"
      :style="{ height: size.height, width: size.width }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, shallowRef } from "vue";
import * as echarts from "echarts";

const container = ref(null);
const props = defineProps({
  title: {
    type: String,
  },
  chartData: {
    type: Object,
    required: true,
  },
  size: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
// 使用ref点击图例会报错
const myChart = shallowRef(null);
const options = ref({});
const { chartData } = props.chartData;

const setBarOptions = () => {
  options.value = {
    tooltip: {},
    grid: {
      top: "2%",
      left: "1%",
      right: "6%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "category",
      data: chartData.map((item) => item.title),
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        data: chartData.map((item) => item.num),
        type: "bar",
        itemStyle: {
          borderRadius: [0, 20, 20, 0],

          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "#005eaa",
            },
            {
              offset: 0.5,
              color: "#339ca8",
            },
            {
              offset: 1,
              color: "#cda819",
            },
          ]),
        },
      },
    ],
  };
};
const setMapOptions = () => {
  options.value = {
    geo: {
      map: "china",
      itemStyle: {
        areaColor: "#0099ff",
        borderColor: "#00ffff",
        shadowColor: "rgba(230,130,70,0.5)",
        shadowBlur: 30,
      },
      emphasis: {
        focus: "self",
        itemStyle: {
          areaColor: "#0099ff",
          borderColor: "#00ffff",
          shadowColor: "rgba(230,130,70,0.5)",
          shadowBlur: 30,
        },
      },
    },

    //   散点图数据
    tooltip: {
      trigger: "item",
    },
    title: {
      text: "城市销量",
      left: "45%",
      textStyle: {
        color: "#fff",
        fontSize: 20,
        textShadowBlur: 10,
        textShadowColor: "#33ffff",
      },
    },
    visualMap: {
      type: "continuous",
      min: 100,
      max: 5000,
      calculable: true,
      inRange: {
        color: ["#50a3ba", "#eac736", "#d94e5d"],
      },
      textStyle: {
        color: "#fff",
      },
    },
    series: [
      {
        type: "scatter",
        itemStyle: {
          color: "red",
        },
        coordinateSystem: "geo",
        data: [
          { name: "北京", value: [116.46, 39.92, 4367] },
          { name: "上海", value: [121.48, 31.22, 8675] },
          { name: "深圳", value: [114.07, 22.62, 2461] },
          { name: "广州", value: [113.23, 23.16, 187] },
          { name: "西安", value: [108.45, 34, 3421] },
        ],
      },
    ],
  };
};
const setLineOptions = () => {
  options.value = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#e6b600",
        },
      },
    },
    legend: {
      data: ["服饰", "数码", "家电", "家居", "日化"],
    },
    grid: {
      left: "1%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData.day,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    series: [
      {
        name: "服饰",
        type: "line",
        data: chartData.num.Chemicals,
        smooth: true,
        showSymbol: false,
        stack: "Total",
        lineStyle: {
          width: 0,
        },
        emphasis: {
          focus: "series",
        },

        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
      },
      {
        name: "数码",
        type: "line",
        data: chartData.num.Clothes,
        stack: "Total", //数据堆叠
        smooth: true, //折线图平滑效果 变成曲线图
        showSymbol: false, //   隐藏所有数据点

        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        lineStyle: {
          // 设置线段样式
          width: 0,
        },
        emphasis: {
          //设置高亮的图形样式和标签样式
          focus: "series", //只显示选中的内容高亮
        },
      },
      {
        name: "家电",
        type: "line",
        data: chartData.num.Electrical,
        stack: "Total", //数据堆叠
        smooth: true, //折线图平滑效果 变成曲线图
        showSymbol: false, //   隐藏所有数据点

        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        lineStyle: {
          // 设置线段样式
          width: 0,
        },
        emphasis: {
          //设置高亮的图形样式和标签样式
          focus: "series", //只显示选中的内容高亮
        },
      },
      {
        name: "家居",
        type: "line",
        data: chartData.num.digit,
        stack: "Total", //数据堆叠
        smooth: true, //折线图平滑效果 变成曲线图
        showSymbol: false, //   隐藏所有数据点

        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 0, 135)",
            },
            {
              offset: 1,
              color: "rgb(135, 0, 157)",
            },
          ]),
        },
        lineStyle: {
          // 设置线段样式
          width: 0,
        },
        emphasis: {
          //设置高亮的图形样式和标签样式
          focus: "series", //只显示选中的内容高亮
        },
      },
      {
        name: "日化",
        type: "line",
        data: chartData.num.gear,
        stack: "Total", //数据堆叠
        smooth: true, //折线图平滑效果 变成曲线图
        showSymbol: false, //   隐藏所有数据点

        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "rgb(224, 62, 76)",
            },
          ]),
        },
        lineStyle: {
          // 设置线段样式
          width: 0,
        },
        emphasis: {
          //设置高亮的图形样式和标签样式
          focus: "series", //只显示选中的内容高亮
        },
      },
    ],
  };
};
const setPieOptions = () => {
  options.value = {
    legend: {
      top: "bottom",
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        type: "pie",
        data: chartData,
        radius: [10, 100],
        center: ["50%", "45%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 10,
        },
      },
    ],
  };
};
const setStackOptions = () => {
  options.value = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: chartData.day,
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
    },
    legend: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    series: [
      {
        name: "服饰",
        type: "bar",
        data: chartData.num.Clothes,
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "数码",
        type: "bar",
        data: chartData.num.digit,
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "家电",
        type: "bar",
        data: chartData.num.Electrical,
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "家居",
        type: "bar",
        data: chartData.num.gear,
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "日化",
        type: "bar",
        data: chartData.num.Chemicals,
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      },
    ],
  };
};

onMounted(() => {
  myChart.value = echarts.init(container.value);
  if (props.type === "bar") {
    setBarOptions();
  } else if (props.type === "map") {
    const { chinaData } = props.chartData;
    echarts.registerMap("china", chinaData);
    setMapOptions();
  } else if (props.type === "line") {
    setLineOptions();
  } else if (props.type === "pie") {
    setPieOptions();
  } else if (props.type === "stack") {
    setStackOptions();
  }
  myChart.value.setOption(options.value);
});
</script>

<style lang="scss" scoped>
h2 {
  font-size: 0.3rem;
  padding: 0.0625rem;
  text-align: center;
  color: #fff;
}
</style>
