import React from 'react';
import { IPage } from '@leaa/dashboard/src/interfaces';
// import { MessageOutlined, createFromIconfontCN } from '@ant-design/icons';
// import { DatePickerUpdateTest as Test } from './_components/DatePickerUpdateTest/DatePickerUpdateTest';
import { CrudRequestTest as Test } from './_components/CrudRequestTest/CrudRequestTest';

// http://192.168.169.99:7777/test-any-without-layout
export default (props: IPage) => {
  return (
    <div style={{ padding: 10 }}>
      <Test />

      <hr />
    </div>
  );
};
