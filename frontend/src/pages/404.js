import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { Footer, Navbar } from '../components';

function Error() {
  return (
    <div>
      <Navbar />

      <div className="content">
        <h2>Page not found! :(</h2>
        <Link href="/">
          <Button>Return home</Button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Error;
