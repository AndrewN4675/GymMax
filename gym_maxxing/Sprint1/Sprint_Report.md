# Sprint 1 Report

**Video Link:** https://youtu.be/3wMO_sDlCW8

## What's New (User Facing)
* Home page implementation
* User registration page
* User login page
* Trainer profile management page
* Password recovery feature
* Fitness progress logging feature

## Work Summary (Developer Facing)
During this sprint, our team prioritized essential features to establish foundational functionality for GymMax. Our focus was on implementing critical user-facing features with minimal external dependencies, allowing each member to effectively familiarize themselves with React.js and the overall tech stack, including database integration via Neon and deployment through Vercel. Initial barriers included ensuring each team member had appropriate API keys for database access and handling challenges related to React’s server-side versus client-side rendering. These obstacles were overcome through collaborative debugging and active research, contributing to significant team growth and proficiency.

## Unfinished Work
All planned features for this sprint were successfully completed. However, due to ambitious sprint planning and time constraints, additional backlog items such as payment automation, smartwatch data synchronization, encryption of sensitive information, management of membership plans, scheduling, and viewing fitness classes and trainer profiles remain to be addressed in upcoming sprints.

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:
* [Log and view fitness progress (Medium)](https://github.com/AndrewN4675/GymMax/issues/6) - Derek Williams
* [User Registration Page (High)](https://github.com/AndrewN4675/GymMax/issues/12) - Philip Rickey
* [Home Page (High)](https://github.com/AndrewN4675/GymMax/issues/14) - Calvin Wieland
* [Manage trainers and their profiles (High)](https://github.com/AndrewN4675/GymMax/issues/9) - Calvin Wieland
* [Password Recovery (Low)](https://github.com/AndrewN4675/GymMax/issues/13) - Derek Williams
* [Login Page (High)](https://github.com/AndrewN4675/GymMax/issues/1) - Andrew Neal

## Incomplete Issues/User Stories
Here are links to issues we worked on but did not complete in this sprint:
* [Automate and track payments (Medium)](https://github.com/AndrewN4675/GymMax/issues/3) – We did not get to this issue because we prioritized foundational features and React familiarization.
* [Manage member payments (Medium)](https://github.com/AndrewN4675/GymMax/issues/10) – We ran out of time due to our ambitious sprint scope and initial learning curve with React.
* [Sync data from smartwatches or fitness bands (Low)](https://github.com/AndrewN4675/GymMax/issues/7) – This feature was deprioritized to future sprints to first solidify core functionalities.
* [Encrypted Sensitive Information (Medium)](https://github.com/AndrewN4675/GymMax/issues/19) – We did not get to this issue because we prioritized simpler tasks for initial React learning.
* [Manage membership plans (High)](https://github.com/AndrewN4675/GymMax/issues/2) – This feature required foundational components to be completed first.
* [View scheduled fitness classes (High)](https://github.com/AndrewN4675/GymMax/issues/4) – Dependent features took precedence; this will be tackled in future sprints.
* [Manage and schedule fitness classes (High)](https://github.com/AndrewN4675/GymMax/issues/8) – Dependent features took precedence; planned for future sprints.
* [View trainer profiles and their expertise (High)](https://github.com/AndrewN4675/GymMax/issues/5) – Will build upon existing trainer profile management in next sprint.

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:
* [homePage.js](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/homepage/page.tsx)
* [userRegistration.js](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/register/page.tsx)
* [loginPage.js](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/login/page.tsx)
* [trainerManagement.js](https://github.com/AndrewN4675/GymMax/tree/main/gym_maxxing/src/app/trainerinfo)
* [fitnessProgress.js](https://github.com/AndrewN4675/GymMax/blob/main/gym_maxxing/src/app/progress/page.tsx)

## Retrospective Summary

**Here's what went well:**
* Successfully implemented all core features scheduled for the sprint.
* Team quickly adapted to React.js despite initial unfamiliarity.
* Effective collaboration helped resolve API key and rendering challenges.

**Here's what we'd like to improve:**
* Trainer profile management page is buggy and needs refinement.
* User login page currently does not hash passwords, posing security risks.
* Home page functionality could be smoother and more user-friendly.

**Here are changes we plan to implement in the next sprint:**
* Improve trainer profile management page to remove bugs and enhance usability.
* Implement password hashing to strengthen security on the login page.
* Refine home page features for improved user experience.

---

**Team Members:**  
- Derek Williams (Project Leader): 011868372  
- Philip Rickey: 11820687  
- Calvin Wieland: 11799943  
- Andrew Neal: 11844393  

**Instructor:**  
Parteek Kumar  

**Course:**  
CPT_S 451 – Introduction to Database Systems
