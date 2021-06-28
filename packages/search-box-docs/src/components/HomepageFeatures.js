import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '快速上手',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        只要使用过 React 和 Redux，即可快速上手。
      </>
    ),
  },
  {
    title: '记忆配置',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        通过<code>location.search</code>记录参数，通过<code>localStorage</code>记录高级配置。
      </>
    ),
  },
  {
    title: 'React驱动',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        由 React 驱动，高效性能。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
