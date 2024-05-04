# Jeezy

Jeezy is a  hosting platform similar to Vercel, allowing users to deploy their websites for free. It is built with Next.js for the frontend and Django for the backend.

## Technologies Used

- Frontend: Next.js
- Backend: Django

## Features

- User authentication with (Github)
- Website deployment via Github repositories
- Database integration
- Project management
- Wide range of templates
- Deployment status management
- Logs
- Analytics
- Free hosting

## Installation

To run Jeezy locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/iranzithierry/jeezy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd jeezy
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   pip install -r /requirements/ `ALL FILES`

   ```

4. Configure environment variables:
   
   - Create a `.env` file in the backend directory and add necessary variables such as database credentials, secret key, etc.

5. Run migrations:

   ```bash
   cd backend
   virtualenv env
   source env/bin/activate
   python manage.py migrate
   ```

6. Start the development servers:

   ```bash
   # Start frontend server
   cd ../frontend
   npm run dev

   # Start backend server
   cd ../backend
   python manage.py runserver
   ```

## Usage

Once the servers are running locally, you can access the website at `http://localhost:3000` in your browser.

## Deployment
Comming Soon

## Contribution

Contributions are welcome! If you'd like to contribute to Jeezy, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
```