import { Readable } from "stream";

export interface StorageProvider {
  /**
   * Takes a readable stream and transfers its contents to the 
   * storage provider
   * 
   * @param fileStream the file stream to be uploaded
   */
  uploadFile(fileStream: Readable): Promise<string>;
}
