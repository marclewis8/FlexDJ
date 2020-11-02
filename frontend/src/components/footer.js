import React from 'react';
import { Layout } from 'antd';

import '../styles/layout.less';

function Footer() {
  return (
    <div>
      <Layout.Footer className={'footer'}>
        @{new Date().getFullYear()} | Chapel Hill, NC | Team FlexDJ
      </Layout.Footer>
    </div>
  );
}

export default Footer;
