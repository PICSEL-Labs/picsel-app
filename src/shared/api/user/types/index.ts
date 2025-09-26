import { CommonResponseType } from '../../types';

export interface UserConfigResponse extends CommonResponseType {
  data: UserVersion;
}

export interface UserVersion {
  version: {
    forceUpdate: boolean;
    latest: string;
    min: string;
  };
}
