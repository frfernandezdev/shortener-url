# ShortenerUrl 🚀✨

## Description

**ShortenerUrl** is a system developed with Laravel and Inertia for URL shortening. The project integrates CI/CD with GitHub Actions, uses PostgreSQL as the database, and is deployed on AWS Lambda using Serverless. Get ready for a thrilling ride! 🚀🌟

## Prerequisites

Before starting this epic adventure, make sure you have these technological superpowers at hand:

- [Node.js](https://nodejs.org/en/download/) 🌐: For all your JavaScript runtime needs.
- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos) 🛠️: Your dependency companion, the real MVP!
- [Serverless](https://bref.sh/docs/setup) ☁️: Because deploying to the cloud has never been so easy.
- [Docker](https://docs.docker.com/get-docker/) 🐳: The container of your dreams.
- [Git](https://git-scm.com/downloads) 🧑‍💻: To keep everything under control with style.

## Installation

Let’s set the stage! Follow these steps and you’ll be ready to shorten URLs like a pro:

1. Clone the repository to your local machine. 🖥️🔧
2. Navigate to the project directory. 🗺️✨
3. Run `./vendor/bin/sail up` to start the local development environment. The show is about to begin! 🎉
4. Run `./vendor/bin/sail npm run build` to build the frontend assets. Inertia and React are going to shine! 🌈🎨
5. Run `./vendor/bin/sail artisan migrate` to apply the database migrations. The tables and data are ready for action! 📊🔄

   **Note:** If you modify the migrations or database schema, run `./vendor/bin/sail artisan migrate` again. Databases need love too! 💪❤️

6. Run `./vendor/bin/sail artisan l5-swagger:generate` to generate the Swagger documentation. Documentation has never been this impressive! 📚🚀

   **Note:** If you modify the Swagger documentation, be sure to run `./vendor/bin/sail artisan l5-swagger:generate` again. Fresh documentation is the best! 🌟📖

## Usage

Time to shorten URLs and see the magic in action! Once everything is up and running, head over to [http://localhost](http://localhost) in your browser and start shortening links like a pro. 🎯🔗

## Deploy to Production

Ready to launch your project to stardom? Follow these steps and let the world see your brilliant creation:

1. **Configure Production Environment**: Prepare your `.env` file on the server with all the necessary variables. It’s the secret to a fabulous application! 🌟🔧

2. **Build Assets**: Run `npm run build` to build the frontend assets. Make everything shine in production! 💎✨

3. **Deploy to AWS Lambda**: Use [Serverless Framework](https://www.serverless.com/) to deploy your application to AWS Lambda. Run `serverless deploy` and watch your project soar to the cloud. ☁️🚀

4. **Database Migrations**: Run `serverless bref:cli --function=artisan --args="migrate --force"` to apply the database migrations in production. Get everything ready for action! 📈🔄

5. **Update Swagger**: Run `serverless bref:cli --function=artisan --args="l5-swagger:generate"` to update the Swagger documentation. The latest documentation is at everyone’s fingertips! 📚🚀

6. **Verify Deployment**: Once deployment is complete, visit the URL provided by AWS Lambda to ensure your application is working perfectly. 🕵️‍♂️🔍

## Unit and Feature Testing 🧪🔍

There’s no better way to ensure your code shines than with some good testing! Here’s how to do it:

1. **Unit Tests**: Make sure every little component of your system is working perfectly. Run unit tests with the command:

   ```bash
   sail artisan test
   ```

It’s like a resilience test for every little hero in your code! 💪🧩

2. **Feature Tests**: Verify that all the functionalities of your application work like a dream. Run feature tests with:

   ```bash
   sail artisan test
   ```
Make sure your system functions like a well-tuned orchestra! 🎻🎶

   **Note:** To add more tests, simply place your test files in the tests/ directory and you’re good to go!

