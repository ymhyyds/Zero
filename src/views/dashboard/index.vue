<template>
  <div class="page-container">
    <el-row :gutter="16" class="cards">
      <el-col :span="8" v-for="card in cards" :key="card.title">
        <el-card><div class="card-title">{{ card.title }}</div><div class="card-value">{{ card.value }}</div></el-card>
      </el-col>
    </el-row>
    <el-card>
      <div ref="chart" class="chart"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Dashboard',
  data() {
    return {
      chart: null,
      cards: [
        { title: '访问量', value: '12,360' },
        { title: '用户数', value: '2,318' },
        { title: '订单数', value: '863' }
      ]
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['访问量', '成交量'] },
      xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      yAxis: { type: 'value' },
      series: [
        { name: '访问量', type: 'line', smooth: true, data: [120, 200, 150, 260, 300, 420, 510] },
        { name: '成交量', type: 'bar', data: [60, 90, 80, 120, 150, 210, 260] }
      ]
    })
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
    if (this.chart) this.chart.dispose()
  },
  methods: {
    resize() { if (this.chart) this.chart.resize() }
  }
}
</script>

<style scoped>
.cards { margin-bottom: 16px; }
.card-title { color: #909399; margin-bottom: 8px; }
.card-value { font-size: 28px; font-weight: 700; }
.chart { height: 420px; }
</style>
