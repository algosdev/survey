import React from 'react'
import cls from './survey.module.scss'
function SurveyItem({ data }) {
  return (
    <div className={cls.survey_item}>
      <div className={cls.details}>
        <p className='heading1'>{data.title}</p>
      </div>
      <div className={cls.img_cont}>
        <img src={data.img} alt={data.title} />
      </div>
    </div>
  )
}

export default SurveyItem
