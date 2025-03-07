import Link from 'next/link';
import Head from 'next/head';
import Styles from './page.module.css';

export default function Login() {
  return (
    <div className={Styles.page}>
      <Head>
        <title>GymMax | Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <header className={Styles.header}>
        <nav>
          <ul className={Styles.navList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/membership">Membership</Link></li>
            <li><Link href="/classes">Classes</Link></li>
            <li><Link href="/trainers">Trainers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className={Styles.mainContent}>
        <section className={Styles.hero}>
          <h1>Welcome to GymMax</h1>
          <p>Your all-in-one gym management solution.</p>
          <a className={Styles.ctaButton}>Get Started</a>
        </section>

        <section className={Styles.features}>
          <h2>Our Features</h2>
          <div className={Styles.featureCard}>
            <h3>Membership Management</h3>
            <p>Manage your gym membership plans and payments.</p>
          </div>
          <div className={Styles.featureCard}>
            <h3>Class Scheduling</h3>
            <p>Book and schedule fitness classes.</p>
          </div>
          <div className={Styles.featureCard}>
            <h3>Trainer Profiles</h3>
            <p>Explore trainer profiles.</p>
          </div>
        </section>
      </main>

      <footer className={Styles.footer}>
        <p>&copy; 2025 GymMax | All rights reserved.</p>
      </footer>
    </div>
  );
}
