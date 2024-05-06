## FED Desktop

### Overview

FED Desktop is the official website of the Federation of Entrepreneurship Development (FED), designed to showcase upcoming events, introduce team members and leads, and provide resources for developing entrepreneurial skills. This platform aims to empower individuals interested in entrepreneurship and innovation.

### Features (Currently in Development)

#### User-Focused Features:

- **User Authentication**: Users can create accounts and log in to access personalized content.
- **Events Management**: Browse and register for upcoming events, view details of past events.
- **User Profile**: Users can manage their profiles, view registered events, and update their information.
- **Responsive Design**: User-friendly interface optimized for desktop and mobile devices.

#### Administrator-Focused Features:

- **Admin Dashboard**: Administrators can view details of registered users and their event applications.
- **Team Management**: Add, update, or remove team members and their roles.
- **Event Management**: Create, edit, or remove events with detailed descriptions and schedules.
- **Analytics**: Access analytics and insights on user engagement and event participation.

### Tech Stack

- **Frontend**: ReactJS using Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Styling**: Modular SCSS for customizable and maintainable styles.

### How to Run Locally

To run Fed-Frontend locally on your machine, open your VScode terminal and run these commands step by step:

1. **Clone Repository**:
   ```bash
   git clone https://github.com/your-repo-url.git
   ```

2. **Navigate to Project Directory**:
   ```bash
   cd fed-desktop
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Firebase Credentials**:
   - Obtain Firebase configuration keys from the Firebase Console.
   - Create a `.env` file in the root directory and add Firebase configuration details:
     ```
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     ```

5. **Start Development Server**:
   ```bash
   npm start
   ```

6. **Access Local Deployment**:
   Open your browser and navigate to `http://localhost:3000` to view the FED Desktop website locally.

### Fork and Contribution

If you would like to contribute to FED Desktop, you can fork the repository on GitHub and create a pull request with your proposed changes. Here's how:

1. **Fork Repository**:
   Click the "Fork" button on the top-right corner of the GitHub repository page.

2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/fed-desktop.git
   ```

3. **Create New Branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```

4. **Make Changes**:
   Implement your changes and commit them.

5. **Push Changes**:
   ```bash
   git push origin feature/my-new-feature
   ```

6. **Create Pull Request**:
   Go to your forked repository on GitHub and click on "New Pull Request" to submit your changes for review.

### Acknowledgements

Acknowledgements and credits go here.

### Screenshots

Include screenshots of the FED Desktop website in action:

1. Landing Page
2. Events Page
3. User Profile Section
4. Admin Dashboard

---

Feel free to reach out for any inquiries or assistance regarding FED Desktop. Happy coding and entrepreneurship!
