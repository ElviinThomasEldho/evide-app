# Environment Setup Guide

## API Key Configuration

This project uses environment variables for secure API key management.

### Setup Instructions

1. **Create a `.env` file** in the root directory:
   ```bash
   GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

2. **For Expo projects**, the API key is also configured in `app.json` under `extra.googleMapsApiKey`.

3. **The application will use the key in this order:**
   - `expo-constants` (from app.json extra config)
   - `process.env.GOOGLE_MAPS_API_KEY` (from .env file)
   - Fallback to development key (for local development only)

### Important Security Notes

- ✅ **Never commit `.env` file to version control** (already in `.gitignore`)
- ✅ **Never commit `app.json` with production API keys** to public repositories
- ✅ **Rotate API keys** if they've been exposed in version control
- ✅ **Use different API keys** for development and production

### For Production Builds

1. Set environment variables in your CI/CD pipeline
2. Configure `app.json` extra fields during build
3. Use Expo's environment variable support for managed workflow

### Testing

The test suite uses a mock API key defined in `jest.setup.js`.

