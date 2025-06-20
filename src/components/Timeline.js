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
import styles from '@/styles/timeline.module.css';

export default function Timeline() {
  // 1) Build a unified list, in chronological order:
  const items = [
    // Experiences first:
    ...data.experience.map((exp) => ({
      dateRange: exp.period,
      type: 'work',
      title: exp.role,
      subtitle: exp.company,
      description: exp.work,
      tech: exp.tech?.join(', ')
    })),
    // Then education
    ...data.education.map((ed) => ({
      dateRange: ed.period,
      type: 'education',
      title: ed.degree,
      subtitle: ed.college,
      description: ed.major
    }))
  ];

  return (
    <div className={styles.container}>
      <VerticalTimeline
        lineColor="var(--gpt-side-border)"
      >
        {items.map((it, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={it.dateRange}
            iconStyle={{
              background:
                it.type === 'work' ? 'rgb(33,150,243)' : 'rgb(255,160,200)',
              color: '#fff',
              border: '3px solid var(--gpt-text)'
            }}
            icon={
              it.type === 'work' ? <WorkIcon /> : <SchoolIcon />
            }
            contentStyle={{
              background:
                idx === 0
                  ? 'rgb(33,150,243)'
                  : it.type === 'work'
                  ? 'rgb(33,150,243,0.1)'
                  : 'rgb(255,224,230)',
              color: it.type === 'work' ? '#fff' : '#000'
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${
                idx === 0
                  ? 'rgb(33,150,243)'
                  : it.type === 'work'
                  ? 'rgb(33,150,243,0.1)'
                  : 'rgb(255,224,230)'
              }`
            }}
            className={styles.element}
          >
            <h3 className="vertical-timeline-element-title">{it.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">
              {it.subtitle}
            </h4>
            {it.tech && (
              <p className={styles.tech}>🔧 {it.tech}</p>
            )}
            <p>{it.description}</p>
          </VerticalTimelineElement>
        ))}

        {/* final star at bottom */}
        <VerticalTimelineElement
          iconStyle={{
            background: 'rgb(16,204,82)',
            color: '#fff',
            border: '3px solid var(--gpt-text)'
          }}
          icon={<StarIcon />}
        />
      </VerticalTimeline>
    </div>
  );
}