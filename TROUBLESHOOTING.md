# Troubleshooting Guide - "Can't Add New Workout"

## What Was Fixed

I've made the following improvements:

### Backend Changes
- ✅ Enhanced `createWorkout` to return complete workout object with exercises
- ✅ Added error logging for debugging

### Frontend Changes
- ✅ Added token validation before API calls
- ✅ Added better error handling with detailed messages
- ✅ Added console logging for debugging
- ✅ Parse response before checking `.ok` status
- ✅ Clear error message on successful actions

## How to Test Now

### Step 1: Refresh Your Browser
Press `Cmd+R` or `Cmd+Shift+R` to hard refresh and get the latest code.

### Step 2: Try Creating a Workout
1. Click the "+ New Workout" button
2. Check your browser console (F12 or Cmd+Option+I)
3. Look for any error messages

### Step 3: Check Browser Console
Open Developer Tools (F12) and look for:
- Any red errors
- Network tab to see the API request
- Check if you get a 201 or 200 response

## Common Issues & Solutions

### Issue 1: "No authentication token found"
**Solution**: You need to log in first
- Go to login page
- Enter your email and password
- Token should be saved to localStorage

### Issue 2: 401 Unauthorized
**Solution**: Your token might be expired
- Logout (button in dashboard header)
- Login again
- Try creating a workout

### Issue 3: Network Error
**Solution**: Backend might not be running
- Check Terminal 1 shows "Server running on port 5001"
- If not, run: `cd server && npm run dev`

### Issue 4: CORS Error
**Solution**: Frontend/Backend port mismatch
- Frontend should be on: http://localhost:3000
- Backend should be on: http://localhost:5001
- Dashboard calls: http://localhost:5001/api/workouts

## Debug Steps

### In Browser Console (F12)

1. Check if token exists:
```javascript
console.log(localStorage.getItem("token"))
```

2. Manually test the API:
```javascript
fetch('http://localhost:5001/api/workouts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
}).then(r => r.json()).then(d => console.log(d))
```

3. Check Network tab:
- Click "+ New Workout"
- Look in Network tab for POST to `/api/workouts`
- Check response body
- Check status code (should be 201)

### In Backend Terminal

The backend should log:
- When a request comes in
- Any errors during processing
- Successful workout creation

## What Each Button Should Do

| Button | Action | Expected Result |
|--------|--------|-----------------|
| + New Workout | Creates a new workout for today | New card appears at top with date |
| + Add Exercise | Adds exercise to expanded workout | Exercise name appears in list |
| Add Set | Logs reps and weight | "X reps × Y lbs" appears |
| ✕ (delete set) | Removes a set | Set disappears from list |
| Delete Workout | Removes entire workout | Card disappears |

## If Still Not Working

### Check 1: Is the frontend showing errors?
- Look for red error message on the dashboard
- Screenshot it and note the exact message

### Check 2: Are both servers running?
```bash
# Check backend
curl http://localhost:5001/

# Check frontend  
curl http://localhost:3000/
```

### Check 3: Database connection
From `server/` directory:
```bash
npm run prisma studio
```
This opens a GUI where you can see if data is being created.

## Files Recently Changed

If you want to review what was updated:

1. **Frontend**: `/web/src/app/dashboard/page.js`
   - Better error handling
   - Console logging
   - Token validation

2. **Backend**: `/server/controllers/workouts.controller.js`
   - Returns complete object with exercises
   - Error logging

## Next Steps

1. Refresh browser (Cmd+R)
2. Try creating a workout again
3. Check browser console for any error messages
4. If you see an error, share the exact message
5. Check Network tab for API response

---

**Need more help?** Check the error message shown on your dashboard - it should now be much more detailed!
