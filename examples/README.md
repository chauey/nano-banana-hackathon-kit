# Nano Banana JavaScript Examples

This directory contains JavaScript examples for using Nano Banana (Gemini 2.5 Flash Image Preview) with the Google GenAI SDK.

## Prerequisites

1. Set your API key as an environment variable:
   ```powershell
   $env:GEMINI_API_KEY = "your-api-key-here"
   ```

2. Make sure you're in the examples directory:
   ```bash
   cd examples
   ```

## Examples

### Example 1: Image Generation from Text
```bash
node example1.js
```
Generates a photorealistic image of an orange cat and saves it as `cat.png`.

### Example 2: Image Editing with Text and Image Inputs
```bash
node example2.js
```
Takes the cat image and creates a street scene in NYC. Saves as `cat-nyc.png`.
**Requires:** `cat.png` from Example 1.

### Example 3: Photo Restoration
```bash
node example3.js
```
Restores and colorizes an image. Uses `lunch.jpg` if available, otherwise uses `cat.png` for demo.
Saves as `restored-image.png`.

### Example 4: Working with Multiple Input Images
```bash
node example4.js
```
Combines two images creatively. Uses `girl.png` and `tshirt.png` if available, otherwise uses `cat.png` for demo.
Saves as `combined-image.png`.

### Example 5: Conversational Image Editing
```bash
node example5.js
```
Demonstrates conversational editing by first changing a cat to a bengal cat, then adding a party hat.
Saves as `cat-bengal.png` and `cat-bengal-hat.png`.
**Requires:** `cat.png` from Example 1.

## Running All Examples

Run examples in order since some depend on outputs from previous examples:

```bash
node example1.js
node example2.js
node example3.js
node example4.js
node example5.js
```

## Notes

- All examples use `process.env.GEMINI_API_KEY` for authentication
- Examples 2 and 5 require the `cat.png` output from Example 1
- Examples 3 and 4 will use fallback images if the specified input files don't exist
- All generated images are saved in the current directory
