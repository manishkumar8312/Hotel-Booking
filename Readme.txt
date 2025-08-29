to solve the following issues-

#17
Description
The HotelReg component currently uses basic HTML required attributes for validation. This provides a minimal and often inconsistent user experience. To improve usability and guide the user, we should implement robust, real-time client-side validation.

Proposed Enhancements
1.Add onChange handlers to the form inputs.
2.Use component state to track not just the input values, but also any validation errors.
3.Display clear, specific error messages directly below each field as the user types (e.g., "Please enter a valid phone number," "Hotel name cannot be empty.").
4.The "Register" button should be disabled until the form is valid, preventing invalid submissions.
5.This task is purely a frontend component enhancement and can be worked on independently of the backend implementation for hotel registration, making it a non-conflicting issue.


#18
Description
The codebase contains an incomplete component, <HotelReg/>, which is currently unused and set to {false && <HotelReg/>} in App.jsx. This component provides the UI for a hotel owner to register a new hotel but lacks the necessary backend logic and integration.

This feature is a core part of the "Admin Functionality" mentioned in the README ("Add new hotel listings").

Proposed Plan to Complete the Feature
 - Create a Backend Endpoint:

 * Design a Hotel model in Mongoose.
 * Create a new API endpoint on the server, e.g., POST /api/hotels.
 * This endpoint must be a protected route that only users with the 'hotelOwner' role can access. It will receive hotel data from the form and save it to the database.
 - Activate the Frontend Component:

 * Wire up the <HotelReg/> form's onSubmit handler to make an authenticated axios POST request to the new /api/hotels endpoint.
 * Implement state management for loading and error states during form submission.
 * Provide user feedback upon success (e.g., "Hotel registered successfully!") or failure using a toast notification system.
Integrate into the UI:

Add a "Register Hotel" button to the Owner Dashboard (/owner) that opens the <HotelReg/> component as a modal.
Completing this feature is a major step towards fulfilling the project's core promise for hotel owners. I am prepared to work on both the frontend and backend parts of this task.

#24
Hi team! 👋

-I noticed a few areas in the project that could use improvements for better user flow and functionality:

-Most of the navbar buttons (like Home, Hotels, Experience, etc.) don’t seem to be functional or redirect anywhere.

-The Dashboard is accessible even without authentication or login, which breaks the security and user flow.

-Dropdowns or interactive UI elements (e.g., date pickers, guest selectors) are present but not fully wired up or responsive in -behavior.

-I’d love to contribute and improve the UX by fixing these issues one at a time.
-I’d like to start with making the navbar fully functional

Please let me know if it’s okay to proceed — I can then create a PR with the first batch of fixes