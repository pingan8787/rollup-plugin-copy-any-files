import fs from 'fs';
import path from 'path';
import { isExist } from './utils';

export interface CopyOptions {
    src: string, // 源文件路径
    target: string, // 保存的目标路径
    name?: string // 保存的文件名
}

export const copyFileHandle = async (source: CopyOptions[] = []): Promise<any> => {
    source.forEach(async file => {
        const { src, name, target = './dist/' } = file;
        const fileStat = await fs.statSync(src);
        const isFile = await fileStat.isFile();
        const isDir = await fileStat.isDirectory();
        await isExist(target);
        if (isFile) {
            // 如果是文件，直接执行拷贝操作
            fs.copyFile(src, target + name, () => {});
            // await fs.copyFileSync(src, target + name);
        } else if (isDir) {
            // 如果是文件夹，直接执行拷贝操作
            const sourceFile = await fs.readdirSync(src, { withFileTypes: true });

            sourceFile.forEach(async item => {
                const newSourcePath = path.resolve(src, item.name);
                const newTargetPath = path.resolve(target, item.name);
                if (item.isDirectory()) {
                    isExist(newTargetPath);
                    // 遍历子目录所有文件
                    const sourceDirFile = await fs.readdirSync(newSourcePath, { withFileTypes: true });
                    const sourceDirFileRes: any = [];
                    sourceDirFile.map(i => {
                        sourceDirFileRes.push({ src: newSourcePath, name: i.name, target: newTargetPath });
                    })
                    await copyFileHandle(sourceDirFileRes);
                }
                fs.copyFile(newSourcePath, newTargetPath, () => {});
                // await fs.copyFileSync(newSourcePath, newTargetPath);
            })
        }
    })
}