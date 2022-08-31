import { createArticle,articleEdit } from '@/api/article'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

const t = i18n.global.t

export const commitArticle = async (data) => {
  const result = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return result
}

export const editArticle = async data => {
  const result = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return result
}
