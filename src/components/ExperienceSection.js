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
        lineColor="rgba(255, 255, 255, 0.12)"
        className={styles.timeline}
      >
        {items.map((it, idx) => {
          const isFirst = idx === 0;

          const contentStyle = isFirst
            ? {
                background: 'rgba(40, 100, 180, 0.25)',
                color: '#e6e6e6',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(6px)'
              }
            : {
                background:
                  it.type === 'work'
                    ? 'rgba(63, 169, 245, 0.1)'
                    : 'rgba(255, 160, 200, 0.1)',
                color: it.type === 'work' ? '#dceeff' : '#ffeaf2',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(6px)'
              };

          const contentArrowStyle = {
            borderRight: isFirst
              ? '7px solid rgba(40, 100, 180, 0.25)'
              : it.type === 'work'
              ? '7px solid rgba(63, 169, 245, 0.4)'
              : '7px solid rgba(255, 160, 200, 0.4)'
          };

          const iconStyle = {
            background: isFirst
              ? 'rgba(63, 169, 245, 0.3)'
              : it.type === 'work'
              ? 'rgba(63, 169, 245, 0.25)'
              : 'rgba(255, 160, 200, 0.25)',
            color: '#fff',
            border: '3px solid var(--gpt-text)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 8px rgba(0,0,0,0.3)'
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
            background: 'rgba(16, 204, 82, 0.25)',
            color: '#fff',
            border: '3px solid var(--gpt-text)',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 0 8px rgba(0,0,0,0.3)',
            
          }}
          icon={<StarIcon />}
          contentStyle={{ display: 'none' }}
          contentArrowStyle={{ display: 'none' }}
        />
      </VerticalTimeline>
    </div>
  );
}