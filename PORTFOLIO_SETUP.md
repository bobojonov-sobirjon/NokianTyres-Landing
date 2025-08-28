# Portfolio System Setup

## Overview
This document explains how to set up and use the new dynamic portfolio system for the WheelsApp.

## Features
- **Dynamic Portfolio**: Portfolio items are loaded from the database instead of static HTML
- **Category Filtering**: Users can filter portfolio items by tire categories:
  - Все шины (All Tires)
  - Летние шины (Summer Tires)
  - Зимние шины (Winter Tires)
  - Всесезонные (All-Season Tires)
  - Внедорожники (SUV Tires)

## Setup Instructions

### 1. Database Migration
The system automatically creates the necessary database structure. Run:
```bash
python manage.py migrate
```

### 2. Create Sample Data
To populate the portfolio with sample items, run:
```bash
python manage.py create_sample_portfolio
```

This will create 8 sample portfolio items across all categories.

### 3. Add Real Portfolio Items
To add real portfolio items:

1. **Via Admin Panel**:
   - Go to `/admin/` 
   - Navigate to "Portfolio" section
   - Click "Add Portfolio Item"
   - Fill in the required fields:
     - Title: Name of the tire
     - Description: Detailed description
     - Category: Select from dropdown
     - Image: Upload tire image
     - Brand: Tire brand (default: Nokian)
     - Size: Tire size (e.g., 205/55R16)
     - Price: Cost in rubles
     - Featured: Mark as recommended

2. **Via Management Command**:
   - Edit `tyres/management/commands/create_sample_portfolio.py`
   - Add your portfolio items to the `sample_items` list
   - Run the command again

### 4. Image Requirements
- Upload images to the `media/portfolio/` directory
- Supported formats: JPG, PNG, WebP
- Recommended size: 800x600 pixels or similar aspect ratio
- Images are automatically resized and optimized

## How It Works

### Frontend
- Portfolio items are displayed dynamically using Django templates
- Isotope.js provides smooth filtering and layout
- Each item shows:
  - Tire image
  - Title and description
  - Zoom functionality (Glightbox)
  - Link to tire selection page

### Backend
- `PortfolioItem` model stores all tire information
- `index` view fetches items from database
- Items are grouped by category for efficient filtering
- Admin interface provides easy management

### Filtering System
- "Все" shows all portfolio items
- Category-specific filters show only items from that category
- Filter classes are automatically generated (e.g., `filter-summer`, `filter-winter`)
- Isotope.js handles the smooth transitions

## Customization

### Adding New Categories
1. Edit `tyres/models.py`
2. Add new choices to `CATEGORY_CHOICES`
3. Run `python manage.py makemigrations`
4. Run `python manage.py migrate`

### Styling
- Portfolio styles are in `static/assets/css/main.css`
- Filter buttons can be customized in the template
- Isotope layout options are configurable

### Adding More Fields
- Edit the `PortfolioItem` model in `tyres/models.py`
- Update the admin interface in `tyres/admin.py`
- Modify the template to display new fields

## Troubleshooting

### Common Issues
1. **Images not displaying**: Check media settings and file permissions
2. **Filters not working**: Ensure Isotope.js is properly loaded
3. **Empty portfolio**: Run the sample data command or add items via admin

### Debug Mode
- Check Django debug output for any errors
- Verify database connections
- Check template syntax

## Performance Tips
- Use optimized images (WebP format recommended)
- Consider pagination for large portfolios
- Cache frequently accessed portfolio data
- Use CDN for static assets

## Support
For technical support or questions about the portfolio system, check the Django logs or contact the development team.
