# Valentine's Day Animation 💕

A special Valentine's Day interactive experience for your fiancé!

## Features

- 🎭 Animated cutout heads that bounce and move around
- 💝 Interactive "Will you be my Valentine?" with a funny twist (the "No" button runs away!)
- ✨ Beautiful floating hearts background
- 💌 Personal reasons why you're lucky to have her
- 💍 Special message about your last Valentine's Day before marriage
- 🎨 Smooth GSAP animations throughout
- 📱 Fully responsive design

## Setup Instructions

1. **Add Your Photos:**
   - Create an `images` folder in this directory
   - Add two cutout images of your heads:
     - `head1.png` - Your cutout head (transparent background recommended)
     - `head2.png` - Her cutout head (transparent background recommended)
   
   **How to create cutout images:**
   - Use remove.bg to remove backgrounds from photos
   - Or use Photoshop/GIMP to cut out your heads
   - Save as PNG with transparent background
   - Recommended size: 300x300px or similar

2. **Customize the Messages:**
   - Edit `script.js` to personalize the "reasons" array with your own sweet messages
   - You can add more reasons or modify existing ones

3. **Test Locally:**
   - Simply open `index.html` in your browser
   - No server needed!

4. **Deploy:**
   Choose one of these free hosting options:
   
   **Option A: Netlify (Recommended - Easiest)**
   - Go to https://netlify.com
   - Drag and drop this entire folder
   - Get an instant live link!
   
   **Option B: GitHub Pages**
   - Create a new GitHub repository
   - Push this folder
   - Enable GitHub Pages in settings
   
   **Option C: Vercel**
   - Go to https://vercel.com
   - Import this folder
   - Deploy with one click

## File Structure

```
summer/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── README.md           # This file
└── images/             # Your photos (create this folder)
    ├── head1.png       # Your cutout
    └── head2.png       # Her cutout
```

## Technologies Used

- Pure HTML/CSS/JavaScript
- GSAP (GreenSock Animation Platform) for smooth animations
- No build process or dependencies needed!

## Tips

- The "No" button moves away when she hovers over it (funny!)
- Each time she clicks "No", the "Yes" button gets bigger
- Confetti explodes when she clicks "Yes"
- The animation has 3 scenes that flow together
- Everything is mobile-friendly

## Customization Ideas

- Change the gradient colors in `styles.css`
- Add background music (uncomment audio code if you want)
- Add more scenes or messages
- Change the emoji hearts to other symbols
- Add photos to the final scene

Enjoy your Valentine's Day! 💕
