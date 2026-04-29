Book Explorer:
A web application that helps casual readers and students who struggle to decide what book to read next by making book discovery simple through search and genre-based browsing instead of requiring exact titles. Built as part of a product engineering assignment.

Live Demo: https://your-vercel-url.vercel.app
GitHub: https://github.com/richakaushik461/book-explorer

The User & The Problem:

Who is this for? 
This app is designed for casual readers, students, and book lovers who want to explore new books but often don’t know exact titles or authors. Instead of remembering specific names, they prefer browsing books based on interests, genres, or curiosity.

What problem does it solve?
Most book search tools require users to already know what they are looking for. This makes discovery difficult for users who just want to explore new books. Book Explorer simplifies discovery by allowing users to search freely and browse books by genres, making the process faster, intuitive, and enjoyable.

Features:
Search — Find books by title or author name
Genre Filter — Browse books across multiple popular genres such as Fiction, Mystery, Romance, Fantasy, Science, and History
Book Details — View book covers, descriptions, subjects, and publication dates
Responsive Design — Optimized for mobile, tablet, and desktop
Smart Loading — Skeleton loaders shown while data is loading
Error Handling — Displays clear error messages with retry options
Pagination — Navigate through large result sets efficiently

Technology Choices:

Why React?
I chose React because its component-based architecture makes it easy to build reusable UI elements such as BookCard, SearchBar, and Pagination. React hooks like useState and useEffect helped manage UI updates and API data efficiently while keeping the code modular and maintainable.

Why Tailwind CSS?
I used Tailwind CSS because it allows fast UI development using utility classes directly in JSX. It made responsive design simple by using breakpoint prefixes like sm, md, and lg, and helped maintain consistent spacing, colors, and layout without writing large CSS files.

Why Custom Hooks?
Custom hooks helped separate data-fetching logic from UI components. This improved code readability and reusability.

Examples include:

useBookSearch — Handles fetching search results and managing loading/error states
useDebounce — Prevents unnecessary API calls while typing
useWorkDetail — Fetches detailed data for individual books

Why Axios with AbortController?
I used Axios to simplify API calls compared to fetch(). AbortController was used to cancel outdated requests when users type quickly. This prevents race conditions where older results might override newer search results.

Architecture Decisions:
Project Structure
src/
├── components/   # Reusable UI components (BookCard, SearchBar, Navbar, etc.)
├── hooks/        # Custom hooks for fetching and managing API data
├── pages/        # Main pages (Home, BookDetail)
├── App.js        # Routing configuration
└── index.js      # Application entry point

This structure separates UI logic, data logic, and page-level components, making the project scalable and easier to maintain.

State Management:
State management was kept simple and efficient using React hooks.

Each page manages its own UI state using useState
API-related states (loading, error, and data) are handled inside custom hooks
No global state library like Redux was used because the application scale did not require it

This approach reduced complexity while keeping the code clean and understandable.

What I Would Do Differently
With more time, I would:
Add a reading list feature — Allow users to save favorite books using localStorage
Implement infinite scrolling — Replace pagination for smoother browsing
Add dark mode support — Improve usability in low-light environments
Write unit tests — Test custom hooks and components using Jest
Improve accessibility — Add ARIA labels and keyboard navigation

Challenges I Faced
One of the biggest challenges was handling search optimization while keeping the UI responsive. Without debouncing, the API was being called too frequently while typing. Implementing useDebounce significantly improved performance.

Another challenge was handling missing data, such as books without cover images or descriptions. I solved this by adding fallback UI elements to maintain a clean user experience.

Running Locally:
# Clone the repository
git clone https://github.com/richakaushik461/book-explorer.git

# Navigate into the project folder
cd book-explorer

# Install dependencies
npm install

# Start the development server
npm start

Open: http://localhost:3000 in your browser.

API Used: This application uses the Open Library API, which is free and does not require authentication.

Endpoints Used:
Search Books- https://openlibrary.org/search.json
Book Details- https://openlibrary.org/works/{id}.json
Book Covers-  https://covers.openlibrary.org/b/id/{id}-M.jpg

Future Improvements: 
1. Add user authentication
2. Enable personalized recommendations
3. Implement AI-based book suggestions
4. Add book reviews and ratings
5. Improve caching for faster performance

