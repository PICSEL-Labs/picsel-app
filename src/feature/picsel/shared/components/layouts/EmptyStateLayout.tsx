import React, { Fragment, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  floatingButton: ReactNode;
}

const EmptyStateLayout = ({ children, floatingButton }: Props) => {
  return (
    <Fragment>
      {children}
      {floatingButton}
    </Fragment>
  );
};

export default EmptyStateLayout;
