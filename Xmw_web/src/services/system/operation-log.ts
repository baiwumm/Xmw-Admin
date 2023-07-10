import { request } from '@umijs/max';

import type { PageResModel, ResponseModel } from '@/global/interface';
import type { TableSearchProps } from '@/pages/System/OperationLog/utils/interface'
/**
 * @description: 操作日志列表
 * @param {TableSearchProps} options
 * @return {*}
 * @author: Cyan
 */
export async function getOperationLogList(options?: TableSearchProps):
  Promise<ResponseModel<PageResModel<API.OPERATIONLOG>>> {
  return request('/api/system/operation-logs', {
    method: 'GET',
    params: options || {},
  });
}