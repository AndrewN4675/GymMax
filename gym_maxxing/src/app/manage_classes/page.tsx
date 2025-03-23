'use client';

import React from 'react';
import { SheduledClasses } from './upcomingClasses';
import { CreateClass } from './createClass';

export default function Manage() {
    
    return (
      <div>
        <div>
          <CreateClass></CreateClass>
        </div>
        <SheduledClasses></SheduledClasses>
      </div>
    );
}