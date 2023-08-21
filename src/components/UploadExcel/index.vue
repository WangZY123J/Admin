<template>
  <div class="upload-excel">
    <!-- 按钮 -->
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />

    <!-- 拖拽 -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <div class="el-icon-upload">
        <svg-icon icon="upload" />
      </div>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  //上传前回调
  beforeUpload: Function,
  //成功回调
  onSuccess: Function
})

//点击上传触发
let loading = ref(false)
//input 标签
const excelUploadInput = ref(null)

//把文件输入框整出来
const handleUpload = () => {
  excelUploadInput.value.click()
}

const handleChange = (event) => {
  const files = event.target.files
  const rawFile = files[0] //只用 file[0]
  if (!rawFile) return
  upload(rawFile)
}

//拖拽文本释放时触发
const handleDrop = (event) => {
  //上传中跳过
  if (loading.value) return
  //包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表
  const files = event.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必须要有一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必须是 .xlsx, .xls, .csv 格式')
    return false
  }
  //触发上传事件
  upload(rawFile)
}

//拖拽悬停时触发
const handleDragover = (event) => {
  //在新位置生成源项的副本
  event.dataTransfer.dropEffect = 'copy'
}

//上传事件
const upload = (file) => {
  excelUploadInput.value.value = null
  //没有指定上传前回调
  if (!props.beforeUpload) {
    readerData(file)
    return
  }
  //指定了上传前回调,只有 true 才会执行后续操作
  const before = props.beforeUpload(file)
  if (before) {
    readerData(file)
  }
}

//读取数据
const readerData = (file) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    //该事件在读取操作完成时触发
    reader.onload = (event) => {
      const data = event.target.result //1、获取解析到的数据
      const workbook = XLSX.read(data, { type: 'array' }) //2、利用 XLSX 对数据进行解析
      const firstSheetName = workbook.SheetNames[0] //3、读取第一张工作表名称
      const firstSheetData = workbook.Sheets[firstSheetName] //4、读取 sheet1 的数据
      const header = getHeaderRow(firstSheetData) //5、解析数据表头
      const results = XLSX.utils.sheet_to_json(firstSheetData) //6、解析数据体
      generateData({ header, results }) //7、传入解析之后的数据
      loading.value = false
      resolve()
    }

    //读取 Blob 或 File 内容
    reader.readAsArrayBuffer(file)
  })
}

//根据导入内容生成数据
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    .el-icon-upload {
      font-size: 50px;
      display: block;
    }
  }
}
</style>
