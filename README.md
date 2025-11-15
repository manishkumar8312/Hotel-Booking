

# QuickStay


**QuickStay** is a full-stack hotel booking web application built using the **MERN Stack**.
It enables users to search hotels, book stays, and manage reservations with ease.
Admins can manage listings and bookings through a secure dashboard.

---

## Features

### **User Functionality**

* Browse and search for hotels
* Book hotels with check-in and check-out
* View detailed hotel information (images, amenities)
* Manage bookings from user dashboard
* Secure authentication powered by **Clerk**

### **Admin Functionality**

* Add new hotel listings
* Edit hotel details & availability
* Monitor all bookings in admin dashboard
* Protected routes using authentication middleware

---

## Tech Stack

| Technology       | Icon                                                                                                                                                                   | Description                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **MongoDB**      | <img src="https://img.icons8.com/color/48/mongodb.png" width="32"/>                                                                                                    | NoSQL DB for hotels, users & bookings |
| **Express.js**   | <img src="https://img.icons8.com/office/40/express-js.png" width="32"/>                                                                                                | Backend framework for APIs            |
| **React.js**     | <img src="https://img.icons8.com/color/48/react-native.png" width="32"/>                                                                                               | Frontend UI library                   |
| **Node.js**      | <img src="https://img.icons8.com/color/48/nodejs.png" width="32"/>                                                                                                     | Backend runtime                       |
| **Clerk**        | <img src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-clerk-authentication-for-applications-logo-color-tal-revivo.png" width="32"/> | Authentication & user management      |
| **Cloudinary**   | <img src="https://img.icons8.com/color/48/cloud.png" width="32"/>                                                                                                      | Image storage & optimization          |
| **Mongoose**     | <img src="https://img.icons8.com/ios-filled/50/000000/database.png" width="30"/>                                                                                       | MongoDB schema modeling               |
| **Axios**        | <img src="https://img.icons8.com/ios-filled/50/000000/synchronize.png" width="30"/>                                                                                    | API communication                     |
| **Tailwind CSS** | <img src="https://img.icons8.com/fluency/48/tailwind_css.png" width="32"/>                                                                                             | Utility-first UI styling              |

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

### **Backend**

```bash
cd server
npm install
npm run server
```

### **Frontend**

```bash
cd client
npm install
npm start
```

---

## Environment Variables

### **Server `.env`**

```
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_SECRET_KEY=your_clerk_secret
```

### **Client `.env`**

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_BASE_URL=http://localhost:5000/api
```


---

## Future Enhancements

* Payment gateway (Razorpay / Stripe)
* Map-based hotel location view
* Better mobile responsiveness
* Email notifications

---

## Contribution

```bash
git clone https://github.com/manishkumar8312/QuickStay.git
```

Pull requests are welcome!

---

## License

Licensed under the **MIT License**.

---

## Acknowledgments

* Clerk
* Cloudinary
* MERN community resources

---
