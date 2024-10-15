# Maccy's E-Commerce Store

## Introduction

Welcome to **Maccy's E-Commerce Store**! This is a web application designed to provide users with a seamless and efficient online shopping experience. Users can browse products, filter by categories, sort by price or rating, and leave reviews for products. The application also supports user authentication, allowing users to sign in and sign out securely.

## Technologies Used

- **Next.js**: A  React framework for building server-side rendered  websites.
    
- **Firebase Firestore**: A NoSQL database from Firebase that stores data for my application.
- **Firebase Authentication**: Used to handle user sign-in and sign-out.
    
- **Tailwind CSS**: used for styling parts of my project.
    

    

## Setup Instructions

1. **Clone the repository**:
    
    
2. **Install dependencies**:
    
    bash
    
    Copy
    
    ```
    npm install
    ```
    
3. **Set up Firebase**:
    
    - Create a Firebase project.
        
    - Set up Firestore and Authentication.
        
    - Obtain your Firebase configuration and update `firebaseConfig.js` in the `src` directory.
        
4. **Create a** `.env.local` **file** in the root directory and add your Firebase configuration:
    
    env
    
    Copy
    
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```
    
5. **Run the development server**:
    
    bash
    
    Copy
    
    ```
    npm run dev
    ```
    

## My Repository

Find the code repository on GitHub [here](https://github.com/TapiwaHerbetNosenga/HERNOS241_JSE2407_D_Herbet-Nosenga_FSJ03).

## My Hosted Website

This is my hosted site [here](https://fsj-3.vercel.app/)


## Usage Examples

- **Browse Products**: Users can browse through the list of available products on the home page.
    
- **Filter by Category**: Use the category dropdown to filter products by category.
    
- **Sort Products**: Sort products by price or rating using the sort dropdown.
    
- **Search Products**: Use the search bar to find products by name.
    
- **Leave a Review**: Logged-in users can leave a review for products they have purchased.
    
- **Authentication**: Users can sign in and sign out securely.
    

## Conclusion

Thank you for visiting Maccy's E-Commerce Store! We hope you enjoy your shopping experience. If you have any questions or feedback, feel free to reach out.