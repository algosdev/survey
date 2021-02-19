import React from 'react'
import cls from './survey.module.scss'
import SurveyItem from './SurveyItem'
const data = [
  {
    title: 'Survey Еда',
    img: '/images/survey_item1.png',
  },
  {
    title: 'Survey Бизнес',
    img: '/images/survey_item2.png',
  },
  {
    title: 'Survey Технология',
    img: '/images/survey_item3.png',
  },
  {
    title: 'Survey Путешествия',
    img: '/images/survey_item4.png',
  },
]
function SurveysContainer() {
  return (
    <div className={cls.survey_container}>
      {data.map((item, index) => (
        <SurveyItem data={item} key={index} />
      ))}
    </div>
  )
}

export default SurveysContainer
