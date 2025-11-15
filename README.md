
# QuickStay

**QuickStay** is a full-stack hotel booking web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It enables users to search for hotels, make reservations seamlessly, and manage their bookings efficiently. Administrators can securely manage hotel listings and monitor all bookings through a dedicated dashboard.

---

## Features

### User Functionality

* Browse and search for hotels
* Book hotels with check-in and check-out dates
* View detailed hotel information with images and amenities
* Manage bookings from the user dashboard
* Secure login and signup powered by Clerk authentication

### Admin Functionality

* Add new hotel listings
* Edit hotel details and availability
* Access an admin dashboard to view and manage all bookings
* Utilize secure, protected routes through middleware

---

## Tech Stack

| Technology       | Description                                              |
| ---------------- | -------------------------------------------------------- |
| **MongoDB**      | NoSQL database for storing user, hotel, and booking data |
| **Express.js**   | Backend framework for handling API routes                |
| **React.js**     | Frontend library for building dynamic user interfaces    |
| **Node.js**      | JavaScript runtime for server execution                  |
| **Clerk**        | User authentication and management                       |
| **Cloudinary**   | Image upload and asset management                        |
| **Mongoose**     | ODM for MongoDB schema modeling                          |
| **Axios**        | HTTP communication between frontend and backend          |
| **Tailwind CSS** | Utility-first framework for responsive UI styling        |

---

## Folder Structure

```
QuickStay/
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── ...
├── server/                # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── configs/
│   ├── server.js
│   └── ...
```

---

## Installation & Setup

### Backend (Server)

```bash
cd server
npm install
npm run server
```

### Frontend (Client)

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create `.env` files in both `server/` and `client/` with the following keys:

### Server

```
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_secret
```

### Client

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Screenshots (optional)

Recommended additions:

* Home page
* Hotel details page
* Booking process
* Admin dashboard

---

## Future Improvements

* Integration with payment gateways such as Razorpay or Stripe
* Map-based hotel location view
* Enhanced mobile responsiveness
* Email notifications for booking confirmations

---

## Contribution

Contributions are welcome. Fork the repository and submit a Pull Request.

```bash
git clone https://github.com/manishkumar8312/QuickStay.git
```

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

* Clerk.dev
* Cloudinary
* MERN Stack learning resources

---
