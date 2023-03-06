This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

## Client App

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## API

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](http://localhost:8080) Local [https://maven-shop-api.herokuapp.com] Hosted URL. `.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Details

Coverage:

● NodeJS/Express
● TypeScript/JavaScript
● Eslint with Airbnb style-guide
● MongoDB
● ReactJs/NextJs
● Prettier

Areas Left Out due to time constraint

- UNIT AND END TO END TEST

Other Areas application would have been enhanced but not in the scope:

- Server Side Rendering for Products and Product Detail Pages
- Pagination
- Deeper code refactoring and Util functions usage
- Cloud based Image upload (S3)
- App-wide state management with Redux
- Animation
-

## Code Analysis

# Client App

Component Composition follows the Stateless and Statefull Approach (Presentation nd Control layers)
Objects are flat and unambiguous
Meager dependency on third party libraries,
Image Optimization
Full Applicable Next.js Features
Component based design for re-usability
Mini store to handle Notification and Authentication Context
Emphasis on Component communication and HOC.

# API

[https://maven-shop-api.herokuapp.com]
To run test locally with client-app change next.config.js env variable to http://localhost:8080
Authorization and Authentication Middleware
Global Error Handling
KISS design: Simple and Flat
Single Responsibility
Image Upload uses Folder based approach
Log directory

## Draw back

Air BnB Style Guide: This was used as much as the text editor configuration permitted, Further enforcement will require complete overwrite of the editor's config, which will be costly and time consuming.
Hence the reason behind some functions being disabled.

## Conclusion

Given, the time frame and other engagements, the focus was solely on the implementation of the important features and keeping it simple and intuitive while at it.
