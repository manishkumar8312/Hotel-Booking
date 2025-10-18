# 🏨 QuickStay

**QuickStay** is a full-stack Hotel Booking Web Application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to explore hotels, book stays seamlessly, and manage their reservations efficiently. Admins can list and manage hotel properties through a secure dashboard.

---
## 🚀 Features

### 👤 User Functionality

* 🔍 Browse and search for hotels
* 📅 Book hotels with check-in/check-out dates
* 🛏 View hotel details with images and amenities
* 💼 Manage bookings in user dashboard
* 🔐 Secure login/signup with Clerk authentication

### 🛠 Admin Functionality

* 🏨 Add new hotel listings
* 📝 Edit hotel details and availability
* 📊 Dashboard for viewing all bookings
* 🔒 Protected routes using middleware

---

## 🧰 Tech Stack

| Technology       | Description                                           |
| ---------------- | ----------------------------------------------------- |
| **MongoDB**      | NoSQL Database to store user, hotel, and booking data |
| **Express.js**   | Backend web framework                                 |
| **React.js**     | Frontend library for dynamic UI                       |
| **Node.js**      | Runtime environment for server                        |
| **Clerk**        | Authentication and user management                    |
| **Cloudinary**   | Image uploading and hosting                           |
| **Mongoose**     | MongoDB object modeling                               |
| **Axios**        | HTTP requests from React to backend                   |
| **Tailwind CSS** | Utility-first CSS framework for styling               |

---

## 📂 Folder Structure

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

## 🔧 Installation & Setup

### 🖥️ Backend (Server)

```bash
cd server
npm install
npm run server   # Starts Express backend using nodemon (default http://localhost:3000)
```

### 🌐 Frontend (Client)

```bash
cd client
npm install
npm run dev      # Starts Vite dev server (defaults to http://localhost:5173)
```

---

## 🔐 Environment Variables

Create `.env` files in both `server/` and `client/` with the following:

### For Server

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string # e.g. mongodb://localhost:27017
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_secret
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
```

### For Client

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 🖼️ Screenshots (optional)

> Add images of:
>
> * Home page
> * Hotel details page
> * Booking flow
> * Admin dashboard

---

## 📈 Future Improvements

* ✅ Payment gateway integration (e.g. Razorpay, Stripe)
* 🌍 Map view for hotel locations
* 📱 Mobile responsive improvements
* ✉️ Booking confirmation via email

---

## 🤝 Contribution

Feel free to fork this project and raise a Pull Request.

```bash
git clone https://github.com/manishkumar8312/Hotel-Booking.git
```

You can also use the provided `.env.example` files in both `server/` and `client/` as templates:

```
cp server/.env.example server/.env
cp client/.env.example client/.env
```

---

## 📃 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

* [Clerk.dev](https://clerk.dev)
* [Cloudinary](https://cloudinary.com/)
* [MERN Stack Resources](https://www.mongodb.com/mern-stack)

---
