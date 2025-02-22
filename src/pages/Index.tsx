// src/pages/Index.jsx
import { useState } from 'react';
import Analysis from '../components/Analysis';
import Flow from '../components/Flow';

export default function HomePage() {
  return (
    <div dir="rtl" className="grid grid-cols-2 gap-4 p-4 h-screen">
      <div className="overflow-auto">
        <Analysis />
      </div>
      <div className="overflow-auto">
        <Flow />
      </div>
    </div>
  );
}