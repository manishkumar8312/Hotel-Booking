# 🏨 Contributing to QuickStay

Welcome, and thank you for your interest in contributing to **QuickStay**! We're building a full-stack hotel booking application to help users find and book stays seamlessly. Your support is crucial for making this project a success.

Whether you're a developer, designer, or documentation writer — **you can make a difference here.** 🚀

---

## 📜 Code of Conduct

To ensure a safe and inclusive environment for everyone, please read and follow our [**Code of Conduct**](CODE_OF_CONDUCT.md). We expect all contributors to adhere to these standards.

---

## 🚀 How You Can Contribute

There are many ways to contribute to the project. Every contribution is highly appreciated!

*   🐛 **Fix Bugs:** Find and resolve issues to improve stability.
*   ✨ **Implement New Features:** Help build features from our roadmap, like payment gateways or map views.
*   🎨 **Enhance the UI/UX:** Improve the user interface and the overall booking experience.
*   📚 **Improve Documentation:** Clarify setup instructions, comment code, or improve our guides.
*   🔧 **Refactor Code:** Help optimize backend performance or make the frontend code more maintainable.
*   🔍 **Review Pull Requests:** Help us review contributions from others.

---

## 🔧 Getting Started: Your First Contribution

Ready to make your first contribution? Here’s how to get set up.

### 1️⃣ Find an Issue to Work On

-   Check our [**GitHub Issues**](https://github.com/manishkumar8312/Hotel-Booking/issues) for tasks labeled `good first issue` or `help wanted`.
-   **Important:** Before you start working, please comment on the issue to ask for it to be assigned to you. This prevents duplicate work.
-   If you have a new idea, please open a new issue to discuss it before creating a pull request.

### 2️⃣ Fork & Clone the Repository

-   Click the **Fork** button at the top-right of the page to create a personal copy.
-   Clone your forked repository to your local machine:
    ```bash
    git clone https://github.com/<YOUR-USERNAME>/QuickStay.git
    cd QuickStay
    ```

### 3️⃣ Create a New Branch

-   Create a new branch with a descriptive name for your feature or fix.
    ```bash
    # For a new feature
    git checkout -b feat/hotel-search-filters

    # For a bug fix
    git checkout -b fix/user-dashboard-crash
    ```

### 4️⃣ Set Up The Environment

This is a critical step to run the project locally.

**A. Create Environment Variables**
You must create `.env` files in both the `server/` and `client/` directories. These files are ignored by Git and hold your secret keys.

-   Refer to the `README.md` for the full list of required variables like `MONGO_URI`, `CLERK_SECRET_KEY`, and `VITE_CLERK_PUBLISHABLE_KEY`.

**B. Install Dependencies and Run the App**

-   **Backend (Server):**
    ```bash
    cd server
    npm install
    npm run server
    ```

-   **Frontend (Client):**
    ```bash
    cd client
    npm install
    npm start
    ```

### 5️⃣ Make and Commit Your Changes

-   Write your code and implement your changes.
-   Follow our commit message format for clarity.

```bash
# Example
git add .
git commit -m "feat: add price range filter to hotel search"
  ```
---

## ✍️ Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. Please format your commit messages as follows:

`type: short description`

-   **feat:** A new feature (e.g., `feat: add user reviews section`)
-   **fix:** A bug fix (e.g., `fix: correct booking date validation`)
-   **docs:** Changes to documentation only
-   **refactor:** Code cleanup or restructuring without changing functionality
-   **test:** Adding or improving tests
-   **chore:** Build process or dependency updates

---

## ✅ Submitting a Pull Request

Once your changes are ready, it's time to create a Pull Request (PR).

1.  **Push your branch** to your forked repository:
    ```bash
    git push origin your-branch-name
    ```
2.  Go to your forked repository on GitHub and click **"Compare & pull request"**.
3.  Fill out the PR template with a **clear title** and a **detailed description** of your changes.
4.  **Link the issue** you are solving by including `Closes #<issue-number>` in the PR description.
5.  **Check your work** one last time using the checklist below.

### Pre-PR Checklist

Before you submit, please make sure you've done the following:
- [ ] I have tested my changes locally and they work as expected.
- [ ] My code follows the project's coding style and conventions.
- [ ] My commit messages are clear and follow the established format.
- [ ] I have updated the documentation if my changes require it.
- [ ] This PR is focused on a single issue or feature.

---

## 🙏 A Note from the Maintainers

Thank you for taking the time to contribute! Your efforts help make **QuickStay** a better platform for everyone. We're excited to see your contributions and collaborate with you.

<br>
<div align="center">
  <em><b>Your contributions help create a seamless booking experience for everyone!</b></em>
</div>