export interface FileDetailsDto {
  // TODO At some point maybe we want to not the provider type here
  //      Could be that there are multiple upload services, using different
  //      storage providers, and the PDF service needs to know which one to
  //      use for retrieving the file. For now just assume that all the
  //      services are using the same storage provider
  readonly fileId: string;
  readonly email: string;
}