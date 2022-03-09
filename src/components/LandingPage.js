import React, { Component } from 'react'
import styles from '../styles/landingpage.module.css'

export default class LandingPage extends Component {
  render() {
    return (
      <div className={styles.container}>
          <h1 className={styles.title}>Welcome to Ecommerce App</h1>
          <p className={styles.text}>Please, select a category to see products</p>
      </div>
    )
  }
}
