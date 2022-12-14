/**
 * 上传文件
 */
export declare function chooseToFile(params?: {
  /**
   * 是否支持多选(默认支持)
   */
  multiple?: boolean
  /**
   * 上传默认支持类型(默认全部支持)
   */
  accept?: string | null
}): Promise<any>
