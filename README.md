BullMQ Test Project

This project demonstrates the usage of NestJS with BullMQ for job queueing.

Prerequisites:
- Node.js (version >= 12.0.0)
- Yarn (optional but recommended)

Installation:
1. Clone the repository:
   git clone https://github.com/willigeraldygdp/bullmq-test.git
   cd bullmq-test

2. Install dependencies:
   yarn

3. Start the application:
   yarn start

   The application will be available at http://localhost:3000.

Usage:

Adding a Sync Job:
To add a sync job, send a POST request to /jobs/sync with JSON data:
curl -X POST http://localhost:3000/jobs/sync -H "Content-Type: application/json" -d '{"key": "value"}'

Adding a Push Job:
To add a push job, send a POST request to /jobs/push with JSON data:
curl -X POST http://localhost:3000/jobs/push -H "Content-Type: application/json" -d '{"key": "value"}'

Adding an Error Job:
To add an error job, send a POST request to /jobs/error:
curl -X POST http://localhost:3000/jobs/error

License:
This project is licensed under the MIT License - see the LICENSE file for details.
