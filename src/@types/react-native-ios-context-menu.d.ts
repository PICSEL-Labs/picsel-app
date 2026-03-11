declare module 'react-native-ios-context-menu' {
  import { Component } from 'react';

  import { ViewProps } from 'react-native';

  interface MenuItemConfig {
    actionKey: string;
    actionTitle: string;
    menuAttributes?: string[];
    icon?: {
      type: string;
      imageValue: {
        systemName: string;
      };
    };
  }

  interface MenuConfig {
    menuTitle: string;
    menuItems: MenuItemConfig[];
  }

  interface PreviewConfig {
    previewType?: string;
    previewSize?: string;
    isResizeAnimated?: boolean;
    borderRadius?: number;
  }

  interface OnPressMenuItemEvent {
    nativeEvent: {
      actionKey: string;
      actionTitle: string;
    };
  }

  interface ContextMenuViewProps extends ViewProps {
    menuConfig: MenuConfig;
    previewConfig?: PreviewConfig;
    onPressMenuItem?: (event: OnPressMenuItemEvent) => void;
    onMenuWillShow?: () => void;
    onMenuDidShow?: () => void;
    onMenuWillHide?: () => void;
    onMenuDidHide?: () => void;
  }

  export class ContextMenuView extends Component<ContextMenuViewProps> {}
}
