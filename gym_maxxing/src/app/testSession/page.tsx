"use client"

import { redirect } from 'next/navigation'
import Link from 'next/link';
import Head from 'next/head';
import Styles from './page.module.css'
import { useEffect, useState } from "react";

type Trainer = {
  TrainerID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Expertise: string;
  Email: string;
};

export default function Login() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);

  const handleCreateSession = async () => {
    try {
      var userId = 1;
      var username = 'person';

      // call the createSession API route to create a session
      const sessionResponse = await fetch('/api/createSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, username })
      });

      if (!sessionResponse.ok) {
          return { success: false, error: 'Failed to create session' };
      }

      console.log(sessionResponse);


    } catch (error) {
      console.error('Error submitting changes:', error);
      alert('Error submitting changes.');
    }
  };

  const handleGetCurrentUser = async () => {
    try {
      var userId = 1;
      var username = 'person';

      // Now, call the `createSession` API route to create the session
      const sessionResponse = await fetch('/api/getCurrentUser', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        //body: JSON.stringify({ userId, username })
      });

    if (!sessionResponse.ok) {
        return { success: false, error: 'Failed to get user' };
    }

      console.log(sessionResponse);

    } catch (error) {
      console.error('Error submitting changes:', error);
      alert('Error submitting changes.');
    }
  };

  const handleSessionValid = async () => {
    try {
      var userId = 1;
      var username = 'person';

      // Now, call the `createSession` API route to create the session
      const sessionResponse = await fetch('/api/sessionIsValid', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      });

    if (!sessionResponse.ok) {
        return { success: false, error: 'Failed to get session validity' };
    }

      console.log(sessionResponse);

    } catch (error) {
      console.error('Error:', error);
      alert('Error.');
    }
  };

  const handleLogout = async () => {
    try {
      // Now, call the `createSession` API route to create the session
      const sessionResponse = await fetch('/api/logoutUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      });

    if (!sessionResponse.ok) {
        return { success: false, error: 'Failed to create session' };
    }

      console.log(sessionResponse);

    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out.');
    }
  };

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
          <h1>Session Testing Page</h1>
        </section>

        <section className={Styles.features}>
          <h2>Our Features</h2>
          <button onClick={handleCreateSession} className={Styles.ctaButton}>Create a session</button>
          <button onClick={handleGetCurrentUser} className={Styles.ctaButton}>get current user</button>
          <button onClick={handleSessionValid} className={Styles.ctaButton}>Check session validity</button>
          <button onClick={handleLogout} className={Styles.ctaButton}>Log out</button>
        </section>
      </main>

      <footer className={Styles.footer}>
        <p>&copy; 2025 GymMax | All rights reserved.</p>
      </footer>
    </div>
  );
}