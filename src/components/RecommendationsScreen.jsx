import React from 'react';
import RecommendationsSection from './RecommendationsSection.jsx';

/** Обёртка на весь экран — для старых ссылок и прототипа; в приложении раздел встроен в главную */
export default function RecommendationsScreen({ onOpen }) {
  return (
    <div className="screen">
      <div className="screen-scroll">
        <RecommendationsSection onOpen={onOpen} />
      </div>
    </div>
  );
}
