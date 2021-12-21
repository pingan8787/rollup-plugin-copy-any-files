import fs from 'fs';
import path from 'path';

/**
 * 递归判断文件夹是否存在, 不存在创建一个
 * @param {*} src 需要处理的路径
 * @returns 
 */
export const isExist = (src: string) : boolean => {
    if(!src || typeof src !== 'string') return false;
    if (fs.existsSync(src)) {
      return true;
    } else {
      if (isExist(path.dirname(src))) {
        fs.mkdirSync(src);
        return true;
      }
      return false;
    }
}
