export type ValidationType = 'user-id' | 'nickname';

export interface ValidateResponse {
  code: number;
  data: null;
  message: string;
  codeMessage: string;
}

export interface SignupResponse {
  socialType: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignupRequest {
  socialAccessToken: string;
  socialType: string;
  userNickname: string;
  userAgreementConsentRequestDto: {
    ageConsent: boolean;
    termsOfService: boolean;
    privacyPolicy: boolean;
    locationConsent: boolean;
    marketingConsent: boolean;
  };
}

export interface TermsState {
  checkedStates: boolean[];
  allChecked: boolean;
  isRequiredAllChecked: boolean;
}

export interface TermsActions {
  toggleAll: () => void;
  toggleItem: (index: number) => void;
}
