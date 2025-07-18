'use client';

import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { MdOutlineWork as WorkIcon } from 'react-icons/md';
import { IoSchool as SchoolIcon } from 'react-icons/io5';
import { FaStar as StarIcon } from 'react-icons/fa';
import data from '@/data/staticPagesData.json';
import styles from '@/styles/experienceSection.module.css';

export default function Timeline() {
  const items = [
    ...data.experience.map((exp) => ({
      dateRange: exp.period,
      type: 'work',
      title: exp.role,
      subtitle: exp.company,
      description: exp.work,
      tech: exp.tech?.join(', ')
    })),
    ...data.education.map((ed) => ({
      dateRange: ed.period,
      type: 'education',
      title: ed.college,
      subtitle: ed.degree,
      description: ed.major
    }))
  ];

  return (
    <div className={styles.container}>
      <VerticalTimeline 
        lineColor="var(--experience-linecolor)"
        className={styles.timeline}
      >
        {items.map((it, idx) => {
          const isFirst = idx === 0;

          const contentStyle = isFirst
            ? {
                background: 'var(--experience-bg-contentStyle1)',
                color: 'var(--experience-color-contentStyle1)',
                border: 'var(--experience-border-contentStyle1)',
                borderRadius: '12px',
                boxShadow: 'var(--experience-boxShadow-contentStyle1)',
                backdropFilter: 'blur(6px)'
              }
            : {
                background:
                  it.type === 'work'
                    ? 'var(--experience-bg-contentStyle2)'
                    : 'var(--experience-bg-contentStyle3)',
                color: it.type === 'work' ? 'var(--experience-color-contentStyle2)' : 'var(--experience-color-contentStyle3)',
                border: 'var(--experience-border-contentStyle2)',
                borderRadius: '12px',
                boxShadow: 'var(--experience-boxShadow-contentStyle2)',
                backdropFilter: 'blur(6px)'
              };

          const contentArrowStyle = {
            borderRight: isFirst
              ? 'var(--experience-borderRight-contentArrowStyle1)'
              : it.type === 'work'
              ? 'var(--experience-borderRight-contentArrowStyle2)'
              : 'var(--experience-borderRight-contentArrowStyle3)'
          };

          const iconStyle = {
            background: isFirst
              ? 'var(--experience-bg-iconStyle1)'
              : it.type === 'work'
              ? 'var(--experience-bg-iconStyle2)'
              : 'var(--experience-bg-iconStyle3)',
            color: 'var(--gpt-text)',
            border: '3px solid var(--gpt-text)',
            backdropFilter: 'blur(4px)',
            boxShadow: 'var(--experience-boxShadow-iconStyle1)'
          };

          return (
            <VerticalTimelineElement
              key={idx}
              date={it.dateRange}
              iconStyle={iconStyle}
              icon={it.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
              contentStyle={contentStyle}
              contentArrowStyle={contentArrowStyle}
              className={styles.element}
            >
              <h3 className="vertical-timeline-element-title">{it.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">{it.subtitle}</h4>
              {it.tech && (
                <p className={styles.tech}>🔧 {it.tech}</p>
              )}
              <p className={styles.description}>{it.description}</p>
            </VerticalTimelineElement>
          );
        })}

        {/* Final star with no content */}
        <VerticalTimelineElement
          className={`${styles.element} vertical-timeline-element--first`}
          iconStyle={{
            background: 'var(--experience-bg-VerticalTimelineElement)',
            color: ' var(--gpt-text)',
            border: '3px solid var(--gpt-text)',
            backdropFilter: 'blur(4px)',
            boxShadow: 'var(--experience-boxShadow-VerticalTimelineElement)',
            
          }}
          icon={<StarIcon />}
          contentStyle={{ display: 'none' }}
          contentArrowStyle={{ display: 'none' }}
        />
      </VerticalTimeline>
    </div>
  );
}