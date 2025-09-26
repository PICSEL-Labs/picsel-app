export interface UserConfigResponse {
  code: number;
  codeMessage: string;
  message: string;
  data: UserVersion;
}

export interface UserVersion {
  version: {
    forceUpdate: boolean;
    latest: string;
    min: string;
  };
}
