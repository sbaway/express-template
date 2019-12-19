import tableCollection from '../const/table'
import { rokDB } from './database'

async function insertOperationLog({ data, userInfo, module, type }) {
  await rokDB.from(tableCollection.operationLog).insert({
    operator_id: userInfo.id,
    operator_account: userInfo.username,
    type,
    module,
    data: JSON.stringify(data),
  })
}

function catchError(error) {
  logger.error(`存储操作日志失败: ${error.message}`)
}

export default {
  async add({ table, data, userInfo, module }) {
    await rokDB.from(table).insert(data)
    insertOperationLog({
      data,
      userInfo,
      module,
      type: 'ADD',
    }).catch(catchError)
  },

  async update({ table, data, userInfo, module }) {
    delete data.updateTime
    delete data.createTime
    await rokDB
      .from(table)
      .update(data)
      .where('id', data.id)
    insertOperationLog({
      data,
      userInfo,
      module,
      type: 'UPDATE',
    }).catch(catchError)
  },

  async delete({ table, data, userInfo, module }) {
    await rokDB
      .from(table)
      .update({
        status: DELETE_STATUS,
      })
      .where('id', data.id)
    insertOperationLog({
      data,
      userInfo,
      module,
      type: 'DELETE',
    }).catch(catchError)
  },
}
