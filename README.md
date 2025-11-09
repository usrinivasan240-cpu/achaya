# E‑Library (HTML/CSS/JS)

A comprehensive, client‑side E‑Library web application built with vanilla HTML, CSS, and JavaScript. No build tools or frameworks required.

## Features

### Account Management
- Create accounts with Gmail email and password
- Login/Logout functionality
- Persistent user sessions via localStorage
- Personal welcome dashboard

### Main Dashboard
- Welcome message with user name
- Quick statistics (Favorites, Borrowed books, Print jobs)
- Centralized hub to access all library features

### E-Library Section
- Browse curated collection of books (20+ titles)
- **Advanced Search**: Search by title, author, or description
- **Genre Filtering**: Filter books by genre (Fiction, Science Fiction, Fantasy, etc.)
- **Availability Status**: View if books are Available or Issued
- **Book Location**: See which library location holds each book (Main/Sub library)
- **Borrower Information**: If issued, see who borrowed it and due date
- **Sorting Options**: Sort by title, author, year, or rating
- **Mark Favorites**: Add/remove books to favorites list
- **Borrow/Return**: Manage your borrowed books
- Book cards show real-time availability status badges

### Print Notes Feature
- Upload documents (PDF, Word, Text, Image files)
- Choose printing mode: Black & White or Colour
- Select number of copies (1-50)
- **Real-time Cost Calculation**: Dynamic pricing based on color and copies
  - B&W: ₹5 per copy
  - Colour: ₹10 per copy
- **GPay Integration**: Simulated payment with Google Pay
- Print history with transaction records
- Status tracking for all print jobs

### My Books Section
- View all favorite books
- View all borrowed books
- Organized tabs for quick access

### State Persistence
- All user data persists via localStorage
- Favorites and borrowed books saved locally
- Print history preserved
- User preferences (search, filters) remembered
- Survives page refresh and browser restart

## Getting Started

1. Clone the repository and open `index.html` in your browser.
2. Create an account or login (uses email-based authentication)
3. Start exploring the E-Library!

## Project Structure

- `index.html` — App shell with all UI components
- `styles.css` — Dark theme styling with responsive layout
- `script.js` — App logic, authentication, search/filter, and persistence

## How to Use

### Signing In
- Use any email address (e.g., test@gmail.com)
- Set a password (minimum requirements: non-empty)
- Login redirects to personal dashboard

### Finding Books
1. Go to E-Library tab
2. Use Search bar to find books by name, author, or description
3. Filter by Genre or mark "Only Available" to filter by availability
4. Click book cards or "Details" to view full information
5. Add to favorites or borrow books

### Printing Notes
1. Go to Print Notes tab
2. Upload a document file
3. Choose color mode and number of copies
4. Review cost calculation
5. Click "Pay with GPay" and confirm payment
6. Check print history for all submissions

## Book Dataset

The app includes 20 sample books across various genres with realistic availability information:
- Some books are available at Main Library or Sub Library
- Others are currently issued to specific borrowers with due dates
- Each book has author, year, genre, rating, and description

## Notes

- This project intentionally avoids build steps for simplicity
- Book covers are placeholder images from picsum.photos seeded by book id
- GPay payment is simulated (alert-based confirmation)
- All data is stored locally in the browser
- No backend/server required
