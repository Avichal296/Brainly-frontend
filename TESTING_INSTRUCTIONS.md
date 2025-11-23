# Testing Instructions for Brainly Frontend and Backend

## Critical Path Testing Areas

### 1. CrossIcon SVG Warnings
- Open the frontend app in your browser.
- Open browser developer console.
- Confirm no warnings/errors about invalid SVG DOM properties from CrossIcon or other components.

### 2. Adding Content via CreateContentModal
- Click "Add content" button in Dashboard.
- Fill in content title, link, and select type (YouTube/Twitter).
- Submit the form.
- Confirm the POST request to `/api/v1/content` appears in the browser network tab.
- Check if the request succeeds (status 200/201).
- Confirm the new content card appears in the Dashboard.

### 3. Twitter Embed
- Test adding content with Twitter links.
- Confirm Twitter embed blockquote renders correctly.
- Confirm the Twitter widgets.js script loads successfully (check network tab).

### 4. Backend MongoDB Connectivity
- Check if your backend server logs any MongoDB connection errors.
- Verify MongoDB server is running and accessible on localhost:27017.
- Confirm backend accepts and processes content add requests successfully.

### 5. net::ERR_FILE_NOT_FOUND Chunk Loading Error
- Verify this error no longer appears in browser console.
- If persistent, try clearing build cache and restarting frontend dev server:
  - Stop frontend server.
  - Delete `node_modules/.vite` cache folder (or equivalent).
  - Run `npm run dev` again.

## Optional Thorough Testing
If you want more coverage beyond critical path:
- Test all navigation links, buttons, inputs across the app.
- Exercise edge cases and error handling in API endpoints using curl or Postman.
- Check UI responsiveness, error messages, and loading states.

---

Please follow this guide and share your findings or issues for further support.
