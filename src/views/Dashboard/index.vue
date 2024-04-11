<template>
  <div class="app-content">
    <el-row style="margin-bottom: 16px">
      <el-button type="primary" plain @click="getList" icon="Orange"> 显示全部</el-button>
      <el-button type="warning" plain @click="hideRestHoliday" icon="Hide">隐藏已休</el-button>
    </el-row>

    <el-table :data="list" v-loading="loading" highlight-current-row>
      <el-table-column align="center" label="节日" prop="name"></el-table-column>
      <el-table-column align="center" label="日期" prop="date"></el-table-column>
      <el-table-column align="center" label="状态">
        <template #default="{ row }">
          <el-tag type="success" effect="dark" v-if="row.holiday">假日</el-tag>
          <el-tag type="danger" effect="dark" v-else>补班</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="薪资倍数" prop="wage"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import request from '@/utils/request'
import dayjs from 'dayjs'

interface HolidayRecord {
  name: string
  date: string
  holiday: boolean
  wage: number
  rest: number
}

const loading = ref(false)
const list = ref<HolidayRecord[]>([])

function hideRestHoliday() {
  list.value = list.value.filter((item) => dayjs(item.date).valueOf() - Date.now() > 0)
}

async function getList() {
  try {
    loading.value = true
    const data = await request.get<any, any>(`http://timor.tech/api/holiday/year`)
    for (const [key, value] of Object.entries(data.holiday)) {
      list.value.push(value as HolidayRecord)
    }
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

getList()
</script>

<style lang="scss" scoped></style>
